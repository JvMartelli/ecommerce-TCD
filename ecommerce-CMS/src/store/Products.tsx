import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Check } from "lucide-react";

export default function Products() {
  const cart = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState([0, 20000]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get("/products"), api.get("/categories"), api.get("/brands")])
      .then(([p, c, b]) => {
        setProducts(p.data || []);
        setCategories(c.data || []);
        setBrands(b.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? p.category?.id === category : true;
      const matchBrand = brand ? p.brand?.id === brand : true;
      const matchPrice = p.price >= price[0] && p.price <= price[1];
      return matchSearch && matchCategory && matchBrand && matchPrice;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "brand-asc") return (a.brand?.name || "").localeCompare(b.brand?.name || "");
      if (sort === "brand-desc") return (b.brand?.name || "").localeCompare(a.brand?.name || "");
      if (sort === "category-asc") return (a.category?.name || "").localeCompare(b.category?.name || "");
      if (sort === "category-desc") return (b.category?.name || "").localeCompare(a.category?.name || "");
      return 0;
    });

  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setBrand("");
    setPrice([0, 20000]);
    setSort("");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#0f1a2b] text-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Produtos</h1>
          {(search || category || brand || sort || price[1] !== 20000) && (
            <button onClick={clearFilters} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white text-sm transition">
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="bg-[#152238] border border-white/10 rounded-xl p-6 mb-10 grid grid-cols-1 md:grid-cols-5 gap-6">
          <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 focus:ring-2 focus:ring-blue-500">
            <option value="">Todas as categorias</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 focus:ring-2 focus:ring-blue-500">
            <option value="">Todas as marcas</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f1a2b] border border-white/10 text-slate-200 focus:ring-2 focus:ring-blue-500">
            <option value="">Ordenar por...</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
            <option value="brand-asc">Marca A-Z</option>
            <option value="brand-desc">Marca Z-A</option>
            <option value="category-asc">Categoria A-Z</option>
            <option value="category-desc">Categoria Z-A</option>
          </select>

          <div className="flex flex-col">
            <label className="text-sm text-slate-300">Preço Máximo</label>
            <input type="range" min="0" max="20000" value={price[1]} onChange={(e) => setPrice([0, Number(e.target.value)])} className="w-full" />
            <span className="text-blue-400 text-sm">R$ {price[1].toFixed(2)}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-[#152238] border border-white/6 rounded-xl p-4 animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginated.map((p) => {
                const inCart = cart.items.find((it: any) => it.id === p.id);
                return (
                  <div key={p.id} className="bg-[#152238] border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-[#1b2e4e] transition-all duration-200">
                    <Link to={`/product/${p.id}`}>
                      <img src={p.imageUrl} alt={p.name} className="w-full h-44 object-contain mb-4" />
                    </Link>
                    <div className="font-semibold text-slate-100 line-clamp-2 min-h-[48px]">{p.name}</div>
                    <div className="text-blue-400 text-sm mt-1">{p.brand?.name}</div>
                    <div className="text-emerald-400 font-bold mt-3 text-lg">R$ {Number(p.price).toFixed(2)}</div>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => cart.add({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }, 1)} className="flex items-center gap-2 flex-1 justify-center bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white transition">
                        <ShoppingCart />
                        Adicionar
                      </button>
                      <button onClick={() => cart.add({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }, 1)} className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white">
                        {inCart ? <Check /> : <ShoppingCart />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-4 mt-10">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 rounded-lg bg-[#152238] border border-white/10 hover:bg-[#1b2e4e] disabled:opacity-30 transition">Anterior</button>
              <span className="text-slate-300 text-lg">Página {page} de {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 rounded-lg bg-[#152238] border border-white/10 hover:bg-[#1b2e4e] disabled:opacity-30 transition">Próxima</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
