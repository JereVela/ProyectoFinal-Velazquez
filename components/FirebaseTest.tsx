"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/services/firebase/config"

export default function FirebaseTest() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [collections, setCollections] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Intentar obtener todas las colecciones
        const collectionsSnapshot = await getDocs(collection(db, "products"))
        
        if (collectionsSnapshot.empty) {
          setStatus("success")
          setError("La colección 'products' existe pero está vacía")
        } else {
          setStatus("success")
          const collectionData: string[] = []
          collectionsSnapshot.forEach(doc => {
            collectionData.push(`${doc.id}: ${JSON.stringify(doc.data())}`)
          })
          setCollections(collectionData)
        }
      } catch (err: any) {
        setStatus("error")
        setError(err.message || "Error desconocido")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">Diagnóstico de Firebase</h2>
      
      <div className="mb-4">
        <p>Estado: {status === "loading" ? "Cargando..." : status === "success" ? "Conectado" : "Error"}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>

      <div>
        <h3 className="font-semibold mb-1">Configuración:</h3>
        <ul className="text-sm">
          <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✅ Configurada" : "❌ No configurada"}</li>
          <li>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "No configurado"}</li>
          <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "No configurado"}</li>
        </ul>
      </div>

      {collections.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Productos encontrados ({collections.length}):</h3>
          <ul className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {collections.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
