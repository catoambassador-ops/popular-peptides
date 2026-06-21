'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FlaskConical, Beaker, Calculator, ChevronRight, Info, ShoppingCart } from 'lucide-react'
import { products } from '@/data/products'

// Auto-derive vial sizes from product variant names (e.g. "10mg" → 10)
function parseVialMg(variantName: string): number {
  const match = variantName.match(/([\d.]+)\s*mg/i)
  return match ? parseFloat(match[1]) : 0
}

// Preset compounds. Optional overrides:
//   defaultVialMg — common vial size (mg); falls back to the first product
//                   variant's mg if omitted.
//   defaultBacMl  — common reconstitution volume (mL); when set, selecting the
//                   compound auto-fills the diluent volume and recalculates.
type PresetSeed = {
  name: string
  refAmount: number   // reference amount per aliquot, in mcg
  slug: string
  defaultVialMg?: number
  defaultBacMl?: number
}

const PRESET_SEEDS: PresetSeed[] = [
  { name: 'BPC-157',        refAmount: 250,   slug: 'bpc-157' },
  { name: 'TB-500',         refAmount: 2500,  slug: 'tb-500' },
  { name: 'Retatrutide',    refAmount: 2000,  slug: 'retatrutide' },
  { name: 'Tirzepatide',    refAmount: 5000,  slug: 'tirzepatide' },
  { name: 'CJC+Ipamorelin', refAmount: 100,   slug: 'cjc-ipamorelin' },
  { name: 'IGF-1 LR3',     refAmount: 50,    slug: 'igf-1-lr3' },
  { name: 'Tesamorelin',    refAmount: 1000,  slug: 'tesamorelin' },
  { name: 'MOTS-C',        refAmount: 10000, slug: 'mots-c' },
  { name: 'NAD+',          refAmount: 50000, slug: 'nad-plus', defaultVialMg: 500, defaultBacMl: 4 },
  { name: 'DSIP',          refAmount: 500,   slug: 'dsip' },
  { name: 'GHK-Cu',        refAmount: 1000,  slug: 'ghk-cu' },
  { name: 'KGLOW',         refAmount: 2000,  slug: 'kglow', defaultVialMg: 80, defaultBacMl: 3 },
  { name: 'GLOW',          refAmount: 1000,  slug: 'glow', defaultVialMg: 70, defaultBacMl: 3 },
  { name: 'Oxytocin',      refAmount: 1000,  slug: 'oxytocin-acetate' },
  { name: 'Custom',        refAmount: 0,     slug: '' },
]

const PRESET_PEPTIDES = PRESET_SEEDS.map(p => {
  if (!p.slug) return { ...p, vialSize: 5, featured: false }
  const product = products.find(x => x.slug === p.slug)
  const vialSize =
    p.defaultVialMg ??
    (product ? parseVialMg(product.variants[0]?.name ?? '') || 5 : 5)
  return { ...p, vialSize, featured: product?.featured ?? false }
})

// Quick Select order: featured products first (per the store `featured` flag),
// then the remaining presets in their curated/most-popular order, with
// "Custom" always last.
const ORDERED_PRESETS = [
  ...PRESET_PEPTIDES.filter(p => p.featured && p.name !== 'Custom'),
  ...PRESET_PEPTIDES.filter(p => !p.featured && p.name !== 'Custom'),
  ...PRESET_PEPTIDES.filter(p => p.name === 'Custom'),
]

// Neutral proportion visual: shows the volume of a single aliquot relative to
// the total reconstituted volume in the vial. Pure measurement reference for
// in vitro handling — no delivery-device imagery.
function ProportionBar({ aliquotMl, totalMl }: { aliquotMl: number; totalMl: number }) {
  const frac = totalMl > 0 ? Math.min(1, Math.max(0, aliquotMl / totalMl)) : 0
  const pct = (frac * 100)
  const over = aliquotMl > totalMl + 1e-9
  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-2">
        <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">Aliquot vs. vial volume</span>
        <span className={`font-mono text-xs font-700 ${over ? 'text-red-500' : 'text-brand-cyan'}`}>
          {totalMl > 0 ? `${pct.toFixed(1)}%` : '—'}
        </span>
      </div>
      <div className="relative h-5 w-full rounded-sm bg-bg-tertiary border border-border-subtle overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${over ? 'bg-red-500/70' : 'bg-brand-cyan/70'}`}
          style={{ width: `${over ? 100 : pct}%`, transition: 'width .4s cubic-bezier(.22,.61,.36,1)' }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] text-text-muted">
        <span>0 mL</span>
        <span>{totalMl > 0 ? `${totalMl.toFixed(2).replace(/0$/, '')} mL total` : '—'}</span>
      </div>
    </div>
  )
}

export default function PeptideCalculatorPage() {
  const [selectedPreset, setSelectedPreset] = useState('BPC-157')
  // Inputs are stored as raw strings so clearing a field shows an empty box
  // (not a forced "0") and decimals can be typed freely. Numbers are derived.
  const [vialMg, setVialMg] = useState('5')
  const [bacWaterMl, setBacWaterMl] = useState('2')
  const [aliquotMcg, setAliquotMcg] = useState('250')

  const vialMgNum = parseFloat(vialMg) || 0
  const bacWaterMlNum = parseFloat(bacWaterMl) || 0
  const aliquotMcgNum = parseFloat(aliquotMcg) || 0

  // Concentration in mcg per mL.
  const concentration = useMemo(() => {
    if (!vialMgNum || !bacWaterMlNum) return 0
    return (vialMgNum * 1000) / bacWaterMlNum
  }, [vialMgNum, bacWaterMlNum])

  // Volume (mL) that contains the target aliquot amount.
  const aliquotVolumeMl = useMemo(() => {
    if (!concentration || !aliquotMcgNum) return 0
    return aliquotMcgNum / concentration
  }, [concentration, aliquotMcgNum])

  const aliquotsPerVial = useMemo(() => {
    if (!aliquotMcgNum || !vialMgNum) return 0
    return Math.floor((vialMgNum * 1000) / aliquotMcgNum)
  }, [vialMgNum, aliquotMcgNum])

  const concentrationMgMl = concentration / 1000

  const applyPreset = (name: string) => {
    const p = PRESET_PEPTIDES.find(x => x.name === name)
    if (!p || p.name === 'Custom') return
    setVialMg(String(p.vialSize))
    setAliquotMcg(String(p.refAmount))
    if (p.defaultBacMl != null) setBacWaterMl(String(p.defaultBacMl))
    setSelectedPreset(name)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 font-display text-sm font-600 text-text-muted mb-4">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">Reconstitution Calculator</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
              <Calculator size={20} className="text-brand-cyan" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">Peptide Reconstitution Calculator</h1>
              <p className="text-text-muted font-mono text-xs mt-0.5">For in vitro research use only · Not medical advice</p>
            </div>
          </div>
          <p className="text-text-secondary max-w-2xl">
            A reference tool for laboratory handling. Enter your vial size and diluent volume to calculate
            the reconstituted concentration, the volume of a target aliquot, and the number of aliquots per vial.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Preset selector */}
        <div className="card p-5 mb-6">
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">Quick Select Compound</div>
          <div className="flex flex-wrap gap-2">
            {ORDERED_PRESETS.map(p => (
              <button
                key={p.name}
                onClick={() => applyPreset(p.name)}
                className={`px-3 py-1.5 font-mono text-xs tracking-wide border transition-all ${
                  selectedPreset === p.name
                    ? 'bg-brand-cyan text-bg-primary border-brand-cyan font-700'
                    : 'border-border-default text-text-secondary hover:border-brand-cyan hover:text-brand-cyan'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT: Steps 1 & 2 stacked + Handling Tips */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Step 1: Reconstitution inputs */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <FlaskConical size={16} className="text-brand-cyan" />
                <h2 className="font-display text-base font-700 text-text-primary tracking-wide uppercase">Step 1: Reconstitution</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                    Peptide Vial Size
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      inputMode="decimal"
                      value={vialMg}
                      onChange={e => setVialMg(e.target.value)}
                      className="input-field pr-14 font-mono text-lg font-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">mg</span>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                    Bacteriostatic Water Added
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      inputMode="decimal"
                      value={bacWaterMl}
                      onChange={e => setBacWaterMl(e.target.value)}
                      className="input-field pr-14 font-mono text-lg font-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">mL</span>
                  </div>
                </div>
              </div>

              {/* Concentration readout */}
              <div className="mt-5 p-4 bg-bg-tertiary border border-border-subtle text-center">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Reconstituted Concentration</div>
                <div className="font-display text-2xl font-700 text-brand-cyan">
                  {concentration > 0 ? concentrationMgMl.toLocaleString('en-CA', { maximumFractionDigits: 3 }) : '—'}
                  <span className="text-sm text-text-muted font-mono ml-1">mg/mL</span>
                </div>
                <div className="font-mono text-xs text-text-muted mt-1">
                  {concentration > 0 ? `${concentration.toLocaleString('en-CA', { maximumFractionDigits: 0 })} mcg/mL` : ''}
                </div>
              </div>
            </div>

            {/* Aliquot calculation */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Beaker size={16} className="text-brand-cyan" />
                <h2 className="font-display text-base font-700 text-text-primary tracking-wide uppercase">Step 2: Aliquot Reference</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                    Target Amount per Aliquot
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      inputMode="decimal"
                      value={aliquotMcg}
                      onChange={e => setAliquotMcg(e.target.value)}
                      className="input-field pr-16 font-mono text-lg font-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">mcg</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-bg-tertiary border border-border-subtle px-2.5 py-1">
                    <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">equals</span>
                    <span className="font-mono text-sm font-700 text-text-secondary tabular-nums">
                      {aliquotMcgNum > 0 ? (aliquotMcgNum / 1000).toLocaleString('en-CA', { maximumFractionDigits: 4 }) : '—'} mg
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <ProportionBar aliquotMl={aliquotVolumeMl} totalMl={bacWaterMlNum} />
                </div>
              </div>

              {/* Results grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="p-4 bg-brand-cyan text-center">
                  <div className="font-mono text-xs text-bg-primary/70 tracking-widest uppercase mb-1">Aliquot Volume</div>
                  <div className="font-display text-xl font-700 text-bg-primary">
                    {aliquotVolumeMl > 0 ? aliquotVolumeMl.toFixed(3) : '—'}
                  </div>
                  <div className="font-mono text-xs text-bg-primary/80">mL</div>
                </div>
                <div className="p-4 bg-bg-tertiary border border-border-subtle text-center">
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Aliquots / Vial</div>
                  <div className="font-display text-xl font-700 text-text-primary">
                    {aliquotsPerVial > 0 ? aliquotsPerVial : '—'}
                  </div>
                  <div className="font-mono text-xs text-text-muted">per vial</div>
                </div>
              </div>
            </div>

            {/* Handling Tips (desktop) */}
            <div className="card p-6 flex-1 hidden lg:flex flex-col">
              <h3 className="font-display text-base font-700 text-text-primary tracking-wide uppercase flex items-center gap-2 mb-4">
                <Info size={18} className="text-brand-cyan" /> Handling Tips
              </h3>
              <div className="flex-1 flex flex-col justify-between gap-4 font-body text-[15px] text-text-secondary leading-relaxed">
                <p><strong className="text-text-primary">Reconstitution:</strong> Add bacteriostatic water slowly down the vial wall — do not direct it onto the lyophilized powder. Swirl gently; do not shake.</p>
                <p><strong className="text-text-primary">Storage:</strong> Reconstituted material should be refrigerated at 2–8°C and used within 4–6 weeks for research consistency.</p>
                <p><strong className="text-text-primary">Diluent:</strong> Use bacteriostatic water for multi-aliquot vials to limit microbial contamination.</p>
                <p><strong className="text-text-primary">Aliquoting:</strong> Measure volumes with a calibrated pipette for repeatable concentrations across a study.</p>
              </div>
            </div>

          </div>

          {/* RIGHT: Summary + Need BAC Water box */}
          <div className="flex flex-col gap-6">
            <div className="card overflow-hidden">
              <div className="flex flex-col gap-1 border-b border-border-subtle bg-bg-tertiary/50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Beaker size={16} className="text-brand-cyan" />
                  <h2 className="font-display text-base font-700 text-text-primary tracking-wide uppercase">Summary</h2>
                </div>
                <span className="font-mono text-[11px] text-text-muted tracking-wide">
                  Reconstitution &amp; aliquot reference
                </span>
              </div>

              <div className="divide-y divide-border-subtle">
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">Concentration</span>
                  <span className="font-display text-lg font-700 text-brand-cyan tabular-nums">
                    {concentration > 0 ? `${concentrationMgMl.toLocaleString('en-CA', { maximumFractionDigits: 3 })}` : '—'}
                    <span className="font-mono text-xs text-text-muted ml-1">mg/mL</span>
                  </span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">Aliquot Volume</span>
                  <span className="font-display text-lg font-700 text-text-primary tabular-nums">
                    {aliquotVolumeMl > 0 ? aliquotVolumeMl.toFixed(3) : '—'}
                    <span className="font-mono text-xs text-text-muted ml-1">mL</span>
                  </span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">Aliquots / Vial</span>
                  <span className="font-display text-lg font-700 text-text-primary tabular-nums">
                    {aliquotsPerVial > 0 ? aliquotsPerVial : '—'}
                  </span>
                </div>
              </div>
            </div>

            {/* Need BAC Water — small box */}
            <div className="card p-4 border-brand-cyan/30 bg-brand-cyan/5">
              <div className="font-mono text-[11px] text-brand-cyan tracking-widest uppercase mb-1.5">Need BAC Water?</div>
              <p className="text-[11px] text-text-secondary mb-2.5 leading-relaxed">USP-grade sterile bacteriostatic water.</p>
              <Link href="/products/bacteriostatic-water-30ml" className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-2">
                <ShoppingCart size={13} /> Add — $19.99
              </Link>
            </div>
          </div>
        </div>

        {/* Handling Tips (mobile) */}
        <div className="card p-6 mt-6 lg:hidden space-y-4">
          <h3 className="font-display text-base font-700 text-text-primary tracking-wide uppercase flex items-center gap-2">
            <Info size={18} className="text-brand-cyan" /> Handling Tips
          </h3>
          <div className="space-y-4 font-body text-[15px] text-text-secondary leading-relaxed">
            <p><strong className="text-text-primary">Reconstitution:</strong> Add bacteriostatic water slowly down the vial wall — do not direct it onto the lyophilized powder. Swirl gently; do not shake.</p>
            <p><strong className="text-text-primary">Storage:</strong> Reconstituted material should be refrigerated at 2–8°C and used within 4–6 weeks for research consistency.</p>
            <p><strong className="text-text-primary">Diluent:</strong> Use bacteriostatic water for multi-aliquot vials to limit microbial contamination.</p>
            <p><strong className="text-text-primary">Aliquoting:</strong> Measure volumes with a calibrated pipette for repeatable concentrations across a study.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 border border-border-subtle bg-bg-secondary/50">
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            <strong className="text-text-secondary">Research Use Only.</strong> This calculator is provided as a convenience reference for laboratory researchers. All values are for in vitro research applications only. Popular Peptides does not provide medical advice. Products sold by Popular Peptides are not approved by Health Canada for human or veterinary therapeutic use. Always follow qualified research protocols and institutional guidelines.
          </p>
        </div>
      </div>
    </div>
  )
}
