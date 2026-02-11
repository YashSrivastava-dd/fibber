'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

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

export default function ProductsCarouselSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('ProductsCarouselSection: Fetching products...')
        const response = await fetch('/api/shopify/products?all=true')
        
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
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[300px] md:w-[350px]"
                >
                  {/* Product Image */}
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 group">
                      <Image
                        src={product.image || '/placeholder-product.png'}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="text-center">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-lg font-normal mb-2 hover:underline">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-xl font-normal mb-4">
                      ₹{product.price.toFixed(2)}
                    </p>
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
              ))}
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

