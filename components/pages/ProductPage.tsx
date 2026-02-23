'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { ChevronRight, ChevronLeft, Plus, Minus, Star } from 'lucide-react'
import VideoSection from '@/components/sections/VideoSection'
import ProductReviewsSection from '@/components/sections/ProductReviewsSection'
import PaymentIcons from '@/components/PaymentIcons'

interface ProductVariant {
  id: string
  gid: string
  name: string
  price: number
  compareAtPrice?: number | null
  available: boolean
}

interface Product {
  id: string
  title: string
  handle: string
  description: string
  price: number
  comparePrice?: number | null
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
  const [quantity, setQuantity] = useState(1)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null)
  const [joinEmail, setJoinEmail] = useState('')
  const [joinSubmitted, setJoinSubmitted] = useState(false)
  const [showStickyAddToCart, setShowStickyAddToCart] = useState(false)
  const [reviewRating, setReviewRating] = useState<{ averageRating: number; totalCount: number } | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((state) => state.addItem)

  const DEFAULT_RATING = 4.8
  const displayRating = reviewRating && reviewRating.totalCount > 0
    ? reviewRating.averageRating
    : DEFAULT_RATING
  const displayReviewCount = reviewRating?.totalCount ?? 0

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyAddToCart(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching product with slug:', slug)
        
        const response = await fetch(`/api/shopify/product/${slug}`, { cache: 'no-store' })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
          console.error('API response error:', response.status, errorData)
          setError(errorData.error || `Failed to load product (${response.status})`)
          return
        }
        
        const data = await response.json()
        console.log('Product data received:', data)

        if (data.error) {
          console.error('Product fetch error:', data.error)
          setError(data.error)
          return
        }

        if (data.product) {
          console.log('Product loaded successfully:', data.product.title)
          setProduct(data.product)
          // Set the first available variant as selected
          if (data.product.variants && data.product.variants.length > 0) {
            setSelectedVariant(data.product.variants[0])
          }
        } else {
          console.error('No product data in response')
          setError('Product data not found')
        }
      } catch (err: any) {
        console.error('Error fetching product:', err)
        setError(`Failed to load product: ${err.message || 'Network error'}`)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    async function fetchReviewSummary() {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(slug)}/reviews`, { cache: 'no-store' })
        const data = await res.json()
        if (cancelled) return
        if (typeof data.averageRating === 'number' && typeof data.totalCount === 'number') {
          setReviewRating({ averageRating: data.averageRating, totalCount: data.totalCount })
        }
      } catch {
        if (!cancelled) setReviewRating(null)
      }
    }
    fetchReviewSummary()
    return () => { cancelled = true }
  }, [slug])

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return

    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedVariant.id || product.id,
        title: product.title,
        price: selectedVariant.price || product.price,
        image: product.image,
      })
    }
  }

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id)
  }

  const nextImage = () => {
    if (!product) return
    const displayImages = product.images && product.images.length > 0 ? product.images : [product.image]
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    if (!product) return
    const displayImages = product.images && product.images.length > 0 ? product.images : [product.image]
    setSelectedImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  // Extract ingredient tags from description or product title
  const extractIngredients = (title: string, description: string): string[] => {
    const commonIngredients = ['Iron', 'Zinc', 'Folate', 'Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Calcium', 'Magnesium']
    const found: string[] = []
    
    // Check title and description for ingredient mentions
    const text = `${title} ${description}`.toUpperCase()
    commonIngredients.forEach(ingredient => {
      if (text.includes(ingredient.toUpperCase())) {
        found.push(ingredient)
      }
    })
    
    // Return first 4 found ingredients, or default ones if none found
    return found.slice(0, 4).length > 0 ? found.slice(0, 4) : ['Iron', 'Zinc', 'Folate', 'Vitamin A']
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-0 h-[calc(100vh-8rem)]">
            <div className="w-full lg:w-1/2 animate-pulse">
              <div className="bg-gray-200 rounded-lg h-full" />
            </div>
            <div className="w-full lg:w-1/2 space-y-4 p-8">
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
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const displayPrice = selectedVariant?.price ?? product.price
  const displayCompareAt = selectedVariant?.compareAtPrice ?? product.comparePrice ?? null
  const discountPercent = displayCompareAt != null && displayCompareAt > displayPrice && displayPrice > 0
    ? Math.round((1 - displayPrice / displayCompareAt) * 100)
    : null
  const isAvailable = selectedVariant?.available ?? product.available
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const ingredients = ['Unflavoured', 'Watermelon', 'Lemon']
  
  // Extract product type/category from title or use default
  const productType = product.title.toUpperCase().includes('PLANT-BASED') 
    ? 'PLANT-BASED' 
    : product.title.toUpperCase().includes('VEGAN')
    ? 'VEGAN'
    : 'SUPPLEMENT'

  // Servings: Starter Pack = 30, Transformation Pack = 90
  const getServings = (label: string) => {
    const l = label.toLowerCase()
    if (l.includes('starter')) return 30
    if (l.includes('transformation')) return 90
    return 90
  }
  // Base servings on product title (Starter Pack = 30, Transformation Pack = 90), not variant name
  const displayServings = getServings(product.title)

  return (
    <div className={`min-h-screen ${showStickyAddToCart ? 'pb-20' : ''}`}>
      {/* Hero Section - White Background */}
      <div ref={heroRef} className="bg-white">
        {/* Breadcrumb Navigation */}
        <div className="pt-24 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:underline text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Variant carousel + ATC (screenshot format) — when multiple variants */}
        {product.variants && product.variants.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <p className="text-center text-base md:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              A science-driven approach to feeling full, lighter, and in control.
            </p>
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory justify-center px-2">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => variant.available && setSelectedVariant(variant)}
                      disabled={!variant.available}
                      className={`flex-shrink-0 w-[180px] sm:w-[200px] snap-center rounded-xl border-2 bg-white overflow-hidden transition-all ${
                        isSelected
                          ? 'border-black shadow-lg ring-2 ring-black ring-offset-2'
                          : variant.available
                          ? 'border-gray-200 hover:border-gray-400'
                          : 'border-gray-200 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="relative aspect-[3/4] bg-gray-50">
                        <Image
                          src={product.image || '/placeholder-product.png'}
                          alt={`${product.title} - ${variant.name}`}
                          fill
                          className="object-contain p-4"
                          sizes="200px"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-sm font-semibold text-gray-900">{variant.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Servings : {getServings(variant.name)}</p>
                        <div className="mt-1">
                          {variant.compareAtPrice != null && variant.compareAtPrice > variant.price ? (
                            <>
                              <span className="text-sm text-gray-400 line-through mr-1">₹{variant.compareAtPrice.toFixed(2)}</span>
                              <span className="text-lg font-bold text-black">₹{variant.price.toFixed(2)}</span>
                              <span className="ml-1 text-xs font-semibold text-red-600">
                                {Math.round((1 - variant.price / variant.compareAtPrice) * 100)}% OFF
                              </span>
                            </>
                          ) : (
                            <p className="text-lg font-bold text-black">₹{variant.price.toFixed(2)}</p>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">MRP (incl. of all taxes)</p>
                        <div className="flex items-center justify-center gap-1 mt-1.5">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i <= displayRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : i - 1 < displayRating && displayRating < i
                                    ? 'fill-amber-400/60 text-amber-400'
                                    : 'text-gray-300'
                                }`}
                                aria-hidden
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-700">{displayRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`w-full sm:w-auto min-w-[200px] py-4 px-8 rounded-lg font-semibold text-sm uppercase tracking-wider border-2 transition-colors ${
                    isAvailable
                      ? 'border-black text-black bg-white hover:bg-black hover:text-white'
                      : 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>
              {/* Trust strip below ATC */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Free delivery · COD available · Easy returns
              </p>
            </div>
          </div>
        )}

        {/* Main Product Content - 50/50 Split */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-0 lg:items-start">
          {/* Left Section - Product Images (50%) */}
          <div className="w-full lg:w-1/2 flex gap-4 lg:pr-6">
            {/* Thumbnail Column (Vertical) */}
            {displayImages.length > 1 && (
              <div className="hidden lg:flex flex-col gap-4 flex-shrink-0">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-black scale-105'
                        : 'border-transparent hover:border-gray-400'
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

            {/* Main Image Display */}
            <div className="flex-1 relative bg-transparent rounded-lg overflow-hidden group">
              <div className="relative w-full aspect-square">
                <Image
                  src={displayImages[selectedImageIndex] || product.image || '/placeholder-product.png'}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              {/* Image Navigation Bar - Below image */}
              {displayImages.length > 1 && (
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-full border border-gray-200/80 shadow-md">
                    {displayImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`rounded-full transition-all duration-200 ${
                          index === selectedImageIndex
                            ? 'w-2.5 h-2.5 bg-black ring-2 ring-black/20'
                            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Thumbnails */}
              {displayImages.length > 1 && (
                <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
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
          </div>

          {/* Right Section - Product Details (50%) */}
          <div className="w-full lg:w-1/2 min-w-0 lg:pl-6 pt-8 lg:pt-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto overflow-x-hidden lg:pr-2 scrollbar-hide">
            <div className="space-y-6 pb-8 min-w-0">
              {/* Product Type/Category */}
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                {productType}
              </div>

              {/* Product Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase leading-[1.1] mb-1 break-words">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600 mb-4">Servings : {displayServings}</p>

              {/* Ingredient Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-800 bg-transparent"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>

              {/* Product Description */}
              {product.description && (
                <div className="text-base text-gray-700 leading-relaxed">
                  <div
                    className="prose prose-sm max-w-none prose-gray"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Variant Selection */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-800">
                    Choose Supplement:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.available}
                        className={`w-14 h-14 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedVariant?.id === variant.id
                            ? 'border-[#FFB6C1] bg-[#FFE4E9] scale-110 shadow-md'
                            : variant.available
                            ? 'border-gray-300 bg-transparent hover:border-gray-400'
                            : 'border-gray-400 bg-transparent cursor-not-allowed opacity-50'
                        }`}
                        title={variant.name}
                      >
                        <span className={`text-sm font-semibold ${
                          selectedVariant?.id === variant.id ? 'text-black' : 'text-gray-800'
                        }`}>
                          {variant.name.charAt(0).toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="space-y-1 mt-6">
                <div className="flex flex-wrap items-baseline gap-2">
                  {displayCompareAt != null && displayCompareAt > displayPrice ? (
                    <>
                      <span className="text-xl md:text-2xl text-gray-400 line-through">₹{displayCompareAt.toFixed(2)}</span>
                      <span className="text-4xl md:text-5xl font-bold text-black">₹{displayPrice.toFixed(2)}</span>
                      {discountPercent != null && discountPercent > 0 && (
                        <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold text-black">₹{displayPrice.toFixed(2)}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-normal">MRP (incl. of all taxes)</p>
                <p className="text-sm text-gray-500">Tax included.</p>
                {/* Rating: from reviews when available, else default 4.8 */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= displayRating
                            ? 'fill-amber-400 text-amber-400'
                            : i - 1 < displayRating && displayRating < i
                            ? 'fill-amber-400/60 text-amber-400'
                            : 'text-gray-300'
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{displayRating.toFixed(1)}</span>
                  {displayReviewCount > 0 && (
                    <span className="text-xs text-gray-500">({displayReviewCount} {displayReviewCount === 1 ? 'review' : 'reviews'})</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector and Add to Cart */}
              <div className="flex gap-3 mt-6">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors text-gray-800"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold text-sm uppercase tracking-wider transition-colors ${
                    isAvailable
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>

              {/* Trust strip + social proof */}
              <div className="text-sm text-gray-600 mt-4 space-y-1">
                <p>Free shipping Pan India</p>
                <p className="text-xs text-gray-500">Free delivery · Easy returns</p>
                <a
                  href="#reviews"
                  className="inline-block text-xs font-medium text-black underline underline-offset-2 hover:no-underline mt-2"
                >
                  See ratings &amp; reviews →
                </a>
              </div>

              {/* Payment Icons - UPI first, then Visa, MC, Amex, Diners, PayPal */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs text-gray-600 font-medium">We accept:</span>
                <PaymentIcons iconClassName="w-9 h-6 object-contain flex-shrink-0" />
              </div>

              {/* Accordion Sections */}
              <div className="mt-6 space-y-2">
                {/* BENEFITS Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('benefits')}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                      BENEFITS
                    </span>
                    <Plus
                      className={`w-5 h-5 text-gray-700 transition-transform ${
                        expandedAccordion === 'benefits' ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'benefits' && (
                    <div className="pb-4 text-sm text-gray-700 leading-relaxed">

                      <ul className="list-disc list-inside space-y-2">
                        <li>Helps manage appetite naturally</li>
                        <li>Supports weight management goals</li>
                        <li>Promotes digestive comfort</li>
                        <li>Encourages mindful portion control</li>
                        <li>High fiber content for better satiety</li>
                        <li>Zero added sugar</li>
                        <li>Only 19 kcal per serving</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* HOW TO TAKE SUPPLEMENT Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('how-to-take')}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                      HOW TO TAKE SUPPLEMENT?
                    </span>
                    <Plus
                      className={`w-5 h-5 text-gray-700 transition-transform ${
                        expandedAccordion === 'how-to-take' ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'how-to-take' && (
                    <div className="pb-4 text-sm text-gray-700 leading-relaxed">
                      <ul className="list-disc list-inside space-y-2 mb-3">
                        <li>Mix 1 serving (11.5g) in 200 ml room-temperature water</li>
                        <li>Stir well and consume 45–60 minutes before meals</li>
                        <li>Do not mix in chilled water</li>
                      </ul>
                      <p className="mb-2">
                        Unflavoured variant can also be added to coffee or tea.
                      </p>
                      <p>
                        For best results, stay well-hydrated and practice mindful eating.
                      </p>
                    </div>
                  )}
                </div>

                {/* INGREDIENTS Accordion */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('ingredients')}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                      INGREDIENTS
                    </span>
                    <Plus
                      className={`w-5 h-5 text-gray-700 transition-transform ${
                        expandedAccordion === 'ingredients' ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  {expandedAccordion === 'ingredients' && (
                    <div className="pb-4 text-sm text-gray-700 leading-relaxed space-y-4">
                      <div>
                       
                        <ul className="list-disc list-inside space-y-1 mb-3">
                          <li>Soluble Dietary Fiber</li>
                          <li>L-Carnitine L-Tartrate</li>
                          <li>L-Tyrosine</li>
                          <li>Lactobacillus gasseri</li>
                        </ul>
                        <p className="font-semibold text-gray-800 mb-1">Flavoured Variants Also Contain:</p>
                        <ul className="list-disc list-inside space-y-1 mb-3">
                          <li>Acidity Regulator (INS 330)</li>
                          <li>Anticaking Agent (INS 551)</li>
                          <li>Sweetener (INS 955 – Sucralose)</li>
                          <li>Nature Identical Flavouring Substances</li>
                        </ul>
                        <p className="font-semibold text-gray-800 mb-1">Unflavoured Variant Contains:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Anticaking Agent (INS 551)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhance Your Daily Routine Section */}
              <div className="mt-8">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
                  ENHANCE YOUR DAILY ROUTINE
                </h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2">
                  {[
                    '/ritual/154359.jpg',
                    '/ritual/154361.jpg',
                    '/ritual/Make_the_man_2k_202601120957.jpeg',
                    '/ritual/Make_this_image_2k_202601091748.jpeg',
                    '/ritual/An_aesthetic_and_2k_202601091659.jpeg',
                  ].map((imagePath, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-64 rounded-lg overflow-hidden relative group"
                    >
                      <Image
                        src={imagePath}
                        alt={`Wellness routine ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Full-width image below hero with marquee */}
      <div className="w-full relative">
        <Image
          src="/BlueSet.png"
          alt="Wellness"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
          <div
            className="flex whitespace-nowrap text-white uppercase tracking-[0.3em] text-2xl md:text-4xl lg:text-5xl font-normal animate-marquee"
            style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
          >
            <span className="inline-block px-8">Real Stories , Real Result</span>
            <span className="inline-block px-8">Real Stories , Real Result</span>
          </div>
        </div>
      </div>

      <VideoSection />

      {/* Why Women's Multi Capsules Section */}
      <div className="w-full bg-[#FFE4E9] py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase mb-4 md:mb-6">
                WHY WOMEN'S MULTI CAPSULES?
              </h2>
              <p className="text-base md:text-lg text-black leading-relaxed">
                Women's Multi is designed to support women's daily nutritional needs.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/placeholder-women-multi.jpg"
                  alt="Women's Multi Capsules"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reels Section */}
      <section className="w-full bg-[#F5F3EF] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-sm md:text-base text-gray-600 font-medium mb-1">
              Your Health in Trusted Hands!
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase tracking-wide">
              Real Stories, Real Results
            </h2>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2 justify-center md:justify-start">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden bg-black/5 shadow-sm"
              >
                <video
                  src={`/videos/${i}.webm`}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  autoPlay
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-12 md:py-16" style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-base md:text-lg text-gray-500 font-medium mb-2">
              Everything You Need to Know!
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="border-t border-gray-200">
            {[
              {
                id: 'faq-1',
                question: 'Are wellness supplements safe to use?',
                answer: 'Yes. Our supplements are formulated with quality ingredients and manufactured under strict standards. We recommend consulting your healthcare provider before starting any new supplement, especially if you have existing conditions or take other medications.',
              },
              {
                id: 'faq-2',
                question: 'How should I store my supplements?',
                answer: 'Store in a cool, dry place away from direct sunlight. Keep the bottle tightly closed and out of reach of children. Avoid storing in humid areas like the bathroom.',
              },
              {
                id: 'faq-3',
                question: 'Do you offer international shipping?',
                answer: 'Yes. We ship to multiple countries. Shipping costs and delivery times vary by location. You can see options at checkout.',
              },
              {
                id: 'faq-4',
                question: 'What is your return policy?',
                answer: 'We offer a satisfaction guarantee. If you are not satisfied with your purchase, contact us within the specified return window for a refund or exchange. See our full policy in the footer or contact page.',
              },
            ].map((faq) => (
              <div key={faq.id} className="border-b border-gray-200 py-6 md:py-8 first:pt-0">
                <button
                  onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between py-2 text-left"
                >
                  <span className="text-base md:text-lg font-semibold uppercase tracking-wider text-black pr-4">
                    {faq.question}
                  </span>
                  <Plus
                    className={`flex-shrink-0 w-6 h-6 text-black transition-transform ${
                      expandedFaqId === faq.id ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                {expandedFaqId === faq.id && (
                  <div className="pt-2 pb-2 text-base md:text-lg text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings & Reviews — user can add a review */}
      <ProductReviewsSection productSlug={product.slug || product.handle} productTitle={product.title} />

      {/* Two-image promo section */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:min-h-[400px]">
            <Image
              src="/cravings-image.png"
              alt="Promo 1"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:min-h-[400px]">
            <Image
              src="/hero-image.png"
              alt="Promo 2"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 1. Customer testimonial section */}
      <section className="w-full bg-[#FFE4E9] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-sm md:text-base text-gray-600 font-medium mb-1">
              What Our Customers Say
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase tracking-wide">
              +10000 Happy Customers
            </h2>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px] md:min-h-[380px]">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px]">
                <Image
                  src="/ritual/154359.jpg"
                  alt="Customer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-56 bg-white rounded-xl p-4 shadow-md">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={product.image || '/placeholder-product.png'}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-black">{product.title}</p>
                </div>
                <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow" aria-label="Previous">
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button className="absolute right-2 lg:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow" aria-label="Next">
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-2xl text-amber-400">★</span>
                  ))}
                </div>
                <blockquote className="text-base md:text-lg text-black leading-relaxed mb-4">
                  &ldquo;This supplement gave me more energy, faster recovery, and healthier skin and hair. I highly recommend it!&rdquo;
                </blockquote>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-700">- Anna M.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four feature pillars */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Image src="/icons/lab.png" alt="" width={48} height={48} className="object-contain" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">Third-Party Tested</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We hold ourselves and our ingredients to the highest standards.
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Image src="/icons/quality.png" alt="" width={48} height={48} className="object-contain" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">Quality Ingredients</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We&apos;re dedicated to using scientifically backed, high-quality natural ingredients.
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Image src="/icons/nogmo-2.png" alt="" width={48} height={48} className="object-contain" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">Non-GMO</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We carefully evaluate every ingredient, ensuring they are non-GMO.
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Image src="/icons/vegan-2.png" alt="" width={48} height={48} className="object-contain" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">Vegan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We ensure the highest standards with 100% vegan, cruelty-free formulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Join Our Circle & Save */}
      <section className="w-full bg-[#FFE4E9] py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-3">
            Join Our Circle & Save!
          </h2>
          <p className="text-base text-black mb-8">
            Sign up now for 10% off your first order — because you deserve it!
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setJoinSubmitted(true)
              setJoinEmail('')
              setTimeout(() => setJoinSubmitted(false), 3000)
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center"
          >
            <input
              type="email"
              value={joinEmail}
              onChange={(e) => setJoinEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-1 min-w-0 px-5 py-3 bg-white border border-black rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              {joinSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      {/* Sticky Add to Cart - appears when hero scrolls out of view */}
      {showStickyAddToCart && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black py-4">
          <div className="flex justify-center">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className="py-3 px-10 rounded-lg font-semibold text-sm uppercase tracking-wider border-2 border-black text-black bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
