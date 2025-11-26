import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any | null>(null)

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data || null))
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        Carregando...
      </div>
    )
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const item = cart.find((p: any) => p.id === product.id)

    if (item) {
      item.qty += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.location.href = "/cart"
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto flex gap-10">
        <img src={product.imageUrl} className="w-80 h-80 object-contain" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="mb-4">{product.description}</p>

          <div className="text-emerald-400 text-3xl font-bold mb-6">
            R$ {Number(product.price).toFixed(2)}
          </div>

          <button
            onClick={addToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
