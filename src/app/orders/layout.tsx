import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Orders',
  description: 'View your Popular Peptides order history.',
  robots: { index: false, follow: false },
}

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children
}
