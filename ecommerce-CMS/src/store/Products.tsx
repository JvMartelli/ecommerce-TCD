import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { api } from "@/lib/axios"

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const location = useLocation()

  const search = new URLSearchParams(location.search).get("search")?.toLowerCase() || ""

  useEffect(() => {
    api.get("/products").then(res => {
      const all = res.data || []
      setProducts(all)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products)
      return
    }

    const s = search.trim()

    setFiltered(
      products.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s)
      )
    )
  }, [search, products])

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-semibold">
            {search ? `Resultados para "${search}"` : "Produtos"}
          </h1>

          {search && (
            <p className="text-slate-400 text-sm">
              {filtered.length} resultado(s)
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#161b22] rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-slate-400 text-lg">
            Nenhum produto encontrado para "{search}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="
                  group bg-gradient-to-br from-[#161b22] to-[#0f131a]
                  border border-white/5 rounded-2xl p-6
                  hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
                  transition duration-300 flex flex-col
                  hover:scale-[1.03]
                "
              >
                <div className="w-full h-44 flex items-center justify-center mb-4">
                  <img
                    src={p.imageUrl}
                    className="
                      max-h-40 object-contain transition duration-300
                      group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]
                    "
                  />
                </div>

                <p className="text-slate-200 font-medium line-clamp-2 mb-2 transition group-hover:text-white">
                  {p.name}
                </p>

                <p className="text-emerald-400 font-semibold text-lg">
                  R$ {Number(p.price).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
