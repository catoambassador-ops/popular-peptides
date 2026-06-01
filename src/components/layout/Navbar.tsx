'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, ChevronDown, Search, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import { products } from '@/data/products'

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, toggleCart } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const searchResults = searchQuery.length > 1
    ? products.filter(p =>
        !p.hidden && (
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.includes(searchQuery.toLowerCase()))
        )
      ).slice(0, 6)
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}>
        {/* Announcement bar */}
        <div className="bg-brand-cyan text-bg-primary text-xs font-mono tracking-widest text-center py-2 px-4">
          FREE SHIPPING ON ORDERS OVER $300 CAD &nbsp;·&nbsp; THIRD-PARTY TESTED &nbsp;·&nbsp; CANADIAN COMPANY
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
                <div className="font-display text-lg font-700 text-text-primary tracking-widest uppercase leading-tight">
                  POPULAR
                </div>
                <div className="font-display text-xs font-600 text-brand-cyan tracking-[0.2em] uppercase leading-tight -mt-0.5">
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
            <div className="flex items-center gap-3">

              {/* Category dropdown */}
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-cyan text-bg-primary font-display font-700 text-sm tracking-widest uppercase hover:bg-brand-cyan-dim transition-colors">
                  Categories <ChevronDown size={14} className={cn('transition-transform duration-200', activeDropdown === 'categories' ? 'rotate-180' : '')} />
                </button>
                {activeDropdown === 'categories' && (
                  <div className="absolute top-full right-0 pt-1 w-52 z-50">
                    <div className="bg-bg-secondary border border-border-default shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-1">
                      {[
                        { label: 'All Products', href: '/products' },
                        { label: 'Metabolic', href: '/products?area=metabolic' },
                        { label: 'Hormonal', href: '/products?area=hormonal' },
                        { label: 'Dermatological', href: '/products?area=dermatological' },
                        { label: 'Cellular Longevity', href: '/products?area=cellular-longevity' },
                        { label: 'Cognitive', href: '/products?area=cognitive' },
                        { label: 'Tissue Regeneration', href: '/products?area=tissue-regeneration' },
                        { label: 'Musculoskeletal', href: '/products?area=musculoskeletal' },
                        { label: 'Accessories', href: '/category/accessories' },
                      ].map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-600 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors hidden sm:flex"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggleCart}
                className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-cyan text-bg-primary text-[10px] font-mono font-700 rounded-none flex items-center justify-center px-1">
                    {count}
                  </span>
                )}
              </button>

              {/* Account button hidden */}

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

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />

          {/* Search panel */}
          <div className="relative z-10 bg-bg-secondary border-b border-border-default shadow-[0_8px_40px_rgba(0,0,0,0.4)] mt-[88px]">
            <div className="max-w-3xl mx-auto px-4 py-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <Search size={20} className="text-brand-cyan flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-text-primary placeholder-text-muted font-body text-lg outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X size={16} className="text-text-muted hover:text-text-primary" />
                  </button>
                )}
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <span className="font-mono text-xs text-text-muted border border-border-subtle px-2 py-1">ESC</span>
                </button>
              </form>

              {/* Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 border-t border-border-subtle pt-4 space-y-1 pb-2">
                  {searchResults.map(product => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between px-3 py-3 hover:bg-bg-tertiary rounded transition-colors group"
                    >
                      <div>
                        <div className="font-display text-sm font-700 text-text-primary group-hover:text-brand-cyan transition-colors">
                          {product.name}
                        </div>
                        <div className="font-mono text-xs text-text-muted mt-0.5">
                          {product.variants[0]?.name} — CAD ${(product.variants[0]?.price / 100).toFixed(2)}
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-text-muted group-hover:text-brand-cyan transition-colors" />
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.length > 1 && searchResults.length === 0 && (
                <div className="mt-4 border-t border-border-subtle pt-4 pb-2 text-center font-mono text-sm text-text-muted">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
