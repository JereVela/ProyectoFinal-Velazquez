import ItemDetailContainer from "@/components/ItemDetailContainer"

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return <ItemDetailContainer productId={params.productId} />
}
