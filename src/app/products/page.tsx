import { Metadata } from 'next'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shop Research Peptides',
  description: 'Browse our full catalog of research-grade peptides and accessories. Third-party tested, GMP manufactured.',
}

const categories = ['All', 'Peptides', 'Accessories']

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; area?: string; sort?: string; search?: string }
}) {
  let filtered = [...products]

  // Filter by category
  if (searchParams.category) {
    filtered = filtered.filter(p => p.category === searchParams.category!.toLowerCase())
  }

  // Filter by research area
  if (searchParams.area) {
    filtered = filtered.filter(p => p.researchAreas.includes(searchParams.area!))
  }

  // Sort
  if (searchParams.sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (searchParams.sort === 'price-asc') {
    filtered.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)))
  } else if (searchParams.sort === 'price-desc') {
    filtered.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)))
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="section-label mb-2">Catalog</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">
            All Products
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl">
            Research-grade compounds, independently verified. COA included with every order.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-2 text-text-muted">
            <Filter size={14} />
            <span className="font-mono text-xs tracking-widest uppercase">Filter</span>
          </div>
          
          {categories.map(cat => {
            const href = cat === 'All' ? '/products' : `/category/${cat.toLowerCase()}`
            const active = cat === 'All'
              ? !searchParams.category
              : searchParams.category === cat.toLowerCase()
            
            return (
              <a
                key={cat}
                href={href}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all ${
                  active
                    ? 'border-brand-cyan text-brand-cyan bg-brand-cyan-glow'
                    : 'border-border-default text-text-secondary hover:border-brand-cyan hover:text-text-primary'
                }`}
              >
                {cat}
              </a>
            )
          })}

          <div className="ml-auto flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">Sort:</span>
            <a href="/products?sort=name" className={`font-mono text-xs px-3 py-1.5 border transition-all ${searchParams.sort === 'name' ? 'border-brand-cyan text-brand-cyan' : 'border-border-subtle text-text-secondary hover:border-border-default'}`}>A–Z</a>
            <a href="/products?sort=price-asc" className={`font-mono text-xs px-3 py-1.5 border transition-all ${searchParams.sort === 'price-asc' ? 'border-brand-cyan text-brand-cyan' : 'border-border-subtle text-text-secondary hover:border-border-default'}`}>Price ↑</a>
            <a href="/products?sort=price-desc" className={`font-mono text-xs px-3 py-1.5 border transition-all ${searchParams.sort === 'price-desc' ? 'border-brand-cyan text-brand-cyan' : 'border-border-subtle text-text-secondary hover:border-border-default'}`}>Price ↓</a>
          </div>
        </div>

        {/* Results count */}
        <p className="font-mono text-xs text-text-muted mb-6 tracking-wide">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-xl text-text-secondary">No products found</p>
            <a href="/products" className="btn-outline mt-4 inline-flex">Clear Filters</a>
          </div>
        )}
      </div>
    </div>
  )
}
