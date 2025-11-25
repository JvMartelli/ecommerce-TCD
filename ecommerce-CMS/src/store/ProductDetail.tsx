import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`).then((res) => setProduct(res.data || null));
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="max-w-2xl w-full px-6 py-20 text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-lg p-6 flex items-center justify-center">
          <img src={product.imageurl} alt={product.name} className="max-h-96 object-contain" />
        </div>
        <div className="text-slate-100">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-slate-300 mb-4">{product.category?.name} • {product.brand?.name || "—"}</div>
          <div className="text-emerald-400 text-2xl font-bold mb-4">R$ {Number(product.price).toFixed(2)}</div>
          <div className="text-slate-200 leading-relaxed mb-6">{product.description}</div>
          <button
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              cart.push({ id: product.id, name: product.name, price: product.price, imageurl: product.imageurl, qty: 1 });
              localStorage.setItem("cart", JSON.stringify(cart));
              window.location.href = "/store/cart";
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
