import Image from 'next/image'

export default function EnergyResetSection() {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-screen">
        <Image
          src="/Web-4.svg"
          alt="7-Day Energy Reset Journey"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  )
}

