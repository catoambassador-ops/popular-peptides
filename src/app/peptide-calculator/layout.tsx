import type { Metadata } from 'next'
import { ogImage } from '@/lib/og'

const url = 'https://popularpeptides.ca/peptide-calculator'
const title = 'Peptide Reconstitution Calculator — Concentration & Aliquots'
const description =
  'Free peptide reconstitution calculator. Enter vial size and bacteriostatic water volume to calculate reconstituted concentration (mg/mL), aliquot volume, and aliquots per vial for laboratory handling. Research use only.'
const image = ogImage({
  title: 'Peptide Reconstitution Calculator',
  subtitle: 'Concentration & aliquots per vial — free research tool',
  kicker: 'Free Tool · Popular Peptides',
  alt: 'Popular Peptides peptide reconstitution calculator',
})

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'peptide reconstitution calculator', 'peptide concentration calculator',
    'BAC water calculator', 'peptide dilution calculator', 'peptide calculator canada',
  ],
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

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
