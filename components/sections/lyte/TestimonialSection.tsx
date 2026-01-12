'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Alex Morgan',
    role: 'Professional Athlete',
    quote: 'LYTE transformed how I understand my body. The insights are game-changing.',
    image: '/ritual/image.jpeg',
  },
  {
    name: 'Jordan Lee',
    role: 'Elite Coach',
    quote: 'The most comprehensive health monitoring system I\'ve used. Precision meets performance.',
    image: '/ritual/Generate_image_in_2k_202601121203 (2).jpg',
  },
  {
    name: 'Sam Taylor',
    role: 'Olympic Runner',
    quote: 'Data-driven decisions. That\'s what LYTE gives you. Every metric matters.',
    image: '/ritual/Make_this_image_2k_202601091748.jpeg',
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-8 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="block text-white">Trusted by</span>
            <span className="block text-white mt-2">elite performers.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className="mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-300 font-light leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-white font-medium mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
