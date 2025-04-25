"use client"

import { useContext } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { CartContext } from "@/context/CartContext"

export default function CartWidget() {
  const { getTotalQuantity } = useContext(CartContext)
  const totalItems = getTotalQuantity()

  return (
    <Link href="/carrito" className="relative flex items-center">
      <ShoppingCart size={24} className="text-gray-700" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
