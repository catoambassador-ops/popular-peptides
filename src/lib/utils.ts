import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

export function generateOrderNumber(): string {
  const prefix = 'PP'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
]

// Tax rates by province (as decimal, applied to subtotal + shipping)
export const PROVINCE_TAX_RATES: Record<string, { rate: number; label: string }> = {
  'Alberta':                    { rate: 0.05,    label: 'GST (5%)' },
  'British Columbia':           { rate: 0.12,    label: 'GST + PST (12%)' },
  'Manitoba':                   { rate: 0.12,    label: 'GST + RST (12%)' },
  'New Brunswick':              { rate: 0.15,    label: 'HST (15%)' },
  'Newfoundland and Labrador':  { rate: 0.15,    label: 'HST (15%)' },
  'Northwest Territories':      { rate: 0.05,    label: 'GST (5%)' },
  'Nova Scotia':                { rate: 0.15,    label: 'HST (15%)' },
  'Nunavut':                    { rate: 0.05,    label: 'GST (5%)' },
  'Ontario':                    { rate: 0.13,    label: 'HST (13%)' },
  'Prince Edward Island':       { rate: 0.15,    label: 'HST (15%)' },
  'Quebec':                     { rate: 0.14975, label: 'GST + QST (14.975%)' },
  'Saskatchewan':               { rate: 0.11,    label: 'GST + PST (11%)' },
  'Yukon':                      { rate: 0.05,    label: 'GST (5%)' },
}

export function calculateTax(subtotalCents: number, shippingCents: number, province: string): number {
  const taxInfo = PROVINCE_TAX_RATES[province]
  if (!taxInfo) return 0
  return Math.round((subtotalCents + shippingCents) * taxInfo.rate)
}

export const PROVINCE_CODES: Record<string, string> = {
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Manitoba': 'MB',
  'New Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Northwest Territories': 'NT',
  'Nova Scotia': 'NS',
  'Nunavut': 'NU',
  'Ontario': 'ON',
  'Prince Edward Island': 'PE',
  'Quebec': 'QC',
  'Saskatchewan': 'SK',
  'Yukon': 'YT',
}
