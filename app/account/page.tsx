'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import Image from 'next/image'

export default function AccountPage() {
  const { isAuthenticated, uid, phone, loading, getIdToken } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    async function fetchOrders() {
      if (!isAuthenticated || !uid) {
        setLoadingOrders(false)
        return
      }

      try {
        setLoadingOrders(true)
        const token = await getIdToken()
        if (!token) {
          throw new Error('Failed to get authentication token')
        }

        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('Error fetching orders:', errorData)
          setOrders([])
        } else {
          const data = await response.json()
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoadingOrders(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, uid])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
            style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
          >
            MY ACCOUNT
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <p className="text-gray-900">{phone || 'Not available'}</p>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              {loadingOrders ? (
                <p className="text-gray-600">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <a
                    href="/collections/all"
                    className="text-black underline font-semibold"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const firstItem = order.items?.[0]
                    const isExpanded = expandedOrderId === order.id

                    return (
                      <button
                        key={order.id}
                        type="button"
                        onClick={() =>
                          setExpandedOrderId(isExpanded ? null : order.id)
                        }
                        className="w-full text-left border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
                      >
                        <div className="flex gap-4">
                          {firstItem?.image ? (
                            <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                              <Image
                                src={firstItem.image}
                                alt={firstItem.title || 'Order item'}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                              No image
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold">
                                  Order #{order.orderNumber || order.id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.createdAt
                                    ? new Date(
                                        order.createdAt
                                      ).toLocaleDateString()
                                    : 'Date not available'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Total:{' '}
                                  {order.currencyCode || '₹'}
                                  {order.totalAmount?.toFixed(2) || '0.00'}
                                </p>
                                {order.items && order.items.length > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {order.items.length} item
                                    {order.items.length > 1 ? 's' : ''}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    order.status === 'FULFILLED' ||
                                    order.status === 'fulfilled'
                                      ? 'bg-green-100 text-green-800'
                                      : order.status === 'PENDING' ||
                                        order.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {order.status || 'Status unknown'}
                                </span>
                                {order.financialStatus && (
                                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-800">
                                    Payment: {order.financialStatus}
                                  </span>
                                )}
                              </div>
                            </div>

                            {isExpanded && order.items && order.items.length > 0 && (
                              <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                                <div className="space-y-3">
                                  {order.items.map((item: any, index: number) => (
                                    <div
                                      key={`${order.id}-${index}`}
                                      className="flex gap-3"
                                    >
                                      {item.image && (
                                        <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                          <Image
                                            src={item.image}
                                            alt={item.title || 'Item'}
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                          />
                                        </div>
                                      )}
                                      <div className="flex-1 text-sm">
                                        <p className="font-medium">
                                          {item.title || 'Item'}
                                        </p>
                                        <p className="text-gray-600">
                                          Qty: {item.quantity ?? 1}
                                        </p>
                                        {item.price != null && (
                                          <p className="text-gray-600">
                                            Price:{' '}
                                            {order.currencyCode || '₹'}
                                            {item.price.toFixed(2)}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                                  <div>
                                    <p className="font-semibold mb-1">
                                      Order details
                                    </p>
                                    {order.email && (
                                      <p className="text-gray-600">
                                        Email: <span>{order.email}</span>
                                      </p>
                                    )}
                                    {order.contactPhone && (
                                      <p className="text-gray-600">
                                        Phone: <span>{order.contactPhone}</span>
                                      </p>
                                    )}
                                    <p className="text-gray-600">
                                      Order ID:{' '}
                                      <span className="break-all">
                                        {order.id}
                                      </span>
                                    </p>
                                  </div>

                                  {order.shippingAddress && (
                                    <div>
                                      <p className="font-semibold mb-1">
                                        Shipping to
                                      </p>
                                      {order.shippingAddress.name && (
                                        <p className="text-gray-600">
                                          {order.shippingAddress.name}
                                        </p>
                                      )}
                                      <p className="text-gray-600">
                                        {order.shippingAddress.address1}
                                      </p>
                                      {order.shippingAddress.address2 && (
                                        <p className="text-gray-600">
                                          {order.shippingAddress.address2}
                                        </p>
                                      )}
                                      <p className="text-gray-600">
                                        {[order.shippingAddress.city, order.shippingAddress.province, order.shippingAddress.zip]
                                          .filter(Boolean)
                                          .join(', ')}
                                      </p>
                                      <p className="text-gray-600">
                                        {order.shippingAddress.country}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/#products"
                  className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </a>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-center border border-gray-300 text-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
