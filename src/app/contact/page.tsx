import { Metadata } from 'next'
import { Mail, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Popular Peptides. Questions about orders, products, or research compounds.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-border-subtle bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-2">Get in Touch</div>
          <h1 className="font-display text-4xl font-700 text-text-primary tracking-tight">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-700 text-text-primary mb-4">We're Here to Help</h2>
              <p className="text-text-secondary leading-relaxed">
                Have questions about an order, a product, or your research? 
                Our team responds to all inquiries within 1 business day.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Email</div>
                  <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan hover:underline">
                    sales@popularpeptides.ca
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Hours</div>
                  <p className="text-text-secondary text-sm">Monday – Friday, 9:00 AM – 5:00 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border-bright flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">Location</div>
                  <p className="text-text-secondary text-sm">Canada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="card p-6">
            <h3 className="font-display text-lg font-700 text-text-primary mb-5">Send a Message</h3>
            <form
              action={`mailto:sales@popularpeptides.ca`}
              method="get"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Name</label>
                <input name="name" className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Email</label>
                <input name="email" type="email" className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Subject</label>
                <input name="subject" className="input-field" placeholder="Order inquiry, product question..." />
              </div>
              <div>
                <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Message</label>
                <textarea name="body" className="input-field resize-none h-28" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send Message
              </button>
            </form>
            <p className="font-mono text-xs text-text-muted mt-3 text-center">
              Or email directly: <a href="mailto:sales@popularpeptides.ca" className="text-brand-cyan">sales@popularpeptides.ca</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
