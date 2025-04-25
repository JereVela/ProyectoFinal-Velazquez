import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types"

interface ItemProps {
  product: Product
}

export default function Item({ product }: ItemProps) {
  const { id, title, price, imageUrl, stock } = product

  // Verificar que price existe y es un número
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00'

  return (
    <div className="card group hover:scale-105">
      <Link href={`/producto/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-emerald-600 font-bold text-xl">${formattedPrice}</p>
          {typeof stock === 'number' && stock > 0 ? (
            <p className="text-sm text-gray-500">{stock} disponibles</p>
          ) : (
            <p className="text-sm text-red-500">Sin stock</p>
          )}
          <button className="btn btn-primary w-full mt-3">Ver detalle</button>
        </div>
      </Link>
    </div>
  )
}
