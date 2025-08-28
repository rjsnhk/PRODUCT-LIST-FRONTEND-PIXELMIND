import React, { useEffect } from "react"
import { X, Star, ShoppingCart, Tag } from "lucide-react"
import { useCartStore } from "../store/useStore"

function ProductModal({ product, onClose }) {
  const addItem = useCartStore((state) => state.addItem)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden" // Prevent background scroll

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const handleAddToCart = () => {
    addItem(product)
    // Optional: add toast/notification here
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-background rounded-lg shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[95vh] sm:max-h-[90vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-white rounded-lg p-4 sm:p-8">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="max-w-full max-h-64 sm:max-h-96 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(product.rating?.rate || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating?.rate || "N/A"}</span>
                </div>
                <span className="text-muted-foreground">({product.rating?.count || 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-primary">{formatPrice(product.price)}</div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-base sm:text-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - {formatPrice(product.price)}
                </button>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-4 pt-4 border-t">
                <div>
                  <h4 className="font-medium text-foreground">Product ID</h4>
                  <p className="text-muted-foreground">#{product.id}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Category</h4>
                  <p className="text-muted-foreground capitalize">{product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Rating</h4>
                  <p className="text-muted-foreground">{product.rating?.rate || "N/A"} / 5.0</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Reviews</h4>
                  <p className="text-muted-foreground">{product.rating?.count || 0} reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
