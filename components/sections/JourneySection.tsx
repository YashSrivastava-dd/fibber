import Image from 'next/image'

export default function RitualSection() {
  return (
    <section className="w-full bg-white pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24 lg:pb-32 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Heading - Left Aligned */}
        <div className="mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-[#868B7A] leading-relaxed max-w-5xl">
            <span className="block">Noticeable results in 30 minutes</span>
            <span className="block mt-4 md:mt-6">Refined body in 90 days</span>
          </h2>
        </div>



        {/* Content Container */}
        <div className="relative mt-12 md:mt-16 lg:mt-20 xl:mt-24">
          {/* 1st Section - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-8 md:mb-12 lg:mb-16 xl:mb-20 items-center">
            {/* Text Left */}
            <div className="max-w-lg ml-4 md:ml-6 lg:ml-8">
              {/* Small Heading */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#868B7A]">
                  Controls Cravings
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 opacity-70 leading-relaxed">
                FYBER activates the body’s natural GLP-1 pathways, promoting satiety within just 30 minutes of intake. As fullness sets in, hunger signals quieten, emotional eating fades, and cravings lose their intensity. Rather than forcing control, FYBER restores balance—allowing appetite regulation to feel calm, intuitive, and effortless, supporting mindful choices and sustainable weight management as part of a refined daily wellness ritual.
              </p>
            </div>

            {/* Images Right - Side by Side */}
            <div className="flex flex-row w-full md:w-4/5 lg:w-full lg:ml-auto">
              {/* Smaller image on left */}
              <div className="relative w-2/5 h-[240px] md:h-[300px] lg:h-[360px]">
                <Image
                  src="/dummy/Group 64930.png"
                  alt="Wellness product"
                  fill
                  className="object-cover object-center rounded-sm"
                  sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
                />
              </div>
              {/* Larger image on right with text below */}
              <div className="flex flex-col flex-1">
                <div className="relative w-full h-[240px] md:h-[300px] lg:h-[360px]">
                  <Image
                    src="/ritual/Soft Tones Visual Minimalist Dessert Inspiration.jpg"
                    alt="Product dropper"
                    fill
                    className="object-cover object-center rounded-lg"
                    sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 24vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Section - Images Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-0 mt-8 md:mt-12 lg:mt-16 items-center">
            {/* Images Left - Side by Side */}
            <div className="flex flex-row w-full -ml-8 sm:-ml-12 lg:-ml-16 pl-8 md:pl-12 lg:pl-16">
              {/* Larger image on left */}
              <div className="relative flex-1 h-[240px] md:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden">
                <Image
                  src="/ritual/Modern Aesthetic AI Stock Photos for Your Brand.jpg"
                  alt="Wellness fitness"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 24vw"
                />
              </div>
              {/* Smaller image on right */}
              <div className="relative w-2/5 h-[240px] md:h-[300px] lg:h-[360px]">
                <Image
                  src="/ritual/Group 64931.png"
                  alt="Wellness product"
                  fill
                  className="object-contain object-center rounded-lg"
                  sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="max-w-lg ml-4 md:ml-6 lg:ml-8">
              {/* Small Heading */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#868B7A]">
                  BYE - BYE BLOATING
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 opacity-70 leading-relaxed">
                FYBER helps recalibrate your gut, restoring digestive harmony from within. Bloating and inflammation gradually subside, allowing your body to feel lighter and more at ease. Mornings begin with a sense of clarity and lightness, while steady energy carries you through the day. The result is a refined digestive balance that enhances comfort, vitality, and everyday well-being—without disruption or strain.              </p>
            </div>
          </div>

          <div className="relative mt-8 md:mt-12 lg:mt-16">
            {/* 1st Section - Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-0 items-center">
              {/* Text Left */}
              <div className="max-w-lg ml-4 md:ml-6 lg:ml-8">
                {/* Small Heading */}
                <div className="mb-4 md:mb-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#868B7A]">
                    Weight Releases
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 opacity-70 leading-relaxed">
                  FYBER initiates steady, measurable weight loss as the body begins to release excess weight naturally. Hunger is better regulated, portions feel effortless, and visible changes start to appear in how your clothes fit and how you move. This is weight loss without struggle—consistent, controlled, and sustainable—driven by a daily ritual that reshapes your body with quiet precision and lasting elegance.              </p>
              </div>

              {/* Images Right - Side by Side */}
              <div className="flex flex-row w-full md:w-4/5 lg:w-full lg:ml-auto">
                {/* Smaller image on left */}
                <div className="relative w-2/5 h-[240px] md:h-[300px] lg:h-[360px]">
                  <Image
                    src="/ritual/Group 64929.png"
                    alt="Wellness product"
                    fill
                    className="object-cover object-center rounded-sm"
                    sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
                  />
                </div>
                {/* Larger image on right with text below */}
                <div className="flex flex-col flex-1">
                  <div className="relative w-full h-[240px] md:h-[300px] lg:h-[360px]">
                    <Image
                      src="/ritual/Make_this_image_2k_202601091748.jpeg"
                      alt="Product dropper"
                      fill
                      className="object-cover object-center rounded-lg"
                      sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 24vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
                  {/* 3rd Section - Images Left, Text Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-0 mt-8 md:mt-12 lg:mt-16 items-center">
            {/* Images Left - Side by Side */}
            <div className="flex flex-row w-full -ml-8 sm:-ml-12 lg:-ml-16 pl-8 md:pl-12 lg:pl-16">
              {/* Larger image on left */}
              <div className="relative w-full h-[240px] md:h-[300px] lg:h-[360px]">
                <Image
                  src="/ritual/Make_the_man_2k_202601120957.jpeg"
                  alt="Wellness fitness"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 60vw, (max-width: 1024px) 30vw, 24vw"
                />
              </div>
              {/* Smaller image on right */}
              <div className="relative w-2/5 h-[240px] md:h-[300px] lg:h-[360px]">
                <Image
                  src="/ritual/Group 64928.png"
                  alt="Wellness product"
                  fill
                  className="object-contain object-center rounded-lg"
                  sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 16vw"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="max-w-lg ml-4 md:ml-6 lg:ml-8">
              {/* Small Heading */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-medium text-[#868B7A]">
                Body, Reimagined
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 opacity-70 leading-relaxed">
              This is the moment you realise you’ve truly arrived. Your body reflects a major milestone—leaner, defined, and unmistakably transformed. What once felt distant is now achieved, visible, and deeply satisfying. The effort fades into pride as you recognise the discipline, consistency, and commitment that brought you here. This is not just transformation; it is completion—a refined sense of accomplishment where you know you’ve made it, and the world can see it too.              </p>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}
