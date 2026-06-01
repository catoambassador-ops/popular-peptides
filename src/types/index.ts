// ─── Product Types ───────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string
  name: string          // e.g. "5mg", "10mg", "50mg"
  price: number         // CAD cents
  sku: string
  inStock: boolean
  quantity?: number
}

export interface ProductImage {
  url: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortName?: string
  category: ProductCategory
  subcategory?: string
  description: string
  shortDescription: string
  images: ProductImage[]
  variants: ProductVariant[]
  tags: string[]
  researchAreas: string[]
  purity?: string           // e.g. "≥99%"
  sequence?: string
  molecularWeight?: string
  casNumber?: string
  coaUrl?: string           // Certificate of Analysis PDF
  featured: boolean
  badge?: string            // e.g. "New", "Popular", "Sale"
  createdAt: string
  updatedAt: string
}

export type ProductCategory = 
  | 'peptides'
  | 'accessories'

export type ResearchArea =
  | 'musculoskeletal'
  | 'cognitive'
  | 'metabolic'
  | 'hormonal'
  | 'tissue-regeneration'
  | 'immune'
  | 'dermatological'
  | 'cardiovascular'
  | 'gastrointestinal'
  | 'circadian'
  | 'cellular-longevity'
  | 'reproductive'

// ─── Cart Types ──────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  variantId: string
  productName: string
  variantName: string
  price: number         // CAD cents
  quantity: number
  image?: string
  slug: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

// ─── Order Types ─────────────────────────────────────────────────────────────

export interface OrderAddress {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address1: string
  address2?: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface OrderItem {
  productId: string
  variantId: string
  productName: string
  variantName: string
  quantity: number
  unitPrice: number
  total: number
}

export type PaymentMethod = 'etransfer' | 'mobopay'
export type OrderStatus = 'pending_payment' | 'payment_received' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  items: OrderItem[]
  shippingAddress: OrderAddress
  subtotal: number
  shipping: number
  total: number
  notes?: string
  etransferSent?: boolean
}

// ─── Checkout Types ───────────────────────────────────────────────────────────

export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  province: string
  postalCode: string
  country: string
  paymentMethod: PaymentMethod
  notes: string
  agreeTerms: boolean
  ageVerified: boolean
}
