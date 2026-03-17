'use client'

import Image from 'next/image'

const pressLogos = [
  {
    src: '/news_logo/Republic_idhIB8eof8_0.png',
    alt: 'Republic TV logo',
  },
  {
    src: '/news_logo/id8MTKItTI_logos.png',
    alt: 'Outlook logo',
  },
  {
    src: '/news_logo/business-standard-logo-2.png',
    alt: 'Business Standard logo',
  },
  {
    src: '/news_logo/WhatsApp_Image_2026-03-17_at_13.25.21-removebg-preview.png',
    alt: 'Mid-Day logo',
  },
  {
    src: '/news_logo/Logo_Asian_News_International.svg',
    alt: 'ANI logo',
  },
  {
    src: '/news_logo/WhatsApp_Image_2026-03-17_at_13.25.20-removebg-preview.png',
    alt: 'ABP logo',
  },
  {
    src: '/news_logo/WhatsApp_Image_2026-03-17_at_13.25.21__1_-removebg-preview.png',
    alt: 'Outlook logo alt',
  },
  {
    src: '/news_logo/d789e0f5-4634-431b-89ca-ce43cf6a9710_1080x1080.jpg',
    alt: 'The Quint logo',
  },
]

export default function PressMarqueeSection() {

  return (
    <section className="w-full bg-[#F5F3EF] py-6 md:py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#102333]/70 mb-4 md:mb-6">
          Featured on
        </p>
        <div className="overflow-hidden">
          <div className="flex items-center gap-10 md:gap-16 lg:gap-20 animate-marquee-brands whitespace-nowrap">
            {[...Array(3)].map((_, loopIndex) => (
              <div
                key={loopIndex}
                className="flex items-center gap-10 md:gap-16 lg:gap-20 flex-shrink-0"
              >
                {pressLogos.map((logo, index) => {
                  const isRepublic = logo.src === '/news_logo/Republic_idhIB8eof8_0.png'
                  const imageClassName = isRepublic
                    ? 'h-[60%] md:h-[65%] lg:h-[70%] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity'
                    : 'h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity'

                  return (
                  <div
                    key={`${loopIndex}-${index}`}
                    className="h-8 md:h-10 lg:h-12 w-auto flex items-center"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={48}
                      className={imageClassName}
                    />
                  </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

