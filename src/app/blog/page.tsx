import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/data/blog'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research Blog',
  description: 'Research guides, compound overviews, and lab notes from Popular Peptides — Canada\'s trusted source for GMP-grade research compounds.',
  alternates: { canonical: 'https://popularpeptides.ca/blog' },
  openGraph: {
    type: 'website',
    url: 'https://popularpeptides.ca/blog',
    siteName: 'Popular Peptides',
    title: 'Research Blog — Popular Peptides Canada',
    description: 'Research guides, compound overviews, and lab notes from Popular Peptides.',
    images: [{ url: '/images/branding/science.png', width: 1536, height: 1024, alt: 'Popular Peptides research blog' }],
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Research</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Research Blog</h1>
          <p className="text-text-secondary mt-2 max-w-xl">Compound overviews, research guides, and lab notes from Popular Peptides — Canada's source for GMP-grade research compounds.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card card-hover flex flex-col group"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-bg-tertiary border border-border-subtle text-text-muted">
                    {post.category}
                  </span>
                </div>
                <h2 className="font-display text-lg font-700 text-text-primary leading-snug group-hover:text-brand-cyan transition-colors flex-1">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text-muted font-mono text-[10px]">
                    <Clock size={10} />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="text-brand-cyan font-mono text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
