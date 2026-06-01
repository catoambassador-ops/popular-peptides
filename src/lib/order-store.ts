const ORDER_HISTORY_KEY = 'pp-order-history'
const PURCHASED_KEY = 'pp-purchased'

export interface SavedOrder {
  orderNumber: string
  date: string
  total: number
  items: {
    productId: string
    variantId: string
    productName: string
    variantName: string
    price: number
    quantity: number
    slug: string
  }[]
}

export function saveOrderToHistory(order: SavedOrder) {
  if (typeof window === 'undefined') return
  try {
    const existing: SavedOrder[] = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]')
    const updated = [order, ...existing].slice(0, 10)
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updated))
    // Set purchased cookie (30 day expiry)
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${PURCHASED_KEY}=1; expires=${expires}; path=/`
  } catch {}
}

export function getOrderHistory(): SavedOrder[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]')
  } catch { return [] }
}

export function hasPurchasedBefore(): boolean {
  if (typeof window === 'undefined') return false
  return document.cookie.includes(PURCHASED_KEY)
}
