'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Copy, Mail, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'
import { formatPrice } from '@/lib/utils'

function ConfirmationContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order') || ''
  const method = params.get('method') || 'etransfer'
  const total = Number(params.get('total') || 0)

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber)
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-green/10 border border-brand-green/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-brand-green" />
          </div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight mb-3">
            Order Confirmed
          </h1>
          <p className="text-text-secondary">
            Thank you for your order. We've received it and sent a confirmation to your email.
          </p>
        </div>

        {/* Order number */}
        <div className="card p-6 mb-6 text-center">
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Order Number</div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-2xl font-700 text-brand-cyan tracking-widest">{orderNumber}</span>
            <button onClick={copyOrderNumber} className="p-1.5 text-text-muted hover:text-text-primary transition-colors">
              <Copy size={15} />
            </button>
          </div>
        </div>

        {/* Payment instructions */}
        {method === 'etransfer' && (
          <div className="card p-6 mb-6 border-brand-cyan/20">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={18} className="text-brand-cyan" />
              <h2 className="font-display text-lg font-700 text-text-primary tracking-wide">E-Transfer Instructions</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border-subtle">
                <span className="text-text-muted">Send to</span>
                <span className="text-brand-cyan font-mono">sales@popularpeptides.ca</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border-subtle">
                <span className="text-text-muted">Amount</span>
                <span className="text-text-primary font-mono font-600">{formatPrice(total)} CAD</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-text-muted">Message / Note</span>
                <div className="flex items-center gap-2">
                  <span className="text-brand-cyan font-mono font-600">{orderNumber}</span>
                  <button onClick={copyOrderNumber} className="text-text-muted hover:text-text-primary">
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-bg-tertiary border border-border-subtle">
              <p className="font-mono text-xs text-text-muted">
                Your order will be processed and shipped within 1–2 business days once payment is confirmed. 
                You'll receive a tracking number via email.
              </p>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="card p-6 mb-8">
          <h3 className="font-display text-sm font-700 text-text-primary tracking-wide mb-4">What Happens Next</h3>
          <div className="space-y-3">
            {[
              method === 'etransfer' ? 'Send your e-transfer using the instructions above' : 'Payment will be processed automatically',
              'We\'ll verify payment and prepare your order',
              'Your order ships with tracking (1–2 business days)',
              'You\'ll receive a tracking number via email',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 border border-brand-cyan/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-[10px] text-brand-cyan">{i + 1}</span>
                </div>
                <span className="text-sm text-text-secondary">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary">
            Continue Shopping <ArrowRight size={15} />
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><p className="text-text-secondary">Loading...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
