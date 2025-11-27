import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function Home() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    api.get("/products").then(res => {
      setProducts((res.data || []).slice(0, 6))
    })
  }, [])

  return (
    <>
        <section
      className="
        relative w-full h-[320px] rounded-3xl mb-12
        bg-gradient-to-r from-[#0c1633] via-[#0f1c40] to-[#0c1633]
        overflow-hidden shadow-xl border border-white/5
      "
    >
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-purple-600 rounded-full blur-3xl" />
      </div>

      
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Spher Tek Store
        </h1>

        <p className="text-slate-300 text-lg mt-3 max-w-2xl">
          Os melhores componentes e hardware premium para montar sua máquina ideal.
        </p>

        <Link
          to="/products"
          className="
            mt-6 px-6 py-3 text-lg rounded-xl font-medium
            bg-blue-600 hover:bg-blue-500 text-white
            transition hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
            hover:scale-[1.05]
          " 
        >
          Ver Produtos
        </Link>
      </div>
    </section>



      <h2 className="text-3xl font-semibold mb-6">Destaques Selecionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-14">
        {products.map(p => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="
              group bg-gradient-to-br from-[#161b22] to-[#0f131a]
              border border-white/5 rounded-3xl p-6
              hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]
              transition duration-300 flex flex-col
              hover:scale-[1.03]
            "
          >
            <img
              src={p.imageUrl}
              className="
                rounded-xl w-full h-52 object-contain mb-4 transition
                group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]
              "
            />

            <div className="text-slate-200 font-medium min-h-[48px] group-hover:text-white transition">
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
