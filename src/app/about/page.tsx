import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, FlaskConical, Truck, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Popular Peptides — Canada\'s trusted source for research-grade peptides.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Our Story</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">About Popular Peptides</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="font-display text-2xl font-700 text-brand-cyan tracking-widest uppercase mb-4">Canada's Research Compound Source</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Popular Peptides was founded to give Canadian researchers reliable, verified access to 
              research-grade peptide compounds without compromise on quality or transparency.
            </p>
            <p>
              We believe that quality starts with accountability. Every compound we offer is independently 
              tested by certified third-party laboratories before it ever reaches a customer. We publish 
              our Certificates of Analysis and stand behind every batch we ship.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl font-700 text-brand-cyan tracking-widest uppercase text-center mb-8">Our Standards</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { Icon: Shield, title: 'Uncompromising Quality', desc: 'Third-party HPLC and LC-MS testing on every batch. ≥99% purity standard across our entire catalog.' },
              { Icon: FlaskConical, title: 'Research Focus', desc: 'We exist to support legitimate scientific research. Our catalog is curated to serve the compounds researchers actually need.' },
              { Icon: Truck, title: 'Reliable Fulfillment', desc: 'Fast, discreet shipping across Canada. Tracked and insured delivery with order confirmations.' },
              { Icon: Users, title: 'Researcher Support', desc: 'Questions about compounds, reconstitution, or storage? Our team answers every inquiry. Email us anytime.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <Icon size={22} className="text-brand-cyan mb-4" />
                <h3 className="font-display text-base font-700 text-text-primary tracking-wide mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center card p-8">
          <h2 className="font-display text-2xl font-700 text-text-primary mb-3">Ready to Order?</h2>
          <p className="text-text-secondary mb-6">Browse our catalog of independently-verified research compounds.</p>
          <Link href="/products" className="btn-primary">Shop Now</Link>
        </section>
      </div>
    </div>
  )
}
