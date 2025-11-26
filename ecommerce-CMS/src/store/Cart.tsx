import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Cart() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart") || "[]"))
  }, [])

  function updateQty(id: string, qty: number) {
    const list = items.map(item =>
      item.id === id ? { ...item, qty: Number(qty) } : item
    )
    setItems(list)
    localStorage.setItem("cart", JSON.stringify(list))
  }

  function removeItem(id: string) {
    const list = items.filter(item => item.id !== id)
    setItems(list)
    localStorage.setItem("cart", JSON.stringify(list))
  }

  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Carrinho vazio</h1>
        <Link to="/" className="bg-blue-500 px-4 py-2 rounded">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

        <ul className="space-y-4 mb-6">
          {items.map(item => (
            <li
              key={item.id}
              className="bg-slate-800 p-4 rounded flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} className="w-20 h-20 object-contain" />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-emerald-400">
                    R$ {Number(item.price).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => updateQty(item.id, Number(e.target.value))}
                  className="w-16 text-black text-center rounded"
                />

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center text-xl font-bold">
          <div>Total: R$ {total.toFixed(2)}</div>
          <button className="bg-green-500 px-6 py-3 rounded text-white">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}
