'use client'

import { useState, useRef, useCallback } from 'react'
import { Play, Pause } from 'lucide-react'

interface Reel {
  id: string
  title: string
  videoUrl: string
}

// Reels data with actual videos
const mockReels: Reel[] = [
  {
    id: '1',
    title: 'Customer Testimonial',
    videoUrl: '/videos/1.webm',
  },
  {
    id: '2',
    title: 'Product Review',
    videoUrl: '/videos/2.webm',
  },
  {
    id: '3',
    title: 'Wellness Journey',
    videoUrl: '/videos/3.webm',
  },
  {
    id: '4',
    title: 'Daily Routine',
    videoUrl: '/videos/4.webm',
  },
  {
    id: '5',
    title: 'Success Story',
    videoUrl: '/videos/5.webm',
  },
  {
    id: '6',
    title: 'Real Recommendations',
    videoUrl: '/videos/6.webm',
  },
]

// Duplicate reels for seamless infinite marquee loop
const duplicatedReels = [...mockReels, ...mockReels]

export default function ReelsSection() {
  // Store refs for ALL video elements using unique keys (reel.id-index)
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const [playingVideoKey, setPlayingVideoKey] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Pause/resume animation on hover
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handleReelHover = useCallback((uniqueKey: string) => {
    // Play video on hover
    const video = videoRefs.current[uniqueKey]
    if (video && playingVideoKey !== uniqueKey) {
      // Pause all other videos
      Object.entries(videoRefs.current).forEach(([key, v]) => {
        if (v && key !== uniqueKey) {
          v.pause()
          v.currentTime = 0 // Reset to start
        }
      })
      // Reset video to start and play
      video.currentTime = 0
      video.play().catch(console.error)
      setPlayingVideoKey(uniqueKey)
    }
  }, [playingVideoKey])

  const handleReelLeave = useCallback((_uniqueKey: string) => {
    // Keep video playing when mouse leaves
  }, [])

  const handleReelClick = useCallback((uniqueKey: string) => {
    // Toggle video playback on click
    const video = videoRefs.current[uniqueKey]
    if (video) {
      if (playingVideoKey === uniqueKey) {
        // Pause if clicking the same video
        video.pause()
        setPlayingVideoKey(null)
      } else {
        // Pause all other videos
        Object.entries(videoRefs.current).forEach(([key, v]) => {
          if (v && key !== uniqueKey) {
            v.pause()
            v.currentTime = 0 // Reset to start
          }
        })
        // Play the clicked video
        video.play().catch(console.error)
        setPlayingVideoKey(uniqueKey)
      }
    }
  }, [playingVideoKey])

  // Reset video when it ends
  const handleVideoEnd = useCallback((uniqueKey: string) => {
    const video = videoRefs.current[uniqueKey]
    if (video) {
      video.currentTime = 0 // Reset to start for next play
    }
    setPlayingVideoKey(null)
  }, [])

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 pb-0 bg-fyber-ivory-dream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            Real Stores, Real Recommendations!
          </h2>
        </div>

        {/* Infinite Marquee Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* CSS-based infinite scrolling marquee */}
          <div 
            className="flex gap-4 md:gap-6 animate-marquee"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {duplicatedReels.map((reel, index) => {
              // Use unique key for each video element (including duplicates)
              const uniqueKey = `${reel.id}-${index}`
              
              return (
                <div
                  key={uniqueKey}
                  className="flex-shrink-0 group cursor-pointer"
                  onMouseEnter={() => handleReelHover(uniqueKey)}
                  onMouseLeave={() => handleReelLeave(uniqueKey)}
                  onClick={() => handleReelClick(uniqueKey)}
                >
                  {/* 9:16 Aspect Ratio Container */}
                  <div 
                    className="relative aspect-[9/16] bg-gray-100 rounded-3xl overflow-hidden shadow-lg w-[200px] md:w-[240px] lg:w-[280px] transition-all duration-300 ease-out origin-center"
                    style={{
                      transform: 'scaleY(1)',
                      transition: 'transform 300ms ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scaleY(1.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scaleY(1)'
                    }}
                  >
                    {/* Video Element */}
                    <div className="absolute inset-0 bg-gray-200">
                      <video
                        ref={(el) => {
                          // Store ref for ALL video elements using unique key
                          videoRefs.current[uniqueKey] = el
                        }}
                        src={reel.videoUrl}
                        className="w-full h-full object-cover"
                        loop={false}
                        muted
                        playsInline
                        preload="auto"
                        onEnded={() => handleVideoEnd(uniqueKey)}
                        onLoadedData={(e) => {
                          // Seek to first frame to show video thumbnail
                          const video = e.target as HTMLVideoElement
                          if (video.currentTime === 0) {
                            video.currentTime = 0.1
                          }
                        }}
                      onError={(e) => {
                          // Hide video element if it fails to load
                          const target = e.target as HTMLVideoElement
                          target.style.display = 'none'
                      }}
                    />
                      {/* Gradient Overlay - only show when not playing */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-200 ease-out rounded-3xl ${
                          playingVideoKey === uniqueKey ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                  </div>

                    {/* Play/Pause Button */}
                    {playingVideoKey !== uniqueKey && (
                      <div className="absolute top-3 left-3 pointer-events-none z-10">
                    <div 
                          className="bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg p-2 md:p-2.5 group-hover:bg-white/30 transition-all duration-200 ease-out"
                    >
                      <Play 
                            className="text-white ml-0.5 drop-shadow-lg w-4 h-4 md:w-5 md:h-5" 
                            fill="currentColor" 
                          />
                        </div>
                      </div>
                    )}

                    {/* Pause Button Overlay - show when playing */}
                    {playingVideoKey === uniqueKey && (
                      <div className="absolute top-3 left-3 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div 
                          className="bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg p-2 md:p-2.5"
                        >
                          <Pause 
                            className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-lg" 
                        fill="currentColor" 
                      />
                    </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        </div>

      {/* Happy Customers Marquee - Stuck to bottom */}
      <div className="mt-8 md:mt-12 overflow-hidden bg-fyber-ivory-dream">
        <div className="py-4 md:py-5">
          <div className="animate-marquee-text whitespace-nowrap flex">
            {/* Repeat text multiple times for seamless loop */}
            {[...Array(20)].map((_, i) => (
              <span 
                key={i} 
                className="text-sm md:text-base font-medium tracking-widest text-gray-800 uppercase mx-6 md:mx-10 flex-shrink-0"
              >
                +10000 HAPPY CUSTOMERS
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
