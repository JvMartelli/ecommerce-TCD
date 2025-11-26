import { useEffect, useState } from "react"
import { api } from "@/lib/axios"
import { Link } from "react-router-dom"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data || []))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Todos os Produtos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="bg-slate-800 rounded-lg p-4"
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
