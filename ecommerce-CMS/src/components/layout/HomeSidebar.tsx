import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Menu,
  Package,
  Monitor,
  Star,
  Tag,
  ShoppingCart
} from "lucide-react"

export default function HomeSidebar() {
  const [open, setOpen] = useState(true)
  const location = useLocation()

  const menu = [
    { label: "Início", icon: Home, to: "/" },
    { label: "Categorias", icon: Package, to: "/products" },
    { label: "Destaques", icon: Star, to: "/products" },
    { label: "Hardware", icon: Monitor, to: "/products" },
    { label: "Promoções", icon: Tag, to: "/products" },
    { label: "Carrinho", icon: ShoppingCart, to: "/cart" }
  ]

  return (
    <div
      className={`
        h-screen fixed left-0 top-0 z-40
        bg-gradient-to-b from-[#1f2430]/80 to-[#13171f]/60 
        backdrop-blur-2xl
        border-r border-white/10
        transition-all duration-300
        ${open ? "w-64" : "w-20"}
      `}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <p
          className={`
            text-xl font-semibold text-white transition-opacity
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          Premium Store
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="text-white hover:text-gray-300"
        >
          <Menu />
        </button>
      </div>

      <nav className="mt-6 flex flex-col gap-2 px-2">
        {menu.map((item, index) => {
          const Icon = item.icon
          const active = location.pathname === item.to

          return (
            <Link
              key={index}
              to={item.to}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-gray-300 hover:bg-white/10
                transition-all duration-200
                ${active ? "bg-white/10 text-white" : ""}
              `}
            >
              <Icon className="w-5 h-5" />

              <span
                className={`
                  text-sm font-medium transition-opacity
                  ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
