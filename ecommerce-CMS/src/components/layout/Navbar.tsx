import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0f1a2b] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white font-semibold text-xl">
          E-Commerce
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-gray-300 hover:text-white transition" to="/">
            Início
          </Link>
          <Link className="text-gray-300 hover:text-white transition" to="/products">
            Produtos
          </Link>
          <Link className="text-gray-300 hover:text-white transition" to="/categories">
            Categorias
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative text-white hover:text-blue-300 transition">
            <ShoppingCart className="size-6" />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0f1a2b] border-t border-white/10 px-6 pb-4">
          <nav className="flex flex-col gap-4 mt-4">
            <Link onClick={() => setOpen(false)} className="text-gray-300 hover:text-white" to="/">
              Início
            </Link>
            <Link onClick={() => setOpen(false)} className="text-gray-300 hover:text-white" to="/products">
              Produtos
            </Link>
            <Link onClick={() => setOpen(false)} className="text-gray-300 hover:text-white" to="/categories">
              Categorias
            </Link>
            <Link onClick={() => setOpen(false)} className="text-gray-300 hover:text-white" to="/cart">
              Carrinho
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
