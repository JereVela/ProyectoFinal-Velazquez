"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"

interface ItemCountProps {
  initial: number
  stock: number
  onAdd: (quantity: number) => void
}

export default function ItemCount({ initial, stock, onAdd }: ItemCountProps) {
  const [quantity, setQuantity] = useState(initial)

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex flex-col">
      {stock === 0 ? (
        <div className="text-red-500 font-medium mb-2">Producto sin stock</div>
      ) : (
        <>
          <div className="flex items-center justify-between border rounded-md mb-4 w-36">
            <button
              onClick={decrement}
              disabled={quantity <= 1}
              className="p-2 text-gray-500 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Disminuir cantidad"
            >
              <Minus size={18} />
            </button>
            <span className="font-medium text-lg">{quantity}</span>
            <button
              onClick={increment}
              disabled={quantity >= stock}
              className="p-2 text-gray-500 hover:text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Aumentar cantidad"
            >
              <Plus size={18} />
            </button>
          </div>
          <button
            className="btn btn-primary flex items-center justify-center"
            onClick={() => onAdd(quantity)}
            disabled={stock === 0}
          >
            <ShoppingCart size={18} className="mr-2" />
            Agregar al carrito
          </button>
        </>
      )}
    </div>
  )
}
