import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroData } from '../../../data/mock';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-50/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-50/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">
              {heroData.tagline}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-light text-charcoal leading-tight mb-8 animate-fade-in-up">
            Unlock Your Body's{' '}
            <span className="font-medium bg-gradient-to-r from-amber-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              Natural Potential
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-charcoal/60 leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
            {heroData.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <button className="group px-8 py-4 bg-charcoal text-white text-sm font-medium rounded-none hover:bg-charcoal/90 transition-all duration-200 flex items-center gap-2">
              {heroData.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-charcoal/20 text-charcoal text-sm font-medium rounded-none hover:border-charcoal/40 hover:bg-charcoal/5 transition-all duration-200">
              Learn the Science
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-6">
              Trusted by health-conscious individuals
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <span className="block text-2xl font-medium text-charcoal">50k+</span>
                <span className="text-sm text-charcoal/50">Happy Customers</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="text-center">
                <span className="block text-2xl font-medium text-charcoal">4.9</span>
                <span className="text-sm text-charcoal/50">Average Rating</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200" />
              <div className="text-center">
                <span className="block text-2xl font-medium text-charcoal">12+</span>
                <span className="text-sm text-charcoal/50">Clinical Studies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-charcoal/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-charcoal/40 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
