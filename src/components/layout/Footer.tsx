import Link from 'next/link'
import { FlaskConical, Mail, Instagram, Twitter } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'All Peptides', href: '/category/peptides' },
    { label: 'Accessories', href: '/category/accessories' },
    { label: 'Shop A–Z', href: '/products' },
    { label: 'Lab Results / COA', href: '/lab-results' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle mt-20">
      {/* Trust strip */}
      <div className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Third-Party Tested', sub: 'HPLC & Mass Spec' },
              { label: '≥99% Purity', sub: 'Every Batch' },
              { label: 'Canadian Company', sub: 'Based in Canada' },
              { label: 'Fast Shipping', sub: 'Tracked & Insured' },
            ].map(item => (
              <div key={item.label} className="space-y-1">
                <div className="font-display text-sm font-700 text-text-primary tracking-wide">
                  {item.label}
                </div>
                <div className="font-mono text-[11px] text-text-muted tracking-widest uppercase">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand col */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-brand-cyan flex items-center justify-center">
                <FlaskConical size={16} className="text-bg-primary" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <div className="font-display text-base font-700 text-text-primary tracking-widest uppercase">POPULAR</div>
                <div className="font-display text-[9px] font-500 text-brand-cyan tracking-[0.3em] uppercase -mt-0.5">PEPTIDES</div>
              </div>
            </Link>
            
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Canada's trusted source for research-grade peptides. 
              All compounds are for research purposes only.
            </p>

            <div className="space-y-2">
              <a href="mailto:sales@popularpeptides.ca" className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-cyan transition-colors">
                <Mail size={14} />
                sales@popularpeptides.ca
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 border border-border-default flex items-center justify-center text-text-secondary hover:border-brand-cyan hover:text-brand-cyan transition-all">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 border border-border-default flex items-center justify-center text-text-secondary hover:border-brand-cyan hover:text-brand-cyan transition-all">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs tracking-widest uppercase text-text-muted mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-text-muted tracking-wide">
            © {new Date().getFullYear()} Popular Peptides. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-text-muted tracking-wide text-center">
            All products sold for research purposes only. Not for human consumption. 18+.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-text-muted">E-Transfer</span>
            <span className="text-text-muted text-[11px]">·</span>
            <span className="font-mono text-[11px] text-brand-cyan">Mobopay Ready</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
