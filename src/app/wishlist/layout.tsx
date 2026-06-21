import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Wishlist',
  description: 'Save research peptides to your Popular Peptides wishlist.',
  robots: { index: false, follow: false },
}

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
