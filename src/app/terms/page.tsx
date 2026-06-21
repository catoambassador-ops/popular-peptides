import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Popular Peptides Terms of Service. All products are sold for laboratory and research use only.',
  alternates: { canonical: 'https://popularpeptides.ca/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Terms of Service</h1>
          <p className="font-mono text-xs text-text-muted mt-2">Last updated: February 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-invert prose-sm max-w-none">
        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">1. Research Use Only</h2>
            <p>All products sold by Popular Peptides ("Company," "we," "us") are intended exclusively for in vitro research, laboratory, and scientific research purposes. These compounds are <strong className="text-text-primary">NOT</strong> approved for human consumption, therapeutic use, veterinary use, or food/drug applications. By purchasing, you acknowledge and agree that all products will be used solely for legitimate research purposes.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">2. Age Requirement</h2>
            <p>You must be 18 years of age or older to purchase from Popular Peptides. By placing an order, you represent and warrant that you are at least 18 years of age.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">3. Regulatory Compliance</h2>
            <p>You are solely responsible for ensuring that the purchase, possession, and use of our products complies with all applicable federal, provincial, and local laws and regulations in your jurisdiction. Popular Peptides makes no representations regarding the legality of purchasing these compounds in any specific location.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">4. Payment Terms</h2>
            <p>Orders are processed upon receipt of payment. For Interac E-Transfer, orders will be held for 48 hours. If payment is not received within this period, the order may be cancelled. All prices are in Canadian dollars (CAD). Popular Peptides reserves the right to modify pricing at any time.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">5. Shipping & Delivery</h2>
            <p>Popular Peptides ships to Canadian addresses only. Shipping times are estimates and not guaranteed. We are not responsible for delays caused by couriers, customs, or events outside our control. Risk of loss passes to the customer upon shipment.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">6. Limitation of Liability</h2>
            <p>Popular Peptides shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or misuse of our products. Our total liability in any matter shall not exceed the amount paid for the specific product in question.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">7. Refund Policy</h2>
            <p>Due to the nature of our products, all sales are final unless a product arrives damaged or incorrect. Contact sales@popularpeptides.ca within 5 business days of delivery with photographic evidence for eligible claims.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">8. Contact</h2>
            <p>Questions about these Terms: <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}
