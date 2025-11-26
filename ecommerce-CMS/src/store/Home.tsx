import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function Home() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data || []))
    api.get("/products").then(res => setProducts((res.data || []).slice(0, 8)))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Categorias</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
          {categories.map(c => (
            <Link
              to={`/category/${c.id}`}
              key={c.id}
              className="bg-slate-800 p-4 rounded-lg text-center hover:bg-slate-700"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Produtos em destaque</h2>

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
