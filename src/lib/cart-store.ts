import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'
import { brevoTrack } from '@/components/BrevoScript'

const ABANDONED_EMAIL_KEY = 'pp-abandoned-email'

function getKnownEmail(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = localStorage.getItem(ABANDONED_EMAIL_KEY)
    return raw ? JSON.parse(raw).email : undefined
  } catch {
    return undefined
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // Computed
  itemCount: () => number
  subtotal: () => number
  shipping: () => number
  total: () => number
}

const FREE_SHIPPING_THRESHOLD = 30000 // $300 CAD
const FLAT_SHIPPING = 1500 // $15 CAD

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set(state => {
          const existing = state.items.find(
            i => i.productId === newItem.productId && i.variantId === newItem.variantId
          )
          if (existing) {
            return {
              items: state.items.map(i =>
                i.productId === newItem.productId && i.variantId === newItem.variantId
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              )
            }
          }
          // Brevo: track cart update (powers abandoned-cart automation)
          const nextItems = [...state.items, newItem]
          const cartTotal =
            nextItems.reduce((sum, i) => sum + i.price * i.quantity, 0) / 100
          brevoTrack('cart_updated', getKnownEmail(), {
            id: 'cart',
            data: {
              total: cartTotal,
              currency: 'CAD',
              url: 'https://popularpeptides.ca/cart',
              items: nextItems.map(i => ({
                name: i.productName,
                variant: i.variantName,
                price: i.price / 100,
                quantity: i.quantity,
                url: `https://popularpeptides.ca/products/${i.slug}`,
              })),
            },
          })
          return { items: nextItems }
        })
      },

      removeItem: (productId, variantId) => {
        set(state => ({
          items: state.items.filter(
            i => !(i.productId === productId && i.variantId === variantId)
          )
        }))
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      shipping: () => {
        const sub = get().subtotal()
        return sub === 0 ? 0 : sub >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
      },
      total: () => get().subtotal() + get().shipping(),
    }),
    {
      name: 'pp-cart',
    }
  )
)
