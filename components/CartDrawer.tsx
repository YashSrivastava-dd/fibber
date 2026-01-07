'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { isOpen, items, closeCart, updateQuantity, removeItem, getTotal } =
    useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Your cart is empty</p>
                <Link
                  href="/collections/all"
                  onClick={closeCart}
                  className="text-black underline"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mb-2">
                          {item.variant}
                        </p>
                      )}
                      <p className="text-sm font-semibold mb-2">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-500 hover:text-black underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping, taxes, and discounts calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Checkout
              </Link>
              <Link
                href="/collections/all"
                onClick={closeCart}
                className="block w-full text-center py-3 text-sm underline"
              >
                Continue shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

