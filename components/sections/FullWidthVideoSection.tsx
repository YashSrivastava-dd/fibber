'use client'

export default function FullWidthVideoSection() {
  return (
    <section className="w-full m-0 p-0">
      <div className="relative w-full h-screen md:h-screen aspect-[9/16] md:aspect-[21/9]">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/sustainable-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Content */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-8 md:mb-10 lg:mb-12 tracking-tight">
          Natural Origins , Scientific Discipline
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-white/90 tracking-[0.2em] uppercase mb-8 md:mb-10 leading-[1.8] md:leading-[2]">
          Exceptionally sourced natural ingredients, <br />  elevated through science to meet the highest standards.          </p>
          <a
            href="/mission"
            className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
          >
            OUR MISSION 
          </a>
        </div>
      </div>
    </section>
  )
}

