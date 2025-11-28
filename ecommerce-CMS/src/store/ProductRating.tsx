import { useEffect, useState } from "react"
import { api } from "@/lib/axios"
import { useParams } from "react-router-dom"
import { Star } from "lucide-react"

export default function ProductRating() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem("customer") || "null")

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState("")
  const [alreadyRated, setAlreadyRated] = useState(false)
  const [ratings, setRatings] = useState<any[]>([])
  const [avg, setAvg] = useState(0)

  useEffect(() => {
    if (!id) return

    api.get(`/ratings/product/${id}`).then(res => {
      setRatings(res.data)

      if (res.data.length > 0) {
        const sum = res.data.reduce((acc: number, r: any) => acc + r.stars, 0)
        setAvg(sum / res.data.length)
      }

      if (user) {
        const mine = res.data.find((r: any) => r.customerId === user.id)
        if (mine) {
          setAlreadyRated(true)
          setRating(mine.stars)
          setComment(mine.comment)
        }
      }
    })
  }, [id])

  async function submitRating() {
    if (!user) {
      alert("Faça login para avaliar.")
      return
    }

    if (alreadyRated) {
      alert("Você já avaliou este produto!")
      return
    }

    await api.post("/ratings", {
      productId: id,
      customerId: user.id,
      stars: rating,
      comment
    })

    alert("Avaliação enviada! Obrigado 😊")
    window.location.reload()
  }

  return (
    <div className="mt-12 p-6 bg-[#161b22] rounded-2xl border border-white/10 text-white">
      <h2 className="text-2xl font-semibold mb-4">Avaliações ⭐</h2>

      {/* MÉDIA */}
      {ratings.length > 0 ? (
        <p className="text-lg mb-6 text-yellow-400">
          Média: {avg.toFixed(1)} / 5 ⭐ ({ratings.length} avaliações)
        </p>
      ) : (
        <p className="text-slate-400 mb-6">Nenhuma avaliação ainda.</p>
      )}

      {/* SE JÁ AVALIOU */}
      {alreadyRated && (
        <p className="text-emerald-400 text-lg font-medium mb-4">
          Você já avaliou este produto! ⭐
        </p>
      )}

      {/* ESTRELAS INTERATIVAS */}
      {!alreadyRated && (
        <>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition 
                  ${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-500"}
                `}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* COMENTÁRIO */}
          <textarea
            placeholder="Deixe um comentário (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-[#0d1117] border border-white/10 rounded-xl p-3 outline-none"
          />

          <button
            onClick={submitRating}
            className="mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl transition"
          >
            Enviar Avaliação
          </button>
        </>
      )}

      {/* LISTA DE AVALIAÇÕES */}
      <div className="mt-8 flex flex-col gap-6">
        {ratings.map((r) => (
          <div
            key={r.id}
            className="bg-[#0f1624] border border-white/5 p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  className={
                    s <= r.stars
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-600"
                  }
                />
              ))}
            </div>
            <p className="text-slate-300">{r.comment || "Sem comentário"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
