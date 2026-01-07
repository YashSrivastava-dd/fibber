import ProductPage from '@/components/pages/ProductPage'

export default function Product({ params }: { params: { slug: string } }) {
  return <ProductPage slug={params.slug} />
}

