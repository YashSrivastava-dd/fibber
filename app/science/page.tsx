import ScienceHero from '@/components/sections/science/ScienceHero'
import CravingsSection from '@/components/sections/science/CravingsSection'
import GlucoseSection from '@/components/sections/science/GlucoseSection'
import MetabolismSection from '@/components/sections/science/MetabolismSection'
import SCFASection from '@/components/sections/science/SCFASection'
import PrebioticProbioticSection from '@/components/sections/science/PrebioticProbioticSection'
import GutBarrierSection from '@/components/sections/science/GutBarrierSection'
import BenefitsGrid from '@/components/sections/science/BenefitsGrid'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import CTASection from '@/components/sections/science/CTASection'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Science Behind Weight Loss & Gut Health Supplements | Fiberise',
  description:
    'Explore the science behind weight management, gut health supplements & metabolism. Learn how fiber, microbiome & blood sugar control support smarter wellness.',
  keywords: 'Blood sugar control, Gut Health supplements',
}

export default function SciencePage() {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <ScienceHero />
      <CravingsSection />
      <GlucoseSection />
      <MetabolismSection />
      <SCFASection />
      <PrebioticProbioticSection />
      <GutBarrierSection />
      <BenefitsGrid />
      <FeaturedProductsSection />
      <CTASection />
    </div>
  )
}
