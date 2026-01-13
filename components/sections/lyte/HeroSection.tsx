'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Hero Media Wrapper */}
      <div className="absolute inset-0 z-0" style={{ '--hero-media-count': 1 } as React.CSSProperties}>
        {/* Video Wrapper */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <video
              playsInline
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
              preload="metadata"
              aria-label="LYTE Hero"
            >
              <source src="/videos/924a9f9d83f142f3a34266a681162657.HD-1080p-4.8Mbps-60445784.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#12121266] to-transparent"
          style={{
            '--overlay-layer': 'var(--layer-flat)',
            '--overlay-color': '#12121266',
            '--overlay-color--end': 'rgba(18, 18, 18, 0)',
            '--overlay-direction': 'to bottom',
          } as React.CSSProperties}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12"
        >
          {/* Minimal badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block"
          >
            <span className="px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-xs font-medium text-white/60 tracking-widest uppercase">
              LYTE
            </span>
          </motion.div>

          {/* Editorial serif headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif leading-[0.95] tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="block text-white">Engineered for</span>
            <span className="block mt-2 text-white">Human Potential.</span>
          </motion.h1>

          {/* Clean subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Precision in every moment. Data that moves you.
          </motion.p>

          {/* Apple-style minimal CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              href="#devices"
              className="group relative px-10 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide">
                Start with LYTE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="#features"
              className="px-10 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:bg-white/5 hover:scale-[1.02] text-sm tracking-wide"
            >
              Unlock Your Performance
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Ultra-minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
