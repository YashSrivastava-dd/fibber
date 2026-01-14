export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-slate-50 pt-28">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white p-10 rounded-2xl shadow-2xl shadow-indigo-500/30 mb-7">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">LYTE Health Band App Overview</h1>
          <p className="text-indigo-100">Your health data, handled with care.</p>
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
            Introduction
          </span>
          <p className="text-gray-800 leading-relaxed">
            At LYTE Health Band App, your privacy is our priority. This policy explains how we collect,
            use, and protect your personal and health-related information when you use our app and
            wearable device. By using the LYTE Health Band App, you agree to the practices described here.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">1. Information We Collect</h2>
          
          <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">A. Personal & Device Data</h3>
          <p className="text-gray-800 leading-relaxed mb-4">
            We may collect basic details such as name, age, gender, and contact information to personalize
            your experience. We also collect device details like band model, device ID, and app version
            to ensure smooth functionality.
          </p>

          <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">B. Health & Activity Data</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
            <li>Heart Rate</li>
            <li>SpO₂ (Blood Oxygen Level)</li>
            <li>Heart Rate Variability (HRV)</li>
            <li>Sleep duration and sleep stages</li>
            <li>Steps and activity movement</li>
            <li>Calories burned</li>
            <li>Stress-related data</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mt-5 mb-2">C. Permissions Required</h3>
          <p className="text-gray-800 leading-relaxed mb-3">
            To provide a seamless experience, the app may request the following permissions:
          </p>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Camera – For profile photos, QR scanning, and device setup</li>
            <li>Photos & Storage – To save and display images and reports</li>
            <li>Activity Recognition – To track steps and movement</li>
            <li>Body Sensors – To read heart rate, SpO₂, HRV, and stress data</li>
            <li>Bluetooth – To connect and sync with your LYTE Health Band</li>
            <li>Location – Required for Bluetooth scanning (not used for tracking)</li>
            <li>Internet – To sync data and enable cloud features</li>
            <li>Notifications – For alerts, reminders, and updates</li>
            <li>Foreground Services & Alarms – For background syncing and precise reminders</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Track and display your health metrics</li>
            <li>Provide wellness and sleep insights</li>
            <li>Improve app performance and accuracy</li>
            <li>Send reminders and alerts</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">3. Data Security</h2>
          <p className="text-gray-800 leading-relaxed mb-3">
            We use industry-standard security measures to protect your data.
          </p>
          <p className="text-gray-800 leading-relaxed mb-2">
            <strong>Encryption:</strong> Data is encrypted during transmission and storage.
          </p>
          <p className="text-gray-800 leading-relaxed">
            <strong>Storage:</strong> Data is stored securely with restricted access.
          </p>
        </div>

        {/* Sharing Your Information */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">4. Sharing Your Information</h2>
          <p className="text-gray-800 leading-relaxed">
            We do not sell or rent your personal or health data. Information is used only to provide
            app features, except where required by law.
          </p>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">5. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            <li>Access and update your data</li>
            <li>Control permissions from device settings</li>
            <li>Request data deletion (subject to legal requirements)</li>
          </ul>
        </div>

        {/* Changes to This Policy */}
        <div className="bg-white rounded-2xl p-7 mb-6 border border-gray-200 shadow-lg shadow-black/5">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">6. Changes to This Policy</h2>
          <p className="text-gray-800 leading-relaxed">
            We may update this policy from time to time. Changes will be reflected with a new
            &quot;Last Updated&quot; date.
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 border border-gray-200 rounded-2xl p-6 mb-7">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">7. Contact Us</h2>
          <p className="text-gray-800 mb-2">Email: support@fiberisefit.com</p>
          <p className="text-gray-800">Phone: +91 8679036275</p>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-7 mb-3">
          © LYTE Health Band App — All rights reserved
        </footer>
      </div>
    </div>
  )
}
