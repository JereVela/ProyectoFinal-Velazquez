export interface Product {
  id: string
  title: string
  description?: string // Hacerlo opcional
  price: number
  imageUrl?: string // Hacerlo opcional
  category?: string // Hacerlo opcional
  stock?: number // Hacerlo opcional
}

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl?: string // Hacerlo opcional
}
