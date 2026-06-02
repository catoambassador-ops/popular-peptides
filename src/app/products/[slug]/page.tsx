import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/data/products'
import { ProductDetail } from '@/components/product/ProductDetail'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `Buy ${product.name} Canada | Popular Peptides`,
    description: `${product.shortDescription} Order ${product.name} in Canada — ships to Vancouver, Toronto, Calgary and nationwide. Third-party tested, COA included.`,
    keywords: [
      `${product.name} canada`, `buy ${product.name} canada`, `${product.name} for sale canada`,
      `${product.name} Vancouver`, `${product.name} research canada`, 'peptides canada',
    ],
    alternates: { canonical: `https://popularpeptides.ca/products/${product.slug}` },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
