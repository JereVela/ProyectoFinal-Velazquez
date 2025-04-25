import type React from "react"
import { Inter } from 'next/font/google'
import "./globals.css" // Esta línea es crucial
import { CartProvider } from "@/context/CartContext"
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
