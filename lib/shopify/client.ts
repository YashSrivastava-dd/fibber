import { SHOPIFY_STOREFRONT_API_URL, SHOPIFY_CONFIG } from './config'

interface ShopifyResponse<T> {
  data?: T
  errors?: Array<{
    message: string
    locations?: Array<{ line: number; column: number }>
    path?: Array<string | number>
  }>
}

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, any>
}): Promise<T> {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ShopifyResponse<T> = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error(result.errors.map((e) => e.message).join(', '))
    }

    if (!result.data) {
      throw new Error('No data returned from Shopify')
    }

    return result.data
  } catch (error) {
    console.error('Shopify fetch error:', error)
    throw error
  }
}

// Helper function to format product data
export function formatProduct(product: any) {
  const image = product.images?.edges?.[0]?.node
  const variant = product.variants?.edges?.[0]?.node
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || variant?.price?.amount || '0')

  // Get the first available variant GID (for cart/checkout)
  const variantGID = variant?.id || product.variants?.edges?.[0]?.node?.id || ''

  return {
    id: variantGID, // Use variant GID for cart (full GID format: gid://shopify/ProductVariant/123)
    productId: product.id || '', // Keep product ID for reference
    title: product.title || '',
    handle: product.handle || '',
    description: product.description || '',
    price,
    comparePrice: null, // Can be added if needed
    image: image?.url || '',
    images: product.images?.edges?.map((edge: any) => edge.node.url) || [],
    available: variant?.availableForSale ?? true,
    variants: product.variants?.edges?.map((edge: any) => ({
      id: edge.node.id || '', // Full GID for variants
      gid: edge.node.id || '', // Alias for clarity
      name: edge.node.title || '',
      price: parseFloat(edge.node.price?.amount || '0'),
      available: edge.node.availableForSale ?? true,
    })) || [],
    slug: product.handle || '',
  }
}

// Helper function to format collection data
export function formatCollection(collection: any) {
  return {
    id: collection.id?.split('/').pop() || '',
    title: collection.title || '',
    handle: collection.handle || '',
    description: collection.description || '',
    image: collection.image?.url || '',
  }
}

