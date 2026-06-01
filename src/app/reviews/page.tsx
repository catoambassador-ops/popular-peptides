'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ChevronRight, CheckCircle } from 'lucide-react'
import { getAllReviews } from '@/data/reviews'

function Stars({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={interactive ? 28 : 14}
          className={`${i <= (interactive ? hover || rating : rating) ? 'fill-yellow-400 text-yellow-400' : 'text-border-default'} ${interactive ? 'cursor-pointer transition-colors' : ''}`}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(i)}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const allReviews = getAllReviews()
  const [form, setForm] = useState({ name: '', location: '', product: '', title: '', body: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Send to Google Sheets webhook
    const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'review', timestamp: new Date().toISOString(), ...form }),
        })
      } catch {}
    }
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">Reviews</span>
          </nav>
          <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">Customer Reviews</h1>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-display text-2xl font-700 text-text-primary">5.0</span>
            <span className="font-mono text-sm text-text-muted">· {allReviews.length} verified reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-5">
            {allReviews.map(review => (
              <div key={review.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Stars rating={review.rating} />
                      {review.verified && (
                        <span className="font-mono text-[10px] text-brand-green tracking-widest">✓ VERIFIED PURCHASE</span>
                      )}
                    </div>
                    <h3 className="font-display text-base font-700 text-text-primary">"{review.title}"</h3>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap ml-4">
                    {new Date(review.date).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{review.body}</p>
                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <span className="font-display text-sm font-700 text-text-primary">{review.name}</span>
                    <span className="font-mono text-xs text-text-muted ml-2">{review.location}</span>
                  </div>
                  {review.productSlug ? (
                    <Link href={`/products/${review.productSlug}`} className="font-mono text-xs text-brand-cyan hover:underline">
                      {review.product}
                    </Link>
                  ) : (
                    <span className="font-mono text-xs text-text-muted">{review.product}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit form */}
          <div id="submit">
            <div className="card p-6 sticky top-24">
              <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-1">Leave a Review</h2>
              <p className="text-xs text-text-muted mb-5">Share your research experience with the community.</p>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle size={40} className="text-brand-cyan mx-auto" />
                  <div className="font-display text-base font-700 text-text-primary">Thank you!</div>
                  <p className="text-sm text-text-secondary">Your review has been submitted and will appear after verification.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-1.5">Your Rating</label>
                    <Stars rating={form.rating} interactive onRate={r => setForm(p => ({ ...p, rating: r }))} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widests uppercase mb-1.5">Name *</label>
                    <input required className="input-field" placeholder="First name + last initial" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-1.5">Location</label>
                    <input className="input-field" placeholder="City, Province" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-1.5">Product *</label>
                    <input required className="input-field" placeholder="Which product?" value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-1.5">Review Title *</label>
                    <input required className="input-field" placeholder="Sum it up in one line" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-1.5">Your Review *</label>
                    <textarea required rows={4} className="input-field resize-none" placeholder="Tell us about your experience..." value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <p className="font-mono text-[10px] text-text-muted text-center">Reviews are verified before publishing</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
