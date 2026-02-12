'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'
import { Eye } from 'lucide-react'

const PAGE_SIZE = 10

export default function AccountOrdersPage() {
  const router = useRouter()
  const { rawOrders, loading, error, hasNextPage, loadMore } = useOrders()
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (error === 'Not authenticated') {
      router.push('/account/login')
    }
  }, [error, router])

  const totalPages = Math.max(1, Math.ceil(rawOrders.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const paginatedOrders = rawOrders.slice(start, start + PAGE_SIZE)
  const canNext = page < totalPages
  const canPrev = page > 1

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatStatus = (status: string) => {
    const s = (status || '').toLowerCase()
    if (s === 'fulfilled' || s === 'delivered') return 'Completed'
    if (s === 'refunded') return 'Refunded'
    if (s === 'failed' || s === 'voided') return 'Failed'
    return status || 'Pending'
  }

  const isRefunded = (order: { financialStatus?: string }) =>
    (order.financialStatus || '').toUpperCase() === 'REFUNDED'

  if (error && error !== 'Not authenticated') {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

      {loading && rawOrders.length === 0 ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : rawOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">Order</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">Delivery</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">Total</th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => {
                  const refunded = isRefunded(order)
                  const itemCount = order.items?.reduce((n, i) => n + (i.quantity || 0), 0) || 0
                  return (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-4 px-2 text-gray-900 font-medium">
                        #{order.orderNumber?.replace(/^#/, '') || order.id}
                      </td>
                      <td className="py-4 px-2 text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-4 px-2">
                        <span
                          className={
                            refunded
                              ? 'text-amber-700 font-medium'
                              : order.status === 'FULFILLED' || order.status === 'fulfilled'
                                ? 'text-green-700 font-medium'
                                : 'text-gray-700'
                          }
                        >
                          {refunded ? 'Refunded' : formatStatus(order.status)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">
                        {order.deliveryStatus || (order.tracking?.length ? 'Tracking added' : '—')}
                        {order.tracking?.length ? (
                          <span className="block text-xs text-gray-500 mt-0.5">
                            {order.tracking[0].number ?? order.tracking[0].company ?? ''}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-4 px-2 text-gray-700">
                        {refunded ? (
                          <span>
                            <span className="line-through">
                              ₹{order.totalAmount?.toFixed(2) ?? '0.00'}
                            </span>{' '}
                            <span className="text-green-600 font-medium">₹0.00</span>
                            {' '}for {itemCount} item{itemCount !== 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span>
                            ₹{order.totalAmount?.toFixed(2) ?? '0.00'} for {itemCount} item{itemCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-2 text-center">
                        <Link
                          href={`/account/orders/${encodeURIComponent(order.id)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!canPrev}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!canNext}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
