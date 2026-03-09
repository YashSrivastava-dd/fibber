'use client'

import Image from 'next/image'

const DESKTOP_IMAGE = '/hf_20260309_074427_78be0f7d-1033-4d8c-b79f-c59e967ab26f.jpeg'
const MOBILE_IMAGE = '/ritual/image.jpeg'

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100svh' }}
    >

      {/* ── Mobile image ── */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 translate-y-[8%]">
          <Image
            src={MOBILE_IMAGE}
            alt="Fyber wellness"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* ── Desktop image ── */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={DESKTOP_IMAGE}
          alt="Fyber wellness"
          fill
          className="object-cover"
          style={{ objectPosition: 'right center' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      </div>

      {/* ── Text overlay ── */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 lg:px-20 pb-14 sm:pb-20 max-w-2xl">
        <p className="text-[10px] sm:text-sm uppercase tracking-widest mb-3 font-medium text-white/80 md:text-gray-500">
          SCIENCE BACKED | NATURAL WEIGHT-MANAGEMENT SOLUTION
        </p>
        <h1 className="font-bold tracking-tight mb-6 text-white md:text-gray-900">
          <span className="block text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-tight whitespace-nowrap">
            CONTROL CRAVINGS.
          </span>
          <span className="block mt-3 text-[1.65rem] sm:text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
            MANAGE WEIGHT.
          </span>
        </h1>
        <p className="text-sm sm:text-base leading-relaxed max-w-sm text-white/70 md:text-gray-500">
          A smarter, science-backed approach to appetite control and sustainable weight management.
        </p>
      </div>

    </section>
  )
}
