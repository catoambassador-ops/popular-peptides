'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function ConsentModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('pp-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('pp-consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-bg-secondary border border-border-default shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-md w-full p-8 text-center">
        {/* Logo mark */}
        <div className="w-12 h-12 bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mx-auto mb-5">
          <span className="font-display text-lg font-700 text-brand-cyan">PP</span>
        </div>

        <h2 className="font-display text-xl font-700 text-text-primary tracking-tight mb-3">
          Research Compounds Only
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          All products sold by Popular Peptides are strictly for <strong className="text-text-primary">in vitro laboratory research use only</strong>. They are not intended for human or veterinary use, and are not approved by Health Canada for therapeutic application.
        </p>

        <p className="text-xs text-text-muted leading-relaxed mb-6">
          By entering this site you confirm you are <strong className="text-text-primary">18 years of age or older</strong> and have read and agree to our{' '}
          <Link href="/terms" className="text-brand-cyan hover:underline" onClick={accept}>Terms of Service</Link>.
        </p>

        <button
          onClick={accept}
          className="btn-primary w-full justify-center py-3 text-sm"
        >
          I Understand — Enter Site
        </button>

        <p className="font-mono text-[10px] text-text-muted mt-4">
          Popular Peptides · Canada's Research Compound Source
        </p>
      </div>
    </div>
  )
}
