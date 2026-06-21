import { Metadata } from 'next'
import { FileText, ExternalLink, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lab Results & Certificates of Analysis',
  description: 'Third-party laboratory results and Certificates of Analysis (COA) for every Popular Peptides research compound. Verified purity and identity on every batch.',
  alternates: { canonical: 'https://popularpeptides.ca/lab-results' },
  openGraph: {
    type: 'website',
    url: 'https://popularpeptides.ca/lab-results',
    siteName: 'Popular Peptides',
    title: 'Lab Results & Certificates of Analysis — Popular Peptides',
    description: 'Third-party lab results and COA for every research compound. Verified purity and identity on every batch.',
    images: [{ url: '/images/branding/science.png', width: 1536, height: 1024, alt: 'Popular Peptides lab results and COA' }],
  },
}

const testingInfo = [
  { label: 'HPLC Purity Testing', desc: 'High Performance Liquid Chromatography confirms purity ≥99%' },
  { label: 'LC-MS Identity Verification', desc: 'Liquid Chromatography Mass Spectrometry verifies molecular identity' },
  { label: 'Sterility Screening', desc: 'Microbiological testing ensures no bacterial contamination' },
  { label: 'Endotoxin Testing', desc: 'LAL testing detects bacterial endotoxins' },
  { label: 'Contaminant Analysis', desc: 'Heavy metals and chemical contaminant screening' },
]

const coaDocuments = [
  { product: 'Retatrutide', size: '20mg', batch: 'PBC-RETA-20mg-051026', date: '2026-05-19', purity: '99.38%', file: '/coa/PBC-RETA-20mg-051026.pdf', featured: true },
  { product: 'CJC-1295 + Ipamorelin', size: '10mg', batch: 'PBC-CJCD-10-052026', date: '2026-06-02', purity: '100.00%', file: '/coa/PBC-CJCD-10-052026.pdf', featured: true },
  { product: 'GLOW', size: '70mg', batch: 'PBC-GLOW-70mg-051026', date: '2026-05-20', purity: '99.81%', file: '/coa/PBC-GLOW-70mg-051026.pdf', featured: true },
  { product: 'Semax', size: '10mg', batch: 'PBC-SEMAX-10mg-051026', date: '2026-05-19', purity: '99.78%', file: '/coa/PBC-SEMAX-10mg-051026.pdf', featured: true },
  { product: 'MOTS-C', size: '20mg', batch: 'PBC-MOTS-20mg-051026', date: '2026-05-19', purity: '99.63%', file: '/coa/PBC-MOTS-20mg-051026.pdf', featured: false },
  { product: 'DSIP', size: '5mg', batch: 'PBC-DSIP-5mg-051026', date: '2026-05-19', purity: '99.53%', file: '/coa/PBC-DSIP-5mg-051026.pdf', featured: false },
  { product: 'GHK-Cu', size: '100mg', batch: 'PBC-GHKC-100-042226', date: '2026-04-28', purity: '99.00%', file: '/coa/PBC-GHKC-100-042226.pdf', featured: false },
  { product: 'KGLOW', size: '80mg', batch: 'PBC-KLOW-80mg-051026', date: '2026-05-19', purity: '98.41%', file: '/coa/PBC-KLOW-80mg-051026.pdf', featured: false },
]

export default function LabResultsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Transparency</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Lab Results & COA</h1>
          <p className="text-text-secondary mt-2 max-w-xl">
            Every Popular Peptides compound is independently tested by a third-party laboratory. 
            We publish all results for full transparency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Testing methodology */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-700 text-text-primary mb-6">Our Testing Process</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {testingInfo.map(item => (
              <div key={item.label} className="card p-5 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-brand-cyan mt-0.5 shrink-0" />
                  <div>
                    <div className="font-display text-sm font-700 text-text-primary tracking-wide">{item.label}</div>
                    <div className="text-xs text-text-secondary mt-1 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COA table */}
        <div>
          <h2 className="font-display text-2xl font-700 text-text-primary mb-6">Certificates of Analysis</h2>
          
          <div className="border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-bg-secondary border-b border-border-subtle">
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Product</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Test Date</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Purity</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Status</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">COA</th>
                  </tr>
                </thead>
                <tbody>
                  {coaDocuments.map((doc, i) => (
                    <tr key={i} className="border-b border-border-subtle hover:bg-bg-secondary/50 transition-colors">
                      <td className="px-5 py-4 font-display text-sm font-700 text-text-primary">
                        {doc.product}
                        {doc.featured && (
                          <span className="ml-2 text-[9px] font-mono text-brand-cyan tracking-widest border border-brand-cyan/40 px-1.5 py-0.5">FEATURED</span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-text-secondary">{doc.date}</td>
                      <td className="px-5 py-4 font-mono text-sm text-brand-cyan font-600">{doc.purity}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-brand-green/40 bg-brand-green/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                          <span className="font-mono text-[10px] text-brand-green tracking-widest">PASSED</span>
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {doc.file ? (
                          <a href={doc.file} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-brand-cyan hover:underline font-mono text-xs">
                            <FileText size={13} />
                            View
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-text-muted">Request via email</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 border border-border-subtle bg-bg-secondary/30">
            <p className="text-sm text-text-secondary">
              Need a specific batch COA? Email{' '}
              <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a>{' '}
              with your order number and we'll provide the documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
