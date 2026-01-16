'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

interface ProductVariant {
  id: string
  gid: string
  name: string
  price: number
  available: boolean
}

interface Product {
  id: string
  title: string
  handle: string
  description: string
  price: number
  image: string
  images: string[]
  available: boolean
  variants: ProductVariant[]
  slug: string
}

interface ProductPageProps {
  slug: string
}

export default function ProductPage({ slug }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/shopify/product/${slug}`)
        const data = await response.json()

        if (data.error) {
          setError(data.error)
          return
        }

        if (data.product) {
          setProduct(data.product)
          // Set the first available variant as selected
          if (data.product.variants && data.product.variants.length > 0) {
            setSelectedVariant(data.product.variants[0])
          }
        }
      } catch (err: any) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return

    addItem({
      id: selectedVariant.id || product.id,
      title: product.title,
      price: selectedVariant.price || product.price,
      image: product.image,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-lg aspect-square" />
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-12 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The product you are looking for does not exist.'}</p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  const displayPrice = selectedVariant?.price || product.price
  const isAvailable = selectedVariant?.available ?? product.available
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image]

  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={displayImages[selectedImageIndex] || product.image || '/placeholder-product.png'}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Thumbnail Images */}
            {displayImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-black'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-normal text-black mb-6">
                ₹{displayPrice.toFixed(2)}
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.available}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-black bg-black text-white'
                          : variant.available
                          ? 'border-gray-300 bg-white text-black hover:border-black'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-black mb-2">Description</h2>
                <div
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-sm uppercase tracking-wider transition-colors ${
                isAvailable
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
