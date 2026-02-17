/**
 * Returns up to 2 badge labels for product cards (top-left tags).
 * Uses real data (discount %) when available; USP labels from title or fallback.
 */

export interface ProductBadge {
  label: string
  variant: 'primary' | 'secondary'
}

interface ProductForBadges {
  title?: string
  price?: number
  maxPrice?: number | null
}

export function getProductBadges(
  product: ProductForBadges,
  index: number
): ProductBadge[] {
  const badges: ProductBadge[] = []

  // Discount badge when we have compare-at price (real data only)
  if (
    product.maxPrice != null &&
    product.maxPrice > (product.price ?? 0) &&
    (product.price ?? 0) > 0
  ) {
    const pct = Math.round(
      (1 - (product.price ?? 0) / product.maxPrice) * 100
    )
    if (pct > 0) {
      badges.push({ label: `${pct}% OFF`, variant: 'primary' })
    }
  }

  // USP / category badge from title or fallback by position
  const title = (product.title ?? '').toUpperCase()
  if (title.includes('LYTE') || title.includes('CRAVING')) {
    badges.push({ label: 'CRAVING CONTROL', variant: 'secondary' })
  } else if (title.includes('WEIGHT') || title.includes('MANAGEMENT')) {
    badges.push({ label: 'WEIGHT MANAGEMENT', variant: 'secondary' })
  } else if (title.includes('GUT') || title.includes('FIBER')) {
    badges.push({ label: 'GUT SUPPORT', variant: 'secondary' })
  } else if (title.includes('IMMUN') || title.includes('MULTI')) {
    badges.push({ label: 'DAILY NUTRITION', variant: 'secondary' })
  } else if (index === 0) {
    badges.push({ label: 'BEST SELLER', variant: 'primary' })
  } else if (index === 1) {
    badges.push({ label: 'TRENDING', variant: 'primary' })
  } else {
    badges.push({ label: 'SCIENCE-BACKED', variant: 'secondary' })
  }

  return badges.slice(0, 2)
}
