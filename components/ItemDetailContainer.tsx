"use client"

import { useState, useEffect } from "react"
import { getProductById } from "@/services/firebase/products"
import type { Product } from "@/types"
import ItemDetail from "./ItemDetail"
import LoadingSpinner from "./LoadingSpinner"
import { useRouter } from "next/navigation"

interface ItemDetailContainerProps {
  productId: string
}

export default function ItemDetailContainer({ productId }: ItemDetailContainerProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchProduct = async () => {
      try {
        console.log(`Intentando obtener producto con ID: ${productId}`)
        const productData = await getProductById(productId)

        if (!productData) {
          console.log(`Producto con ID ${productId} no encontrado`)
          setError("Producto no encontrado")
          return
        }

        console.log(`Producto encontrado:`, productData)
        setProduct(productData)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("No se pudo cargar el producto. Por favor, intenta nuevamente más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return <LoadingSpinner message="Cargando producto..." />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button className="btn btn-primary" onClick={() => router.push("/productos")}>
          Volver a productos
        </button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-4">El producto no existe o ha sido eliminado.</p>
        <button className="btn btn-primary" onClick={() => router.push("/productos")}>
          Volver a productos
        </button>
      </div>
    )
  }

  return <ItemDetail product={product} />
}
