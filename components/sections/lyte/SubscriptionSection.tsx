'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const devices = [
  {
    id: 'core',
    name: 'LYTE Core',
    price: '₹ 24,990',
    description: 'Essential health monitoring. Everything you need to optimize performance.',
    features: [
      '24/7 Health Monitoring',
      'Recovery & Strain Tracking',
      'Sleep Analysis',
      '14+ Day Battery',
      'Mobile App Access',
    ],
    cta: 'Get Core',
    popular: false,
  },
  {
    id: 'pro',
    name: 'LYTE Pro',
    price: '₹ 34,990',
    description: 'Advanced insights for serious athletes. Deep analytics and personalized coaching.',
    features: [
      'Everything in Core',
      'Advanced Analytics',
      'Personalized Coaching',
      'Health Trend Analysis',
      'Export Data',
      'Priority Support',
    ],
    cta: 'Get Pro',
    popular: true,
  },
  {
    id: 'elite',
    name: 'LYTE Elite',
    price: '₹ 49,990',
    description: 'The complete system. Medical-grade insights for peak performance optimization.',
    features: [
      'Everything in Pro',
      'Medical-Grade Metrics',
      'ECG Monitoring',
      'Blood Pressure Tracking',
      'Stress Analysis',
      'Dedicated Support',
    ],
    cta: 'Get Elite',
    popular: false,
  },
]

export default function SubscriptionSection() {
  return (
    <section id="devices" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="block text-white">Choose your</span>
            <span className="block text-white mt-2">LYTE experience.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Three tiers. One mission: optimize your performance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] ${
                device.popular
                  ? 'border-white/30 bg-white/10 scale-105'
                  : 'border-white/10'
              }`}
            >
              {device.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-white text-black text-xs font-medium rounded-full uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-light text-white mb-3">{device.name}</h3>
                  <p className="text-gray-400 mb-6 font-light leading-relaxed">{device.description}</p>
                  <div className="text-4xl font-light text-white mb-2">{device.price}</div>
                  <p className="text-sm text-gray-500">One-time payment</p>
                </div>

                <ul className="space-y-4">
                  {device.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className={`block w-full py-4 rounded-full text-center font-medium transition-all duration-300 ${
                    device.popular
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {device.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
