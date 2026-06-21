import type { Metadata } from 'next'

const url = 'https://popularpeptides.ca/intake'
const title = 'Request More Info'
const description =
  'Have a question about a research compound, its Certificate of Analysis, availability, shipping, or a bulk order? Send us the details and the Popular Peptides team will respond within 1 business day. Research use only.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    siteName: 'Popular Peptides',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children
}
