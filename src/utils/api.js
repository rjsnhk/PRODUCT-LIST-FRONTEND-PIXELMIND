const BASE_URL = "https://fakestoreapi.com"

export const api = {
  // Get all products
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return response.json()
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products by category")
    }
    return response.json()
  },

  // Get single product
  getProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return response.json()
  },
}
