import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function CategoryProducts() {
  const { id } = useParams()
  const [products, setProducts] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.get(`/categories/${id}`).then(res => setCategoryName(res.data?.name || "")).catch(() => setCategoryName(""))
    api.get("/products").then(res => {
      const all = res.data || []
      setProducts(all.filter((p: any) => p.category?.id === id))
    }).finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6">{categoryName}</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="bg-[#161b22] rounded-2xl p-6 h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-[#161b22] border border-white/5 rounded-2xl p-6 hover:shadow-xl transition flex flex-col">
                <div className="w-full h-44 flex items-center justify-center mb-4">
                  <img src={p.imageUrl} alt={p.name} className="max-h-40 object-contain" />
                </div>
                <div className="text-slate-200 font-medium line-clamp-2 mb-2">{p.name}</div>
                <div className="text-emerald-400 font-semibold">R$ {Number(p.price).toFixed(2)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
