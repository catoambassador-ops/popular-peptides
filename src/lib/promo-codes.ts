export interface PromoCode {
  code: string
  discount: number   // percentage e.g. 0.10 = 10%
  label: string
  oneTime?: boolean  // only usable once per browser
}

export const PROMO_CODES: PromoCode[] = [
  { code: 'WELCOME10',  discount: 0.10, label: '10% off your order' },
  { code: 'RETURN15',   discount: 0.15, label: '15% off — welcome back!' },
  { code: 'RESEARCH20', discount: 0.20, label: '20% off research bundle' },
]

export function getPromoCode(code: string): PromoCode | null {
  return PROMO_CODES.find(p => p.code.toUpperCase() === code.toUpperCase()) ?? null
}
