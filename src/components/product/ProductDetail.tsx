'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, FlaskConical, Shield, FileText, ChevronRight, Plus, Minus, ExternalLink } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'
import toast from 'react-hot-toast'

interface Props {
  product: Product
}

export function ProductDetail({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'coa'>('description')
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = () => {
    if (!selectedVariant.inStock) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      variantName: selectedVariant.name,
      price: selectedVariant.price,
      quantity,
      slug: product.slug,
    })
    toast.success(`Added to cart`)
    openCart()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-text-secondary transition-colors">Products</Link>
            <ChevronRight size={12} />
            <Link href={`/category/${product.category}`} className="hover:text-text-secondary transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Image */}
          <div>
            <div className="aspect-square bg-bg-secondary border border-border-subtle relative overflow-hidden">
              <div className="absolute inset-0 grid-bg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-48 bg-bg-elevated border border-border-bright flex flex-col items-center justify-center gap-4 shadow-cyan-md">
                    <FlaskConical size={40} className="text-brand-cyan" strokeWidth={1.5} />
                    <div className="text-center px-3">
                      <div className="font-display text-xs font-700 text-text-primary tracking-wide leading-tight">
                        {product.shortName || product.name}
                      </div>
                      {selectedVariant && (
                        <div className="font-mono text-[10px] text-brand-cyan mt-1">{selectedVariant.name}</div>
                      )}
                    </div>
                  </div>
                  {/* Decorative corners */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-4 h-4 border-brand-cyan/40 ${
                      i === 0 ? 'border-t border-l -translate-x-2 -translate-y-2' :
                      i === 1 ? 'border-t border-r translate-x-2 -translate-y-2' :
                      i === 2 ? 'border-b border-l -translate-x-2 translate-y-2' :
                      'border-b border-r translate-x-2 translate-y-2'
                    }`} />
                  ))}
                </div>
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 bg-brand-cyan text-bg-primary font-700">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: '3rd Party Tested' },
                { icon: FlaskConical, label: '≥99% Purity' },
                { icon: FileText, label: 'COA Included' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="border border-border-subtle p-3 flex flex-col items-center gap-1.5 text-center">
                  <Icon size={16} className="text-brand-cyan" />
                  <span className="font-mono text-[10px] text-text-muted tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="font-mono text-xs text-brand-cyan tracking-widest uppercase mb-2">
              {product.category}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-700 text-text-primary tracking-tight mb-3">
              {product.name}
            </h1>
            <p className="text-text-secondary leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="font-display text-2xl font-700 text-brand-cyan">
                {formatPrice(selectedVariant.price)}
                <span className="font-mono text-sm text-text-muted ml-2">CAD</span>
              </div>
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">Size / Amount</div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className={`px-5 py-2.5 border font-mono text-sm transition-all ${
                        selectedVariant.id === variant.id
                          ? 'border-brand-cyan bg-brand-cyan-glow text-brand-cyan'
                          : variant.inStock
                            ? 'border-border-default text-text-secondary hover:border-brand-cyan hover:text-text-primary'
                            : 'border-border-subtle text-text-muted opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {variant.name}
                      {!variant.inStock && <span className="ml-2 text-[10px]">(OOS)</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">Quantity</div>
              <div className="flex items-center border border-border-default w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-mono text-sm text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant.inStock}
              className="btn-primary w-full justify-center text-base py-4 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              {selectedVariant.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* COA */}
            {product.coaUrl && (
              <a
                href={product.coaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full justify-center mb-6"
              >
                <FileText size={15} />
                View Certificate of Analysis
                <ExternalLink size={12} />
              </a>
            )}

            {/* Research areas */}
            {product.researchAreas.length > 0 && (
              <div className="mb-6">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Research Areas</div>
                <div className="flex flex-wrap gap-2">
                  {product.researchAreas.map(area => (
                    <span key={area} className="tag capitalize">{area.replace('-', ' ')}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="mt-14">
          <div className="flex border-b border-border-subtle mb-8">
            {(['description', 'specs', 'coa'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-mono text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-brand-cyan text-brand-cyan'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab === 'coa' ? 'Lab Results' : tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-2xl">
              <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
                {product.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-6 p-4 border border-border-subtle bg-bg-secondary">
                <p className="font-mono text-xs text-text-muted">
                  ⚠️ <strong className="text-text-secondary">Research Use Only.</strong> This compound is intended for in vitro research and laboratory use only. Not for human or veterinary consumption.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-lg">
              <div className="divide-y divide-border-subtle">
                {[
                  { label: 'Purity', value: product.purity || 'N/A' },
                  { label: 'CAS Number', value: product.casNumber || 'N/A' },
                  { label: 'Molecular Weight', value: product.molecularWeight || 'N/A' },
                  { label: 'Sequence', value: product.sequence || 'N/A' },
                  { label: 'Storage', value: 'Lyophilized: −20°C, dry. Reconstituted: 4°C, use within 30 days.' },
                  { label: 'Testing', value: 'HPLC, LC-MS, Sterility, Endotoxin' },
                ].map(row => (
                  <div key={row.label} className="flex py-3 gap-6">
                    <span className="font-mono text-xs text-text-muted w-32 shrink-0 tracking-wide">{row.label}</span>
                    <span className="font-mono text-xs text-text-secondary">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coa' && (
            <div className="max-w-2xl">
              {product.coaUrl ? (
                <div className="card p-6 text-center">
                  <FileText size={32} className="text-brand-cyan mx-auto mb-3" />
                  <p className="text-text-secondary mb-4">Certificate of Analysis available for this product.</p>
                  <a href={product.coaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Download COA <ExternalLink size={14} />
                  </a>
                </div>
              ) : (
                <div className="card p-6 text-center">
                  <p className="text-text-secondary">COA documents are emailed with each order. Contact us at{' '}
                    <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a>{' '}
                    for batch-specific documentation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
