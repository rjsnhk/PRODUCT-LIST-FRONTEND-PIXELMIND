import React, { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"
import ProductCard from "./ProductCard"
import { useSearchStore } from "../store/useStore"

function ProductGrid({ onProductClick }) {
  const { searchTerm, selectedCategory } = useSearchStore()

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: api.getProducts,
  })

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg border p-4 animate-pulse">
            <div className="aspect-square bg-muted rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-destructive text-lg font-semibold mb-2">Error loading products</div>
        <p className="text-muted-foreground">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-lg font-semibold mb-2">No products found</div>
        <p className="text-muted-foreground">
          {searchTerm || selectedCategory
            ? "Try adjusting your search or filter criteria"
            : "No products available at the moment"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  )
}

export default ProductGrid
