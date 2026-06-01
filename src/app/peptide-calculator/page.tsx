'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FlaskConical, Syringe, Calculator, ChevronRight, Info, ShoppingCart } from 'lucide-react'
import { products } from '@/data/products'

// Auto-derive vial sizes from product variant names (e.g. "10mg" → 10)
function parseVialMg(variantName: string): number {
  const match = variantName.match(/([\d.]+)\s*mg/i)
  return match ? parseFloat(match[1]) : 0
}

const PRESET_PEPTIDES = [
  { name: 'BPC-157',        commonDose: 250,   slug: 'bpc-157' },
  { name: 'TB-500',         commonDose: 2500,  slug: 'tb-500' },
  { name: 'Retatrutide',    commonDose: 2000,  slug: 'retatrutide' },
  { name: 'Tirzepatide',    commonDose: 5000,  slug: 'tirzepatide' },
  { name: 'CJC+Ipamorelin', commonDose: 100,   slug: 'cjc-ipamorelin' },
  { name: 'IGF-1 LR3',     commonDose: 50,    slug: 'igf-1-lr3' },
  { name: 'Tesamorelin',    commonDose: 1000,  slug: 'tesamorelin' },
  { name: 'MOTS-C',        commonDose: 10000, slug: 'mots-c' },
  { name: 'NAD+',          commonDose: 50000, slug: 'nad-plus' },
  { name: 'DSIP',          commonDose: 500,   slug: 'dsip' },
  { name: 'GHK-Cu',        commonDose: 1000,  slug: 'ghk-cu' },
  { name: 'KGLOW',         commonDose: 2000,  slug: 'kglow' },
  { name: 'GLOW',          commonDose: 1000,  slug: 'glow' },
  { name: 'Oxytocin',      commonDose: 1000,  slug: 'oxytocin-acetate' },
  { name: 'Custom',        commonDose: 0,     slug: '' },
].map(p => {
  if (!p.slug) return { ...p, vialSize: 5 }
  const product = products.find(x => x.slug === p.slug)
  const vialSize = product
    ? parseVialMg(product.variants[0]?.name ?? '') || 5
    : 5
  return { ...p, vialSize }
})

function SyringeVisual({ fillPercent }: { fillPercent: number }) {
  const pct = Math.min(Math.max(fillPercent, 0), 100)
  const barHeight = 200
  const filledHeight = (pct / 100) * barHeight

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 48, height: 240 }}>
        {/* Plunger handle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-border-default rounded-t-sm" />
        {/* Barrel */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 rounded-sm overflow-hidden border-2 border-border-default" style={{ height: barHeight }}>
          {/* Tick marks */}
          {[0,10,20,30,40,50,60,70,80,90,100].map(t => (
            <div key={t} className="absolute w-full flex items-center" style={{ bottom: `${t}%`, height: 1 }}>
              <div className={`${t % 50 === 0 ? 'w-3/4' : t % 10 === 0 ? 'w-1/2' : 'w-1/4'} h-px bg-border-default`} />
            </div>
          ))}
          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-brand-cyan/60 transition-all duration-500"
            style={{ height: `${pct}%` }}
          />
        </div>
        {/* Needle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-text-muted rounded-b-full" />
      </div>
      <div className="font-mono text-xs text-text-muted text-center">
        {pct.toFixed(1)}% full
      </div>
    </div>
  )
}

export default function PeptideCalculatorPage() {
  const [selectedPreset, setSelectedPreset] = useState('BPC-157')
  const [vialMg, setVialMg] = useState(5)
  const [bacWaterMl, setBacWaterMl] = useState(2)
  const [desiredDoseMcg, setDesiredDoseMcg] = useState(250)
  const [syringeSize, setSyringeSize] = useState<100 | 50>(100)
  const [tab, setTab] = useState<'reconstitution' | 'dosage' | 'schedule'>('reconstitution')

  const concentration = useMemo(() => {
    if (!vialMg || !bacWaterMl) return 0
    return (vialMg * 1000) / bacWaterMl // mcg per mL
  }, [vialMg, bacWaterMl])

  const injectionVolumeMl = useMemo(() => {
    if (!concentration || !desiredDoseMcg) return 0
    return desiredDoseMcg / concentration
  }, [concentration, desiredDoseMcg])

  const injectionUnits = useMemo(() => {
    return injectionVolumeMl * syringeSize
  }, [injectionVolumeMl, syringeSize])

  const dosesPerVial = useMemo(() => {
    if (!desiredDoseMcg || !vialMg) return 0
    return Math.floor((vialMg * 1000) / desiredDoseMcg)
  }, [vialMg, desiredDoseMcg])

  const syringeFillPercent = useMemo(() => {
    return (injectionVolumeMl / (syringeSize === 100 ? 1 : 0.5)) * 100
  }, [injectionVolumeMl, syringeSize])

  const applyPreset = (name: string) => {
    const p = PRESET_PEPTIDES.find(x => x.name === name)
    if (!p || p.name === 'Custom') return
    setVialMg(p.vialSize)
    setDesiredDoseMcg(p.commonDose)
    setSelectedPreset(name)
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 font-mono text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-text-secondary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-text-secondary">Peptide Calculator</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
              <Calculator size={20} className="text-brand-cyan" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-700 text-text-primary tracking-tight">Peptide Dosage Calculator</h1>
              <p className="text-text-muted font-mono text-xs mt-0.5">For research use only · Not medical advice</p>
            </div>
          </div>
          <p className="text-text-secondary max-w-2xl">
            Calculate exact injection volumes, syringe markings, and doses per vial for your research peptides. Enter your vial size and BAC water volume to get started.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Preset selector */}
        <div className="card p-5 mb-6">
          <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">Quick Select Peptide</div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PEPTIDES.map(p => (
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

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT: Inputs */}
          <div className="lg:col-span-2 space-y-5">

            {/* Reconstitution inputs */}
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
                      value={vialMg}
                      onChange={e => setVialMg(parseFloat(e.target.value) || 0)}
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
                      value={bacWaterMl}
                      onChange={e => setBacWaterMl(parseFloat(e.target.value) || 0)}
                      className="input-field pr-14 font-mono text-lg font-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">mL</span>
                  </div>
                </div>
              </div>

              {/* Concentration result */}
              <div className="mt-5 p-4 bg-brand-cyan/5 border border-brand-cyan/20">
                <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Resulting Concentration</div>
                <div className="font-display text-2xl font-700 text-brand-cyan">
                  {concentration > 0 ? concentration.toLocaleString('en-CA', { maximumFractionDigits: 2 }) : '—'} <span className="text-base font-500">mcg/mL</span>
                </div>
                <div className="font-mono text-xs text-text-muted mt-1">
                  = {concentration > 0 ? (concentration / 1000).toFixed(4) : '—'} mg/mL
                </div>
              </div>
            </div>

            {/* Dosage inputs */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Syringe size={16} className="text-brand-cyan" />
                <h2 className="font-display text-base font-700 text-text-primary tracking-wide uppercase">Step 2: Dose Calculation</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                    Desired Dose
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={desiredDoseMcg}
                      onChange={e => setDesiredDoseMcg(parseFloat(e.target.value) || 0)}
                      className="input-field pr-16 font-mono text-lg font-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-text-muted">mcg</span>
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-1">
                    = {desiredDoseMcg > 0 ? (desiredDoseMcg / 1000).toFixed(4) : '—'} mg
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                    Syringe Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {([100, 50] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSyringeSize(s)}
                        className={`py-3 font-mono text-sm border transition-all ${
                          syringeSize === s
                            ? 'bg-brand-cyan text-bg-primary border-brand-cyan font-700'
                            : 'border-border-default text-text-secondary hover:border-brand-cyan'
                        }`}
                      >
                        {s}U / {s === 100 ? '1mL' : '0.5mL'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results grid */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="p-4 bg-bg-tertiary border border-border-subtle text-center">
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Volume</div>
                  <div className="font-display text-xl font-700 text-text-primary">
                    {injectionVolumeMl > 0 ? injectionVolumeMl.toFixed(3) : '—'}
                  </div>
                  <div className="font-mono text-xs text-text-muted">mL</div>
                </div>
                <div className="p-4 bg-brand-cyan text-center">
                  <div className="font-mono text-xs text-bg-primary/70 tracking-widest uppercase mb-1">Draw to</div>
                  <div className="font-display text-xl font-700 text-bg-primary">
                    {injectionUnits > 0 ? injectionUnits.toFixed(1) : '—'}
                  </div>
                  <div className="font-mono text-xs text-bg-primary/80">units on syringe</div>
                </div>
                <div className="p-4 bg-bg-tertiary border border-border-subtle text-center">
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Doses / Vial</div>
                  <div className="font-display text-xl font-700 text-text-primary">
                    {dosesPerVial > 0 ? dosesPerVial : '—'}
                  </div>
                  <div className="font-mono text-xs text-text-muted">injections</div>
                </div>
              </div>

              {injectionUnits > syringeSize && (
                <div className="mt-4 p-3 border border-red-400/40 bg-red-400/10 font-mono text-xs text-red-400">
                  ⚠ Dose exceeds syringe capacity ({syringeSize}U). Use a larger syringe or split into multiple injections.
                </div>
              )}
            </div>

            {/* Reference table */}
            <div className="card p-6">
              <h2 className="font-display text-base font-700 text-text-primary tracking-wide uppercase mb-4">Reference Table — All Doses for This Mix</h2>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-sm">
                  <thead>
                    <tr className="border-b border-border-default">
                      <th className="text-left py-2 px-3 text-text-muted text-xs tracking-widest">DOSE (mcg)</th>
                      <th className="text-left py-2 px-3 text-text-muted text-xs tracking-widest">VOLUME (mL)</th>
                      <th className="text-left py-2 px-3 text-text-muted text-xs tracking-widest">UNITS ({syringeSize}U syringe)</th>
                      <th className="text-left py-2 px-3 text-text-muted text-xs tracking-widest">DOSES/VIAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {concentration > 0 && [
                      desiredDoseMcg * 0.25,
                      desiredDoseMcg * 0.5,
                      desiredDoseMcg,
                      desiredDoseMcg * 1.5,
                      desiredDoseMcg * 2,
                    ].filter(d => d > 0).map(dose => {
                      const vol = dose / concentration
                      const units = vol * syringeSize
                      const doses = Math.floor((vialMg * 1000) / dose)
                      const isSelected = dose === desiredDoseMcg
                      return (
                        <tr key={dose} className={`border-b border-border-subtle ${isSelected ? 'bg-brand-cyan/10' : 'hover:bg-bg-tertiary'}`}>
                          <td className={`py-2 px-3 ${isSelected ? 'text-brand-cyan font-700' : 'text-text-secondary'}`}>
                            {dose.toLocaleString()} {isSelected && '←'}
                          </td>
                          <td className="py-2 px-3 text-text-secondary">{vol.toFixed(3)}</td>
                          <td className="py-2 px-3 text-text-secondary">{units.toFixed(1)}</td>
                          <td className="py-2 px-3 text-text-secondary">{doses}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT: Syringe visual + tips */}
          <div className="space-y-5">

            {/* Syringe visual */}
            <div className="card p-6 flex flex-col items-center">
              <h3 className="font-display text-sm font-700 text-text-primary tracking-wide uppercase mb-4 self-start">Syringe Fill</h3>
              <SyringeVisual fillPercent={syringeFillPercent} />
              <div className="mt-4 text-center">
                <div className="font-mono text-xs text-text-muted">Draw to</div>
                <div className="font-display text-3xl font-700 text-brand-cyan mt-1">
                  {injectionUnits > 0 ? injectionUnits.toFixed(1) : '—'}
                </div>
                <div className="font-mono text-xs text-text-muted">units</div>
              </div>
            </div>

            {/* Tips */}
            <div className="card p-5 space-y-4">
              <h3 className="font-display text-sm font-700 text-text-primary tracking-wide uppercase flex items-center gap-2">
                <Info size={14} className="text-brand-cyan" /> Research Tips
              </h3>
              <div className="space-y-3 font-body text-xs text-text-secondary leading-relaxed">
                <p><strong className="text-text-primary">Reconstitution:</strong> Add BAC water slowly down the vial wall. Never inject directly onto the powder. Swirl gently — do not shake.</p>
                <p><strong className="text-text-primary">Storage:</strong> Reconstituted peptides should be refrigerated at 2–8°C and used within 4–6 weeks.</p>
                <p><strong className="text-text-primary">BAC Water:</strong> Always use bacteriostatic water for multi-dose vials to prevent contamination.</p>
                <p><strong className="text-text-primary">Syringe:</strong> A 100-unit (1mL) insulin syringe is standard. Each unit = 0.01mL.</p>
              </div>
            </div>

            {/* BAC water CTA */}
            <div className="card p-5 border-brand-cyan/30 bg-brand-cyan/5">
              <div className="font-mono text-xs text-brand-cyan tracking-widest uppercase mb-2">Need BAC Water?</div>
              <p className="text-xs text-text-secondary mb-3">USP-grade sterile bacteriostatic water for peptide reconstitution.</p>
              <Link href="/products/bacteriostatic-water-30ml" className="btn-primary text-xs py-2 w-full justify-center flex items-center gap-2">
                <ShoppingCart size={13} /> Add to Cart — $14.99
              </Link>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 border border-border-subtle bg-bg-secondary/50">
          <p className="font-mono text-xs text-text-muted leading-relaxed">
            <strong className="text-text-secondary">Research Use Only.</strong> This calculator is provided as a convenience tool for laboratory researchers. All calculations are for in vitro research applications only. Popular Peptides does not provide medical advice. Peptides sold by Popular Peptides are not approved by Health Canada for human or veterinary therapeutic use. Always consult qualified research protocols and institutional guidelines.
          </p>
        </div>
      </div>
    </div>
  )
}
