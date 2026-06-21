import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Returns Policy',
  description: 'Popular Peptides Refund & Returns Policy. How to request a refund or replacement for damaged or incorrect orders. Research use only.',
  alternates: { canonical: 'https://popularpeptides.ca/refunds' },
}

export default function RefundsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Refund &amp; Returns Policy</h1>
          <p className="font-mono text-xs text-text-muted mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-invert prose-sm max-w-none">
        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <p>We want every order to arrive correctly and in good condition. Because our products are sensitive research compounds, this policy explains when refunds and replacements are available and how to request one.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">1. Damaged or Incorrect Orders</h2>
            <p>If your order arrives damaged, defective, or different from what you ordered, you are eligible for a replacement or refund. Please contact us within <strong className="text-text-primary">5 business days</strong> of delivery at <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a> with your order number and clear photographs of the issue (including packaging where relevant).</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">2. How Claims Are Handled</h2>
            <p>Once we receive your claim and supporting photos, we review it promptly and respond with next steps. Approved claims are resolved by either reshipping the correct or replacement item, or issuing a refund to your original payment method. Refunds are typically processed within 5–10 business days of approval, depending on your payment provider.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">3. Non-Returnable Items</h2>
            <p>Because these are research compounds where product integrity cannot be verified once a package leaves our control, we are unable to accept returns of correctly fulfilled, undamaged items. This safeguards the quality and traceability that our Certificates of Analysis represent.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">4. Order Cancellations</h2>
            <p>If you need to cancel an order, contact us as soon as possible. Orders that have not yet been processed or shipped can usually be cancelled for a full refund. Once an order has shipped, the shipping policy applies.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">5. Lost or Undelivered Shipments</h2>
            <p>If tracking indicates a problem or your package has not arrived within the expected window, contact us and we will work with you and the carrier to locate the shipment or arrange an appropriate resolution.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">6. Contact</h2>
            <p>Refund and return requests: <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a></p>
          </section>
          <section>
            <p className="text-text-muted text-xs">All Popular Peptides products are sold strictly for in vitro laboratory and research use only, and are not for human or veterinary consumption.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
