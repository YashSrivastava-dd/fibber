'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { getProductBadges } from '@/lib/product-badges'

interface Product {
  id: string
  title: string
  price: number
  maxPrice?: number | null
  image: string
  slug: string
  available: boolean
  servings?: string
  description?: string
  variants?: Array<{
    id: string
    name: string
    price: number
    available: boolean
  }>
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('FeaturedProductsSection: Fetching products...')
        const response = await fetch('/api/shopify/products?all=true')
        
        if (!response.ok) {
          console.error('FeaturedProductsSection: API response not OK:', response.status)
          throw new Error(`Failed to fetch products: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('FeaturedProductsSection: Raw API data:', data)
        
        if (data.products) {
          console.log('FeaturedProductsSection: Total products received:', data.products.length)
          console.log('FeaturedProductsSection: All products:', data.products.map((p: Product) => ({
            title: p.title,
            price: p.price,
            available: p.available,
            servings: p.servings,
            id: p.id
          })))
          
          // Show all products (remove availability filter to show all products)
          setProducts(data.products)
          console.log('FeaturedProductsSection: Displaying all products:', data.products.length)
        } else {
          console.error('FeaturedProductsSection: No products in response:', data)
        }
      } catch (error) {
        console.error('FeaturedProductsSection: Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="products" className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}
        <div className="text-center mb-12 md:mb-16">
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-black leading-relaxed font-normal mb-4"
          >
Control Appetite. Refine Weight          </p>
          <p 
            className="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed font-normal"
          >
       A science-driven approach to feeling full, lighter, and in control.
          </p>
        </div>

        {loading ? (
          <div className="flex gap-8 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] md:w-[350px] animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-4" />
                <div className="text-center">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                  <div className="h-12 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            {/* Products Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 justify-center px-12"
            >
              {products.map((product, index) => {
                const badges = getProductBadges(product, index)
                return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[300px] md:w-[350px] group"
                >
                  {/* Product Image + top-left tags */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
                      {/* Tags on top left */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 max-w-[70%]">
                        {badges.map((badge) => (
                          <span
                            key={badge.label}
                            className={`inline-block px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded ${
                              badge.variant === 'primary'
                                ? 'bg-black text-white'
                                : 'bg-white/95 border border-gray-300 text-gray-900'
                            }`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      <Image
                        src={product.image || '/placeholder-product.png'}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="text-center relative">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-lg font-normal mb-2 hover:underline">
                        {product.title}
                      </h3>
                    </Link>
                    {product.servings && (
                      <p className="text-sm text-gray-600 mb-1">
                        {product.servings}
                      </p>
                    )}
                    <p className="text-xl font-normal mb-4">
                      {product.maxPrice && product.maxPrice > product.price ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">₹{product.maxPrice.toFixed(2)}</span>
                          <span>₹{product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        `₹${product.price.toFixed(2)}`
                      )}
                    </p>
                    {/* Button - Hidden by default, appears on product hover */}
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      })}
                      disabled={!product.available}
                      className={`w-full py-3 px-6 rounded-lg font-normal text-sm transition-all duration-300 ${
                        product.available
                          ? 'bg-white border-2 border-black text-black opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 hover:bg-black hover:text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-300 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {product.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </button>
                  </div>
                </div>
              )
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

