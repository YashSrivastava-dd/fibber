import Link from 'next/link'

export default function ContactPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef1f4] to-slate-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-white p-10 rounded-2xl shadow-2xl mb-7" style={{ backgroundColor: '#102333' }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact us</h1>
          <p className="text-gray-300">Last updated on Oct 30th 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(16, 35, 51, 0.12)', color: '#102333' }}>
            Contact Information
          </span>
          <p className="text-gray-800 leading-relaxed mb-6">You may contact us using the information below:</p>
          <ul className="list-none space-y-3 text-gray-800">
            <li><strong>Merchant Legal entity name:</strong> FIBERISE FIT PRIVATE LIMITED</li>
            <li><strong>Registered Address:</strong> 731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005</li>
            <li><strong>Operational Address:</strong> 731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005</li>
            <li><strong>Telephone No:</strong> 7011803119</li>
            <li><strong>E-Mail ID:</strong> support@fiberisefit.com</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-6 mb-7 border" style={{ background: 'linear-gradient(to bottom right, #f8fafc, rgba(16, 35, 51, 0.06))', borderColor: 'rgba(16, 35, 51, 0.2)' }}>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Disclaimer: The above content is created at FIBERISE FIT PRIVATE LIMITED&apos;s sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant&apos;s non-adherence to it.
          </p>
          <Link href="/contact" className="font-medium underline" style={{ color: '#102333' }}>
            Go to Contact page →
          </Link>
        </div>

        <footer className="mt-7 py-6 rounded-2xl text-center text-sm text-gray-300" style={{ backgroundColor: '#102333' }}>
          © FIBERISE FIT PRIVATE LIMITED — All rights reserved
        </footer>
      </div>
    </div>
  )
}
