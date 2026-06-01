'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, shipping, total } = useCartStore()

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeCart])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-bg-secondary border-l border-border-default flex flex-col shadow-[−8px_0_40px_rgba(0,0,0,0.6)]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-brand-cyan" />
            <span className="font-display text-lg font-700 tracking-widest uppercase">Cart</span>
            {items.length > 0 && (
              <span className="font-mono text-xs text-text-muted">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            )}
          </div>
          <button onClick={closeCart} className="p-1.5 text-text-secondary hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-6">
              <ShoppingCart size={40} className="text-text-muted" />
              <div>
                <p className="font-display font-600 text-text-secondary">Your cart is empty</p>
                <p className="text-sm text-text-muted mt-1">Add some research compounds to get started.</p>
              </div>
              <button onClick={closeCart} className="btn-outline mt-2 text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-px">
              {items.map(item => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 px-6 py-4 hover:bg-bg-tertiary transition-colors">
                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="font-body text-sm font-500 text-text-primary hover:text-brand-cyan transition-colors line-clamp-2"
                    >
                      {item.productName}
                    </Link>
                    <p className="font-mono text-xs text-text-muted mt-0.5">{item.variantName}</p>
                    <p className="font-mono text-sm text-brand-cyan mt-1">{formatPrice(item.price)}</p>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-text-muted hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="flex items-center border border-border-default">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-mono text-sm text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="font-mono text-xs text-text-secondary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-subtle px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Shipping</span>
                <span className="font-mono">
                  {shipping() === 0 ? (subtotal() === 0 ? '—' : 'FREE') : formatPrice(shipping())}
                </span>
              </div>
              {subtotal() > 0 && subtotal() < 15000 && (
                <p className="text-xs text-text-muted font-mono">
                  Add {formatPrice(15000 - subtotal())} for free shipping
                </p>
              )}
              <div className="flex justify-between font-display font-700 text-base pt-2 border-t border-border-subtle">
                <span className="tracking-wide">Total</span>
                <span className="font-mono text-brand-cyan">{formatPrice(total())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center"
            >
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="btn-ghost w-full text-xs">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
