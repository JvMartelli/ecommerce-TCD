import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function Home() {
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data || []))
    api.get("/products").then(res => setProducts((res.data || []).slice(0, 8)))
  }, [])

  return (
    <>
      <section className="text-center py-16">
        <h1 className="text-5xl font-semibold">
          Bem-vindo ao Futuro do Hardware
        </h1>

        <p className="mt-4 text-slate-400 text-lg">
          Componentes premium para montar a máquina dos seus sonhos.
        </p>

        <Link
          to="/products"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-medium"
        >
          Descobrir Produtos
        </Link>
      </section>

      <h2 className="text-3xl font-semibold mb-6">Categorias</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
        {categories.map(c => (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className="bg-[#161b22] hover:bg-[#1b222c] rounded-xl p-6 text-center border border-white/5"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-6">Destaques Selecionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 pb-14">
        {products.map(p => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="bg-[#161b22] hover:bg-[#1b222c] rounded-3xl p-6 border border-white/5 transition shadow-md hover:shadow-lg"
          >
            <img
              src={p.imageUrl}
              className="rounded-xl w-full h-52 object-contain mb-4"
            />

            <div className="text-slate-200 font-medium min-h-[48px]">
              {p.name}
            </div>

            <div className="text-emerald-400 font-semibold text-lg mt-2">
              R$ {Number(p.price).toFixed(2)}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
