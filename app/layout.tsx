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

export const metadata: Metadata = {
  title: 'FIberiseFit Store - The Future of FIberiseFit',
  description: 'Gear up for great health with premium FIberiseFit products',
  icons: {
    icon: '/icons/I Mark - BC 01.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={montserrat.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
        {/* Zoho SalesIQ chat widget */}
        <Script
          id="zoho-salesiq-ready"
          strategy="beforeInteractive"
        >
          {`window.$zoho=window.$zoho||{};$zoho.salesiq=$zoho.salesiq||{ready:function(){}};`}
        </Script>
        <Script
          id="zsiqscript"
          src={`https://salesiq.zohopublic.in/widget?wc=${ZOHO_SALESIQ_WIDGET_CODE}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

