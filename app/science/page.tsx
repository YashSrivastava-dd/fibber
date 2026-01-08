import VideoSection from '@/components/sections/VideoSection'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Yash Srivastava',
    role: 'Software Development Engineer - 2 ',
    image: '/team-photos/team-1.jpeg',
  },
  {
    name: 'SALIM RAZA',
    role: 'Software Development Engineer - 1 ',
    image: '/team-photos/team-2.jpeg',
  },
  {
    name: 'NADEEM AKHTAR',
    role: 'Tech Lead',
    image: '/team-photos/team-3-new.png',
  },
  {
    name: 'UMAR AREEB',
    role: 'AI Prompt Engineer   ',
    image: '/team-photos/team-4.jpeg',
  },
]

export default function SciencePage() {
  return (
    <div className="w-full">
      {/* Hero Video Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/science-hero.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm md:text-base text-white/80 tracking-[0.3em] uppercase mb-4">
            The Science Behind Fiberise
          </p>
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
          >
            Backed by Research,<br />Driven by Results
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl">
            Discover the innovative science and premium ingredients that make our supplements effective.
          </p>
        </div>
      </section>

      {/* Video Section with Features */}
      <VideoSection />

      {/* CEO Letter Video Section */}
      <section className="relative w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        >
          <source src="/videos/sustainable-video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <p className="text-sm md:text-base text-white/70 tracking-[0.3em] uppercase mb-6">
            Letter from CEO
          </p>
          <h2 
            className="text-xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed max-w-5xl"
            style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
          >
            &ldquo;WELLNESS INC. ENVISIONS A FUTURE WHERE BIOLOGY AND TECHNOLOGY UNITE, UNLOCKING NEW POSSIBILITIES AND REDEFINING INNOVATION.&rdquo;
          </h2>
        </div>
      </section>

      {/* Meet Our Team Marquee */}
      <section className="w-full bg-[#F5F3EF] pt-12 md:pt-16 pb-4 md:pb-6 overflow-hidden">
        <div className="flex animate-marquee-text whitespace-nowrap">
          {[...Array(20)].map((_, i) => (
            <span 
              key={i} 
              className="text-lg md:text-xl lg:text-2xl font-bold text-black mx-6 md:mx-10 tracking-wider flex-shrink-0"
              style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
            >
              MEET OUR PERFECT TEAM
            </span>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-[#F5F3EF] py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 
                  className="text-base md:text-lg font-bold tracking-wider mb-2"
                  style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

