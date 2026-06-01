import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsByCategory } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const categoryMeta: Record<string, { title: string; description: string }> = {
  peptides: {
    title: 'Research Peptides',
    description: 'Shop all research-grade peptides. Third-party tested, GMP manufactured, COA included.',
  },
  accessories: {
    title: 'Accessories & Supplies',
    description: 'Reconstitution supplies, syringes, and accessories for peptide research.',
  },
}

interface Props {
  params: { slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = categoryMeta[params.slug]
  return meta ? { title: meta.title, description: meta.description } : { title: 'Category' }
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params
  const meta = categoryMeta[slug]
  if (!meta) notFound()

  const products = getProductsByCategory(slug)

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted mb-3">
            <Link href="/">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products">Products</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary capitalize">{slug}</span>
          </nav>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">{meta.title}</h1>
          <p className="text-text-secondary mt-2">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="font-mono text-xs text-text-muted mb-6">{products.length} products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-text-secondary text-center py-20">No products in this category yet.</p>
        )}
      </div>
    </div>
  )
}
