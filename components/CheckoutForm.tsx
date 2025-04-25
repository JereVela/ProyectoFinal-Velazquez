"use client"

import type React from "react"

import { useState, useContext, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { CartContext } from "@/context/CartContext"
import { createOrder } from "@/services/firebase/orders"
import LoadingSpinner from "./LoadingSpinner"

export default function CheckoutForm() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const router = useRouter()
  const totalPrice = getTotalPrice()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    emailConfirm: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validaciones
    if (cart.length === 0) {
      setError("Tu carrito está vacío")
      return
    }

    if (formData.email !== formData.emailConfirm) {
      setError("Los correos electrónicos no coinciden")
      return
    }

    setLoading(true)

    try {
      const order = {
        buyer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
        date: new Date(),
      }

      const id = await createOrder(order)
      setOrderId(id)
      clearCart()
    } catch (error) {
      console.error("Error creating order:", error)
      setError("Ocurrió un error al procesar tu orden. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Procesando tu orden..." />
  }

  if (orderId) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h2>
        <p className="text-gray-600 mb-6">
          Tu orden ha sido procesada correctamente. Te hemos enviado un correo con los detalles de tu compra.
        </p>
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-600 mb-1">ID de tu orden:</p>
          <p className="font-mono text-emerald-600 font-bold break-all">{orderId}</p>
        </div>
        <button className="btn btn-primary w-full" onClick={() => router.push("/productos")}>
          Volver a la tienda
        </button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Información de contacto</h2>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="emailConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar correo electrónico
              </label>
              <input
                type="email"
                id="emailConfirm"
                name="emailConfirm"
                value={formData.emailConfirm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
              Finalizar compra
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Resumen de tu orden</h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.title}</span>
                  <span className="text-gray-600 text-sm ml-2">x{item.quantity}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
