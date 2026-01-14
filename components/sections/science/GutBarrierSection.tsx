'use client'

import React from 'react';
import { Shield, Lock, Layers } from 'lucide-react';
import { gutBarrierData } from '../../../data/mock';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const GutBarrierSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-gradient-to-b from-green-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Illustration */}
          <div className={`order-2 lg:order-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
              {/* Gut Barrier Visualization */}
              <div className="relative h-64 flex items-center justify-center">
                {/* Barrier Layers */}
                <div className="relative w-full max-w-xs">
                  {/* Top Layer - Protected Zone */}
                  <div className="h-16 bg-gradient-to-b from-green-50 to-green-100/50 rounded-t-2xl flex items-center justify-center border-b-2 border-dashed border-green-200">
                    <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Protected Zone</span>
                  </div>
                  
                  {/* Tight Junctions */}
                  <div className="relative h-12 bg-gradient-to-r from-blue-100 via-green-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex justify-between px-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <Lock className="w-4 h-4 text-green-500" />
                          <div className="w-0.5 h-full bg-green-300" />
                        </div>
                      ))}
                    </div>
                    <span className="relative z-10 text-xs font-medium text-charcoal/70 bg-white/80 px-3 py-1 rounded-full">
                      Tight Junctions
                    </span>
                  </div>

                  {/* Bottom Layer - Gut Lining */}
                  <div className="h-16 bg-gradient-to-b from-amber-50 to-amber-100/50 rounded-b-2xl flex items-center justify-center">
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Gut Lining</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Layers className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="text-xs text-charcoal/50">Nutrients In</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-300 rounded-full" />
                  <span className="text-xs text-charcoal/50">Toxins Blocked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
              Intestinal Health
            </span>
            <h2 className="text-4xl lg:text-5xl font-light text-charcoal leading-[1.3] mb-8">
              {gutBarrierData.title}
            </h2>
            <p className="text-lg text-charcoal/70 leading-[1.8] mb-6">
              {gutBarrierData.subtitle}
            </p>
            <p className="text-base text-charcoal/60 leading-[1.9] mb-10">
              {gutBarrierData.description}
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: 'Blocks toxins', color: 'text-green-500 bg-green-50' },
                { icon: Lock, label: 'Seals junctions', color: 'text-blue-500 bg-blue-50' },
                { icon: Layers, label: 'Supports lining', color: 'text-amber-500 bg-amber-50' },
                { icon: Shield, label: 'Allows nutrients', color: 'text-green-500 bg-green-50' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color.split(' ')[1]}`}>
                    <item.icon className={`w-4 h-4 ${item.color.split(' ')[0]}`} />
                  </div>
                  <span className="text-sm text-charcoal/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutBarrierSection;
