'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useWishlistStore } from '@/lib/wishlist-store'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'

export default function WishlistPage() {
  const { slugs, clear } = useWishlistStore()
  const wishlistProducts = products.filter(p => slugs.includes(p.slug))

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={18} className="text-red-400 fill-red-400" />
                <span className="section-label">Saved Items</span>
              </div>
              <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">My Wishlist</h1>
              <p className="text-text-muted font-mono text-xs mt-1">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
            </div>
            {wishlistProducts.length > 0 && (
              <button onClick={clear} className="font-mono text-xs text-text-muted hover:text-text-secondary transition-colors">
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Heart size={40} className="text-border-default mx-auto" />
            <p className="font-display text-lg text-text-secondary">Your wishlist is empty</p>
            <p className="text-sm text-text-muted">Tap the heart icon on any product to save it here</p>
            <Link href="/products" className="btn-primary inline-flex mt-4">
              <ShoppingCart size={15} /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link href="/products" className="flex items-center gap-2 text-text-muted hover:text-brand-cyan transition-colors font-mono text-sm">
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}
