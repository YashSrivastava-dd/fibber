'use client'

import React from 'react';
import { Leaf, Shield, Check } from 'lucide-react';
import { prebioticProbioticData } from '../../../data/mock';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const PrebioticProbioticSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
            Synbiotic Formula
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-charcoal leading-[1.3] mb-8">
            Prebiotic + Probiotic Power
          </h2>
          <p className="text-lg text-charcoal/70 leading-[1.8]">
            The perfect combination for complete gut health support
          </p>
        </div>

        {/* Two Column Cards */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Prebiotic Card */}
          <div className="group relative bg-gradient-to-br from-green-50/80 to-amber-50/40 rounded-3xl p-8 lg:p-10 border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-8 h-8 text-green-500" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium text-charcoal mb-2">
                {prebioticProbioticData.prebiotic.title}
              </h3>
              <p className="text-sm font-medium text-green-600 mb-4">
                {prebioticProbioticData.prebiotic.subtitle}
              </p>

              {/* Description */}
              <p className="text-base text-charcoal/60 leading-[1.9] mb-8">
                {prebioticProbioticData.prebiotic.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {prebioticProbioticData.prebiotic.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-sm text-charcoal/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Visual Element */}
              <div className="mt-8 pt-6 border-t border-green-100/50">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-green-300 to-green-400 border-2 border-white"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal/50 ml-2">Feeds beneficial bacteria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Probiotic Card */}
          <div className="group relative bg-gradient-to-br from-blue-50/80 to-green-50/40 rounded-3xl p-8 lg:p-10 border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium text-charcoal mb-2">
                {prebioticProbioticData.probiotic.title}
              </h3>
              <p className="text-sm font-medium text-blue-600 mb-4">
                {prebioticProbioticData.probiotic.subtitle}
              </p>

              {/* Description */}
              <p className="text-base text-charcoal/60 leading-[1.9] mb-8">
                {prebioticProbioticData.probiotic.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {prebioticProbioticData.probiotic.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span className="text-sm text-charcoal/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Visual Element */}
              <div className="mt-8 pt-6 border-t border-blue-100/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-charcoal/50">Clinically validated strains</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrebioticProbioticSection;
