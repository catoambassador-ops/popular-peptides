import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Popular Peptides Shipping Policy. Processing times, carriers, tracking, and delivery across Canada. Free shipping over $300 CAD. Research use only.',
  alternates: { canonical: 'https://popularpeptides.ca/shipping' },
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Shipping Policy</h1>
          <p className="font-mono text-xs text-text-muted mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-invert prose-sm max-w-none">
        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">1. Where We Ship</h2>
            <p>Popular Peptides ships to addresses within Canada only. We are not able to ship internationally at this time.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">2. Processing Time</h2>
            <p>Orders are typically processed within 1–2 business days of confirmed payment. Orders placed on weekends or holidays are processed the next business day.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">3. Shipping Rates</h2>
            <p>Shipping is calculated at checkout. Orders over <strong className="text-text-primary">$300 CAD</strong> qualify for free shipping. All prices and shipping charges are in Canadian dollars (CAD).</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">4. Delivery Times</h2>
            <p>Estimated delivery is generally 2–7 business days after dispatch, depending on your province and the carrier's service in your area. Delivery times are estimates and are not guaranteed.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">5. Tracking</h2>
            <p>Shipments are sent with tracking. You will receive tracking details by email once your order is dispatched so you can monitor its progress.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">6. Packaging</h2>
            <p>Products are carefully packaged to protect their integrity in transit. Compounds that require it are packaged to maintain stability during standard domestic shipping windows.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">7. Delays &amp; Risk of Loss</h2>
            <p>We are not responsible for delays caused by carriers, weather, or other events outside our control. Risk of loss passes to the customer upon shipment; if a tracked package is lost in transit, contact us and we will assist in resolving it with the carrier. See our <a href="/refunds" className="text-brand-cyan">Refund &amp; Returns Policy</a> for details.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">8. Contact</h2>
            <p>Shipping questions: <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a></p>
          </section>
          <section>
            <p className="text-text-muted text-xs">All Popular Peptides products are sold strictly for in vitro laboratory and research use only, and are not for human or veterinary consumption.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
