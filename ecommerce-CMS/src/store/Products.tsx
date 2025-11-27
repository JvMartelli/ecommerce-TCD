import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "@/lib/axios"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function Products() {
  const cart = useCart()
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([api.get("/products"), api.get("/categories"), api.get("/brands")])
      .then(([p, c, b]) => {
        setProducts(p.data || [])
        setCategories(c.data || [])
        setBrands(b.data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => (category ? p.category?.id === category : true))
    .filter(p => (brand ? p.brand?.id === brand : true))

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-semibold">Produtos</h1>
            <p className="text-slate-400 mt-1">Explore nossa seleção premium</p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              placeholder="Pesquisar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#0f1724] border border-white/5 rounded-lg px-4 py-2 w-64 text-white focus:outline-none"
            />
            <select value={category} onChange={e => setCategory(e.target.value)} className="bg-[#0f1724] border border-white/5 rounded-lg px-3 py-2 text-white">
              <option value="">Todas as categorias</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={brand} onChange={e => setBrand(e.target.value)} className="bg-[#0f1724] border border-white/5 rounded-lg px-3 py-2 text-white">
              <option value="">Todas as marcas</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#161b22] rounded-2xl p-6 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(p => {
              const inCart = cart.items.find((it: any) => it.id === p.id)
              return (
                <div key={p.id} className="bg-[#161b22] border border-white/5 rounded-2xl p-6 flex flex-col justify-between transition hover:shadow-xl">
                  <Link to={`/product/${p.id}`} className="block">
                    <div className="w-full h-44 flex items-center justify-center mb-4">
                      <img src={p.imageUrl} alt={p.name} className="max-h-40 object-contain" />
                    </div>

                    <div className="text-slate-200 font-medium line-clamp-2 mb-2">{p.name}</div>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-emerald-400 font-semibold">R$ {Number(p.price).toFixed(2)}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => cart.add({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }, 1)}
                        className="bg-white text-[#0d1117] px-3 py-2 rounded-lg font-medium flex items-center gap-2"
                      >
                        {inCart ? <Check /> : <ShoppingCart />}
                        <span className="hidden sm:inline">{inCart ? "Adicionado" : "Adicionar"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
