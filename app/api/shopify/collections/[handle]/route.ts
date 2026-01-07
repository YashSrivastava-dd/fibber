import { NextResponse } from 'next/server'
import { shopifyFetch, formatProduct } from '@/lib/shopify/client'
import { COLLECTION_QUERY } from '@/lib/shopify/queries'

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const first = parseInt(searchParams.get('first') || '20')
    const after = searchParams.get('after') || undefined

    const data = await shopifyFetch<any>({
      query: COLLECTION_QUERY,
      variables: { handle: params.handle, first, after },
    })

    if (!data.collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    const products = data.collection.products?.edges?.map((edge: any) =>
      formatProduct(edge.node)
    ) || []

    return NextResponse.json({
      collection: {
        id: data.collection.id?.split('/').pop() || '',
        title: data.collection.title || '',
        handle: data.collection.handle || '',
        description: data.collection.description || '',
      },
      products,
      pageInfo: data.collection.products?.pageInfo || {},
    })
  } catch (error: any) {
    console.error('Error fetching collection:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch collection' },
      { status: 500 }
    )
  }
}

