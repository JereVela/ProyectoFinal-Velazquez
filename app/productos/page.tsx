import ItemListContainer from "@/components/ItemListContainer"
import FirebaseTest from "@/components/FirebaseTest"

export default function ProductsPage() {
  return (
    <div>
      <h1>Nuestros Productos</h1>
      
      {/* Componente de diagnóstico - Quitar después de solucionar el problema */}
      <div className="mb-8">
        <FirebaseTest />
      </div>
      
      <ItemListContainer />
    </div>
  )
}
