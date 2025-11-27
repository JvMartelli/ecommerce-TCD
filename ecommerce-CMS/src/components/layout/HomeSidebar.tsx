import { Link, useLocation } from "react-router-dom"
import { Home, Menu, PackageSearch, Layers, LogIn, LogOut } from "lucide-react"
import { SpherTekIcon } from "@/components/icons/SpherTekIcon"
import { useState } from "react"

export default function HomeSidebar({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (v: boolean) => void
}) {
  const location = useLocation()
  const isLogged = !!localStorage.getItem("token") 

  const menu = [
    { label: "Início", icon: Home, to: "/" },
    { label: "Categorias", icon: Layers, to: "/categories" },
    { label: "Produtos", icon: PackageSearch, to: "/products" }
  ]

  return (
    <div
      className={`
        h-screen fixed left-0 top-0 z-40
        bg-[#0b1020]
        border-r border-white/10
        transition-all duration-300
        px-4 py-4
        flex flex-col
        justify-between
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* HEADER */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <SpherTekIcon className="w-8 h-8 text-white" />

          {open && (
            <p className="text-xl font-semibold text-white ml-3">Spher Tek</p>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="text-white ml-auto hover:text-gray-300"
          >
            <Menu />
          </button>
        </div>

        {/* MENU PRINCIPAL */}
        <nav className="flex flex-col gap-2">
          {menu.map((item, index) => {
            const Icon = item.icon
            const active = location.pathname === item.to

            return (
              <Link
                key={index}
                to={item.to}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl
                  text-gray-300 hover:bg-white/10
                  transition-all duration-200
                  ${active ? "bg-white/10 text-white" : ""}
                `}
              >
                <Icon className="w-5 h-5" />
                {open && <span className="text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* LOGIN / LOGOUT — FIXO NO RODAPÉ */}
      <div className="mb-4">
        {isLogged ? (
          <button
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/"
            }}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl w-full
              text-red-400 hover:bg-red-500/10
              transition-all duration-200
            `}
          >
            <LogOut className="w-5 h-5" />
            {open && <span className="text-sm">Sair</span>}
          </button>
        ) : (
          <Link
            to="/login"
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl
              text-blue-400 hover:bg-blue-500/10
              transition-all duration-200
            `}
          >
            <LogIn className="w-5 h-5" />
            {open && <span className="text-sm">Entrar</span>}
          </Link>
        )}
      </div>
    </div>
  )
}
