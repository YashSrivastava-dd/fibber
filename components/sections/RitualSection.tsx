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
        .editorial-text {
          position: absolute;
          right: 3%;
          top: 25%;
          transform: translateY(-50%);
          text-align: left;
          color: #6b4a3b;
          font-family: "Georgia", serif;
          width: 50%;
          max-width: 700px;
          padding-left: 40px;
        }
        .editorial-steps {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 32px;
          opacity: 0.7;
        }
        .editorial-steps .dot {
          width: 6px;
          height: 6px;
          background: #6b4a3b;
          border-radius: 50%;
        }
        .editorial-main-line {
          font-size: 96px;
          line-height: 1.05;
          letter-spacing: 4px;
          margin: 0;
          text-transform: uppercase;
        }
        .editorial-sub-text {
          margin-top: 32px;
          font-size: 18px;
          line-height: 1.8;
          max-width: 100%;
          opacity: 0.75;
        }
        /* MOBILE ONLY */
        @media (max-width: 768px) {
          .editorial-text {
            position: absolute;
            left: 3%;
            top: 75%;
            transform: translate(-50%, -50%);
            text-align: center;
            width: 100%;
            padding: 0 10px;
            color: #6b4a3b;
          }

          /* One sachet -- Glass of water -- Once a day */
          .editorial-text .steps {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            opacity: 0.7;
            margin-bottom: 14px;
            flex-wrap: wrap;
          }

          .editorial-text .steps span {
            white-space: nowrap;
          }

          .editorial-text .steps .dot {
            width: 4px;
            height: 4px;
            background: #6b4a3b;
            border-radius: 50%;
          }

          /* A NEW YOU */
          .editorial-text .main-line {
            font-size: 36px;
            line-height: 1.05;
            letter-spacing: 2px;
            font-weight: 500;
            margin: 0;
            text-transform: uppercase;
          }

          /* Simple ritual text */
          .editorial-text .sub-text {
            margin-top: 12px;
            font-size: 12px;
            line-height: 1.6;
            opacity: 0.75;
            max-width: 260px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}} />
      <section 
        ref={sectionRef}
        className="w-full m-0 p-0 bg-[#f6f2ec] min-h-screen flex items-end md:items-start justify-center relative pb-8 md:pb-0 overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Background Image - Mobile */}
        <div className="absolute inset-0 w-full h-full md:hidden overflow-hidden">
          <Image
            src="/8d9ad01c-a2c2-4bfd-85c8-1c879725eef7.png"
            alt="Ritual"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            style={{ objectPosition: 'center' }}
          />
        </div>
        
        {/* Background Image - Desktop */}
        <div className="absolute inset-0 w-full h-full hidden md:block">
          <Image
            src="/615cfbc1-5053-406e-9ca0-051cfb78e2a6.png"
            alt="Ritual"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Mobile Editorial Text - Same format as desktop */}
        <div className={`editorial-text md:hidden z-10 ${isVisible ? 'ritual-line-1' : 'opacity-0'}`}>
          <div className="steps">
            <span>One Sachet</span>
            <span className="dot"></span>
            <span>Glass of Water</span>
            <span className="dot"></span>
            <span>Once a Day</span>
          </div>

          <h1 className="main-line">
            A<br/>NEW<br/>YOU
          </h1>

          <p className="sub-text">
            Simple ritual. Powerful change.<br/>
            Let your body reset, naturally.
          </p>
        </div>

        {/* Desktop Editorial Text - Right Side */}
        <div className={`editorial-text hidden md:block z-10 ${isVisible ? 'ritual-line-1' : 'opacity-0'}`}>
          <div className="editorial-steps">
            <span>One Sachet</span>
            <span className="dot"></span>
            <span>Glass of Water</span>
            <span className="dot"></span>
            <span>Once a Day</span>
          </div>

          <h1 className="editorial-main-line">
            A<br/>NEW<br/>YOU
          </h1>

          <p className="editorial-sub-text">
            Simple ritual. Powerful change.<br/>
            Let your body reset, naturally.
          </p>
        </div>
      </section>
    </>
  )
}
