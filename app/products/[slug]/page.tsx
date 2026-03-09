import ProductPage from '@/components/pages/ProductPage'
import LyteProductPage from '@/components/pages/LyteProductPage'

// Slugs that are LYTE (wearable) — use the premium dark product page
const LYTE_SLUGS = ['mens-multi', 'lyte', 'lyte-band', 'lyte-health-band']

export default function Product({ params }: { params: { slug: string } }) {
  if (LYTE_SLUGS.includes(params.slug)) {
    return <LyteProductPage slug={params.slug} />
  }
  return <ProductPage slug={params.slug} />
}

