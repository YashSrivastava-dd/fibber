'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { getProductBadges } from '@/lib/product-badges'

interface Product {
  id: string
  title: string
  price: number
  maxPrice?: number | null
  comparePrice?: number | null
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

export default function ProductsCarouselSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('ProductsCarouselSection: Fetching products...')
        const response = await fetch('/api/shopify/products?all=true', { cache: 'no-store' })
        
        if (!response.ok) {
          console.error('ProductsCarouselSection: API response not OK:', response.status)
          throw new Error(`Failed to fetch products: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('ProductsCarouselSection: Raw API data:', data)
        
        if (data.products) {
          console.log('ProductsCarouselSection: Total products received:', data.products.length)
          console.log('ProductsCarouselSection: All products:', data.products.map((p: Product) => ({
            title: p.title,
            price: p.price,
            available: p.available,
            servings: p.servings,
            id: p.id
          })))
          
          // Show all products (remove availability filter to show all products)
          setProducts(data.products)
          console.log('ProductsCarouselSection: Displaying all products:', data.products.length)
        } else {
          console.error('ProductsCarouselSection: No products in response:', data)
        }
      } catch (error) {
        console.error('ProductsCarouselSection: Error fetching products:', error)
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
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
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {products.map((product, index) => {
                const badges = getProductBadges(product, index)
                return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[300px] md:w-[350px]"
                >
                  {/* Product Image + top-left tags */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 group">
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
                        unoptimized
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="text-center space-y-2">
                    <Link href={`/products/${product.slug}`} className="block">
                      <h3 className="text-lg font-normal hover:underline">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500">Serving size: 11.5 gm </p>
                    <p className="text-xl font-normal pt-1">
                      {(product.comparePrice ?? (product.maxPrice != null && product.maxPrice > product.price ? product.maxPrice : null)) != null &&
                      (product.comparePrice ?? product.maxPrice)! > product.price ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">
                            ₹{(product.comparePrice ?? product.maxPrice)!.toFixed(2)}
                          </span>
                          <span>₹{product.price.toFixed(2)}</span>
                          <span className="ml-1 text-sm font-semibold text-red-600">
                            ({Math.round((1 - product.price / (product.comparePrice ?? product.maxPrice)!) * 100)}% OFF)
                          </span>
                        </>
                      ) : (
                        `₹${product.price.toFixed(2)}`
                      )}
                    </p>
                    <p className="text-xs text-gray-500">MRP (incl. of all taxes)</p>
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-800">4.8</span>
                    </div>
                    <div className="pt-1">
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                      })}
                      disabled={!product.available}
                      className={`w-full py-3 px-6 rounded-lg font-normal text-sm transition-colors ${
                        product.available
                          ? 'bg-white border-2 border-black text-black hover:bg-black hover:text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed border-2 border-gray-300'
                      }`}
                    >
                      {product.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </button>
                    </div>
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

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

