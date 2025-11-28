import { useCart } from "@/contexts/CartContext"
import { useState } from "react"
import { api } from "@/lib/axios"

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")

  const customer = JSON.parse(localStorage.getItem("customer") || "null")

  async function finishOrder() {
    setError("")

    if (!name || !address) {
      return setError("Preencha todos os campos.")
    }

    if (!customer) {
      return setError("Você precisa estar logado.")
    }

    setLoading(true)

    try {
      const payload = {
        customerId: customer.id,
        address: address,
        total: total(),
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.price
        }))
      }

      await api.post("/orders", payload)

      clear()
      window.location.href = "/"
    } catch {
      setError("Ocorreu um erro ao finalizar o pedido.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#0b0e13] text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-4xl font-semibold mb-4">Finalizar Compra</h1>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-6">
            <h2 className="text-xl font-semibold">Informações pessoais</h2>

            <input
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30"
            />

            <input
              type="text"
              placeholder="Endereço completo"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <h2 className="text-xl font-semibold mb-4">Itens do pedido</h2>

            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-emerald-400">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6">Resumo</h2>

          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span className="font-bold text-emerald-400">
              R$ {total().toFixed(2)}
            </span>
          </div>

          <button
            onClick={finishOrder}
            disabled={loading}
            className="w-full mt-8 bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 transition disabled:opacity-50"
          >
            {loading ? "Processando..." : "Finalizar pedido"}
          </button>
        </div>

      </div>
    </div>
  )
}
