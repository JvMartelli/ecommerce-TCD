import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { api } from "@/lib/axios"
import { useCart } from "@/contexts/CartContext"

export default function ProductDetail() {
  const { id } = useParams()
  const cart = useCart()
  const [product, setProduct] = useState<any | null>(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.get(`/products/${id}`).then(res => setProduct(res.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="min-h-screen bg-[#0d1117] p-10"><div className="max-w-4xl mx-auto animate-pulse h-72 bg-[#161b22] rounded-xl" /></div>
  }

  if (!product) {
    return <div className="min-h-screen bg-[#0d1117] p-10 text-slate-300">Produto não encontrado.</div>
  }

  function addToCart() {
    cart.add({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl }, qty)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#161b22] border border-white/5 rounded-3xl p-8 flex items-center justify-center">
          <img src={product.imageUrl} alt={product.name} className="max-h-96 object-contain" />
        </div>

        <div className="bg-[#161b22] border border-white/5 rounded-3xl p-8 flex flex-col">
          <div className="text-2xl font-semibold">{product.name}</div>
          <div className="text-slate-400 mt-2">{product.brand?.name}</div>
          <div className="text-emerald-400 font-bold text-2xl mt-4">R$ {Number(product.price).toFixed(2)}</div>

          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="bg-[#0f1724] px-3 py-2 rounded-lg">-</button>
            <div className="px-4">{qty}</div>
            <button onClick={() => setQty(qty + 1)} className="bg-[#0f1724] px-3 py-2 rounded-lg">+</button>
          </div>

          <button onClick={addToCart} className="w-full mt-6 bg-white text-[#0d1117] px-4 py-3 rounded-xl font-semibold">Adicionar ao carrinho</button>

          <div className="mt-6 text-sm text-slate-400">Categoria: {product.category?.name}</div>

          <div className="mt-6 text-slate-300 leading-relaxed">{product.description}</div>

          <Link to="/products" className="mt-6 text-sm text-slate-400 hover:text-white">Voltar aos produtos</Link>
        </div>
      </div>
    </div>
  )
}
