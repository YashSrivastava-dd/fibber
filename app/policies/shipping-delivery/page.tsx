export default function ShippingDeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef1f4] to-slate-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-white p-10 rounded-2xl shadow-2xl mb-7" style={{ backgroundColor: '#102333' }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shipping & Delivery Policy</h1>
          <p className="text-gray-300">Last updated on Oct 30th 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(16, 35, 51, 0.12)', color: '#102333' }}>
            Shipping
          </span>
          <p className="text-gray-800 leading-relaxed mb-4">
            For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
          </p>
          <p className="text-gray-800 leading-relaxed mb-4">
            Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivery of the shipment subject to Courier Company / post office norms. FIBERISE FIT PRIVATE LIMITED is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
          </p>
          <p className="text-gray-800 leading-relaxed">
            Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on 7011803119 or support@fiberisefit.com
          </p>
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
