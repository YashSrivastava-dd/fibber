import { NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || undefined

    const data = await shopifyFetch<any>({
      query: PRODUCTS_QUERY,
      variables: { first, after },
    })

    const products = data.products?.edges?.map((edge: any) => formatProduct(edge.node)) || []

    return NextResponse.json({
      products,
      pageInfo: data.products?.pageInfo || {},
    })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

