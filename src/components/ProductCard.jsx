import React from "react"
import { Star, ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/useStore"

function ProductCard({ product, onClick }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div
      className="bg-card rounded-lg border hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="aspect-square p-4 bg-white">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-card-foreground leading-tight">
          {truncateText(product.title, 60)}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {truncateText(product.description, 100)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">
              {product.rating?.rate || "N/A"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-card-foreground">
            {formatPrice(product.price)}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
