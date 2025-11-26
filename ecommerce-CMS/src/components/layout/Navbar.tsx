import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0f1a2b] border-b border-white/10 text-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          E-Commerce
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-slate-200">
          <Link to="/products" className="hover:text-blue-400 transition">Produtos</Link>
          <Link to="/login" className="hover:text-blue-400 transition">Login</Link>

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

        {/* MOBILE BUTTON */}
        <button 
          className="md:hidden text-slate-100"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-white/10 pt-4 text-slate-200">
          <Link to="/products" onClick={() => setOpen(false)} className="hover:text-blue-400">Produtos</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="hover:text-blue-400">Login</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="hover:text-blue-400 flex items-center gap-2">
            <ShoppingCart size={20} />
            Carrinho ({totalItems})
          </Link>
        </div>
      )}
    </nav>
  );
}
