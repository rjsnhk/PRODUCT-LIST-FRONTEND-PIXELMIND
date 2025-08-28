import React, { useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/useStore";

function ShoppingCart({ onClose }) {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Mock checkout
    alert(
      `Checkout successful! Total: ${formatPrice(
        getTotalPrice()
      )}\n\nThis is a mock checkout process.`
    );
    clearCart();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full sm:max-w-md h-full bg-background shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Shopping Cart
            </h2>
            {totalItems > 0 && (
              <span className="text-sm text-muted-foreground">
                ({totalItems} items)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-4">
                Add some products to get started!
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 sm:p-6 space-y-4">
            <button
              onClick={clearCart}
              className="w-full text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              Clear Cart
            </button>

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-base"
            >
              Checkout ({totalItems} items)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({ item, onUpdateQuantity, onRemove, formatPrice }) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const truncateText = (text, maxLength) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border">
      <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-card-foreground leading-tight mb-1">
          {truncateText(item.title, 50)}
        </h4>
        <p className="text-sm text-muted-foreground capitalize mb-2">
          {item.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-card-foreground">
            {formatPrice(item.price)}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-1 hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-1 hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 text-destructive hover:text-destructive/80 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        {item.quantity > 1 && (
          <div className="text-sm text-muted-foreground mt-1">
            Subtotal: {formatPrice(item.price * item.quantity)}
          </div>
        )}
      </div>
    </div>
  );
}


export default ShoppingCart