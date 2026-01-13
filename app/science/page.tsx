import ScienceHero from '@/components/sections/science/ScienceHero'
import CravingsSection from '@/components/sections/science/CravingsSection'
import GlucoseSection from '@/components/sections/science/GlucoseSection'
import MetabolismSection from '@/components/sections/science/MetabolismSection'
import SCFASection from '@/components/sections/science/SCFASection'
import PrebioticProbioticSection from '@/components/sections/science/PrebioticProbioticSection'
import GutBarrierSection from '@/components/sections/science/GutBarrierSection'
import BenefitsGrid from '@/components/sections/science/BenefitsGrid'
import CTASection from '@/components/sections/science/CTASection'

export default function SciencePage() {
  return (
    <div className="bg-white min-h-screen">
      <ScienceHero />
      <CravingsSection />
      <GlucoseSection />
      <MetabolismSection />
      <SCFASection />
      <PrebioticProbioticSection />
      <GutBarrierSection />
      <BenefitsGrid />
      <CTASection />
    </div>
  )
}
