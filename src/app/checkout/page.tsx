'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice, PROVINCES } from '@/lib/utils'
import { CheckoutForm } from '@/types'

const initialForm: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  province: 'British Columbia',
  postalCode: '',
  country: 'Canada',
  paymentMethod: 'etransfer',
  notes: '',
  agreeTerms: false,
  ageVerified: false,
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, shipping, total, clearCart } = useCartStore()
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof CheckoutForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }
    if (!form.agreeTerms || !form.ageVerified) {
      setError('Please confirm you are 18+ and agree to the terms.')
      return
    }

    setLoading(true)

    try {
      const orderItems = items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            province: form.province,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: form.paymentMethod,
          subtotal: subtotal(),
          shipping: shipping(),
          total: total(),
          notes: form.notes,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to place order')

      clearCart()
      router.push(`/checkout/confirmation?order=${data.orderNumber}&method=${form.paymentMethod}&total=${total()}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again or contact us.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-display text-xl text-text-secondary">Your cart is empty</p>
          <Link href="/products" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted mb-3">
            <Link href="/">Home</Link>
            <ChevronRight size={12} />
            <Link href="/cart">Cart</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">Checkout</span>
          </nav>
          <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* ─── LEFT: Form ─── */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Contact */}
              <div className="card p-6">
                <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-5">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">First Name *</label>
                    <input required className="input-field" value={form.firstName} onChange={set('firstName')} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Last Name *</label>
                    <input required className="input-field" value={form.lastName} onChange={set('lastName')} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Email *</label>
                    <input required type="email" className="input-field" value={form.email} onChange={set('email')} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Phone</label>
                    <input type="tel" className="input-field" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="card p-6">
                <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Address *</label>
                    <input required className="input-field" placeholder="Street address" value={form.address1} onChange={set('address1')} />
                  </div>
                  <div>
                    <input className="input-field" placeholder="Apartment, suite, etc. (optional)" value={form.address2} onChange={set('address2')} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">City *</label>
                      <input required className="input-field" value={form.city} onChange={set('city')} />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Province *</label>
                      <select required className="input-field" value={form.province} onChange={set('province')}>
                        {PROVINCES.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Postal Code *</label>
                      <input required className="input-field" placeholder="A1A 1A1" value={form.postalCode} onChange={set('postalCode')} />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Country</label>
                      <input className="input-field bg-bg-elevated cursor-not-allowed" value="Canada" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card p-6">
                <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-5">Payment Method</h2>
                
                <div className="space-y-3">
                  {/* E-Transfer */}
                  <label className={`block cursor-pointer border p-4 transition-all ${
                    form.paymentMethod === 'etransfer'
                      ? 'border-brand-cyan bg-brand-cyan-glow'
                      : 'border-border-default hover:border-brand-cyan/50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="etransfer"
                        checked={form.paymentMethod === 'etransfer'}
                        onChange={set('paymentMethod')}
                        className="mt-1 accent-brand-cyan"
                      />
                      <div>
                        <div className="font-display text-sm font-700 text-text-primary tracking-wide">Interac E-Transfer</div>
                        <div className="text-xs text-text-secondary mt-1">
                          Send to <span className="text-brand-cyan">sales@popularpeptides.ca</span> after placing your order. 
                          Use your order number as the message. Orders are processed once payment is confirmed.
                        </div>
                      </div>
                    </div>
                  </label>

                </div>
              </div>

              {/* Notes */}
              <div className="card p-6">
                <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-4">Order Notes <span className="text-text-muted font-mono text-sm">(optional)</span></h2>
                <textarea
                  className="input-field resize-none h-24"
                  placeholder="Special instructions, questions..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </div>

              {/* Confirmations */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.ageVerified}
                    onChange={set('ageVerified')}
                    className="mt-1 accent-brand-cyan"
                  />
                  <span className="text-sm text-text-secondary">
                    I confirm I am <strong className="text-text-primary">18 years of age or older</strong> and that all products will be used for legitimate research purposes only, not for human consumption.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={set('agreeTerms')}
                    className="mt-1 accent-brand-cyan"
                  />
                  <span className="text-sm text-text-secondary">
                    I agree to the{' '}
                    <Link href="/terms" className="text-brand-cyan hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-brand-cyan hover:underline">Privacy Policy</Link>.
                  </span>
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/10 text-red-400">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* ─── RIGHT: Order Summary ─── */}
            <div>
              <div className="card p-6 sticky top-24">
                <h2 className="font-display text-lg font-700 text-text-primary tracking-wide mb-5">Order Summary</h2>
                
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-text-secondary line-clamp-1">{item.productName}</p>
                        <p className="font-mono text-xs text-text-muted">{item.variantName} × {item.quantity}</p>
                      </div>
                      <span className="font-mono text-sm text-text-primary shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border-subtle pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Shipping</span>
                    <span className="font-mono">
                      {shipping() === 0 ? 'FREE' : formatPrice(shipping())}
                    </span>
                  </div>
                  <div className="flex justify-between font-display font-700 text-base pt-2 border-t border-border-subtle">
                    <span>Total</span>
                    <span className="font-mono text-brand-cyan">{formatPrice(total())}</span>
                  </div>
                </div>

                {subtotal() < 15000 && (
                  <p className="font-mono text-xs text-text-muted mt-3">
                    Add {formatPrice(15000 - subtotal())} for free shipping
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="btn-primary w-full justify-center mt-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>

                <p className="font-mono text-[10px] text-text-muted text-center mt-3">
                  Research use only. 18+.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
