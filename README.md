# Popular Peptides — popularpeptides.ca

A full-featured ecommerce site for research peptides. Built with Next.js 14, Tailwind CSS, and Zustand.

---

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — dark clinical brand theme
- **Zustand** — persistent cart state
- **Nodemailer** — order email notifications
- **react-hot-toast** — cart/order toast notifications
- **Vercel** — recommended deployment

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your SMTP credentials
```

### 3. Run development server
```bash
npm run dev
# Open http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live URL: `https://popularpeptides.ca` |
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (587 for TLS) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (Gmail: Settings → Security → App Passwords) |
| `ORDER_EMAIL` | Where order notifications go (e.g. `sales@popularpeptides.ca`) |

---

## Deployment to popularpeptides.ca (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Popular Peptides build"
git remote add origin https://github.com/yourusername/popular-peptides.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Add your environment variables from `.env.local` under **Settings → Environment Variables**
4. Click **Deploy**

### Step 3: Connect your domain
1. In Vercel → **Settings → Domains**
2. Add `popularpeptides.ca` and `www.popularpeptides.ca`
3. Go to your domain registrar (where you bought `popularpeptides.ca`)
4. Update DNS:
   - **A record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
5. DNS propagates in 0–48 hours

---

## Mobopay Integration (When Ready)

1. Get your credentials from Mobopay
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_MOBOPAY_MERCHANT_ID=your_id
   MOBOPAY_API_KEY=your_key
   NEXT_PUBLIC_MOBOPAY_ENDPOINT=https://api.mobopay.com
   ```
3. In `src/app/checkout/page.tsx`, remove the `disabled` attribute from the Mobopay radio button
4. In `src/app/api/orders/route.ts`, call `createMobopaySession()` from `src/lib/mobopay.ts` when `paymentMethod === 'mobopay'`
5. The session redirect URL goes to the Mobopay checkout page

All the Mobopay scaffolding is in `src/lib/mobopay.ts` — ready to activate.

---

## Adding Products

Edit `src/data/products.ts`. Copy any existing product and update:
- `id`, `slug` (unique identifiers)
- `name`, `shortDescription`, `description`
- `variants` (with price in CAD cents: $49.99 = `4999`)
- `category`: `'peptides'` or `'accessories'`
- `researchAreas`, `purity`, `casNumber`, etc.

---

## Email Setup (Gmail)

1. Go to **Google Account → Security → 2-Step Verification** (enable it)
2. Go to **Security → App Passwords**
3. Create an App Password for "Mail"
4. Use that 16-character password as `SMTP_PASS`

---

## Adding COA Files

1. Place PDF files in `/public/coa/` (e.g. `bpc-157-batch-240601.pdf`)
2. Update the product in `src/data/products.ts`:
   ```ts
   coaUrl: '/coa/bpc-157-batch-240601.pdf'
   ```
3. Also update the `coaDocuments` array in `src/app/lab-results/page.tsx`

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── products/
│   │   ├── page.tsx          # Product listing
│   │   └── [slug]/page.tsx   # Product detail
│   ├── category/[slug]/      # Category pages
│   ├── checkout/             # Checkout + confirmation
│   ├── api/orders/           # Order API + email
│   ├── faq/                  # FAQ
│   ├── about/                # About
│   ├── contact/              # Contact
│   ├── lab-results/          # COA / lab results
│   └── blog/                 # Blog (placeholder)
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── cart/                 # CartDrawer
│   └── product/              # ProductCard, ProductDetail
├── data/
│   └── products.ts           # Product catalog
├── lib/
│   ├── cart-store.ts         # Zustand cart
│   ├── mobopay.ts            # Mobopay integration
│   └── utils.ts              # Helpers
└── types/
    └── index.ts              # TypeScript types
```
