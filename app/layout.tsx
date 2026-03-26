import type { Metadata } from 'next'
import Script from 'next/script'
import { Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { AuthProvider } from '@/contexts/AuthContext'

const ZOHO_SALESIQ_WIDGET_CODE =
  'siqe177a46861bb4b82d85eb4c59df214a951761db2618629297fbd07d24a413a331f93ef1564d85a3c5716b77bc37881db'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
})

const SITE_URL = 'https://fiberisefit.com'
const OG_IMAGE = `${SITE_URL}/icons/I%20Mark%20-%20BC%2001.png`
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1494405295572983'
const GTM_ID = 'GTM-W8MBF3JG'
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fiberise Fit',
  alternateName: 'fiberisefit',
  url: 'https://fiberisefit.com/',
  logo: 'https://fiberisefit.com/_next/image?url=%2Ffiberisefit%20dark%20logo.png&w=1920&q=75',
  sameAs: [
    'https://www.instagram.com/fiberisefit',
    'https://www.linkedin.com/company/fiberise-fit/',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Fiberise Fit',
  description: 'Smart health ecosystem powered by AI & innovation.',
  alternates: {
    canonical: './',
    languages: {
      'en-IN': './',
    },
  },
  authors: [{ name: 'Fiberise Fit' }],
  publisher: 'Fiberise Fit',
  verification: {
    google: '_611OG553fYDgD9ySG0n8u91QLMwxt2q9ZgaFr-TdEg',
  },
  other: {
    robots: 'index, follow, archive',
  },
  icons: {
    icon: '/icons/I Mark - BC 01.png',
  },
  openGraph: {
    title: 'Fiberise Fit',
    description: 'Smart health ecosystem powered by AI & innovation.',
    url: SITE_URL,
    siteName: 'Fiberise Fit',
    type: 'website',
    images: [{ url: OG_IMAGE, alt: 'Fiberise Fit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiberise Fit',
    description: 'Smart health ecosystem powered by AI & innovation.',
    images: [OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <Script id="gtm-base" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8MBF3JG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
        {/* Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17953867063"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17953867063');
          `}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        {/* Zoho SalesIQ chat widget */}
        {/* <Script
          id="zoho-salesiq-ready"e
          strategy="beforeInteractive"
        >
          {`window.$zoho=window.$zoho||{};$zoho.salesiq=$zoho.salesiq||{ready:function(){}};`}
        </Script>
        <Script
          id="zsiqscript"
          src={`https://salesiq.zohopublic.in/widget?wc=${ZOHO_SALESIQ_WIDGET_CODE}`}
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  )
}

