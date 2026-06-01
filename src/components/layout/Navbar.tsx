'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, ChevronDown, Search } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Shop',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Peptides', href: '/category/peptides' },
      { label: 'Accessories', href: '/category/accessories' },
      { label: 'Shop A–Z', href: '/products?sort=name' },
    ]
  },
  { label: 'Lab Results', href: '/lab-results' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { itemCount, toggleCart } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
        : 'bg-transparent'
    )}>
      {/* Announcement bar */}
      <div className="bg-brand-cyan text-bg-primary text-xs font-mono tracking-widest text-center py-2 px-4">
        FREE SHIPPING ON ORDERS OVER $150 CAD &nbsp;·&nbsp; THIRD-PARTY TESTED &nbsp;·&nbsp; CANADIAN COMPANY
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-7 relative overflow-hidden rounded-sm shadow-sm flex-shrink-0">
              <Image
                src="/images/branding/canadaflag.jpg"
                alt="Canada flag"
                fill
                className="object-cover"
              />
            </div>
            <div className="leading-none">
              <div className="font-display text-lg font-700 text-text-primary tracking-widest uppercase">
                POPULAR
              </div>
              <div className="font-display text-[10px] font-500 text-brand-cyan tracking-[0.3em] uppercase -mt-0.5">
                PEPTIDES
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className={cn(
                    'flex items-center gap-1 px-4 py-2 font-body text-sm transition-colors duration-150',
                    pathname.startsWith(link.href)
                      ? 'text-brand-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  )}>
                    {link.label}
                    <ChevronDown size={14} className={cn(
                      'transition-transform duration-200',
                      activeDropdown === link.label ? 'rotate-180' : ''
                    )} />
                  </button>
                ) : (
                  <Link href={link.href} className={cn(
                    'flex items-center px-4 py-2 font-body text-sm transition-colors duration-150',
                    pathname === link.href
                      ? 'text-brand-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  )}>
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-1 w-48">
                    <div className="bg-bg-secondary border border-border-default shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-1">
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/products?search=1" className="btn-ghost hidden sm:flex p-2">
              <Search size={18} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-cyan text-bg-primary text-[10px] font-mono font-700 rounded-none flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>

            <Link href="/account" className="hidden sm:block btn-outline py-2 text-xs">
              Account
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bg-secondary border-t border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 border-l border-border-subtle ml-4">
                    {link.children.slice(1).map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-xs text-text-muted hover:text-text-secondary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
