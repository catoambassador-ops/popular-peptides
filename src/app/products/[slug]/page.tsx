import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import { ProductDetail } from '@/components/product/ProductDetail'
import { ogImage } from '@/lib/og'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }

  const url = `https://popularpeptides.ca/products/${product.slug}`
  const title = `Buy ${product.name} in Canada — Research Peptides | Popular Peptides`
  const description = `${product.shortDescription} Buy ${product.name} in Canada${
    product.purity ? ` — ${product.purity} purity` : ''
  }, third-party tested with COA included.`
  const lowestPrice = Math.min(...product.variants.map(v => v.price))
  const priceLabel = Number.isFinite(lowestPrice) ? `$${(lowestPrice / 100).toFixed(2)}` : undefined
  const branded = ogImage({
    title: product.name,
    subtitle: product.shortDescription,
    kicker: 'Research Peptide · Canada',
    price: priceLabel,
    purity: product.purity,
    badge: product.badge,
    alt: `${product.name} — Popular Peptides Canada`,
  })
  const photo = product.images?.[0]
  const ogImages = photo
    ? [branded, { url: photo.url, alt: photo.alt || `${product.name} — Popular Peptides` }]
    : [branded]

  return {
    title: { absolute: title },
    description,
    keywords: [
      `${product.name} canada`, `buy ${product.name} canada`, `${product.name} for sale canada`,
      `${product.name} Vancouver`, `${product.name} research canada`, 'research peptides canada',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Popular Peptides',
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages?.map(i => i.url),
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  // Product structured data (JSON-LD) for rich results — price, availability,
  // brand. Research-only framing; no rating markup.
  const base = 'https://popularpeptides.ca'
  const url = `${base}/products/${product.slug}`
  const prices = product.variants.map(v => v.price).filter(n => Number.isFinite(n))
  const low = Math.min(...prices)
  const high = Math.max(...prices)
  const inStock = product.variants.some(v => v.inStock)
  const availability = `https://schema.org/${inStock ? 'InStock' : 'OutOfStock'}`
  const images = (product.images || []).map(i => (i.url.startsWith('http') ? i.url : base + i.url))

  const offers =
    product.variants.length > 1
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'CAD',
          lowPrice: (low / 100).toFixed(2),
          highPrice: (high / 100).toFixed(2),
          offerCount: product.variants.length,
          availability,
          url,
        }
      : {
          '@type': 'Offer',
          priceCurrency: 'CAD',
          price: (low / 100).toFixed(2),
          availability,
          url,
          seller: { '@type': 'Organization', name: 'Popular Peptides' },
        }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    category: 'Research Compounds',
    brand: { '@type': 'Brand', name: 'Popular Peptides' },
    ...(product.variants[0]?.sku ? { sku: product.variants[0].sku } : {}),
    ...(images.length ? { image: images } : {}),
    ...(product.casNumber
      ? { additionalProperty: [{ '@type': 'PropertyValue', name: 'CAS Number', value: product.casNumber }] }
      : {}),
    offers,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
    </>
  )
}
