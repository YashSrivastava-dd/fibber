import ProductPage from '@/components/pages/ProductPage'
import LyteProductPage from '@/components/pages/LyteProductPage'

// Slugs that are LYTE (wearable) — use the premium dark product page
const LYTE_SLUGS = ['lyte']

type ProductProps = {
  params: Promise<{ slug: string }>
}

export default async function Product({ params }: ProductProps) {
  const { slug } = await params

  if (LYTE_SLUGS.includes(slug)) {
    return <LyteProductPage slug={slug} />
  }

  return <ProductPage slug={slug} />
}

