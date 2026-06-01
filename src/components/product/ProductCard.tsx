'use client'

import Link from 'next/link'
import { ShoppingCart, FlaskConical } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const defaultVariant = product.variants[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!defaultVariant?.inStock) return

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      productName: product.name,
      variantName: defaultVariant.name,
      price: defaultVariant.price,
      quantity: 1,
      slug: product.slug,
    })

    toast.success(`${product.shortName || product.name} added to cart`, {
      duration: 2000,
    })
    openCart()
  }

  const minPrice = Math.min(...product.variants.map(v => v.price))
  const maxPrice = Math.max(...product.variants.map(v => v.price))
  const priceDisplay = minPrice === maxPrice
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`card card-hover group flex flex-col fade-up`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Image / visual placeholder */}
      <div className="relative aspect-square bg-bg-tertiary border-b border-border-subtle overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-16 h-24 bg-bg-elevated border border-border-bright flex items-center justify-center shadow-cyan-sm group-hover:shadow-cyan-md transition-shadow">
              <FlaskConical size={24} className="text-brand-cyan" strokeWidth={1.5} />
            </div>
            {product.purity && (
              <div className="font-mono text-[10px] text-brand-cyan tracking-widest opacity-60">
                {product.purity}
              </div>
            )}
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 bg-brand-cyan text-bg-primary font-700">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={handleAddToCart}
            disabled={!defaultVariant?.inStock}
            className="w-full py-2.5 bg-brand-cyan text-bg-primary font-display text-xs font-700 tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand-cyan-dim transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={13} />
            {defaultVariant?.inStock ? 'Quick Add' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1">
          {product.category}
        </div>
        <h3 className="font-display text-sm font-700 text-text-primary tracking-wide leading-snug group-hover:text-brand-cyan transition-colors flex-1">
          {product.name}
        </h3>
        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-sm text-brand-cyan font-600">{priceDisplay}</span>
          <span className="font-mono text-[10px] text-text-muted">CAD</span>
        </div>

        {product.purity && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-1 h-1 bg-brand-green rounded-full" />
            <span className="font-mono text-[10px] text-text-muted">{product.purity} purity</span>
          </div>
        )}
      </div>
    </Link>
  )
}
