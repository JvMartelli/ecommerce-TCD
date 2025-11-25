import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  function updateQty(index: number, qty: number) {
    const copy = [...items];
    copy[index].qty = qty;
    setItems(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  }

  function removeItem(index: number) {
    const copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  }

  const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">Carrinho</h1>
        {items.length === 0 ? (
          <div className="text-slate-300">Seu carrinho está vazio. <Link to="/store">Voltar à loja</Link></div>
        ) : (
          <div>
            <ul className="space-y-4 mb-6">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-4 bg-slate-800 rounded p-3">
                  <img src={it.imageurl} alt={it.name} className="w-20 h-20 object-contain" />
                  <div className="flex-1">
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-slate-300">R$ {Number(it.price).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input className="w-16 text-black p-1 rounded" type="number" value={it.qty} onChange={(e) => updateQty(idx, Math.max(1, Number(e.target.value)))} />
                    <button onClick={() => removeItem(idx)} className="text-red-400">Remover</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Total: R$ {total.toFixed(2)}</div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Finalizar compra</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
