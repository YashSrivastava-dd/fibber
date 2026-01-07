'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

// Mock product data
const mockProduct = {
  id: '1',
  title: 'Multi-Vitamin Capsules',
  price: 29.99,
  comparePrice: 39.99,
  description: `Our premium Multi-Vitamin Capsules are formulated with essential vitamins and minerals to support your overall health and FIberiseFit. Each capsule contains a carefully balanced blend of nutrients designed to fill nutritional gaps in your diet.

Key Benefits:
• Supports immune system health
• Promotes energy production
• Maintains healthy bones and muscles
• Contains essential B-vitamins and antioxidants`,
  images: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
  ],
  variants: [
    { id: '1', name: '30 Capsules', price: 29.99 },
    { id: '2', name: '60 Capsules', price: 54.99 },
    { id: '3', name: '90 Capsules', price: 79.99 },
  ],
  ingredients: `Vitamin A (as Beta Carotene), Vitamin C (as Ascorbic Acid), Vitamin D3 (as Cholecalciferol), Vitamin E (as d-alpha Tocopherol), Vitamin K1 (as Phylloquinone), Thiamine (Vitamin B1), Riboflavin (Vitamin B2), Niacin (Vitamin B3), Vitamin B6 (as Pyridoxine HCl), Folate (as Folic Acid), Vitamin B12 (as Cyanocobalamin), Biotin, Pantothenic Acid (Vitamin B5), Calcium, Iron, Magnesium, Zinc, Selenium, Manganese, Chromium, Molybdenum.`,
  shipping: `Free shipping on orders over $50. Standard shipping (5-7 business days): $5.99. Express shipping (2-3 business days): $12.99.`,
  returns: `We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, return it for a full refund. Items must be unopened and in original packaging.`,
}

const recommendedProducts = [
  {
    id: '2',
    title: 'Omega-3 Fish Oil',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    slug: 'omega-3-fish-oil',
  },
  {
    id: '3',
    title: 'Probiotic Blend',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    slug: 'probiotic-blend',
  },
  {
    id: '4',
    title: 'Vitamin D3',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    slug: 'vitamin-d3',
  },
]

export default function ProductPage({ slug }: { slug: string }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: `${mockProduct.id}-${selectedVariant.id}`,
      title: `${mockProduct.title} - ${selectedVariant.name}`,
      price: selectedVariant.price,
      image: mockProduct.images[0],
      variant: selectedVariant.name,
    })
  }

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {mockProduct.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">₹{selectedVariant.price}</span>
              {mockProduct.comparePrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{mockProduct.comparePrice}
                </span>
              )}
            </div>

            {/* Variant Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex flex-wrap gap-3">
                {mockProduct.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-colors ${
                      selectedVariant.id === variant.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-6"
            >
              Add to Cart
            </button>

            {/* Accordion Tabs */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              {/* Description */}
              <div>
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full flex items-center justify-between py-4 text-left font-semibold"
                >
                  <span>Description</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === 'description' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'description' && (
                  <div className="pb-4 text-gray-600 whitespace-pre-line">
                    {mockProduct.description}
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div>
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between py-4 text-left font-semibold"
                >
                  <span>Ingredients & Details</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === 'ingredients' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="pb-4 text-gray-600 whitespace-pre-line">
                    {mockProduct.ingredients}
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between py-4 text-left font-semibold"
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-gray-600 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Shipping</h4>
                      <p className="whitespace-pre-line">{mockProduct.shipping}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Returns</h4>
                      <p className="whitespace-pre-line">{mockProduct.returns}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <a href={`/products/${product.slug}`}>
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
                <div className="p-4">
                  <a href={`/products/${product.slug}`}>
                    <h3 className="font-semibold mb-2 hover:underline">
                      {product.title}
                    </h3>
                  </a>
                  <p className="text-lg font-bold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-semibold">{mockProduct.title}</p>
            <p className="text-lg font-bold">₹{selectedVariant.price}</p>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

