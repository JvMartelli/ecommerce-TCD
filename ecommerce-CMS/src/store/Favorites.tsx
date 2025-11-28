import { useFavorites } from "@/contexts/FavoriteContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold mb-10">Meus Favoritos</h1>

        {favorites.length === 0 ? (
          <p className="text-slate-400">Você ainda não favoritou nenhum produto.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map(f => (
              <Link
                key={f.id}
                to={`/product/${f.productId}`}
                className="bg-[#161b22] rounded-xl p-5 border border-white/10 hover:border-red-400 transition"
              >
                <img
                  src={f.product.imageUrl}
                  className="w-full h-40 object-contain mb-4"
                />

                <p className="text-lg font-medium">{f.product.name}</p>

                <p className="text-emerald-400 text-lg font-bold">
                  R$ {Number(f.product.price).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
