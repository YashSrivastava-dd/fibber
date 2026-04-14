import ProductPage from '@/components/pages/ProductPage'
import LyteProductPage from '@/components/pages/LyteProductPage'
import type { Metadata } from 'next'

// Slugs that are LYTE (wearable) — use the premium dark product page
const LYTE_SLUGS = ['lyte']

const PRODUCT_META_BY_SLUG: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  'starter-pack': {
    title: 'Fyber Starter Pack - Natural Fiber Weight Management Sachet | Fiberise',
    description:
      'Fyber is a natural fiber weight management solution in easy sachet form. Control cravings, support fat metabolism & improve gut health. Free shipping pan India.',
    keywords: 'natural fiber, weight management',
  },
  'transformation-pack-lyte-band': {
    title: 'Fyber Transformation Pack with lyte band - Weight Management & Fat Burner for Women',
    description:
      'Control cravings & manage weight naturally with the best fiber supplement with lyte band. Supports fat burning & gut health - smart alternative to Ozempic for weight loss.',
    keywords: 'ozempic for weight loss, weight management supplements, fat burner for women, best fiber supplement',
  },
  'transformation-pack': {
    title: 'Fyber Transformation Pack with lyte band - Weight Management & Fat Burner for Women',
    description:
      'Control cravings & manage weight naturally with the best fiber supplement with lyte band. Supports fat burning & gut health - smart alternative to Ozempic for weight loss.',
    keywords: 'ozempic for weight loss, weight management supplements, fat burner for women, best fiber supplement',
  },
  'ultimate-pack': {
    title: 'Fyber Fit Pack - Best Weight Loss Sachet & Natural Fat Loss Medicine',
    description:
      'Fyber - a natural alternative to Ozempic medicine for fat loss. The best weight loss sachet to control cravings, boost metabolism & support gut health. Free shipping pan India.',
    keywords: 'fat loss medicine, best weight loss, ozempic medicine',
  },
  lyte: {
    title: 'Lyte Band - Intelligent Health & Fitness Tracker | Fiberise Fit',
    description:
      'Monitor your health in real time with the Lyte fitness band. This advanced health tracker and fitness monitoring device helps track vital stats, activity, and daily wellness insights.',
    keywords: 'fitness band, health tracker, fitness monitoring device',
  },
}
const PRODUCT_SCHEMA_BY_SLUG: Record<string, Record<string, unknown>> = {
  'starter-pack': {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Starter Pack',
    image: 'https://cdn.shopify.com/s/files/1/0959/3680/7187/files/FIBERISE_A_-01.png?v=1773251134',
    description:
      'A clinically tested weight-management solution. Fyber is intelligently formulated to help manage everyday hunger cravings while supporting balanced metabolism and sustained energy.By helping you feel fuller for longer, it naturally reduces frequent calorie intake and supports healthy weight management.',
    brand: {
      '@type': 'Brand',
      name: 'Fiberise Fit',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://fiberisefit.com/products/starter-pack',
      priceCurrency: 'INR',
      price: '2249',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  },
  'transformation-pack-lyte-band': {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Transformation Pack + Lyte Band',
    image: 'https://cdn.shopify.com/s/files/1/0959/3680/7187/files/kh.jpg?v=1773315591',
    description:
      'A clinically tested weight-management solution. Fyber is intelligently formulated to help manage everyday hunger cravings while supporting balanced metabolism and sustained energy.By helping you feel fuller for longer, it naturally reduces frequent calorie intake and supports healthy weight management.',
    brand: {
      '@type': 'Brand',
      name: 'Fiberise Fit',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://fiberisefit.com/products/transformation-pack-lyte-band',
      priceCurrency: 'INR',
      price: '5999',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '7',
    },
  },
  'transformation-pack': {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Transformation Pack + Lyte Band',
    image: 'https://cdn.shopify.com/s/files/1/0959/3680/7187/files/kh.jpg?v=1773315591',
    description:
      'A clinically tested weight-management solution. Fyber is intelligently formulated to help manage everyday hunger cravings while supporting balanced metabolism and sustained energy.By helping you feel fuller for longer, it naturally reduces frequent calorie intake and supports healthy weight management.',
    brand: {
      '@type': 'Brand',
      name: 'Fiberise Fit',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://fiberisefit.com/products/transformation-pack',
      priceCurrency: 'INR',
      price: '5999',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '7',
    },
  },
  'ultimate-pack': {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Ultimate Pack',
    image: 'https://cdn.shopify.com/s/files/1/0959/3680/7187/files/hf_20260312_061942_1ae37390-504a-4f8d-9c88-2036cfc3a423.jpg?v=1773309225',
    description:
      'A clinically tested weight-management solution. Fyber is intelligently formulated to help manage everyday hunger cravings while supporting balanced metabolism and sustained energy.By helping you feel fuller for longer, it naturally reduces frequent calorie intake and supports healthy weight management.',
    brand: {
      '@type': 'Brand',
      name: 'Fiberise Fit',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://fiberisefit.com/products/ultimate-pack',
      priceCurrency: 'INR',
      price: '6499',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '7',
    },
  },
  lyte: {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'LYTE',
    image: 'https://cdn.shopify.com/s/files/1/0959/3680/7187/files/banner-05_jpg.jpg?v=1773035637',
    description:
      "Lyte band is a wearable heath and fitness monitoring device designed to track vital physiological parameters and daily activity metrics in real time.\n\nThe band uses multiple integrated sensors and algorithms to continuously track the user's health data and synchronize it with the LYTE mobile application.\n\nIt brings intelligence into everyday wellness , allowing people to understand their bodies better , recognizes patterns & make smarter everyday choices.",
    brand: {
      '@type': 'Brand',
      name: 'Fiberise Fit',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://fiberisefit.com/products/lyte',
      priceCurrency: 'INR',
      price: '7999',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '7',
    },
  },
}

type ProductProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const { slug } = await params
  const key = (slug || '').toLowerCase()
  const meta = PRODUCT_META_BY_SLUG[key] ?? PRODUCT_META_BY_SLUG[key.replace(/^\//, '')]

  const title = meta?.title ?? 'Fiberise Fit'
  const description = meta?.description ?? 'Smart health ecosystem powered by AI & innovation.'
  const url = `/products/${slug}`

  return {
    title,
    description,
    keywords: meta?.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Product({ params }: ProductProps) {
  const { slug } = await params
  const productSchema = PRODUCT_SCHEMA_BY_SLUG[slug]

  if (LYTE_SLUGS.includes(slug)) {
    return (
      <>
        {productSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          />
        )}
        <LyteProductPage slug={slug} />
      </>
    )
  }

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductPage slug={slug} />
    </>
  )
}

