'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@/lib/orders/types'

interface UseOrdersResult {
  orders: Order[]
  loading: boolean
  error: string | null
  hasNextPage: boolean
  loadMore: () => void
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchOrders = async (after?: string | null) => {
    try {
      if (after) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const url = new URL('/api/orders', window.location.origin)
      if (after) {
        url.searchParams.set('cursor', after)
      }

      const res = await fetch(url.toString(), { method: 'GET' })
      if (res.status === 401) {
        setOrders([])
        setHasNextPage(false)
        setCursor(null)
        setError('Not authenticated')
        return
      }

      const data = await res.json()

      const newOrders: Order[] = data.orders || []
      const pageInfo = data.pageInfo || { hasNextPage: false, endCursor: null }

      if (after) {
        setOrders((prev) => [...prev, ...newOrders])
      } else {
        setOrders(newOrders)
      }

      setHasNextPage(!!pageInfo.hasNextPage)
      setCursor(pageInfo.endCursor || null)
    } catch (err: any) {
      setError(err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMore = () => {
    if (hasNextPage && cursor && !loadingMore) {
      fetchOrders(cursor)
    }
  }

  return { orders, loading, error, hasNextPage, loadMore }
}

