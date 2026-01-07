'use client'

import Image from 'next/image'

const features = [
  {
    icon: '/icons/nogmo-2.png',
    title: 'Mobilises Fat',
    description: 'Supports the body’s natural fat-utilisation pathways',
    position: 'left-top',
  },
  {
    icon: '/icons/eng-ico.png',
    title: 'Controls Hunger',
    description: 'Helps you feel satisfied, longer.',
    position: 'left-middle',
  },
  {
    icon: '/icons/vegan-2.png',
    title: 'Improves Energy Levels',
    description: 'Clean support for mental and physical clarity.',
    position: 'left-bottom',
  },
  {
    icon: '/icons/quality.png',
    title: 'Reduces Caloric Intake',
    description: "Encourages mindful eating through better fullness.",
    position: 'right-top',
  },
  {
    icon: '/icons/lab.png',
    title: 'Pre-Biotic',
    description: 'Encourages mindful eating through better fullness.',
    position: 'right-middle',
  },
  {
    icon: '/icons/nometal-2.png',
    title: 'Pro-Biotic',
    description: 'Supports a balanced and resilient gut ecosystem.',
    position: 'right-bottom',
  },
]

export default function VideoSection() {
  const leftFeatures = features.filter(f => f.position.startsWith('left'))
  const rightFeatures = features.filter(f => f.position.startsWith('right'))

  return (
    <section className="w-full bg-fyber-ivory-dream py-10 md:py-14 lg:py-16">
      {/* Section Title */}
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold tracking-wider uppercase mb-8 md:mb-12 px-4">
        SCIENCE MEETS EVERYDAY CONTROL
      </h2>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-3 items-center">
          {/* Left Features */}
          <div className="flex flex-col gap-6 md:gap-8">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="text-center lg:text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold tracking-wider uppercase mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 max-w-[200px] mx-auto leading-tight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Video */}
          <div className="relative flex items-center justify-center order-first lg:order-none">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/f087c0f71002463594892e68000dfe75.HD-720p-4.5Mbps-40573155.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-6 md:gap-8">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="text-center lg:text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-semibold tracking-wider uppercase mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 max-w-[200px] mx-auto leading-tight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

