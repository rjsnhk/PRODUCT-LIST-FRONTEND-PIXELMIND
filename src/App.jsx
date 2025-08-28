// App.jsx
import React, { useState } from "react"
import  SearchBar  from "./components/SearchBar"
import  CategoryFilter  from "./components/CategoryFilter"
import  CartIcon  from "./components/CartIcon"
import  ProductModal  from "./components/ProductModal"
import  AddProductForm  from "./components/AddProductForm"
import  ShoppingCart  from "./components/ShoppingCart"
import ProductGrid from "./components/ProductGrid"

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              E-Commerce Store
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="px-2 py-1 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>
              <CartIcon onClick={() => setShowCart(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Search and Filter Controls */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <SearchBar />
            <div className="sm:hidden">
              <CategoryFilter />
            </div>
          </div>
          <div className="hidden sm:block">
            <CategoryFilter />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid onProductClick={setSelectedProduct} />
      </main>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}

      {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
    </div>
  )
}
