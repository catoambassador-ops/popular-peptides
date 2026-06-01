import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentItem {
  slug: string
  name: string
  price: number
  image?: string
}

interface RecentlyViewedStore {
  items: RecentItem[]
  add: (item: RecentItem) => void
  clear: () => void
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set(state => {
        const filtered = state.items.filter(i => i.slug !== item.slug)
        return { items: [item, ...filtered].slice(0, 6) }
      }),
      clear: () => set({ items: [] }),
    }),
    { name: 'pp-recently-viewed' }
  )
)
