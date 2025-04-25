import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./config"

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface OrderBuyer {
  name: string
  phone: string
  email: string
}

interface Order {
  buyer: OrderBuyer
  items: OrderItem[]
  total: number
  date: Date
}

// Crear una nueva orden
export const createOrder = async (order: Order): Promise<string> => {
  const ordersRef = collection(db, "orders")

  const orderWithTimestamp = {
    ...order,
    date: serverTimestamp(),
  }

  const docRef = await addDoc(ordersRef, orderWithTimestamp)
  return docRef.id
}
