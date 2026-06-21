// Builds a URL for the dynamic, branded Open Graph image (see app/api/og/route.tsx).
// Returns a root-relative path; metadataBase resolves it to an absolute URL.

export type OgImageParams = {
  title: string
  subtitle?: string
  kicker?: string
  price?: string
  purity?: string
  badge?: string
}

export function ogImageUrl(p: OgImageParams): string {
  const sp = new URLSearchParams()
  sp.set('title', p.title)
  if (p.subtitle) sp.set('subtitle', p.subtitle)
  if (p.kicker) sp.set('kicker', p.kicker)
  if (p.price) sp.set('price', p.price)
  if (p.purity) sp.set('purity', p.purity)
  if (p.badge) sp.set('badge', p.badge)
  return `/api/og?${sp.toString()}`
}

// Convenience for an OpenGraph/Twitter images entry.
export function ogImage(p: OgImageParams & { alt?: string }) {
  return { url: ogImageUrl(p), width: 1200, height: 630, alt: p.alt ?? p.title }
}
