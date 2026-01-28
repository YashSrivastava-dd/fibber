import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = params
    
    console.log('Fetching product with handle:', handle)

    if (!handle) {
      return NextResponse.json(
        { error: 'Product handle is required' },
        { status: 400 }
      )
    }

    const data = await shopifyFetch<{
      product: any
    }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    })

    console.log('Shopify response received:', data ? 'Success' : 'No data')

    if (!data.product) {
      console.log('Product not found for handle:', handle)
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = formatProduct(data.product)
    console.log('Product formatted successfully:', product.title)

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Error fetching product:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      handle: params.handle,
    })
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
