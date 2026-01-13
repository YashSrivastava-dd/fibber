'use client'

import React from 'react';
import { Brain, Sparkles, Heart } from 'lucide-react';
import { cravingsData } from '../../../data/mock';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const CravingsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white" id="science">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="inline-block text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
              Appetite Regulation
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-charcoal leading-[1.3] mb-8">
              {cravingsData.title}
            </h2>
            <p className="text-lg text-charcoal/70 leading-[1.8] mb-6">
              {cravingsData.subtitle}
            </p>
            <p className="text-base text-charcoal/60 leading-[1.9] mb-10">
              {cravingsData.description}
            </p>
            
            <ul className="space-y-4">
              {cravingsData.points.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-charcoal/70">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Illustration */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative bg-gradient-to-br from-amber-50/50 to-green-50/50 rounded-3xl p-12 lg:p-16">
              {/* Gut to Brain Pathway Illustration */}
              <div className="flex flex-col items-center space-y-8">
                {/* Brain */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center">
                    <Brain className="w-12 h-12 text-charcoal/70" />
                  </div>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium text-charcoal/50 bg-white px-2 py-1 rounded-full shadow-sm">
                      Satiety Signals
                    </span>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="flex flex-col items-center">
                  <div className="w-px h-8 bg-gradient-to-b from-amber-200 to-green-200" />
                  <div className="px-3 py-1.5 bg-white rounded-full shadow-sm border border-amber-100">
                    <span className="text-xs font-medium text-amber-700">SCFAs</span>
                  </div>
                  <div className="w-px h-8 bg-gradient-to-b from-green-200 to-blue-200" />
                </div>

                {/* Microbiome */}
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full shadow-sm flex items-center justify-center">
                    <div className="relative">
                      <Heart className="w-14 h-14 text-green-500/70" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-pulse" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-75" />
                      <div className="absolute top-1/2 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-charcoal/50 whitespace-nowrap">
                    Gut Microbiome
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CravingsSection;
