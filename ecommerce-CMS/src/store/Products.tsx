import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold mb-6">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-slate-800 rounded-lg p-4">
              <Link to={`/store/product/${p.id}`}>
                <img src={p.imageurl} alt={p.name} className="w-full h-44 object-contain mb-3" />
                <div className="font-semibold text-slate-100">{p.name}</div>
                <div className="text-slate-300 mt-1">{p.category?.name}</div>
                <div className="text-emerald-400 font-bold mt-2">R$ {Number(p.price).toFixed(2)}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
