import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb, isAdminInitialized, getInitError } from '@/lib/firebase/admin'
import { shopifyAdminFetch } from '@/lib/shopify/admin-client'
import { ORDERS_BY_EMAIL_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Check if Firebase Admin is initialized
  if (!isAdminInitialized() || !adminAuth || !adminDb) {
    const error = getInitError()
    console.error('Firebase Admin not initialized:', error)
    return NextResponse.json(
      { 
        error: 'Firebase Admin not configured. Please check FIREBASE_SERVICE_ACCOUNT_KEY in .env.local',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }

  try {
    // Get Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
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
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      )
    }

    const firebaseUid = decodedToken.uid

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Invalid token: No UID found' },
        { status: 400 }
      )
    }

    // Get user from Firestore to get systemEmail
    const userDoc = await adminDb.collection('users').doc(firebaseUid).get()
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found. Please login again.' },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const systemEmail = userData?.systemEmail || `${firebaseUid}@fiberisefit.com`

    // Check if we have Shopify Admin API token
    if (!process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.warn('SHOPIFY_ADMIN_ACCESS_TOKEN not configured. Cannot fetch orders from Shopify.')
      return NextResponse.json(
        { 
          error: 'Shopify Admin API not configured. Please set SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local',
          orders: []
        },
        { status: 200 }
      )
    }

    // Fetch orders from Shopify Admin API by email
    try {
      console.log(`🔍 Fetching orders for email: ${systemEmail}`)
      const data = await shopifyAdminFetch<{
        orders: {
          edges: Array<{
            node: {
              id: string
              name: string
              email: string
              createdAt: string
              displayFulfillmentStatus: string
              displayFinancialStatus: string
              totalPriceSet: {
                shopMoney: {
                  amount: string
                  currencyCode: string
                }
              }
              note: string
              noteAttributes: Array<{ name: string; value: string }>
              customAttributes: Array<{ key: string; value: string }>
              customer: {
                id: string
                email: string
                firstName: string | null
                lastName: string | null
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
                      altText: string
                    }
                  }
                }>
              }
            }
          }>
        }
      }>({
        query: ORDERS_BY_EMAIL_QUERY,
        variables: {
          query: `email:${systemEmail}`,
          first: 50,
        },
      })

      console.log(`📦 Found ${data.orders.edges.length} orders from Shopify`)

      // Filter orders by email or check noteAttributes/customAttributes for firebase_uid
      // Note: Cart attributes become noteAttributes in orders
      const filteredOrders = data.orders.edges
        .map((edge) => {
          const order = edge.node
          
          // Check noteAttributes (cart attributes become note attributes in orders)
          const firebaseUidNote = order.noteAttributes?.find(
            (attr) => attr.name === 'firebase_uid'
          )
          
          // Check customAttributes
          const firebaseUidCustom = order.customAttributes?.find(
            (attr) => attr.key === 'firebase_uid'
          )
          
          // Include orders that match email OR have matching firebase_uid
          const matchesUser = 
            order.email === systemEmail || 
            order.customer?.email === systemEmail ||
            firebaseUidNote?.value === firebaseUid ||
            firebaseUidCustom?.value === firebaseUid
          
          if (matchesUser) {
            return {
              id: order.id,
              orderNumber: order.name,
              email: order.email || order.customer?.email || systemEmail,
              createdAt: order.createdAt,
              status: order.displayFulfillmentStatus || 'pending',
              financialStatus: order.displayFinancialStatus || 'pending',
              totalAmount: parseFloat(order.totalPriceSet.shopMoney.amount),
              currencyCode: order.totalPriceSet.shopMoney.currencyCode,
              items: order.lineItems.edges.map((itemEdge) => ({
                title: itemEdge.node.title,
                quantity: itemEdge.node.quantity,
                price: parseFloat(itemEdge.node.originalUnitPriceSet.shopMoney.amount),
                image: itemEdge.node.image?.url || '',
              })),
            }
          }
          return null
        })
        .filter((order) => order !== null)

      console.log(`✅ Returning ${filteredOrders.length} filtered orders`)
      return NextResponse.json({ orders: filteredOrders })
    } catch (shopifyError: any) {
      console.error('❌ Error fetching orders from Shopify:', shopifyError)
      console.error('Error details:', shopifyError.message)
      
      // Return empty orders array instead of failing
      return NextResponse.json(
        { 
          error: 'Failed to fetch orders from Shopify',
          details: shopifyError.message || 'Unknown error',
          orders: []
        },
        { status: 200 }
      )
    }
  } catch (error: any) {
    console.error('Error in /api/orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
