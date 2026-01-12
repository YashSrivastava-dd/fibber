'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const appScreens = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Your complete health overview at a glance.',
    image: '/ritual/image.jpeg',
  },
  {
    id: 'recovery',
    title: 'Recovery',
    description: 'Real-time recovery metrics and readiness scores.',
    image: '/ritual/Generate_image_in_2k_202601121203 (2).jpg',
  },
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Deep sleep analysis and optimization insights.',
    image: '/ritual/Make_this_image_2k_202601091748.jpeg',
  },
  {
    id: 'strain',
    title: 'Strain',
    description: 'Workout intensity tracking and cardiovascular load.',
    image: '/ritual/An_aesthetic_and_2k_202601091659.jpeg',
  },
]

export default function AppPreviewSection() {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <section className="py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white overflow-hidden">
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
            <span className="block text-white">Your data.</span>
            <span className="block text-white mt-2">Your insights.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Beautiful, intuitive interface. Powerful analytics. All in the palm of your hand.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* iPhone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto w-[300px] aspect-[9/19.5] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-black relative">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={appScreens[activeScreen].image}
                    alt={appScreens[activeScreen].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Screen Selector */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {appScreens.map((screen, index) => (
              <motion.button
                key={screen.id}
                onClick={() => setActiveScreen(index)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  activeScreen === index
                    ? 'bg-white/10 border-white/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-light text-white mb-2">{screen.title}</h3>
                    <p className="text-sm text-gray-400 font-light">{screen.description}</p>
                  </div>
                  {activeScreen === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
