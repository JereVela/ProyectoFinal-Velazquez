"use client"

import { useState, useEffect } from "react"
import ItemList from "./ItemList"
import { getProducts, getProductsByCategory } from "@/services/firebase/products"
import type { Product } from "@/types"
import LoadingSpinner from "./LoadingSpinner"

interface ItemListContainerProps {
  categoryId?: string
}

export default function ItemListContainer({ categoryId }: ItemListContainerProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchProducts = async () => {
      try {
        console.log("Iniciando fetchProducts, categoryId:", categoryId)
        let productsData

        if (categoryId) {
          productsData = await getProductsByCategory(categoryId)
        } else {
          productsData = await getProducts()
        }

        console.log("Productos obtenidos:", productsData)
        
        // Verificar la estructura de los productos
        if (productsData.length > 0) {
          console.log("Ejemplo de producto:", JSON.stringify(productsData[0], null, 2))
        }

        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError("No se pudieron cargar los productos. Por favor, intenta nuevamente más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return <LoadingSpinner message="Cargando productos..." />
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">No hay productos disponibles en esta categoría.</p>
      </div>
    )
  }

  return <ItemList products={products} />
}
