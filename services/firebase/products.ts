import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { db } from "./config"
import type { Product } from "@/types"

// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  console.log("Obteniendo productos...")
  try {
    const productsRef = collection(db, "products")
    const querySnapshot = await getDocs(productsRef)

    console.log(`Encontrados ${querySnapshot.size} productos`)
    
    const products: Product[] = []

    querySnapshot.forEach((doc) => {
      console.log("Producto encontrado:", doc.id, doc.data())
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product)
    })

    return products
  } catch (error) {
    console.error("Error al obtener productos:", error)
    throw error
  }
}

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const productsRef = collection(db, "products")
  const q = query(productsRef, where("category", "==", categoryId))
  const querySnapshot = await getDocs(q)

  const products: Product[] = []

  querySnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      ...doc.data(),
    } as Product)
  })

  return products
}

// Obtener un producto por ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  const productRef = doc(db, "products", productId)
  const productDoc = await getDoc(productRef)

  if (!productDoc.exists()) {
    return null
  }

  return {
    id: productDoc.id,
    ...productDoc.data(),
  } as Product
}

// Obtener todas las categorías disponibles
export const getCategories = async (): Promise<string[]> => {
  const productsRef = collection(db, "products")
  const querySnapshot = await getDocs(productsRef)

  const categoriesSet = new Set<string>()

  querySnapshot.forEach((doc) => {
    const product = doc.data()
    if (product.category) {
      categoriesSet.add(product.category)
    }
  })

  return Array.from(categoriesSet)
}
