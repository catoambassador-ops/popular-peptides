'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FlaskConical, Clock, FileText, CheckCircle } from 'lucide-react'

const TOPIC_OPTIONS = [
  'Product availability',
  'Certificate of Analysis (COA)',
  'Bulk / wholesale order',
  'Shipping & delivery',
  'Order status',
  'Other',
]

const HEARD_FROM_OPTIONS = ['Referral', 'Event', 'Social Media', 'Search']

const initial = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
  heardFrom: '',
}

export default function RequestInfoPage() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (key: keyof typeof initial, value: string) =>
    setForm(p => ({ ...p, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Please enter an email or a phone number so we can reach you.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us directly at sales@popularpeptides.ca')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-9">
          <div className="section-label mb-3">Get in Touch</div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-5xl font-500 text-text-primary tracking-tight leading-[1.05]">
            Request More Info
          </h1>
          <p className="text-text-secondary mt-5 max-w-2xl text-lg leading-relaxed">
            Have a question about a product, its documentation, availability, or a bulk order?
            Send us the details and our team will get back to you within 1 business day.
          </p>
        </div>
      </div>

      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-10">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14 items-stretch">
          {/* Info column */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-2xl font-500 text-text-primary mb-4">How It Works</h2>
              <p className="text-text-secondary leading-relaxed">
                Tell us what you&apos;d like to know. A team member reviews every message and follows
                up by email or phone — usually within one business day.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-1">Documentation</div>
                  <p className="text-text-secondary text-sm">Request a Certificate of Analysis or product specs for any compound.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-1">Fast Follow-up</div>
                  <p className="text-text-secondary text-sm">We respond within 1 business day.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <FlaskConical size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-1">Bulk &amp; Institutional</div>
                  <p className="text-text-secondary text-sm">Volume pricing available for labs, resellers, and institutional research orders.</p>
                </div>
              </div>
            </div>

            {/* Trust note — fills the column so its bottom aligns with the form card */}
            <div className="relative flex-1 min-h-[200px] hidden md:flex flex-col justify-end">
              <div className="rounded-lg border border-border-subtle bg-bg-secondary/30 p-5">
                <p className="font-mono text-[11px] text-text-muted leading-relaxed">
                  All Popular Peptides products are supplied strictly for in vitro laboratory and
                  research use only, and are not for human or veterinary consumption.
                </p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="card p-6">
            {submitted ? (
              <div className="py-12">
                <div className="text-center space-y-3">
                  <CheckCircle size={44} className="text-brand-cyan mx-auto" />
                  <div className="font-serif text-2xl font-500 text-text-primary">Message received</div>
                  <p className="text-sm text-text-secondary">
                    Thanks, {form.name.split(' ')[0]}. We&apos;ve received your message and will get back to you within 1 business day.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-border-subtle text-center">
                  <p className="text-sm text-text-secondary mb-4">In the meantime, you can browse our full research catalog.</p>
                  <Link href="/products" className="font-mono text-xs text-brand-cyan hover:underline">
                    Browse all products →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="font-mono text-xs text-text-secondary tracking-[0.15em] uppercase">Your details</div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">Full name *</label>
                  <input required className="input-field" placeholder="Your name"
                    value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">Email</label>
                    <input type="email" className="input-field" placeholder="your@email.com"
                      value={form.email} onChange={e => update('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">Phone</label>
                    <input type="tel" className="input-field" placeholder="(555) 555-5555"
                      value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </div>
                </div>
                <p className="font-mono text-[11px] text-text-muted -mt-1">Enter at least an email or a phone number.</p>

                <div className="pt-2 font-mono text-xs text-text-secondary tracking-[0.15em] uppercase">Your question</div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">Topic</label>
                  <select className="input-field" value={form.topic}
                    onChange={e => update('topic', e.target.value)}>
                    <option value="">Select…</option>
                    {TOPIC_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">Message</label>
                  <textarea className="input-field min-h-[110px]" placeholder="How can we help? Include product names, quantities, or anything else that helps us answer quickly."
                    value={form.message} onChange={e => update('message', e.target.value)} />
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-[0.15em] uppercase mb-2">How did you hear about us?</label>
                  <select className="input-field" value={form.heardFrom}
                    onChange={e => update('heardFrom', e.target.value)}>
                    <option value="">Select…</option>
                    {HEARD_FROM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending…' : 'Send Request'}
                </button>
                <p className="font-mono text-[11px] text-text-muted text-center leading-relaxed">
                  By submitting, you agree to be contacted about your inquiry. All products are sold for in vitro research use only.
                </p>
                <p className="font-mono text-xs text-text-muted text-center">
                  Prefer email? <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Trust note (mobile) — shown below the form */}
        <div className="md:hidden mt-10 rounded-lg border border-border-subtle bg-bg-secondary/30 p-5">
          <p className="font-mono text-[11px] text-text-muted leading-relaxed">
            All Popular Peptides products are supplied strictly for in vitro laboratory and research
            use only, and are not for human or veterinary consumption.
          </p>
        </div>
      </div>
    </div>
  )
}
