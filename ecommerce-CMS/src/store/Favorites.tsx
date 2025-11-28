import { useFavorites } from "@/contexts/FavoriteContext"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <h1 className="text-4xl font-semibold mb-8 flex items-center gap-2">
        Meus Favoritos <span className="text-red-500">❤️</span>
      </h1>

      {favorites.length === 0 && (
        <p className="text-slate-400 text-lg">
          Você ainda não favoritou nenhum produto.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(fav => (
          <div
            key={fav.id}
            className="
              bg-[#161b22] p-4 rounded-xl 
              border border-white/5 
              hover:border-blue-500/30 
              hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]
              transition relative group
            "
          >
            {/* BOTÃO DE DESFAVORITAR */}
            <button
              onClick={() => toggleFavorite(fav.productId)}
              className="
                absolute top-3 right-3 p-1 rounded-full 
                text-red-500 hover:scale-110 transition z-20
              "
            >
              <Heart size={20} className="fill-red-500" />
            </button>

            {/* LINK DO PRODUTO */}
            <Link to={`/product/${fav.productId}`} className="block">
              <img
                src={fav.product?.imageUrl}
                className="h-40 w-full object-contain mb-4"
              />

              <h2 className="text-xl font-semibold line-clamp-2">
                {fav.product?.name || "Produto removido"}
              </h2>

              <p className="text-emerald-400 font-medium mt-2">
                R$ {Number(fav.product?.price || 0).toFixed(2)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
