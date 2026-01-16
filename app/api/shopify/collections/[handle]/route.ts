import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { COLLECTION_QUERY } from '@/lib/shopify/queries'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = params
    const searchParams = request.nextUrl.searchParams
    const first = parseInt(searchParams.get('first') || '50')
    const after = searchParams.get('after') || undefined

    if (!handle) {
      return NextResponse.json(
        { error: 'Collection handle is required' },
        { status: 400 }
      )
    }

    const data = await shopifyFetch<{
      collection: {
        id: string
        title: string
        description: string
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
      }
    }>({
      query: COLLECTION_QUERY,
      variables: { handle, first, after },
    })

    if (!data.collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    const products = data.collection.products.edges.map((edge) =>
      formatProduct(edge.node)
    )

    return NextResponse.json({
      collection: {
        id: data.collection.id,
        title: data.collection.title,
        description: data.collection.description,
      },
      products,
      pageInfo: data.collection.products.pageInfo,
    })
  } catch (error: any) {
    console.error('Error fetching collection:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch collection' },
      { status: 500 }
    )
  }
}
