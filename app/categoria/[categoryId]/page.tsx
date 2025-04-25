import ItemListContainer from "@/components/ItemListContainer"

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  return (
    <div>
      <h1 className="capitalize">Categoría: {params.categoryId}</h1>
      <ItemListContainer categoryId={params.categoryId} />
    </div>
  )
}
