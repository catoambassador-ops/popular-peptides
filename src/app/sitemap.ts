import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { getBlogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://popularpeptides.ca'
  const now = new Date()

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${base}/peptide-calculator`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/lab-results`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const productPages = products
    .filter(p => !p.hidden)
    .map(p => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: p.featured ? 0.9 : 0.7,
    }))

  const blogPages = getBlogPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages]
}
