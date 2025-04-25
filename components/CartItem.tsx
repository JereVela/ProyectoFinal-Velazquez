"use client"

import { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { CartContext } from "@/context/CartContext"
import type { CartItem as CartItemType } from "@/types"
import { Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { id, title, price, quantity, imageUrl } = item
  const { removeItem } = useContext(CartContext)

  return (
    <div className="flex items-center border-b pb-6 last:border-b-0 last:pb-0">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill sizes="80px" className="object-cover rounded" />
      </div>

      <div className="ml-4 flex-grow">
        <Link href={`/producto/${id}`} className="font-medium hover:text-emerald-600">
          {title}
        </Link>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
          <div className="text-gray-600">
            <span className="font-medium">${typeof price === "number" ? price.toFixed(2) : "0.00"}</span> x {quantity}
          </div>
          <div className="font-bold text-emerald-600 mt-1 sm:mt-0">
            ${typeof price === "number" ? (price * quantity).toFixed(2) : "0.00"}
          </div>
        </div>
      </div>

      <button
        className="ml-4 text-gray-400 hover:text-red-600 p-1"
        onClick={() => removeItem(id)}
        aria-label="Eliminar producto"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}
