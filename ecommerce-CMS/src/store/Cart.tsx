import { useCart } from "@/contexts/CartContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { items, remove, update, total } = useCart()

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Seu Carrinho</h1>

        {items.length === 0 ? (
          <p className="text-slate-400">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} className="w-20 h-20 object-contain rounded-lg" />

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-emerald-400 font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => update(item.id, item.quantity - 1)}
                    className="px-3 py-2 bg-white/10 rounded"
                  >
                    -
                  </button>

                  <div className="px-4 py-2">{item.quantity}</div>

                  <button
                    onClick={() => update(item.id, item.quantity + 1)}
                    className="px-3 py-2 bg-white/10 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => remove(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="text-right text-xl font-semibold mt-6">
              Total: R$ {total().toFixed(2)}
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-white text-black py-3 rounded-xl font-semibold hover:bg-white/90 transition"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
