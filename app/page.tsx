"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function Home() {
  useEffect(() => {
    // Verificar variables de entorno
    console.log("Variables de entorno de Firebase:")
    console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Configurada" : "No configurada")
    console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
    console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)
  }, [])

  redirect("/productos")
}
