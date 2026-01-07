import CollectionPage from '@/components/pages/CollectionPage'

export default function Collection({ params }: { params: { slug: string } }) {
  return <CollectionPage slug={params.slug} />
}

