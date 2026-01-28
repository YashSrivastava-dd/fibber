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
    console.log('Shopify API URL:', SHOPIFY_STOREFRONT_API_URL)
    console.log('Shopify fetch variables:', variables)
    
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

    console.log('Shopify API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify API error response:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const result: ShopifyResponse<T> = await response.json()
    console.log('Shopify API response data:', result)

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error(result.errors.map((e) => e.message).join(', '))
    }

    if (!result.data) {
      console.error('No data in Shopify response')
      throw new Error('No data returned from Shopify')
    }

    return result.data
  } catch (error) {
    console.error('Shopify fetch error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
}

// Helper function to format product data
export function formatProduct(product: any) {
  const image = product.images?.edges?.[0]?.node
  const variant = product.variants?.edges?.[0]?.node
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || variant?.price?.amount || '0')
  const maxPrice = parseFloat(product.priceRange?.maxVariantPrice?.amount || '0')

  // Get the first available variant GID (for cart/checkout)
  const variantGID = variant?.id || product.variants?.edges?.[0]?.node?.id || ''

  // Check availability - only mark as available if explicitly true
  // Check if at least one variant is available
  const hasAvailableVariant = product.variants?.edges?.some((edge: any) => edge.node.availableForSale === true)
  const isAvailable = variant?.availableForSale === true || hasAvailableVariant === true
  
  // Extract metafields - filter out null values first
  const metafields = (product.metafields || []).filter((m: any) => m !== null && m !== undefined)
  const servings = metafields.find((m: any) => m && m.key === 'servings')?.value || ''
  const ingredients = metafields.find((m: any) => m && m.key === 'ingredients')?.value || ''
  const shippingInfo = metafields.find((m: any) => m && m.key === 'shipping_info')?.value || ''
  const returnsInfo = metafields.find((m: any) => m && m.key === 'returns_info')?.value || ''
  
  console.log('formatProduct:', {
    title: product.title,
    variantAvailable: variant?.availableForSale,
    hasAvailableVariant,
    isAvailable,
    variants: product.variants?.edges?.map((e: any) => ({ id: e.node.id, available: e.node.availableForSale })),
    metafields: { servings, ingredients }
  })

  return {
    id: variantGID, // Use variant GID for cart (full GID format: gid://shopify/ProductVariant/123)
    productId: product.id || '', // Keep product ID for reference
    title: product.title || '',
    handle: product.handle || '',
    description: product.description || '',
    descriptionHtml: product.descriptionHtml || '',
    price,
    maxPrice: maxPrice > price ? maxPrice : null,
    comparePrice: null, // Can be added if needed
    image: image?.url || '',
    images: product.images?.edges?.map((edge: any) => edge.node.url) || [],
    available: isAvailable, // Only true if explicitly available
    variants: product.variants?.edges?.map((edge: any) => ({
      id: edge.node.id || '', // Full GID for variants
      gid: edge.node.id || '', // Alias for clarity
      name: edge.node.title || '',
      price: parseFloat(edge.node.price?.amount || '0'),
      available: edge.node.availableForSale === true, // Only true if explicitly true
      selectedOptions: edge.node.selectedOptions || [],
    })) || [],
    slug: product.handle || '',
    // Metafields from Shopify
    servings,
    ingredients,
    shippingInfo,
    returnsInfo,
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

