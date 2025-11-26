import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    number: "",
    city: "",
    state: "",
    zip: "",
    payment: "pix"
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (cart.items.length === 0) navigate("/cart");
  }, [cart.items, navigate]);

  function handle(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function finish() {
    setLoading(true);
    setTimeout(() => {
      setDone(true);
      cart.clear();
      setTimeout(() => navigate("/"), 2000);
    }, 1500);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1a2b] text-slate-100 px-6">
        <div className="bg-[#152238] border border-white/10 p-10 rounded-xl text-center max-w-md w-full">
          <div className="text-2xl font-bold text-emerald-400">Compra concluída!</div>
          <div className="mt-3 text-slate-300">Obrigado por comprar conosco!</div>
          <div className="mt-4 text-sm text-slate-400">Redirecionando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1a2b] text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-[#152238] border border-white/10 p-6 rounded-xl">
            <div className="text-xl font-semibold mb-4">Informações Pessoais</div>

            <input
              name="name"
              placeholder="Nome completo"
              value={form.name}
              onChange={handle}
              className="w-full px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 mb-3"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handle}
              className="w-full px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
            />
          </div>

          <div className="bg-[#152238] border border-white/10 p-6 rounded-xl">
            <div className="text-xl font-semibold mb-4">Endereço</div>

            <input
              name="street"
              placeholder="Rua"
              value={form.street}
              onChange={handle}
              className="w-full px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 mb-3"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                name="number"
                placeholder="Número"
                value={form.number}
                onChange={handle}
                className="px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
              />

              <input
                name="zip"
                placeholder="CEP"
                value={form.zip}
                onChange={handle}
                className="px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handle}
                className="px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
              />

              <input
                name="state"
                placeholder="Estado"
                value={form.state}
                onChange={handle}
                className="px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
              />
            </div>
          </div>

          <div className="bg-[#152238] border border-white/10 p-6 rounded-xl">
            <div className="text-xl font-semibold mb-4">Pagamento</div>

            <select
              name="payment"
              value={form.payment}
              onChange={handle}
              className="w-full px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200"
            >
              <option value="pix">PIX</option>
              <option value="boleto">Boleto</option>
              <option value="credit">Cartão de Crédito</option>
            </select>
          </div>

        </div>

        <aside className="bg-[#152238] border border-white/10 p-6 rounded-xl h-fit">
          <div className="text-xl font-semibold mb-4">Resumo</div>

          <div className="space-y-3">
            {cart.items.map((i: any) => (
              <div key={i.id} className="flex justify-between text-sm text-slate-300">
                <div>{i.name} x{i.quantity}</div>
                <div>R$ {(i.price * i.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-4 pt-4">
            <div className="text-lg font-bold text-emerald-400">
              Total: R$ {cart.total().toFixed(2)}
            </div>
          </div>

          <button
            disabled={loading}
            onClick={finish}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg text-white font-semibold disabled:opacity-40"
          >
            {loading ? "Processando..." : "Finalizar Compra"}
          </button>
        </aside>

      </div>
    </div>
  );
}
