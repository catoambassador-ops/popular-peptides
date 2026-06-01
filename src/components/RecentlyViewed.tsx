'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRecentlyViewedStore } from '@/lib/recently-viewed-store'
import { formatPrice } from '@/lib/utils'

export function RecentlyViewed() {
  const { items } = useRecentlyViewedStore()
  if (items.length < 2) return null

  return (
    <section className="py-12 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-label mb-2">Your History</div>
        <h2 className="font-display text-2xl font-700 text-text-primary tracking-tight mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map(item => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="card card-hover flex flex-col group"
            >
              <div className="aspect-square bg-bg-tertiary relative overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform duration-300" sizes="200px" />
                ) : (
                  <div className="absolute inset-0 grid-bg" />
                )}
              </div>
              <div className="p-2">
                <div className="font-display text-xs font-700 text-text-primary group-hover:text-brand-cyan transition-colors line-clamp-1">{item.name}</div>
                <div className="font-mono text-[10px] text-text-muted mt-0.5">{formatPrice(item.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
