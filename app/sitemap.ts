import type { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL?.startsWith('http')
    ? process.env.VERCEL_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://fiberisefit.com')

const LAST_MODIFIED = '2026-03-18T11:25:55+00:00'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/science`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lyte`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/starter-pack`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/ultimate-pack`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/transformation-pack-lyte-band`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/lyte`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/lyte/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/shipping-delivery`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/cancellation-refund`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/medical-disclaimer`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${BASE_URL}/policies/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/manual/lyte.pdf`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
  ]
}
