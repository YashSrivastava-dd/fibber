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

export const metadata: Metadata = {
  title: 'Fiberise Fit',
  description: 'Smart health ecosystem powered by AI & innovation.',
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

