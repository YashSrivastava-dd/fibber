import Image from 'next/image'

export default function EnergyResetSection() {
  return (
    <section className="w-full bg-white m-0 p-0">
      <div className="relative w-full h-screen">
        {/* Desktop Image */}
        <Image
          src="/Web 3.png"
          alt="7-Day Energy Reset Journey"
          fill
          className="object-contain hidden md:block"
          priority
        />
        {/* Mobile Image */}
        <Image
          src="/Mobile-1 2.png"
          alt="7-Day Energy Reset Journey"
          fill
          className="object-contain block md:hidden"
          priority
        />
      </div>
    </section>
  )
}
