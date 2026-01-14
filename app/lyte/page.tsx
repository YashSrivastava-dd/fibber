'use client'

import { useEffect, Suspense } from 'react'
import HeroSection from '@/components/sections/lyte/HeroSection'
import ProductShowcase from '@/components/sections/lyte/ProductShowcase'
import FeatureSection from '@/components/sections/lyte/FeatureSection'
import AppPreviewSection from '@/components/sections/lyte/AppPreviewSection'
import NutritionTrackingSection from '@/components/sections/lyte/NutritionTrackingSection'
import CalorieLeisureSection from '@/components/sections/lyte/CalorieLeisureSection'
import ComparisonSection from '@/components/sections/lyte/ComparisonSection'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="bg-red-900/20 border border-red-500 p-8 m-8 rounded-lg">
      <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
      <p className="text-red-300">{error.message}</p>
    </div>
  )
}

export default function LytePage() {
  useEffect(() => {
    console.log('LYTE Page: All components should render')
    
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')
      if (link) {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const id = href.slice(1)
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <ProductShowcase />
      <FeatureSection />
      <AppPreviewSection />
      <NutritionTrackingSection />
      <CalorieLeisureSection />
      <ComparisonSection />
    </div>
  )
}
