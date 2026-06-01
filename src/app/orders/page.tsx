'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Package, RotateCcw, ShoppingCart } from 'lucide-react'
import { getOrderHistory, SavedOrder } from '@/lib/order-store'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([])
  const { addItem, openCart } = useCartStore()

  useEffect(() => {
    setOrders(getOrderHistory())
  }, [])

  const reorder = (order: SavedOrder) => {
    order.items.forEach(item => {
      addItem({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        slug: item.slug,
      })
    })
    openCart()
    toast.success('Order added to cart!')
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">My Orders</span>
          </nav>
          <div className="flex items-center gap-3">
            <Package size={20} className="text-brand-cyan" />
            <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">My Orders</h1>
          </div>
          <p className="text-text-muted font-mono text-xs mt-1">Orders placed on this device</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {orders.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Package size={40} className="text-border-default mx-auto" />
            <p className="font-display text-lg text-text-secondary">No orders yet</p>
            <Link href="/products" className="btn-primary inline-flex mt-4">
              <ShoppingCart size={15} /> Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.orderNumber} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-mono text-xs text-text-muted tracking-widest mb-1">ORDER</div>
                    <div className="font-display text-lg font-700 text-text-primary">{order.orderNumber}</div>
                    <div className="font-mono text-xs text-text-muted mt-1">
                      {new Date(order.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-text-muted mb-1">TOTAL</div>
                    <div className="font-display text-lg font-700 text-brand-cyan">{formatPrice(order.total)}</div>
                    <button
                      onClick={() => reorder(order)}
                      className="mt-2 flex items-center gap-1.5 font-mono text-xs text-brand-cyan hover:text-brand-cyan-dim transition-colors"
                    >
                      <RotateCcw size={12} /> Reorder
                    </button>
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-4 space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="text-text-secondary">
                        <Link href={`/products/${item.slug}`} className="hover:text-brand-cyan transition-colors">
                          {item.productName}
                        </Link>
                        <span className="font-mono text-xs text-text-muted ml-2">{item.variantName} × {item.quantity}</span>
                      </div>
                      <span className="font-mono text-sm text-text-primary">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
