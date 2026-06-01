import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

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

const FREE_SHIPPING_THRESHOLD = 15000 // $150 CAD
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
          return { items: [...state.items, newItem] }
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
