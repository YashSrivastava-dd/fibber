export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef1f4] to-slate-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-white p-10 rounded-2xl shadow-2xl mb-7" style={{ backgroundColor: '#102333' }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-gray-300">Last updated on Oct 30th 2025</p>
        </div>

        {/* Definitions */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'rgba(16, 35, 51, 0.12)', color: '#102333' }}>
            Definitions
          </span>
          <p className="text-gray-800 leading-relaxed mb-4">
            For the purpose of these Terms and Conditions, the term &quot;we&quot;, &quot;us&quot;, &quot;our&quot; used anywhere on this page shall mean <strong>FIBERISE FIT PRIVATE LIMITED</strong>, whose registered/operational office is 731/508 S/F, PLOT NO.7 BLOCK 56 DB GUPTA ROAD Karol Bagh Central Delhi New Delhi Delhi India 110005 Sat Nagar SO DELHI 110005. &quot;You&quot;, &quot;your&quot;, &quot;user&quot;, &quot;visitor&quot; shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
          </p>
          <p className="text-gray-800 leading-relaxed">Your use of the website and/or purchase from us are governed by the following Terms and Conditions:</p>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold mb-3" style={{ color: '#102333' }}>Terms</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-3">
            <li>The content of the pages of this website is subject to change without notice.</li>
            <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
            <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
            <li>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
            <li>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
            <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
            <li>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
            <li>You may not create a link to our website from another website or document without FIBERISE FIT PRIVATE LIMITED&apos;s prior written consent.</li>
            <li>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</li>
            <li>We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</li>
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
