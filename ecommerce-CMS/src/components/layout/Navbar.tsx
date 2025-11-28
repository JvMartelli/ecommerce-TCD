import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, Menu, User, PackageSearch, Search, Heart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const { items } = useCart()
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const [open, setOpen] = useState(false)
  const [menuUserOpen, setMenuUserOpen] = useState(false)
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("customer") || "null")

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuUserOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    navigate(`/products?search=${search.trim()}`)
    setOpen(false)
  }

  return (
    <nav className="bg-[#0f1a2b] border-b border-white/10 text-slate-100 px-6 py-4 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

        <Link to="/" className="text-2xl font-bold text-blue-400">
          Spher Tek
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-lg items-center bg-white/10 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xl"
        >
          <Search size={18} className="text-slate-300 mr-2" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
          />
        </form>

        <div className="hidden md:flex items-center gap-8 text-slate-200">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuUserOpen(!menuUserOpen)}
                className="flex items-center gap-2 hover:text-blue-400 transition"
              >
                <User size={20} />
                <span>{user.name.split(" ")[0]}</span>
              </button>

              <div
                className={`absolute right-0 mt-2 w-56 bg-[#141e32]/90 backdrop-blur-md 
                  border border-white/10 rounded-xl shadow-xl p-2 text-sm z-[70] transition-all duration-300 ease-out
                  ${menuUserOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
                `}
              >
                <p className="px-3 py-2 text-slate-100 font-medium truncate">
                  {user.name}
                </p>

                <p className="px-3 pb-2 text-slate-400 text-xs truncate mb-2 border-b border-white/10">
                  {user.email}
                </p>

                <button
                  onClick={() => {
                    navigate("/favorites")
                    setMenuUserOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-white/10 rounded-lg text-pink-400"
                >
                  <Heart size={16} />
                  Favoritos
                </button>

                <button
                  onClick={() => {
                    navigate("/orders")
                    setMenuUserOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-white/10 rounded-lg text-blue-300"
                >
                  <PackageSearch size={16} />
                  Meus pedidos
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("sb-user")
                    localStorage.removeItem("customer")
                    window.location.href = "/"
                  }}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
          )}

          <Link 
            to="/cart"
            className="relative hover:text-blue-400 transition flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button 
          className="md:hidden text-slate-100"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-white/10 pt-4 text-slate-200">

          <form 
            onSubmit={handleSearch}
            className="flex items-center bg-white/10 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xl"
          >
            <Search size={18} className="text-slate-300 mr-2" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-400"
            />
          </form>

          {user ? (
            <>
              <p className="px-1 font-medium">{user.name}</p>
              <p className="text-xs px-1 text-slate-400 -mt-3 mb-3">{user.email}</p>

              <button
                onClick={() => {
                  navigate("/favorites")
                  setOpen(false)
                }}
                className="px-1 text-pink-400 hover:text-pink-300"
              >
                ❤️ Favoritos
              </button>

              <button
                onClick={() => {
                  navigate("/orders")
                  setOpen(false)
                }}
                className="px-1 text-blue-300 hover:text-blue-200"
              >
                Meus pedidos
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("sb-user")
                  localStorage.removeItem("customer")
                  window.location.href = "/"
                }}
                className="text-red-400 text-left px-1 hover:text-red-300"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="hover:text-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
