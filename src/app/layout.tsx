import type { Metadata } from 'next'
import { Rajdhani, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ConsentModal } from '@/components/ConsentModal'
import { WelcomeBackBanner } from '@/components/WelcomeBackBanner'
import { Analytics } from '@/components/Analytics'
import { Toaster } from 'react-hot-toast'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Popular Peptides — Research Compounds Canada',
    template: '%s | Popular Peptides',
  },
  description: 'Canada\'s trusted source for research-grade peptides. Third-party tested, GMP manufactured. Free shipping over $300 CAD.',
  keywords: ['peptides canada', 'research peptides', 'bpc-157 canada', 'tb-500 canada', 'buy peptides', 'canadian peptides'],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://popularpeptides.ca',
    siteName: 'Popular Peptides',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <Analytics />
        <ConsentModal />
        <WelcomeBackBanner />
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#13181F',
              color: '#F0F4FF',
              border: '1px solid #243040',
              fontFamily: 'var(--font-body)',
            },
            success: {
              iconTheme: { primary: '#00D4FF', secondary: '#080A0F' },
            },
          }}
        />
      </body>
    </html>
  )
}
