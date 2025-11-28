import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "@/lib/axios"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoriteContext"
import { Heart } from "lucide-react"
import Favorites from "./Favorites"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { add } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [localFav, setLocalFav] = useState(false)

  useEffect(() => {
    if (!id) return
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data)
      setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (product) {
      setLocalFav(isFavorite(product.id))
    }
  }, [product, Favorites])

  if (loading || !product) {
    return <div className="text-center py-20 text-white">Carregando...</div>
  }

  async function handleFavorite() {
    const prev = localFav
    setLocalFav(!localFav)
    try {
      await toggleFavorite(product.id)
    } catch {
      setLocalFav(prev)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        <div className="bg-[#161b22] rounded-2xl p-8 flex items-center justify-center border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition">
          <img src={product.imageUrl} className="max-h-80 object-contain transition hover:scale-105" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl font-semibold">{product.name}</h1>

            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition ${
                localFav ? "text-red-500" : "text-slate-300 hover:text-red-400"
              }`}
            >
              <Heart
                size={28}
                className={`transition duration-200 ${
                  localFav ? "fill-red-500 scale-125" : "scale-100"
                }`}
              />
            </button>
          </div>

          <p className="text-slate-300">{product.description}</p>

          <p className="text-emerald-400 text-3xl font-semibold">
            R$ {Number(product.price).toFixed(2)}
          </p>

          <button
            onClick={() => add(product)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-medium transition hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02]"
          >
            Adicionar ao Carrinho
          </button>
        </div>

      </div>
    </div>
  )
}
