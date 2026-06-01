import { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Popular Peptides — ordering, shipping, payment, and research compounds.',
}

const faqs = [
  {
    category: 'Ordering & Payment',
    items: [
      {
        q: 'How do I pay for my order?',
        a: 'We currently accept Interac E-Transfer. After placing your order, you\'ll receive instructions to send payment to sales@popularpeptides.ca. Use your order number as the message. We are integrating Mobopay for credit card payments soon.',
      },
      {
        q: 'How long does it take to confirm my e-transfer?',
        a: 'E-transfers are typically confirmed within a few hours during business hours (Mon–Fri, 9am–5pm PST). You\'ll receive an email confirmation once payment is received and your order moves to processing.',
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Contact us at sales@popularpeptides.ca as soon as possible. Orders that have already shipped cannot be cancelled. We\'ll do our best to accommodate changes before shipment.',
      },
      {
        q: 'Is there a minimum order amount?',
        a: 'No minimum order amount. Free shipping on all orders over $300 CAD.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'Where do you ship?',
        a: 'We ship across Canada. All orders are shipped via tracked and insured courier.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Most orders ship within 1–2 business days of payment confirmation. Estimated delivery is 2–5 business days depending on your province.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes — free shipping on all orders over $300 CAD. Orders under $300 have a flat $15 CAD shipping fee.',
      },
      {
        q: 'Will my order be discreetly packaged?',
        a: 'Yes. All orders are shipped in plain, unmarked packaging with no mention of the contents on the outside.',
      },
    ],
  },
  {
    category: 'Product Quality',
    items: [
      {
        q: 'How are your peptides tested?',
        a: 'Every batch is tested by an independent, third-party laboratory using HPLC (High Performance Liquid Chromatography) and LC-MS (Liquid Chromatography Mass Spectrometry) for identity and purity verification. We also conduct sterility and endotoxin screening.',
      },
      {
        q: 'What purity do your peptides have?',
        a: 'All Popular Peptides compounds meet a minimum ≥99% purity specification. Certificates of Analysis with specific purity data are available for every batch.',
      },
      {
        q: 'Do you provide a Certificate of Analysis (COA)?',
        a: 'Yes. A COA is included with every order. You can also request batch-specific COAs by emailing sales@popularpeptides.ca with your order number.',
      },
      {
        q: 'How should I store my peptides?',
        a: 'Lyophilized (freeze-dried) peptides should be stored at −20°C in a dry environment, away from light. Once reconstituted, store at 4°C and use within 30 days. Avoid repeated freeze-thaw cycles.',
      },
    ],
  },
  {
    category: 'Research Use',
    items: [
      {
        q: 'Who can purchase from Popular Peptides?',
        a: 'Our products are available to individuals aged 18 and older for legitimate research purposes. By purchasing, you confirm that products will be used for in vitro or laboratory research only, not for human consumption.',
      },
      {
        q: 'Are your products approved for human use?',
        a: 'No. All Popular Peptides products are research compounds only. They are not approved for human or veterinary consumption, therapeutic use, or clinical application. Purchasing and use is subject to your local regulations.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Support</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Frequently Asked Questions</h1>
          <p className="text-text-secondary mt-2">Everything you need to know about ordering and our products.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {faqs.map(section => (
          <div key={section.category}>
            <h2 className="font-display text-xl font-700 text-brand-cyan tracking-wide mb-5">{section.category}</h2>
            <div className="space-y-px">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="group border border-border-subtle bg-bg-secondary hover:border-border-bright transition-colors"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-body text-sm font-500 text-text-primary pr-4">{item.q}</span>
                    <ChevronDown size={16} className="text-text-muted group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border-subtle pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="card p-6 text-center">
          <p className="text-text-secondary mb-4">Still have questions?</p>
          <a href="mailto:sales@popularpeptides.ca" className="btn-primary inline-flex">
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
