'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Gift } from 'lucide-react'
import { hasPurchasedBefore } from '@/lib/order-store'

const RETURN_CODE = 'RETURN15'
const DISMISSED_KEY = 'pp-banner-dismissed'

export function WelcomeBackBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISSED_KEY)
    if (!dismissed && hasPurchasedBefore()) {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-bg-secondary border border-brand-cyan/40 shadow-cyan-md p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center flex-shrink-0">
          <Gift size={18} className="text-brand-cyan" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-sm font-700 text-text-primary">Welcome back! 👋</div>
          <p className="font-mono text-xs text-text-secondary mt-0.5">
            Use code <span className="text-brand-cyan font-700">{RETURN_CODE}</span> for 15% off your next order.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/products" onClick={dismiss} className="font-mono text-xs text-brand-cyan border border-brand-cyan px-3 py-1.5 hover:bg-brand-cyan hover:text-bg-primary transition-colors whitespace-nowrap">
            Shop Now
          </Link>
          <button onClick={dismiss} className="p-1 text-text-muted hover:text-text-primary transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
