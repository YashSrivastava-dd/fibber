'use client'

import Image from 'next/image'

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
          style={{ objectPosition: 'center 10%' }}
        >
          <source src="/videos/prmv.webm" type="video/webm" />
        </video>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <p className="text-sm md:text-base uppercase tracking-wider mb-3 text-white/80">
            SCIENCE BACKED | NATURAL WEIGHT-MANAGEMENT SOLUTION
        </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
            <span className="block whitespace-nowrap mb-2">CONTROL CRAVINGS</span>
            <span className="block whitespace-nowrap">MANAGE WEIGHT</span>
          </h1>
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden md:block relative md:w-1/2 h-screen bg-[#e8e4dd]">
        <Image
          src="/ritual/image.jpeg"
          alt="Wellness lifestyle"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          priority
        />
      </div>
    </section>
  )
}
