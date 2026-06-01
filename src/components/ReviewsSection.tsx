import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { getFeaturedReviews } from '@/data/reviews'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-border-default'} />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const featured = getFeaturedReviews()

  return (
    <section className="py-20 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label mb-2">Customer Reviews</div>
            <h2 className="section-title">What Researchers Are Saying</h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="font-display text-lg font-700 text-text-primary">5.0</span>
              <span className="font-mono text-xs text-text-muted">· {featured.length}+ verified reviews</span>
            </div>
          </div>
          <Link href="/reviews" className="hidden sm:flex items-center gap-1 text-sm text-brand-cyan hover:text-brand-cyan-dim transition-colors font-mono">
            All Reviews <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map(review => (
            <div key={review.id} className="card p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <Stars rating={review.rating} />
                {review.verified && (
                  <span className="font-mono text-[9px] text-brand-green tracking-widest uppercase">✓ Verified</span>
                )}
              </div>
              <h3 className="font-display text-sm font-700 text-text-primary mb-2 leading-snug">"{review.title}"</h3>
              <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-4">{review.body}</p>
              <div className="mt-4 pt-3 border-t border-border-subtle">
                <div className="font-display text-xs font-700 text-text-primary">{review.name}</div>
                <div className="font-mono text-[10px] text-text-muted mt-0.5">{review.location} · {review.product}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link href="/reviews" className="sm:hidden flex items-center gap-1 text-sm text-brand-cyan font-mono">
            See all reviews <ArrowRight size={14} />
          </Link>
          <Link href="/reviews#submit" className="ml-auto btn-outline py-2.5 text-sm">
            Leave a Review
          </Link>
        </div>
      </div>
    </section>
  )
}
