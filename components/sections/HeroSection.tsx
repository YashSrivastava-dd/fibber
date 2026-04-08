'use client'

import Image from 'next/image'

const DESKTOP_IMAGE = '/hf_20260310_113908_cf31733e-1ff2-4aa3-a9bb-c7759417104c.jpeg'
const MOBILE_IMAGE = '/hf_20260310_114430_afbe1b53-071a-400e-8206-aa625755a570.jpeg'

export default function HeroSection() {
  return (
    <>
      {/* ── MOBILE layout: full-screen image, then text below on scroll ── */}
      <section className="md:hidden w-full">
        {/* Full-screen image — anchored to top so upper part of image is visible */}
        <div className="relative w-full overflow-hidden" style={{ height: '65svh' }}>
          <Image
            src={MOBILE_IMAGE}
            alt="Fyber wellness"
            fill
            className="object-cover object-bottom"
            style={{ objectPosition: 'center 85%' }}
            priority
          />
        </div>

        {/* Text section — appears on scroll */}
        <div className="bg-white px-5 pt-8 pb-10">
          <p className="text-[12px] uppercase tracking-widest mb-3 font-medium text-[#1a1a1a]/80 whitespace-nowrap leading-loose">
            SCIENCE BACKED NATURAL <br />
             WEIGHT-MANAGEMENT SOLUTION
          </p>
          <h1 className="w-fit font-bold tracking-tight mb-4 bg-gradient-to-b from-[#cf9c31] to-[#9c6d16] bg-clip-text text-transparent drop-shadow-sm">
            <span className="block text-[1.9rem] leading-tight whitespace-nowrap">
              CONTROL CRAVINGS
            </span>
            <span className="block mt-2 text-[1.9rem] leading-tight whitespace-nowrap">
              MANAGE WEIGHT
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-[#1a1a1a]/80">
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
          <p className="text-xs md:text-sm uppercase tracking-widest mb-3 font-medium text-gray-800 whitespace-nowrap">
            SCIENCE BACKED | NATURAL WEIGHT-MANAGEMENT SOLUTION
          </p>
          <h1 className="w-fit font-bold tracking-tight mb-6 bg-gradient-to-b from-[#cf9c31] to-[#9c6d16] bg-clip-text text-transparent drop-shadow-sm">
            <span className="block text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
              CONTROL CRAVINGS
            </span>
            <span className="block mt-3 text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
              MANAGE WEIGHT
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-sm text-gray-600">
            <span className="block whitespace-nowrap">A smarter, science-backed approach to</span>
            <span className="block whitespace-nowrap">appetite control and sustainable weight management.</span>
          </p>
        </div>
      </section>
    </>
  )
}
