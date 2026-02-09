export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef1f4] to-slate-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-white p-10 rounded-2xl shadow-2xl mb-7" style={{ backgroundColor: '#102333' }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cancellation & Refund Policy</h1>
          <p className="text-gray-300">Last updated on Oct 30th 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(16, 35, 51, 0.12)', color: '#102333' }}>
            Policy
          </span>
          <p className="text-gray-800 leading-relaxed mb-6">
            FIBERISE FIT PRIVATE LIMITED believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-3">
            <li>Cancellations will be considered only if the request is made within the same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
            <li>FIBERISE FIT PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
            <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within the same day of receipt of the products.</li>
            <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within the same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
            <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
            <li>In case of any Refunds approved by the FIBERISE FIT PRIVATE LIMITED, it&apos;ll take 3-5 days for the refund to be processed to the end customer.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-6 mb-7 border" style={{ background: 'linear-gradient(to bottom right, #f8fafc, rgba(16, 35, 51, 0.06))', borderColor: 'rgba(16, 35, 51, 0.2)' }}>
          <p className="text-sm text-gray-600 leading-relaxed">
            Disclaimer: The above content is created at FIBERISE FIT PRIVATE LIMITED&apos;s sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant&apos;s non-adherence to it.
          </p>
        </div>

        <footer className="mt-7 py-6 rounded-2xl text-center text-sm text-gray-300" style={{ backgroundColor: '#102333' }}>
          © FIBERISE FIT PRIVATE LIMITED — All rights reserved
        </footer>
      </div>
    </div>
  )
}
