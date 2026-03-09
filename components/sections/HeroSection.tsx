'use client'

import Image from 'next/image'

const DESKTOP_IMAGE = '/hf_20260309_074427_78be0f7d-1033-4d8c-b79f-c59e967ab26f.jpeg'
const MOBILE_IMAGE = '/ritual/image.jpeg'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* ── Mobile image (dark, full-screen) ── */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={MOBILE_IMAGE}
          alt="Fyber wellness"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 75%' }}
          priority
        />
        {/* Gradient so white text reads cleanly — only bottom 50% */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* ── Desktop image (light, full-screen) ── */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={DESKTOP_IMAGE}
          alt="Fyber wellness"
          fill
          className="object-cover"
          style={{ objectPosition: 'right center' }}
          priority
        />
        {/* Subtle left-side fade so text on the white area has contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      </div>

      {/* ── Text overlay ── */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 lg:px-20 pb-16 sm:pb-20 max-w-2xl">
        {/* Mobile: white text on dark image */}
        {/* Desktop: dark text on light image */}
        <p className="text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium
                      text-white/80 md:text-gray-500">
          SCIENCE BACKED | NATURAL WEIGHT-MANAGEMENT SOLUTION
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight mb-4
                       text-white md:text-gray-900">
          CONTROL<br />CRAVINGS.<br />MANAGE<br />WEIGHT.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed max-w-sm
                      text-white/70 md:text-gray-500">
          A smarter, science-backed approach to appetite control and sustainable weight management.
        </p>
      </div>

    </section>
  )
}
