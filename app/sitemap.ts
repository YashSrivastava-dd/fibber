import type { MetadataRoute } from 'next'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_HANDLES_QUERY } from '@/lib/shopify/queries'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL?.startsWith('http')
    ? process.env.VERCEL_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://fiberisefit.com')

const PAGE_SIZE = 100

type ProductHandlesResponse = {
  products: {
    edges: Array<{
      node: { handle: string; updatedAt?: string }
    }>
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
  }
}

async function getAllProductSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  const result: Array<{ slug: string; updatedAt?: string }> = []
  let after: string | undefined

  try {
    do {
      const data = await shopifyFetch<ProductHandlesResponse>({
        query: PRODUCT_HANDLES_QUERY,
        variables: { first: PAGE_SIZE, after },
      })

      const { edges, pageInfo } = data.products
      for (const edge of edges) {
        if (edge.node?.handle) {
          result.push({
            slug: edge.node.handle,
            updatedAt: edge.node.updatedAt,
          })
        }
      }

      if (!pageInfo.hasNextPage || !pageInfo.endCursor) break
      after = pageInfo.endCursor
    } while (true)
  } catch (err) {
    console.error('Sitemap: error fetching product handles', err)
  }

  return result
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/science`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lyte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/policies/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policies/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policies/shipping-delivery`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policies/cancellation-refund`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/policies/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/lyte/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const products = await getAllProductSlugs()
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
