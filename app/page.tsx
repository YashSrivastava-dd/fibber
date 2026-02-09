import HeroSection from '@/components/sections/HeroSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import ReelsSection from '@/components/sections/ReelsSection'
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

export default function Home() {
  return (
    <div className="w-full">
      {/* Homepage Sections */}
      <HeroSection />
      <FeaturedProductsSection />
      <MeditationImageSection />
      <VideoSection />
      {/* <ProductShowcaseSection /> */}
      <ReelsSection />
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

