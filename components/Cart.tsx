"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import { CartContext } from "@/context/CartContext"
import CartItem from "./CartItem"
import { ShoppingBag } from "lucide-react"

export default function Cart() {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext)
  const router = useRouter()
  const totalPrice = getTotalPrice()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra</p>
        <button className="btn btn-primary" onClick={() => router.push("/productos")}>
          Ver productos
        </button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Resumen de compra</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío:</span>
              <span>Gratis</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="btn btn-primary w-full" onClick={() => router.push("/checkout")}>
              Finalizar compra
            </button>
            <button className="btn btn-secondary w-full" onClick={() => router.push("/productos")}>
              Seguir comprando
            </button>
            <button
              className="text-red-600 hover:text-red-800 text-sm font-medium w-full text-center mt-4"
              onClick={() => clearCart()}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
