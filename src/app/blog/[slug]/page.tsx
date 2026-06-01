import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts } from '@/data/blog'
import { getProductBySlug } from '@/data/products'
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return getBlogPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Popular Peptides`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

// Product name → slug mapping for auto-linking
const PRODUCT_LINKS: { pattern: RegExp; slug: string }[] = [
  { pattern: /\bRetatrutide\b/g,                slug: 'retatrutide' },
  { pattern: /\bTirzepatide\b/g,                slug: 'tirzepatide' },
  { pattern: /\bKGLOW\b/g,                      slug: 'kglow' },
  { pattern: /\bGLOW\b(?! peptide)/g,           slug: 'glow' },
  { pattern: /\bIGF-1 LR3\b/g,                  slug: 'igf-1-lr3' },
  { pattern: /\bCJC-1295\b/g,                   slug: 'cjc-ipamorelin' },
  { pattern: /\bIpamorelin\b/g,                 slug: 'cjc-ipamorelin' },
  { pattern: /\bTesamorelin\b/g,                slug: 'tesamorelin' },
  { pattern: /\bMOTS-C\b/g,                     slug: 'mots-c' },
  { pattern: /\bDSIP\b/g,                       slug: 'dsip' },
  { pattern: /\bOxytocin Acetate\b/g,           slug: 'oxytocin-acetate' },
  { pattern: /\bNAD\+/g,                        slug: 'nad-plus' },
  { pattern: /\bGHK-Cu\b/g,                     slug: 'ghk-cu' },
  { pattern: /\bBPC-157\b/g,                    slug: 'bpc-157' },
  { pattern: /\bTB-500\b/g,                     slug: 'tb-500' },
  { pattern: /\bBacteriostatic [Ww]ater\b/g,    slug: 'bacteriostatic-water-30ml' },
  { pattern: /\bBAC [Ww]ater\b/g,              slug: 'bacteriostatic-water-30ml' },
  { pattern: /\bComplete Stack\b/g,             slug: 'complete-stack' },
]

function linkifyText(text: string): React.ReactNode[] {
  // Build a combined regex with capture groups
  const combined = PRODUCT_LINKS.map(p => `(${p.pattern.source})`).join('|')
  const regex = new RegExp(combined, 'g')
  const parts: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const matched = match[0]
    const linkDef = PRODUCT_LINKS.find(p => new RegExp(p.pattern.source).test(matched))
    if (linkDef) {
      parts.push(
        <Link
          key={match.index}
          href={`/products/${linkDef.slug}`}
          className="text-brand-cyan hover:underline font-600"
        >
          {matched}
        </Link>
      )
    } else {
      parts.push(matched)
    }
    last = match.index + matched.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length ? parts : [text]
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-display text-2xl font-700 text-text-primary mt-10 mb-4 tracking-tight">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-display text-lg font-700 text-text-primary mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('**') && line.endsWith('**') && line.includes(':')) {
      const text = line.replace(/\*\*/g, '')
      const [bold, ...rest] = text.split(':')
      elements.push(
        <p key={i} className="font-body text-base text-text-secondary leading-relaxed mb-3">
          <strong className="text-text-primary font-600">{bold}:</strong>{rest.join(':')}
        </p>
      )
    } else if (line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].replace('- ', ''))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
              <span className="text-brand-cyan mt-1 flex-shrink-0">—</span>
              <span>{linkifyText(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.startsWith('| ')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!lines[i].includes('---')) tableLines.push(lines[i])
        i++
      }
      const [header, ...rows] = tableLines
      const headers = header.split('|').filter(c => c.trim())
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr className="bg-bg-tertiary border-b border-border-default">
                {headers.map((h, j) => (
                  <th key={j} className="px-4 py-2 text-left text-text-primary font-600">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="border-b border-border-subtle">
                  {row.split('|').filter(c => c.trim()).map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-text-secondary">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="font-body text-base text-text-secondary leading-relaxed mb-4">
          {linkifyText(line)}
        </p>
      )
    }
    i++
  }
  return elements
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const relatedProducts = post.relatedProducts
    ?.map(slug => getProductBySlug(slug))
    .filter(Boolean) ?? []

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 font-display text-sm font-600 text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-bg-tertiary border border-border-subtle text-text-muted">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-text-muted font-mono text-[10px]">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>
          <h1 className="font-display text-4xl font-700 text-text-primary leading-tight tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle mb-10" />

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <div className="section-label mb-4">Related Products</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProducts.map(product => product && (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="card card-hover p-4 flex items-center justify-between group"
                >
                  <div>
                    <div className="font-display text-sm font-700 text-text-primary group-hover:text-brand-cyan transition-colors">
                      {product.name}
                    </div>
                    <div className="font-mono text-xs text-text-muted mt-0.5">
                      {product.variants[0]?.name} — CAD ${(product.variants[0]?.price / 100).toFixed(2)}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-text-muted group-hover:text-brand-cyan transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link href="/blog" className="flex items-center gap-2 text-text-muted hover:text-brand-cyan transition-colors font-mono text-sm">
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
