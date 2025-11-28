import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "@/lib/axios"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoriteContext"
import { Heart, Star } from "lucide-react"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { add } = useCart()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const customer = JSON.parse(localStorage.getItem("customer") || "null")

  const [localFav, setLocalFav] = useState(false)

  // Ratings
  const [ratings, setRatings] = useState<any[]>([])
  const [average, setAverage] = useState(0)
  const [userRating, setUserRating] = useState<number | null>(null)

  const [comment, setComment] = useState("")
  const [showModal, setShowModal] = useState(false)

  // Carrega produto
  useEffect(() => {
    if (!id) return
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data)
      setLoading(false)
    })
  }, [id])

  // Atualiza coração
  useEffect(() => {
    if (product) {
      setLocalFav(isFavorite(product.id))
    }
  }, [product, favorites])

  // Carrega avaliações
  async function loadRatings() {
    if (!id) return
    const res = await api.get(`/ratings/product/${id}`)
    setRatings(res.data || [])

    if (res.data.length > 0) {
      const avg =
        res.data.reduce((acc: number, r: any) => acc + r.stars, 0) /
        res.data.length
      setAverage(avg)
    }

    // Verifica se usuário já avaliou
    if (customer) {
      const existing = res.data.find((r: any) => r.customer.id === customer.id)
      if (existing) {
        setUserRating(existing.stars)
        setComment(existing.comment)
      }
    }
  }

  useEffect(() => {
    loadRatings()
  }, [id])

  async function handleFavorite() {
    const prev = localFav
    setLocalFav(!localFav)

    try {
      await toggleFavorite(product.id)
    } catch {
      setLocalFav(prev)
    }
  }

  async function submitRating() {
    if (!customer) {
      alert("Faça login para avaliar o produto.")
      return
    }

    if (!userRating) {
      alert("Selecione uma quantidade de estrelas.")
      return
    }

    await api.post("/ratings", {
      productId: product.id,
      customerId: customer.id,
      stars: userRating,
      comment
    })

    setShowModal(false)
    loadRatings()
  }

  if (loading || !product) {
    return <div className="text-center py-20 text-white">Carregando...</div>
  }

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* IMAGEM */}
        <div className="bg-[#161b22] rounded-2xl p-8 flex items-center justify-center border border-white/5">
          <img 
            src={product.imageUrl} 
            className="max-h-80 object-contain transition hover:scale-105" 
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6">
          
          {/* TÍTULO / FAVORITO */}
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

          {/* AVALIAÇÕES */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={i < Math.round(average) ? "text-yellow-400 fill-yellow-400" : "text-slate-500"}
              />
            ))}
            <span className="text-slate-300 ml-2">
              {average.toFixed(1)} ({ratings.length} avaliações)
            </span>
          </div>

          <p className="text-slate-300">{product.description}</p>

          <p className="text-emerald-400 text-3xl font-semibold">
            R$ {Number(product.price).toFixed(2)}
          </p>

          <button
            onClick={() => add(product)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-lg"
          >
            Adicionar ao Carrinho
          </button>

          {/* BOTÃO AVALIAR */}
          <button
            onClick={() => setShowModal(true)}
            className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-500/10 transition"
          >
            Avaliar produto ⭐
          </button>
        </div>
      </div>

      {/* LISTA DE AVALIAÇÕES */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4">Avaliações dos usuários</h2>

        {ratings.length === 0 && (
          <p className="text-slate-400">Este produto ainda não possui avaliações.</p>
        )}

        {ratings.map(r => (
          <div 
            key={r.id}
            className="bg-[#161b22] p-4 rounded-xl border border-white/5 mb-4"
          >
            <div className="flex items-center gap-2 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < r.stars ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                />
              ))}
            </div>
            <p className="text-slate-300">{r.comment}</p>
          </div>
        ))}
      </div>

      {/* MODAL AVALIAÇÃO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1c2333] p-8 rounded-2xl w-96 border border-white/10">

            <h2 className="text-xl font-semibold mb-4">Avaliar produto</h2>

            {/* ESTRELAS */}
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  onClick={() => setUserRating(i + 1)}
                  className={`cursor-pointer transition ${
                    i < (userRating || 0)
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-slate-600"
                  }`}
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-[#0d1117] text-white p-3 rounded-xl outline-none border border-white/10"
              rows={4}
              placeholder="Digite um comentário..."
            />

            <button
              onClick={submitRating}
              className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
            >
              Enviar avaliação
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 py-3 text-slate-400 hover:text-white transition"
            >
              Cancelar
            </button>

          </div>
        </div>
      )}
    </div>
  )
}
