import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, FlaskConical, Truck, Award, ChevronRight } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'

const researchCategories = [
  { name: 'Musculoskeletal', href: '/products?area=musculoskeletal', icon: '🦴' },
  { name: 'Cognitive', href: '/products?area=cognitive', icon: '🧠' },
  { name: 'Metabolic', href: '/products?area=metabolic', icon: '⚡' },
  { name: 'Hormonal', href: '/products?area=hormonal', icon: '🔬' },
  { name: 'Tissue Regeneration', href: '/products?area=tissue-regeneration', icon: '🧬' },
  { name: 'Immune', href: '/products?area=immune', icon: '🛡️' },
  { name: 'Dermatological', href: '/products?area=dermatological', icon: '💊' },
  { name: 'Cellular Longevity', href: '/products?area=cellular-longevity', icon: '🔭' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-hero-glow" />
        
        {/* Animated cyan line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-brand-cyan to-transparent opacity-40" />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-24 pb-12">
          <div className="max-w-2xl">
            <div className="fade-up fade-up-1 flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-brand-cyan" />
              <span className="section-label">Canada's Research Compound Source</span>
            </div>

            <h1 className="fade-up fade-up-2 font-display text-5xl md:text-7xl font-700 text-text-primary leading-none tracking-tight mb-6">
              RESEARCH-GRADE<br />
              <span className="text-brand-cyan">PEPTIDES</span><br />
              DELIVERED
            </h1>

            <p className="fade-up fade-up-3 font-body text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              Popular Peptides is Canada's trusted source for GMP-grade research compounds, independently verified through third-party laboratory testing. Every batch includes a Certificate of Analysis, ensuring transparency, consistency, and confidence in every order.
            </p>

            <div className="fade-up fade-up-4 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link href="/lab-results" className="btn-outline">
                View Lab Results
              </Link>
            </div>

            {/* Stats */}
            <div className="fade-up fade-up-5 mt-12 flex flex-wrap gap-8">
              {[
                { value: '≥99%', label: 'Purity Standard' },
                { value: '3rd Party', label: 'Tested' },
                { value: 'Canadian', label: 'Company' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-700 text-brand-cyan">{stat.value}</div>
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero product image */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 lg:w-7/12 h-full hidden md:block">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/30 to-transparent z-10" />
            <Image
              src="/images/branding/hero-products.jpg"
              alt="Popular Peptides products"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─────────────────────────────────────────── */}
      <section className="border-y border-border-default bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: Shield, title: 'Third-Party Tested', desc: 'HPLC & Mass Spectrometry on every batch' },
              { Icon: FlaskConical, title: '≥99% Purity', desc: 'GMP manufacturing protocols' },
              { Icon: Truck, title: 'Fast Shipping', desc: 'Tracked & insured across Canada' },
              { Icon: Award, title: 'COA Included', desc: 'Certificate of Analysis with every order' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4 py-4">
                <div className="w-16 h-16 bg-brand-cyan/10 border-2 border-brand-cyan/30 rounded-full flex items-center justify-center">
                  <Icon size={30} className="text-brand-cyan" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-base font-700 text-text-primary tracking-wide uppercase">{title}</div>
                  <div className="text-sm text-text-secondary mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label mb-2">Catalog</div>
              <h2 className="section-title">Featured Compounds</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm text-brand-cyan hover:text-brand-cyan-dim transition-colors font-mono">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── RESEARCH CATEGORIES ───────────────────────────────────── */}
      <section className="py-20 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="section-label mb-2">Browse by Research Area</div>
            <h2 className="section-title">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {researchCategories.map(cat => (
              <Link
                key={cat.name}
                href={cat.href}
                className="card card-hover p-6 flex flex-col items-center text-center gap-3 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <span className="font-display text-sm font-700 text-text-primary tracking-wide uppercase group-hover:text-brand-cyan transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUALITY SECTION ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-3">Our Commitment</div>
              <h2 className="section-title mb-6">
                Quality You Can<br />
                <span className="text-brand-cyan">Verify</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Every Popular Peptides compound is produced under rigorous GMP protocols 
                  and sent to independent, certified laboratories before release.
                </p>
                <p>
                  We publish full Certificates of Analysis for every batch — HPLC chromatograms, 
                  mass spectrometry results, sterility testing, and endotoxin screening.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  'HPLC Purity Testing',
                  'LC-MS Identity Verification',
                  'Sterility Screening',
                  'Endotoxin Testing',
                  'Contaminant Analysis',
                  'COA With Every Order',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-cyan shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/lab-results" className="btn-outline mt-8 inline-flex">
                View Lab Results <ArrowRight size={15} />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-bg-secondary border border-border-default p-8 relative overflow-hidden">
                <div className="grid-bg absolute inset-0" />
                <div className="relative space-y-4">
                  {[
                    { label: 'BPC-157 Batch #PP-240601', purity: '99.7%', status: 'PASSED' },
                    { label: 'TB-500 Batch #PP-240601', purity: '99.4%', status: 'PASSED' },
                    { label: 'Epitalon Batch #PP-240601', purity: '99.8%', status: 'PASSED' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between bg-bg-primary/50 border border-border-subtle px-4 py-3">
                      <div>
                        <div className="font-mono text-xs text-text-secondary">{row.label}</div>
                        <div className="font-display text-sm font-600 text-text-primary mt-0.5">
                          Purity: <span className="text-brand-cyan">{row.purity}</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 border border-brand-green/40 bg-brand-green/10">
                        <span className="font-mono text-xs text-brand-green tracking-widest">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAYMENT INFO ──────────────────────────────────────────── */}
      <section className="py-12 bg-bg-secondary/50 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label mb-3">Payment Options</div>
          <h3 className="font-display text-2xl font-700 text-text-primary mb-3">
            Simple, Secure Checkout
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto mb-6">
            We currently accept Interac E-Transfer to{' '}
            <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a>.
            Credit card processing via Mobopay coming soon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2.5 border border-border-bright bg-bg-elevated font-mono text-sm text-brand-cyan tracking-wide">
              INTERAC E-TRANSFER
            </div>
            <div className="px-5 py-2.5 border border-border-subtle bg-bg-elevated font-mono text-sm text-text-muted tracking-wide">
              MOBOPAY — COMING SOON
            </div>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER ────────────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-mono text-[11px] text-text-muted leading-relaxed tracking-wide">
            All products offered by Popular Peptides are intended for research purposes only. 
            These compounds are not approved for human consumption, therapeutic use, or veterinary use. 
            By purchasing, you certify that you are a researcher aged 18+ and that compounds will be used 
            for laboratory research purposes only. Popular Peptides is not responsible for misuse.
          </p>
        </div>
      </section>
    </div>
  )
}
