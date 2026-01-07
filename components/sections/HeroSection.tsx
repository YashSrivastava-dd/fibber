'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Video with Text Overlay */}
      <div className="relative w-full md:w-1/2 h-screen md:h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Untitled design.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <p className="text-sm md:text-base uppercase tracking-wider mb-3 text-white/80">
            The Future of Wellness
        </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
          GEAR UP FOR
          <br />
            GREAT
            <br />
            HEALTH
        </h1>
        <Link
          href="/collections/all"
            className="inline-block w-fit bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-medium uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors"
        >
            Check Now
        </Link>
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden md:block relative md:w-1/2 h-screen bg-[#e8e4dd]">
        <Image
          src="/Replace_the_girl_202601061238.jpg"
          alt="Wellness lifestyle"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  )
}
