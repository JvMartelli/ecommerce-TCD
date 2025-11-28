import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const customer = JSON.parse(localStorage.getItem("customer") || "null")

  useEffect(() => {
    if (!customer) return

    api
      .get(`/orders/customer/${customer.id}`)
      .then(res => setOrders(res.data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Meus Pedidos</h1>

        {loading ? (
          <p className="text-slate-400">Carregando...</p>
        ) : orders.length === 0 ? (
          <p className="text-slate-400">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between mb-4">
                  <p className="text-lg font-semibold">
                    Pedido #{order.id.substring(0, 8)}
                  </p>
                  <p className="text-emerald-400 font-medium">
                    R$ {Number(order.total).toFixed(2)}
                  </p>
                </div>

                <p className="text-slate-300 mb-3">
                  Status: <span className="text-blue-400">{order.status}</span>
                </p>

                <p className="text-slate-400 mb-4">
                  Endereço: {order.address}
                </p>

                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-white/10 pb-3"
                    >
                      <div className="flex items-center gap-3">
                        {item.productImage && (
                          <img
                            src={item.productImage}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-xs text-slate-400">
                            Qtd: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-emerald-400 font-medium">
                        R$ {Number(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
