import { Metadata } from 'next'
import { FileText, ExternalLink, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lab Results & COA',
  description: 'Third-party laboratory results and Certificates of Analysis for all Popular Peptides research compounds.',
}

const testingInfo = [
  { label: 'HPLC Purity Testing', desc: 'High Performance Liquid Chromatography confirms purity ≥99%' },
  { label: 'LC-MS Identity Verification', desc: 'Liquid Chromatography Mass Spectrometry verifies molecular identity' },
  { label: 'Sterility Screening', desc: 'Microbiological testing ensures no bacterial contamination' },
  { label: 'Endotoxin Testing', desc: 'LAL testing detects bacterial endotoxins' },
  { label: 'Contaminant Analysis', desc: 'Heavy metals and chemical contaminant screening' },
]

// These would be populated as you upload COAs to /public/coa/
const coaDocuments = [
  { product: 'BPC-157', batch: 'PP-BPC157-240601', date: '2024-06-01', purity: '99.7%', file: null },
  { product: 'TB-500', batch: 'PP-TB500-240601', date: '2024-06-01', purity: '99.4%', file: null },
  { product: 'Selank', batch: 'PP-SELANK-240601', date: '2024-06-01', purity: '99.6%', file: null },
  { product: 'Epitalon', batch: 'PP-EPIT-240601', date: '2024-06-01', purity: '99.8%', file: null },
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testingInfo.map(item => (
              <div key={item.label} className="card p-5">
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
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Batch</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Test Date</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Purity</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">Status</th>
                    <th className="px-5 py-3 text-left font-mono text-xs text-text-muted tracking-widest uppercase">COA</th>
                  </tr>
                </thead>
                <tbody>
                  {coaDocuments.map((doc, i) => (
                    <tr key={i} className="border-b border-border-subtle hover:bg-bg-secondary/50 transition-colors">
                      <td className="px-5 py-4 font-display text-sm font-700 text-text-primary">{doc.product}</td>
                      <td className="px-5 py-4 font-mono text-xs text-text-secondary">{doc.batch}</td>
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
                            Download
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
