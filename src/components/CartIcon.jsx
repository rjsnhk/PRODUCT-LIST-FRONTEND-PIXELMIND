import React from "react"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/useStore"

function CartIcon({ onClick }) {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-secondary rounded-md transition-colors"
    >
      <ShoppingCart className="w-6 h-6 text-foreground" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  )
}

export default CartIcon;
