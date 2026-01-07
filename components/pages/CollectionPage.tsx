'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Filter, Grid, List, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: string
  title: string
  price: number
  image: string
  slug: string
  available: boolean
}

export default function CollectionPage({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceFilter, setPriceFilter] = useState<string>('all')
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all')
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const collectionHandle = slug === 'all' ? 'all-products' : slug
        const response = await fetch(`/api/shopify/collections/${collectionHandle}?first=50`)
        const data = await response.json()
        if (data.products) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback to products API if collection doesn't exist
        try {
          const response = await fetch('/api/shopify/products?first=50')
          const data = await response.json()
          if (data.products) {
            setProducts(data.products)
          }
        } catch (fallbackError) {
          console.error('Error fetching products fallback:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [slug])

  // Mock products data (fallback)
  const mockProducts = [
  {
    id: '1',
    title: 'Multi-Vitamin Capsules',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    slug: 'multi-vitamin-capsules',
    available: true,
  },
  {
    id: '2',
    title: 'Omega-3 Fish Oil',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    slug: 'omega-3-fish-oil',
    available: true,
  },
  {
    id: '3',
    title: 'Probiotic Blend',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    slug: 'probiotic-blend',
    available: true,
  },
  {
    id: '4',
    title: 'Vitamin D3',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    slug: 'vitamin-d3',
    available: true,
  },
  {
    id: '5',
    title: 'Collagen Peptides',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    slug: 'collagen-peptides',
    available: true,
  },
  {
    id: '6',
    title: 'Turmeric Curcumin',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    slug: 'turmeric-curcumin',
    available: false,
  },
]

  const filteredProducts = (products.length > 0 ? products : mockProducts).filter((product) => {
    if (priceFilter === 'under-25' && product.price >= 25) return false
    if (priceFilter === '25-50' && (product.price < 25 || product.price > 50))
      return false
    if (priceFilter === 'over-50' && product.price <= 50) return false
    if (
      availabilityFilter === 'in-stock' &&
      !product.available
    )
      return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'name') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 capitalize">
            {slug === 'all' ? 'All Products' : slug.replace('-', ' ')}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${sortedProducts.length} products`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  ×
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under-25', label: 'Under $25' },
                    { value: '25-50', label: '$25 - $50' },
                    { value: 'over-50', label: 'Over $50' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={priceFilter === option.value}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'in-stock', label: 'In Stock' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={availabilityFilter === option.value}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-4 ml-auto">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list'
                        ? 'bg-black text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative aspect-square bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.available && (
                          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-500">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold mb-2 hover:underline">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-lg font-bold mb-4">
                        ₹{product.price}
                      </p>
                      <button
                        onClick={() => addItem(product)}
                        disabled={!product.available}
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          product.available
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-6 bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.slug}`} className="flex-shrink-0">
                      <div className="relative w-48 h-48 bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-xl font-semibold mb-2 hover:underline">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-2xl font-bold mb-4">
                          ₹{product.price}
                        </p>
                        {!product.available && (
                          <p className="text-sm text-gray-500 mb-4">
                            Out of Stock
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => addItem(product)}
                        disabled={!product.available}
                        className={`w-full sm:w-auto px-8 py-2 rounded-lg font-medium transition-colors ${
                          product.available
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.available ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

