import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data || []));
    api.get("/products").then((res) => setProducts((res.data || []).slice(0, 8)));
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100">
      <header className="w-full h-56 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 flex items-center justify-center">
        <div className="max-w-6xl w-full px-6">
          <h1 className="text-4xl font-bold text-slate-100">TechStore</h1>
          <p className="text-slate-300 mt-2">Peças de computador com informações reais</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Categorias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link key={c.id} to={`/store/category/${c.id}`} className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center hover:shadow-md">
                <div className="text-slate-200 font-medium">{c.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-100 mb-4">Destaques</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link key={p.id} to={`/store/product/${p.id}`} className="bg-slate-800 rounded-lg p-4 flex flex-col items-start hover:shadow-lg">
                <img src={p.imageurl} alt={p.name} className="w-full h-36 object-contain mb-3" />
                <div className="font-semibold text-slate-100">{p.name}</div>
                <div className="text-emerald-400 font-bold mt-1">R$ {Number(p.price).toFixed(2)}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
