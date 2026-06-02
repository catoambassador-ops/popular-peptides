import type { Metadata } from 'next'
import { Rajdhani, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { ConsentModal } from '@/components/ConsentModal'
import { WelcomeBackBanner } from '@/components/WelcomeBackBanner'
import { Analytics } from '@/components/Analytics'
import { SchemaMarkup } from '@/components/SchemaMarkup'
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
    default: 'Buy Peptides Canada | Popular Peptides — Research Compounds',
    template: '%s | Popular Peptides Canada',
  },
  description: 'Buy research-grade peptides in Canada. Popular Peptides ships across Canada including Vancouver, BC — third-party tested, GMP manufactured, COA included. Free shipping over $300 CAD.',
  keywords: [
    'buy peptides canada', 'peptides canada', 'research peptides canada',
    'buy peptides Vancouver', 'peptides Vancouver BC', 'peptide shop canada',
    'BPC-157 canada', 'TB-500 canada', 'retatrutide canada', 'tirzepatide canada',
    'semax canada', 'selank canada', 'nad+ canada', 'canadian peptide supplier',
    'GMP peptides canada', 'research compounds canada', 'best peptide supplier canada',
    'peptides British Columbia', 'peptides Ontario', 'peptides Alberta',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://popularpeptides.ca',
    siteName: 'Popular Peptides',
    title: 'Buy Peptides Canada | Popular Peptides',
    description: 'Canada\'s trusted source for research-grade peptides. Ships to Vancouver, Toronto, Calgary and all of Canada. Third-party tested, COA included.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Peptides Canada | Popular Peptides',
    description: 'Research-grade peptides shipped across Canada. Third-party tested, GMP manufactured.',
  },
  alternates: {
    canonical: 'https://popularpeptides.ca',
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
        <SchemaMarkup />
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
