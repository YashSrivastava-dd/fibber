'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react'

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
  const [quantity, setQuantity] = useState(1)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching product with slug:', slug)
        
        const response = await fetch(`/api/shopify/product/${slug}`)
        
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

  const displayPrice = selectedVariant?.price || product.price
  const isAvailable = selectedVariant?.available ?? product.available
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const ingredients = extractIngredients(product.title, product.description)
  
  // Extract product type/category from title or use default
  const productType = product.title.toUpperCase().includes('PLANT-BASED') 
    ? 'PLANT-BASED' 
    : product.title.toUpperCase().includes('VEGAN')
    ? 'VEGAN'
    : 'SUPPLEMENT'

  return (
    <div className="min-h-screen">
      {/* Hero Section - White Background */}
      <div className="bg-white">
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

              {/* Image Navigation Controls */}
              {displayImages.length > 1 && (
                <>
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-sm font-medium text-black z-10">
                    {selectedImageIndex + 1}/{displayImages.length}
                  </div>

                  {/* Next Image Arrow - Large and Prominent */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FFB6C1]/90 hover:bg-[#FFB6C1] backdrop-blur-sm rounded-full p-4 transition-all shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-8 h-8 text-black" />
                  </button>

                  {/* Previous Image Arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FFB6C1]/90 hover:bg-[#FFB6C1] backdrop-blur-sm rounded-full p-4 transition-all shadow-lg z-10 opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-8 h-8 text-black" />
                  </button>
                </>
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
          <div className="w-full lg:w-1/2 lg:pl-6 pt-8 lg:pt-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
            <div className="space-y-6 pb-8">
              {/* Product Type/Category */}
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                {productType}
              </div>

              {/* Product Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black uppercase leading-[1.1] mb-4">
                {product.title}
              </h1>

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
                <p className="text-4xl md:text-5xl font-bold text-black">
                  ₹{displayPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 font-normal">Tax included.</p>
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

              {/* Customer and Shipping Info */}
              <div className="text-sm text-gray-600 mt-4">
                <p>+10000 Happy Customers | Free shipping on US</p>
              </div>

              {/* Payment Icons */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs text-gray-600 font-medium">We accept:</span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">AMEX</span>
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">PP</span>
                  </div>
                </div>
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
                      <p>
                        Fill nutritional gaps and feel your best with this comprehensive multivitamin. 
                        Supports immunity, energy, mood, sleep, hormones, periods, muscle recovery, and skin health.
                      </p>
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
                      <p>
                        Take one capsule daily with a meal or as directed by your healthcare provider. 
                        For best results, take at the same time each day with a full glass of water.
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
                    <div className="pb-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        Vitamins A-E, Iron, Zinc, Folate, Cranberry, Thiamin, and other essential nutrients. 
                        100% Plant-Based. 60 Capsules per bottle.
                      </p>
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

      {/* Key Ingredients Section */}
      <div className="w-full bg-[#FAF8F2] py-10 md:py-14 lg:py-16">
        {/* Section Title */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider uppercase mb-8 md:mb-12 px-4">
          KEY INGREDIENTS
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center">
            {/* Left Ingredients */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  ZINC
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pr-4 md:pr-8 lg:pr-12 text-center">
                  Supports a strong immune system, promotes wound healing, and helps maintain healthy skin.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  IRON
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pr-4 md:pr-8 lg:pr-12 text-center">
                  Vital for energy production and oxygen transport in the body, it prevents fatigue and supports overall vitality.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  VITAMINS C
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pr-4 md:pr-8 lg:pr-12 text-center">
                  A powerful antioxidant that boosts the immune system, enhances iron absorption, and promotes collagen production for healthy skin.
                </p>
              </div>
            </div>

            {/* Center Video */}
            <div className="relative flex items-center justify-center order-first lg:order-none">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/f087c0f71002463594892e68000dfe75.HD-720p-4.5Mbps-40573155.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Ingredients */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  VITAMINS B
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12 text-center">
                  Boost energy, improve brain function, and support cell metabolism while helping maintain a healthy nervous system and red blood cell production.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  VITAMIN A
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12 text-center">
                  Essential for good vision, healthy skin, and a robust immune system, it also supports cell growth and reproduction.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold tracking-wider uppercase mb-2 text-center">
                  NIACIN
                </h3>
                <p className="text-sm md:text-base text-black w-full leading-relaxed pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12 text-center">
                  Helps maintain healthy skin, supports the nervous system, and aids in converting food into energy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
