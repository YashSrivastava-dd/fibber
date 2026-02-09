'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useOrders } from '@/hooks/useOrders'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { rawOrders, loading, error } = useOrders()
  const orderId = typeof params?.id === 'string' ? decodeURIComponent(params.id) : ''
  const order = rawOrders.find((o) => o.id === orderId)

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

  const formatShortDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const displayStatus =
    order?.financialStatus?.toUpperCase() === 'REFUNDED'
      ? 'Refunded'
      : order?.status === 'FULFILLED' || order?.status === 'fulfilled'
        ? 'Completed'
        : order?.status || 'Pending'

  if (error === 'Not authenticated') {
    router.push('/account/login')
    return null
  }

  if (loading && rawOrders.length === 0) {
    return (
      <div>
        <p className="text-gray-600">Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
        <p className="text-gray-600 mb-4">We couldn’t find this order.</p>
        <Link
          href="/account/orders"
          className="inline-flex px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
        >
          Back to Orders
        </Link>
      </div>
    )
  }

  const orderNumber = order.orderNumber?.replace(/^#/, '') || order.id
  const isRefunded = order.financialStatus?.toUpperCase() === 'REFUNDED'
  const subtotal = order.items?.reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 1),
    0
  ) ?? order.totalAmount
  const shipping = Math.max(0, order.totalAmount - subtotal)

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Order #{orderNumber}
      </h1>
      <p className="text-gray-600 mb-6">
        Order #{orderNumber} was placed on {formatDate(order.createdAt)} and is
        currently <strong>{displayStatus}</strong>.
      </p>

      {/* Shipping / tracking placeholder – can be filled when API supports it */}
      {(order.status === 'FULFILLED' || order.status === 'fulfilled') && !isRefunded && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700 font-medium">Your order has been shipped.</p>
          <p className="text-sm text-gray-600 mt-1">
            Dispatched on: {formatShortDate(order.createdAt)}
          </p>
        </div>
      )}

      <h2 className="text-lg font-bold text-gray-900 mb-3">Order details</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-0">
                <td className="py-3 px-4 text-gray-800">
                  {item.title} × {item.quantity ?? 1}
                </td>
                <td className="py-3 px-4 text-right text-gray-800">
                  ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Shipping:</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Payment method:</span>
          <span>Credit / Debit Card / NetBanking / UPI</span>
        </div>
        {isRefunded && (
          <>
            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Refund:</span>
              <span>- ₹{order.totalAmount?.toFixed(2) ?? '0.00'}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-900 pt-2">
              <span>Total:</span>
              <span>
                <span className="line-through text-gray-500">
                  ₹{order.totalAmount?.toFixed(2) ?? '0.00'}
                </span>{' '}
                <span className="text-green-600">₹0.00</span>
              </span>
            </div>
          </>
        )}
        {!isRefunded && (
          <div className="flex justify-between text-base font-semibold text-gray-900 pt-2">
            <span>Total:</span>
            <span>₹{order.totalAmount?.toFixed(2) ?? '0.00'}</span>
          </div>
        )}
      </div>

      {(order.billingAddress || order.shippingAddress) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              Billing address
            </h3>
            {order.billingAddress ? (
              <address className="text-gray-600 text-sm not-italic">
                {order.billingAddress.name && <p>{order.billingAddress.name}</p>}
                {order.billingAddress.address1 && <p>{order.billingAddress.address1}</p>}
                {order.billingAddress.address2 && <p>{order.billingAddress.address2}</p>}
                <p>
                  {[order.billingAddress.city, order.billingAddress.province, order.billingAddress.zip]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {order.billingAddress.country && <p>{order.billingAddress.country}</p>}
                {order.billingAddress.phone && <p className="mt-1">{order.billingAddress.phone}</p>}
                {order.email && <p>{order.email}</p>}
              </address>
            ) : (
              <p className="text-gray-500 text-sm">No billing address on file.</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">
              Shipping address
            </h3>
            {order.shippingAddress ? (
              <address className="text-gray-600 text-sm not-italic">
                {order.shippingAddress.name && <p>{order.shippingAddress.name}</p>}
                {order.shippingAddress.address1 && <p>{order.shippingAddress.address1}</p>}
                {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                <p>
                  {[order.shippingAddress.city, order.shippingAddress.province, order.shippingAddress.zip]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
                {order.shippingAddress.phone && <p className="mt-1">{order.shippingAddress.phone}</p>}
              </address>
            ) : (
              <p className="text-gray-500 text-sm">No shipping address on file.</p>
            )}
          </div>
        </div>
      )}

      <Link
        href="/account/orders"
        className="inline-flex px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Go Back
      </Link>
    </div>
  )
}
