'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function RitualSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ritual-line-1 {
          animation: fadeInUp 0.8s ease-out 0s both;
        }
        .ritual-line-2 {
          animation: fadeInUp 0.8s ease-out 1s both;
        }
        .ritual-line-3 {
          animation: fadeInUp 0.8s ease-out 2s both;
        }
        .ritual-line-4 {
          animation: fadeInUp 0.8s ease-out 3s both;
        }
      `}} />
      <section 
        ref={sectionRef}
        className="w-full m-0 p-0 bg-white min-h-screen flex items-end md:items-start justify-center relative pb-8 md:pb-0 md:pt-12 lg:pt-16 xl:pt-20"
      >
        {/* Background Image - Mobile */}
        <div className="absolute inset-0 w-full h-full md:hidden">
          <Image
            src="/Generate_image_in_2k_202601121203 (1).jpg"
            alt="Ritual"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Background Image - Desktop */}
        <div className="absolute inset-0 w-full h-full hidden md:block">
          <Image
            src="/ritual/Generate_image_in_2k_202601121203 (2).jpg"
            alt="Ritual"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Text Content - Right Side */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pb-4 md:pb-0">
          <div className="flex justify-center md:justify-end w-full h-full">
            <div className="flex flex-col items-center md:items-start space-y-[2.7rem] md:space-y-[3.6rem] lg:space-y-[4.5rem] xl:space-y-[5.4rem] px-4 md:px-0 md:ml-auto md:pl-12 lg:pl-16 xl:pl-20 md:pr-12 lg:pr-16 xl:pr-20 w-full md:w-auto md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
              <h1 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight text-center md:text-left text-white ${isVisible ? 'ritual-line-1' : 'opacity-0'}`}>
                One Sachet 
              </h1>
              <h2 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight text-center md:text-left text-white ${isVisible ? 'ritual-line-2' : 'opacity-0'}`}>
                Glass of Water
              </h2>
              <h3 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight text-center md:text-left text-white ${isVisible ? 'ritual-line-3' : 'opacity-0'}`}>
                Once a Day
              </h3>
              <h4 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium tracking-tight text-center md:text-left text-white ${isVisible ? 'ritual-line-4' : 'opacity-0'}`}>
                A New You
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
