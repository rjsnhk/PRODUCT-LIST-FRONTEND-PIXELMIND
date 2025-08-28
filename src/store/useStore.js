import { create } from "zustand"

// 🔎 Search and Filter Store
export const useSearchStore = create((set) => ({
  searchTerm: "",
  selectedCategory: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearFilters: () => set({ searchTerm: "", selectedCategory: "" }),
}))

// 🛒 Shopping Cart Store
export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items
    const existingItem = items.find((item) => item.id === product.id)

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) })
  },
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))
