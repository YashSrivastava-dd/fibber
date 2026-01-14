'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-gradient-to-br from-amber-50/50 via-white to-green-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative bg-white rounded-3xl p-12 lg:p-20 shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="inline-block text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
              Start Your Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-charcoal leading-[1.3] mb-8">
              Ready to Transform Your Metabolic Health?
            </h2>
            <p className="text-lg text-charcoal/60 leading-[1.9] mb-12">
              Join thousands who have discovered the science-backed approach to sustainable wellness. 
              FYBER works with your body's natural systems for lasting results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button className="group px-8 py-4 bg-charcoal text-white text-sm font-medium rounded-none hover:bg-charcoal/90 transition-all duration-200 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-charcoal/20 text-charcoal text-sm font-medium rounded-none hover:border-charcoal/40 hover:bg-charcoal/5 transition-all duration-200">
                View Scientific Studies
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-charcoal/60">Clinically Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-charcoal/60">No Stimulants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-charcoal/60">30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
