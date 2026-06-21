import type { Metadata } from 'next'
import { ogImage } from '@/lib/og'

const url = 'https://popularpeptides.ca/reviews'
const title = 'Customer Reviews — Trusted by Canadian Researchers'
const description =
  'Read verified Popular Peptides customer reviews. See why Canadian researchers trust us for third-party tested, GMP-manufactured research peptides with a COA on every order.'
const image = ogImage({
  title: 'Trusted by Canadian Researchers',
  subtitle: 'Verified customer reviews of Popular Peptides',
  kicker: 'Customer Reviews · Canada',
  alt: 'Popular Peptides customer reviews',
})

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    siteName: 'Popular Peptides',
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image.url],
  },
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
