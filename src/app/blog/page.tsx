import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Research Blog' }

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Research</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Blog</h1>
          <p className="text-text-secondary mt-2">Research notes, compound guides, and lab updates.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="font-mono text-text-muted">Articles coming soon.</p>
      </div>
    </div>
  )
}
