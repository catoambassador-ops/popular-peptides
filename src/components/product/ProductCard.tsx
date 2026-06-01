'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, FlaskConical, Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'
import { useWishlistStore } from '@/lib/wishlist-store'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const { toggle, has } = useWishlistStore()
  const defaultVariant = product.variants[0]
  const wishlisted = has(product.slug)

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
        {product.images?.[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FlaskConical size={24} className="text-brand-cyan" strokeWidth={1.5} />
            </div>
          </>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 bg-brand-cyan text-bg-primary font-700">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product.slug); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', { duration: 1500 }) }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-bg-secondary/80 backdrop-blur-sm border border-border-subtle hover:border-red-400 transition-all"
          aria-label="Toggle wishlist"
        >
          <Heart size={14} className={wishlisted ? 'fill-red-400 text-red-400' : 'text-text-muted'} />
        </button>

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
