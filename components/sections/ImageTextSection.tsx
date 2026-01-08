import Image from 'next/image'

export default function ImageTextSection() {
  return (
    <section className="pt-0 pb-0 m-0 bg-white min-h-[89vh] md:h-[89vh]">
      <div className="max-w-7xl ml-0 pr-0 md:pr-4 lg:pr-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch h-full">
          {/* Image Side */}
          <div className="relative w-full h-[50vh] md:h-full overflow-hidden">
            <Image
              src="/WhatsApp Image 2026-01-08 at 11.09.54.jpeg"
              alt="LEAN-X Ingredient"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-start items-center text-center p-8 lg:p-12 space-y-6 md:space-y-8 pt-12 md:pt-16 lg:pt-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight w-full">
              LEAN-X<sup className="text-lg">®️</sup>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-700 tracking-tight leading-snug">
              A New Class of Metabolic Intelligence
            </p>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
              LEAN-X<sup className="text-sm">®️</sup> is not an ingredient.
              It is a breakthrough architecture — engineered at the intersection of metabolic science, neuro-energy regulation, and gut intelligence.
              Built on years of clinical research and advanced formulation science, LEAN-X<sup className="text-sm">®️</sup> represents a category-defining evolution in weight and energy management—one that has never existed before.
            </p>
            <div className="pt-2 md:pt-4">
              <a
                href="/science"
                className="inline-block border-2 border-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Learn the Science
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

