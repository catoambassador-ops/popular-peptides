import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Popular Peptides Privacy Policy. How we collect, use, and protect your information. All products are sold for laboratory and research use only.',
  alternates: { canonical: 'https://popularpeptides.ca/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Privacy Policy</h1>
          <p className="font-mono text-xs text-text-muted mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 prose prose-invert prose-sm max-w-none">
        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <p>Popular Peptides ("Company," "we," "us," "our") respects your privacy and is committed to protecting your personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial law. This policy explains what we collect, why, and how it is handled.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly when you place an order, create an account, or contact us, including your name, shipping address, email address, phone number, and order details. We also automatically collect limited technical data (such as IP address, browser type, and pages visited) through analytics tools to operate and improve the site.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">2. How We Use Your Information</h2>
            <p>We use your information to process and fulfill orders, communicate with you about your orders, provide customer support, send service-related notices, and, where you have opted in, send occasional updates. We do not sell your personal information.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">3. Payment Information</h2>
            <p>Payment is handled by third-party payment processors. We do not store full credit card numbers on our servers. Payment data is transmitted directly to the processor under their own security and privacy standards.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">4. Service Providers</h2>
            <p>We share information only with service providers who help us operate the business — including payment processors, shipping carriers, email/communications platforms, and analytics providers — and only to the extent needed to perform those services. These providers are bound to handle your data confidentially.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">5. Cookies & Analytics</h2>
            <p>We use cookies and similar technologies to keep your cart working, remember preferences, and understand how the site is used. You can control cookies through your browser settings; disabling them may affect site functionality.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">6. Data Retention</h2>
            <p>We retain personal information for as long as needed to fulfill the purposes described in this policy, to comply with legal and accounting obligations, and to resolve disputes. When no longer required, information is securely deleted or anonymized.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal information, and to withdraw consent to marketing communications at any time. To make a request, contact us at the address below.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">8. Security</h2>
            <p>We use reasonable administrative, technical, and physical safeguards to protect your information. No method of transmission or storage is completely secure, but we work to protect your data and limit access to it.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">9. Age</h2>
            <p>Our site and products are intended for individuals 18 years of age or older. We do not knowingly collect information from anyone under 18.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Material changes will be reflected by the "Last updated" date above.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-700 text-text-primary mb-3">11. Contact</h2>
            <p>Questions or privacy requests: <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a></p>
          </section>
          <section>
            <p className="text-text-muted text-xs">All Popular Peptides products are sold strictly for in vitro laboratory and research use only, and are not for human or veterinary consumption.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
