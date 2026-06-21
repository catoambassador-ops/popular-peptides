import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Securely complete your Popular Peptides order.',
  robots: { index: false, follow: false },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
