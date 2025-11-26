import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function CategoryProducts() {
  const { id } = useParams()
  const [products, setProducts] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    api.get(`/categories/${id}`).then(res => setCategoryName(res.data?.name || ""))
    api.get("/products").then(res => {
      const all = res.data || []
      setProducts(all.filter((p: any) => p.category?.id === id))
    })
  }, [id])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="bg-slate-800 p-4 rounded-lg"
            >
              <img src={p.imageUrl} className="w-full h-40 object-contain mb-3" />
              <div className="font-semibold">{p.name}</div>
              <div className="text-emerald-400 font-bold mt-2">
                R$ {Number(p.price).toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
