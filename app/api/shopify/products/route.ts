import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '10')
    const after = searchParams.get('after') || undefined

    const data = await shopifyFetch<{
      products: {
        edges: Array<{
          node: any
          cursor: string
        }>
        pageInfo: {
          hasNextPage: boolean
          hasPreviousPage: boolean
          startCursor: string
          endCursor: string
        }
      }
    }>({
      query: PRODUCTS_QUERY,
      variables: { first, after },
    })

    const products = data.products.edges.map((edge) => formatProduct(edge.node))

    return NextResponse.json({
      products,
      pageInfo: data.products.pageInfo,
    })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
