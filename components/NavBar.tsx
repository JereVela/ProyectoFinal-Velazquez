"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import CartWidget from "./CartWidget"
import { Menu, X } from "lucide-react"
import { getCategories } from "@/services/firebase/products"

export default function NavBar() {
  const [categories, setCategories] = useState<string[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }

    loadCategories()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path ? "text-emerald-600 font-bold" : "text-gray-700 hover:text-emerald-600"
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/productos" className="text-2xl font-bold text-emerald-600">
            EcoShop
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/productos" className={`${isActive("/productos")} transition-colors`}>
              Productos
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categoria/${category}`}
                className={`${isActive(`/categoria/${category}`)} transition-colors capitalize`}
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <CartWidget />

            {/* Mobile Menu Button */}
            <button
              className="ml-4 md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/productos" className={`block py-2 px-4 ${isActive("/productos")}`} onClick={closeMenu}>
              Productos
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categoria/${category}`}
                className={`block py-2 px-4 ${isActive(`/categoria/${category}`)} capitalize`}
                onClick={closeMenu}
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
