"use client"

import { useState, useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import ItemCount from "./ItemCount"
import { CartContext } from "@/context/CartContext"
import { ShoppingCart, ArrowLeft } from 'lucide-react'

interface ItemDetailProps {
  product: Product
}

export default function ItemDetail({ product }: ItemDetailProps) {
  const { id, title, description, price, imageUrl, stock, category } = product
  const [quantityAdded, setQuantityAdded] = useState(0)
  const { addItem } = useContext(CartContext)
  const router = useRouter()

  // Verificar que price existe y es un número
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00'

  const handleAddToCart = (quantity: number) => {
    setQuantityAdded(quantity)

    addItem({
      id,
      title,
      price: typeof price === 'number' ? price : 0,
      imageUrl,
      quantity,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 p-6">
        <div className="relative h-80 md:h-96 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-emerald-600 mb-4 self-start"
          >
            <ArrowLeft size={16} className="mr-1" />
            Volver
          </button>

          <span className="text-sm text-gray-500 uppercase mb-2">Categoría: {category || 'Sin categoría'}</span>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-3xl font-bold text-emerald-600 mb-4">${formattedPrice}</p>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-semibold mb-2">Descripción:</h3>
            <p className="text-gray-700">{description || 'Sin descripción disponible'}</p>
          </div>

          {typeof stock === 'number' && stock > 0 ? (
            <p className="text-sm text-gray-600 mb-4">{stock} unidades disponibles</p>
          ) : (
            <p className="text-sm text-red-500 mb-4">Sin stock disponible</p>
          )}

          <div className="mt-auto">
            {quantityAdded > 0 ? (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">
                  ¡Agregaste {quantityAdded} {quantityAdded === 1 ? "unidad" : "unidades"} al carrito!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="btn btn-secondary flex items-center justify-center"
                    onClick={() => router.push("/productos")}
                  >
                    Seguir comprando
                  </button>
                  <button
                    className="btn btn-primary flex items-center justify-center"
                    onClick={() => router.push("/carrito")}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Ir al carrito
                  </button>
                </div>
              </div>
            ) : (
              <ItemCount initial={1} stock={typeof stock === 'number' ? stock : 0} onAdd={handleAddToCart} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
