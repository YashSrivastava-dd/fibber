import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, isAdminInitialized, getInitError } from '@/lib/firebase/admin'
import { shopifyAdminFetch } from '@/lib/shopify/admin-client'
import { ORDERS_BY_EMAIL_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

function normalizePhone(phone?: string | null): string {
  return phone ? phone.replace(/\D/g, '') : ''
}

/** Returns true if two digit-only strings represent the same phone (exact or last-10 match for country code). */
function phonesMatch(userDigits: string, orderDigits: string): boolean {
  if (!orderDigits) return false
  if (userDigits === orderDigits) return true
  // Indian (and others): user +919548891893 (12) vs order 9548891893 (10)
  if (userDigits.length >= 10 && orderDigits.length >= 10) {
    const userLast10 = userDigits.slice(-10)
    const orderLast10 = orderDigits.slice(-10)
    if (userLast10 === orderLast10) return true
  }
  // One contains the other (e.g. 919548891893 ends with 9548891893)
  if (userDigits.length >= orderDigits.length && userDigits.endsWith(orderDigits)) return true
  if (orderDigits.length >= userDigits.length && orderDigits.endsWith(userDigits)) return true
  return false
}

export async function GET(request: NextRequest) {
  // Check if Firebase Admin is initialized
  if (!isAdminInitialized() || !adminAuth) {
    const error = getInitError()
    console.error('Firebase Admin not initialized:', error)
    return NextResponse.json(
      {
        error: 'Firebase Admin not configured. Please check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local',
        details: error?.message || 'Unknown error',
        orders: [],
      },
      { status: 500 }
    )
  }

  try {
    // Get Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided', orders: [] },
        { status: 401 }
      )
    }

    const idToken = authHeader.split('Bearer ')[1]

    // Verify Firebase token
    let decodedToken
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken)
    } catch (error: any) {
      console.error('Token verification error:', error)
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token', orders: [] },
        { status: 401 }
      )
    }

    const firebaseUid = decodedToken.uid
    const phone = decodedToken.phone_number as string | undefined

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Invalid token: No UID found', orders: [] },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        { error: 'No phone number associated with this account', orders: [] },
        { status: 200 }
      )
    }

    // Check if we have Shopify Admin API token
    if (!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.warn('SHOPIFY_ADMIN_ACCESS_TOKEN not configured. Cannot fetch orders from Shopify.')
      return NextResponse.json(
        {
          error: 'Shopify Admin API not configured. Please set SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local',
          orders: [],
        },
        { status: 200 }
      )
    }

    // Fetch recent orders from Shopify Admin API and filter by phone number
    try {
      const normalizedUserPhone = normalizePhone(phone)
      console.log(`🔍 Fetching orders for phone: ${phone} (normalized: ${normalizedUserPhone})`)

      const data = await shopifyAdminFetch<{
        orders: {
          edges: Array<{
            node: {
              id: string
              name: string
              email: string | null
              phone: string | null
              createdAt: string
              displayFulfillmentStatus: string | null
              displayFinancialStatus: string | null
              totalPriceSet: {
                shopMoney: {
                  amount: string
                  currencyCode: string
                }
              }
              customer: {
                id: string
                email: string | null
                firstName: string | null
                lastName: string | null
                phone: string | null
              } | null
              shippingAddress: {
                name: string | null
                address1: string | null
                address2: string | null
                city: string | null
                province: string | null
                zip: string | null
                country: string | null
                phone: string | null
              } | null
              lineItems: {
                edges: Array<{
                  node: {
                    title: string
                    quantity: number
                    originalUnitPriceSet: {
                      shopMoney: {
                        amount: string
                        currencyCode: string
                      }
                    }
                    image: {
                      url: string
                      altText: string | null
                    } | null
                  }
                }>
              }
            }
          }>
        }
      }>({
        query: ORDERS_BY_EMAIL_QUERY,
        variables: {
          // We can't filter by phone in Shopify's search syntax,
          // so fetch the most recent orders and filter by phone in code.
          query: 'status:any',
          first: 100,
        },
      })

      console.log(`📦 Retrieved ${data.orders.edges.length} recent orders from Shopify`)

      const filteredOrders = data.orders.edges
        .map((edge) => {
          const order = edge.node

          const orderPhones = [
            order.phone,
            order.shippingAddress?.phone ?? null,
            order.customer?.phone ?? null,
          ]

          const hasMatchingPhone = orderPhones.some((p) => {
            const normalized = normalizePhone(p)
            return phonesMatch(normalizedUserPhone, normalized)
          })

          if (!hasMatchingPhone) {
            return null
          }

          return {
            id: order.id,
            orderNumber: order.name,
            email: order.email || order.customer?.email || null,
            createdAt: order.createdAt,
            status: order.displayFulfillmentStatus || 'pending',
            financialStatus: order.displayFinancialStatus || 'pending',
            totalAmount: parseFloat(order.totalPriceSet.shopMoney.amount),
            currencyCode: order.totalPriceSet.shopMoney.currencyCode,
            contactPhone:
              order.phone ||
              order.shippingAddress?.phone ||
              order.customer?.phone ||
              null,
            shippingAddress: order.shippingAddress
              ? {
                  name: order.shippingAddress.name,
                  address1: order.shippingAddress.address1,
                  address2: order.shippingAddress.address2,
                  city: order.shippingAddress.city,
                  province: order.shippingAddress.province,
                  zip: order.shippingAddress.zip,
                  country: order.shippingAddress.country,
                  phone: order.shippingAddress.phone,
                }
              : null,
            items: order.lineItems.edges.map((itemEdge) => ({
              title: itemEdge.node.title,
              quantity: itemEdge.node.quantity,
              price: parseFloat(itemEdge.node.originalUnitPriceSet.shopMoney.amount),
              image: itemEdge.node.image?.url || '',
            })),
          }
        })
        .filter((order) => order !== null)

      console.log(`✅ Returning ${filteredOrders.length} orders after phone filter`)
      return NextResponse.json({ orders: filteredOrders })
    } catch (shopifyError: any) {
      console.error('❌ Error fetching orders from Shopify:', shopifyError)
      console.error('Error details:', shopifyError.message)

      // Return empty orders array instead of failing
      return NextResponse.json(
        {
          error: 'Failed to fetch orders from Shopify',
          details: shopifyError.message || 'Unknown error',
          orders: [],
        },
        { status: 200 }
      )
    }
  } catch (error: any) {
    console.error('Error in /api/orders:', error)
    return NextResponse.json(
      { error: 'Internal server error', orders: [] },
      { status: 500 }
    )
  }
}
