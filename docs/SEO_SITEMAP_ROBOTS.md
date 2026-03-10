# SEO: robots.txt and sitemap.xml

Production-ready setup for crawler rules and XML sitemap, following Google Search Console best practices.

## Where things live

| Item | Location | Served at |
|------|----------|-----------|
| **robots.txt** | `app/robots.ts` (dynamic) | `https://yourdomain.com/robots.txt` |
| **sitemap.xml** | `app/sitemap.ts` (dynamic) | `https://yourdomain.com/sitemap.xml` |

Next.js serves these automatically; no static files in `public/` are required.

## Environment variable

Set your production (or staging) base URL so the sitemap and robots use correct absolute URLs:

- In **.env** or **.env.local** add:
  ```bash
  NEXT_PUBLIC_SITE_URL=https://fiberisefit.com
  ```
- If unset, the app falls back to `https://fiberisefit.com` and, on Vercel, to `https://<VERCEL_URL>`.

Also add this to **.env.example** so other developers know to set it.

## robots.txt behaviour

- **Allow:** all crawlers (`User-agent: *`) can crawl `/`.
- **Disallow:**  
  `/admin/`, `/login/`, `/checkout/`, `/cart/`, `/account/`, `/api/`, `/private/`, `/temp/`, `/_next/`, `/favicon.ico`
- **Sitemap:** `https://<NEXT_PUBLIC_SITE_URL>/sitemap.xml`
- **Host:** same base URL (optional, for some crawlers).

Crawlers get this when they request `https://yourdomain.com/robots.txt`.

## sitemap.xml behaviour

- **Static routes:**  
  `/`, `/contact`, `/science`, `/lyte`, `/policies/terms`, `/policies/privacy-policy`, `/policies/shipping-delivery`, `/policies/cancellation-refund`, `/policies/contact`, `/lyte/privacy-policy`  
  With `lastmod`, `changefreq`, and `priority` set per route.
- **Product pages:**  
  All products from Shopify (Storefront API) are fetched by handle and emitted as `/products/<handle>` with `lastmod` from Shopify `updatedAt` when available.
- **Protocol:** XML Sitemaps 0.9; valid for Google and other major search engines.

The sitemap is generated on each request to `https://yourdomain.com/sitemap.xml`, so new or updated products appear after the next request (or after cache expiry if you add caching).

## Automatic updates

- **robots:** No script needed. `app/robots.ts` runs on every request for `/robots.txt` and uses the current `NEXT_PUBLIC_SITE_URL`.
- **sitemap:** No script needed. `app/sitemap.ts` runs on every request for `/sitemap.xml`, fetches product handles (and `updatedAt`) from Shopify with pagination, and returns the full sitemap. New or updated products are included automatically.

To add more static pages (e.g. `/about`, `/blog`), edit the `staticRoutes` array in `app/sitemap.ts`. To add blog or other dynamic routes, fetch their slugs in `sitemap.ts` and append entries with `url`, `lastModified`, `changeFrequency`, and `priority`.

## Verification

1. Set `NEXT_PUBLIC_SITE_URL` and deploy.
2. Open `https://yourdomain.com/robots.txt` — confirm `Allow`, `Disallow`, and `Sitemap` (and optional `Host`).
3. Open `https://yourdomain.com/sitemap.xml` — confirm XML with `<urlset>`, `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`.
4. In Google Search Console, submit the sitemap URL: `https://yourdomain.com/sitemap.xml`.

## Optional: static fallback

If you prefer a static `public/robots.txt` as well, you can add one that only allows and points to the sitemap; the dynamic `app/robots.ts` will override it when present, so normally the dynamic version is enough.
