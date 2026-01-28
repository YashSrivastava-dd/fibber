'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'

export default function AccountOrdersPage() {
  const router = useRouter()
  const { orders, loading, error, hasNextPage, loadMore } = useOrders()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // If we get a 401 error from useOrders, redirect to login
    if (error === 'Not authenticated') {
      router.push('/account/login')
    } else {
      setAuthChecked(true)
    }
  }, [error, router])

  const skeletons = Array.from({ length: 3 })

  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            style={{ fontFamily: 'QuadratGrotesk, sans-serif' }}
          >
            My Orders
          </h1>
          <p className="text-gray-600">
            Track your Fiberise Fit orders, status and history in one place.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {!authChecked && loading && (
            <p className="text-gray-600">Loading your orders...</p>
          )}

          {authChecked && error && error !== 'Not authenticated' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {authChecked && !loading && orders.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          )}

          {loading && orders.length === 0 && (
            <div className="space-y-4">
              {skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-40" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <details
                  key={order.id}
                  className="group border border-gray-200 rounded-xl p-4 md:p-5 transition-shadow hover:shadow-md bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-start md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold tracking-wide uppercase text-gray-500">
                        {order.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="mt-1 text-sm text-gray-900 font-medium">
                        Total: {order.currency} {order.total.toFixed(2)}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : order.paymentStatus === 'REFUNDED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          order.fulfillmentStatus === 'FULFILLED'
                            ? 'bg-green-100 text-green-800'
                            : order.fulfillmentStatus === 'PARTIALLY_FULFILLED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.fulfillmentStatus || 'UNFULFILLED'}
                      </span>
                    </div>
                  </summary>

                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm text-gray-800"
                        >
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-gray-500">
                              Qty {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {order.currency} {(item.price || 0).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <p>Order timeline</p>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span>Placed</span>
                        <span className="h-px w-6 bg-gray-300" />
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            order.paymentStatus === 'PAID'
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span>Paid</span>
                        <span className="h-px w-6 bg-gray-300" />
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            order.fulfillmentStatus === 'FULFILLED'
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span>Shipped</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <a
                        href="/"
                        className="inline-flex items-center px-4 py-2 text-xs md:text-sm rounded-full border border-black text-black font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                      >
                        Reorder
                      </a>
                    </div>
                  </div>
                </details>
              ))}

              {hasNextPage && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={loadMore}
                    className="px-6 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

