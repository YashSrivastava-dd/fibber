import Image from 'next/image'

export default function ImageTextSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/wellness-background.jpg"
              alt="LEAN-X Ingredient"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Side */}
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-widest text-gray-500">Patent-Pending Formula</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">
              LEAN-X<sup className="text-lg">®</sup>
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              The primary functional ingredient behind the magic of Fyber®. 
              Our patent-pending formula delivers powerful benefits for your wellness journey.
            </p>
            <ul className="grid grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Mobilises Fat
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Controls Hunger
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Improves Energy Levels
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Reduces Caloric Intake
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Pre-Biotic
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Pro-Biotic
              </li>
            </ul>
            <div className="pt-4">
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

