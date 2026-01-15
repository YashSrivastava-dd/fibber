import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const footerLinks = {
    products: [
      { name: '7 Day Pack ', href: '/products/collagen' },
      { name: '30 Day Pack', href: '/products/hair-skin-nails' },
      { name: '90 Day Pack', href: '/products/immunity' },
      { name: "LYTE", href: '/products/mens-multi' },
    ],
    social: [
      { name: 'TikTok', href: '#' },
      { name: 'Facebook', href: '#' },
      { name: 'Instagram', href: '#' },
    ],
  }

  return (
    <footer className="bg-[#000000] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Social
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Text Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Legal
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  href="/lyte/privacy-policy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  LYTE Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/shipping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/contact_us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/refund"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://merchant.razorpay.com/policy/RZHNgccrVdS1Qa/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              We&apos;re here to help and ensure your journey with Fiberise is seamless and enjoyable. Got ideas or questions about sections? Need a tweak to make it just perfect?
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-medium">Reach out to us!</span> Our friendly support team is ready to bring your vision to life. 🌿
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left - Social Icons */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Right - Payment Icons */}
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
            <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-green-600">UPI</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-red-500">MC</span>
              </div>
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-blue-500">AMEX</span>
              </div>
             
             
              <div className="bg-white rounded px-2 py-1">
                <span className="text-xs font-bold text-gray-600">Diners</span>
              </div>
                
            </div>
          </div>
        </div>
      </div>

      {/* Large Brand Logo */}
      <div className="overflow-hidden pt-8 md:pt-12 flex justify-center px-4">
        <div className="relative w-full max-w-6xl h-32 md:h-44 lg:h-56 opacity-1000">
          <Image
            src="/fiberise fit light logo.png"
            alt="Fiberise"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  )
}

