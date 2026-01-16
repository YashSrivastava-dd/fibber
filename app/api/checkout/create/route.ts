import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb, isAdminInitialized, getInitError } from '@/lib/firebase/admin'
import { shopifyFetch } from '@/lib/shopify/client'
import { CART_CREATE_MUTATION, CART_UPDATE_MUTATION, PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/queries'

interface CartItem {
  id: string
  quantity: number
}

export async function POST(request: NextRequest) {
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

    // Get cart items from request body
    const body = await request.json()
    const { items }: { items: CartItem[] } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Helper function to convert ID to Shopify GID format
    const toShopifyGID = (id: string): string => {
      // If already in GID format, return as is
      if (id.startsWith('gid://')) {
        return id
      }
      // If it's just a numeric ID, convert to ProductVariant GID
      // Try ProductVariant first (most common)
      if (/^\d+$/.test(id)) {
        return `gid://shopify/ProductVariant/${id}`
      }
      // If it contains a dash or other format, might be product-variant format
      // Return as is and let Shopify validate
      return id
    }

    // Prepare cart lines with proper GID format
    const cartLines = items.map((item) => {
      const merchandiseId = toShopifyGID(item.id)
      console.log(`📦 Cart item ID: ${item.id} -> GID: ${merchandiseId}, Quantity: ${item.quantity}`)
      return {
        merchandiseId,
        quantity: item.quantity,
      }
    })

    // Create cart with items
    const cartInput = {
      lines: cartLines,
      attributes: [
        {
          key: 'firebase_uid',
          value: firebaseUid,
        },
        {
          key: 'system_email',
          value: systemEmail,
        },
      ],
    }

    console.log('Creating Shopify cart with items:', JSON.stringify(cartLines, null, 2))

    const cartResult = await shopifyFetch<{
      cartCreate: {
        cart: {
          id: string
          checkoutUrl: string
        }
        userErrors: Array<{ field: string[]; message: string }>
      }
    }>({
      query: CART_CREATE_MUTATION,
      variables: { input: cartInput },
    })

    if (cartResult.cartCreate.userErrors?.length > 0) {
      const errors = cartResult.cartCreate.userErrors
        .map((e) => e.message)
        .join(', ')
      console.error('❌ Shopify cart creation errors:', cartResult.cartCreate.userErrors)
      
      // Provide more helpful error message
      let errorMessage = `Cart creation failed: ${errors}`
      if (errors.includes('does not exist')) {
        errorMessage = `One or more products in your cart are no longer available or have invalid variant IDs. Please clear your cart, go to Shop, and add products again. Technical error: ${errors}`
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: cartResult.cartCreate.userErrors,
          suggestion: 'Please clear your cart and add products fresh from the shop page.'
        },
        { status: 400 }
      )
    }

    const cartId = cartResult.cartCreate.cart.id
    let checkoutUrl = cartResult.cartCreate.cart.checkoutUrl

    // Update cart attributes to ensure firebase_uid is set
    // (This is a backup in case attributes weren't set during creation)
    try {
      await shopifyFetch<{
        cartAttributesUpdate: {
          cart: {
            id: string
            checkoutUrl: string
          }
          userErrors: Array<{ field: string[]; message: string }>
        }
      }>({
        query: CART_UPDATE_MUTATION,
        variables: {
          cartId,
          attributes: [
            {
              key: 'firebase_uid',
              value: firebaseUid,
            },
            {
              key: 'system_email',
              value: systemEmail,
            },
          ],
        },
      })
    } catch (error) {
      console.error('Error updating cart attributes:', error)
      // Continue even if attribute update fails
    }

    // Append email to checkout URL if possible (Shopify may use this for pre-filling)
    // Note: This is a best-effort approach. Shopify's guest checkout may not support this.
    if (checkoutUrl && systemEmail) {
      try {
        const url = new URL(checkoutUrl)
        url.searchParams.set('email', systemEmail)
        checkoutUrl = url.toString()
      } catch (error) {
        // If URL parsing fails, use original checkoutUrl
        console.error('Error appending email to checkout URL:', error)
      }
    }

    console.log('✅ Checkout created successfully:', checkoutUrl)
    return NextResponse.json({ checkoutUrl })
  } catch (error: any) {
    console.error('❌ Error in /api/checkout/create:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error'
    if (error.message?.includes('Invalid global id')) {
      errorMessage = `Invalid product variant ID. Please ensure products are added from the shop page. Error: ${error.message}`
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
