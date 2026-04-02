import HeroSection from '@/components/sections/HeroSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import MeditationImageSection from '@/components/sections/MeditationImageSection'
import EnergyResetSection from '@/components/sections/EnergyResetSection'
import VideoSection from '@/components/sections/VideoSection'
import ProductShowcaseSection from '@/components/sections/ProductShowcaseSection'
import ImageTextSection from '@/components/sections/ImageTextSection'
import JourneySection from '@/components/sections/JourneySection'
import RitualSection from '@/components/sections/RitualSection'
import EmpoweringSection from '@/components/sections/EmpoweringSection'
import FullWidthVideoSection from '@/components/sections/FullWidthVideoSection'
import TestimonialCarouselSection from '@/components/sections/TestimonialCarouselSection'
import PressMarqueeSection from '@/components/sections/PressMarqueeSection'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fiber Supplement for Weight Loss | Fat Burner | Ozempic Alternative',
  description:
    "Smart health ecosystem powered by AI & innovation. Fiberise is India's science-backed fiber supplement for weight control. A natural fat burning supplement with prebiotic + probiotic support from trusted by doctors. No stimulants. Free shipping.",
  keywords:
    'ozempic, fat burner, fiber supplement, weight control supplements, weight lose supplement, fat burning supplements',
}

export default function Home() {
  return (
    <div className="w-full">
      {/* Homepage Sections */}
      <HeroSection />
      <FeaturedProductsSection />
      <PressMarqueeSection />
      <MeditationImageSection />
      <VideoSection />
      {/* <ProductShowcaseSection /> */}
      {/* <ReelsSection /> */}
      <ImageTextSection />
      <JourneySection />
      <RitualSection />
      <EnergyResetSection />
      <EmpoweringSection />
      <FullWidthVideoSection />
      <TestimonialCarouselSection />
    </div>
  )
}

