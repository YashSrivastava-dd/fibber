'use client'

import Image from 'next/image'

const doctors = [
  {
    name: 'Dr. Sarah Williams',
    specialty: 'Endocrinologist',
    description: 'Pioneered metabolic health protocols using data-driven insights for optimal patient outcomes.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Rajiv Mehta',
    specialty: 'Metabolic Specialist',
    description: 'Developed comprehensive weight management programs integrating continuous health monitoring.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Emily Chen',
    specialty: 'Wellness Physician',
    description: 'Advocated for preventive health strategies through personalized biometric tracking and analysis.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Michael Thompson',
    specialty: 'Preventive Medicine',
    description: 'Led research on early intervention techniques using real-time health data for disease prevention.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Integrative Health',
    description: 'Integrated holistic wellness approaches with precision health monitoring for comprehensive care.',
    image: 'https://images.unsplash.com/photo-1594824476966-48c8b964273f?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. James Anderson',
    specialty: 'Clinical Nutritionist',
    description: 'Designed evidence-based nutrition protocols enhanced by continuous metabolic tracking.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. Lisa Martinez',
    specialty: 'Functional Medicine',
    description: 'Transformed patient outcomes through personalized treatment plans based on 24/7 health insights.',
    image: 'https://images.unsplash.com/photo-1607990281513-1c032ebab161?w=400&h=400&fit=crop',
  },
  {
    name: 'Dr. David Kim',
    specialty: 'Hormone Specialist',
    description: 'Optimized hormone therapy protocols using advanced biometric monitoring and data analytics.',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
  },
]

export default function EnergyResetSection() {
  // Duplicate array for seamless loop
  const duplicatedDoctors = [...doctors, ...doctors]

  return (
    <section className="w-full bg-[#fafafa] py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#1a1a1a] mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Trusted by Doctors Worldwide
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Recommended by leading healthcare professionals and wellness experts.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

          {/* Marquee */}
          <div className="overflow-hidden w-full">
            <div className="animate-doctors-marquee flex gap-6 md:gap-8">
              {duplicatedDoctors.map((doctor, index) => (
                <div
                  key={`doctor-${index}`}
                  className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] group"
                >
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-[#1a1a1a] mb-1">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 font-light mb-3">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">{doctor.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
