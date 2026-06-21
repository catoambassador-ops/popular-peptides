import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { getBlogPosts } from '@/data/blog'
import { ogImageUrl } from '@/lib/og'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://popularpeptides.ca'
  const abs = (path: string) => `${base}${path}`
  const now = new Date()

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/category/peptides`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/category/accessories`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/peptide-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/intake`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/lab-results`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/refunds`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const productPages = products
    .filter(p => !p.hidden)
    .map(p => {
      const lowest = Math.min(...p.variants.map(v => v.price))
      const price = Number.isFinite(lowest) ? `$${(lowest / 100).toFixed(2)}` : undefined
      return {
        url: `${base}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: p.featured ? 0.9 : 0.7,
        // Branded share card + product photo, surfaced for Google image results.
        images: [
          abs(ogImageUrl({ title: p.name, price, purity: p.purity, badge: p.badge })),
          ...(p.images?.[0] ? [abs(p.images[0].url)] : []),
        ],
      }
    })

  const blogPages = getBlogPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: [abs(ogImageUrl({ title: post.title, subtitle: post.excerpt, kicker: 'Research Blog' }))],
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
