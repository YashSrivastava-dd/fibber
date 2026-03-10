'use client'

import Image from 'next/image'

const DESKTOP_IMAGE = '/hf_20260309_074427_78be0f7d-1033-4d8c-b79f-c59e967ab26f.jpeg'
const MOBILE_IMAGE = '/Screenshot 2026-03-09 162742.jpg'

export default function HeroSection() {
  return (
    <>
      {/* ── MOBILE layout: full-screen image, then text below on scroll ── */}
      <section className="md:hidden w-full">
        {/* Full-screen image */}
        <div className="relative w-full overflow-hidden" style={{ height: '75svh' }}>
          <Image
            src={MOBILE_IMAGE}
            alt="Fyber wellness"
            fill
            className="object-cover"
            style={{ objectPosition: 'center top' }}
            priority
          />
        </div>

        {/* Text section — appears on scroll */}
        <div className="bg-white px-5 pt-8 pb-10">
          <p className="text-[12px] uppercase tracking-widest mb-3 font-medium text-[#1a1a1a]/60 whitespace-nowrap">
            SCIENCE BACKED NATURAL <br />
             WEIGHT-MANAGEMENT SOLUTION
          </p>
          <h1 className="font-bold tracking-tight mb-4 text-[#102333]">
            <span className="block text-[1.9rem] leading-tight whitespace-nowrap">
              CONTROL CRAVINGS
            </span>
            <span className="block mt-2 text-[1.9rem] leading-tight whitespace-nowrap">
              MANAGE WEIGHT
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-[#1a1a1a]/70">
            <span className="block">A smarter, science-backed approach to</span>
            <span className="block">appetite control and sustainable weight management.</span>
          </p>
        </div>
      </section>

      {/* ── DESKTOP layout: full-screen image with text overlay ── */}
      <section
        className="relative hidden md:block w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        <Image
          src={DESKTOP_IMAGE}
          alt="Fyber wellness"
          fill
          className="object-cover"
          style={{ objectPosition: 'right center' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />

        {/* Desktop text */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 lg:px-20 max-w-2xl">
          <p className="text-xs md:text-sm uppercase tracking-widest mb-3 font-medium text-gray-500 whitespace-nowrap">
            SCIENCE BACKED | NATURAL WEIGHT-MANAGEMENT SOLUTION
          </p>
          <h1 className="font-bold tracking-tight mb-6 text-gray-900">
            <span className="block text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
              CONTROL CRAVINGS
            </span>
            <span className="block mt-3 text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
              MANAGE WEIGHT
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-sm text-gray-500">
            <span className="block whitespace-nowrap">A smarter, science-backed approach to</span>
            <span className="block whitespace-nowrap">appetite control and sustainable weight management.</span>
          </p>
        </div>
      </section>
    </>
  )
}
