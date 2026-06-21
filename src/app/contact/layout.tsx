import type { Metadata } from 'next'
import { ogImage } from '@/lib/og'

const url = 'https://popularpeptides.ca/contact'
const title = 'Contact Popular Peptides'
const description =
  'Questions about research peptides, orders or shipping in Canada? Contact the Popular Peptides team — we reply within 1 business day.'
const image = ogImage({
  title: 'Contact Popular Peptides',
  subtitle: 'Questions on products, orders or shipping? We reply within 1 business day',
  kicker: 'Get in Touch · Canada',
  alt: 'Contact Popular Peptides',
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
