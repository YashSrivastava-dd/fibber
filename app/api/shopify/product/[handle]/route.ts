import { NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/queries'

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const data = await shopifyFetch<any>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: params.handle },
    })

    if (!data.product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = formatProduct(data.product)

    // Add metafields if available
    if (data.product.metafields) {
      const ingredients = data.product.metafields.find(
        (m: any) => m.key === 'ingredients'
      )
      const shipping = data.product.metafields.find(
        (m: any) => m.key === 'shipping_info'
      )
      const returns = data.product.metafields.find(
        (m: any) => m.key === 'returns_info'
      )

      return NextResponse.json({
      ...product,
      ingredients: ingredients?.value || '',
      shipping: shipping?.value || '',
      returns: returns?.value || '',
    })
    }

    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

