import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "@/lib/axios"

import { CPUIcon } from "@/components/icons/CPUIcon"
import { GPUIcon } from "@/components/icons/GPUIcon"
import { MotherboardIcon } from "@/components/icons/MotherboardIcon"
import { RAMIcon } from "@/components/icons/RAMIcon"
import { StorageIcon } from "@/components/icons/StorageIcon"
import { PSUIcon } from "@/components/icons/PSUIcon"
import { CaseIcon } from "@/components/icons/CaseIcon"
import { AirCoolerIcon } from "@/components/icons/AirCoolerIcon"
import { WaterCoolerIcon } from "@/components/icons/WaterCoolerIcon"
import { PeripheralIcon } from "@/components/icons/PeripheralIcon"

function getCategoryIcon(name: string) {
  const lower = name.toLowerCase()

  if (lower.includes("process")) return CPUIcon
  if (lower.includes("vídeo") || lower.includes("video") || lower.includes("gpu")) return GPUIcon
  if (lower.includes("mãe") || lower.includes("mae")) return MotherboardIcon
  if (lower.includes("ram")) return RAMIcon
  if (lower.includes("armazen") || lower.includes("ssd") || lower.includes("hd")) return StorageIcon
  if (lower.includes("fonte")) return PSUIcon
  if (lower.includes("gabinete")) return CaseIcon
  if (lower.includes("water")) return WaterCoolerIcon
  if (lower.includes("cooler") || lower.includes("fan")) return AirCoolerIcon
  if (lower.includes("perif")) return PeripheralIcon

  return CaseIcon
}

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/categories").then(res => {
      setCategories(res.data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold mb-10">Categorias</h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#161b22] rounded-2xl h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {categories.map(c => {
              const Icon = getCategoryIcon(c.name)

              return (
                <Link
                  key={c.id}
                  to={`/category/${c.id}`}
                  className="
                    group bg-gradient-to-br from-[#161b22] to-[#0f131a]
                    border border-white/5 rounded-2xl p-6
                    hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]
                    transition-all duration-300 flex flex-col items-center gap-4
                    hover:scale-[1.03]
                  "
                >
                  <div
                    className="
                      w-16 h-16 rounded-full flex items-center justify-center
                      bg-white/5 transition-all duration-300
                      group-hover:bg-white/10
                    "
                  >
                    <Icon
                      className="
                        w-8 h-8 text-white transition-all duration-300
                        group-hover:text-blue-400
                        group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]
                        group-hover:scale-110 group-hover:rotate-3
                      "
                    />
                  </div>

                  <p className="text-lg font-medium text-slate-200 group-hover:text-white transition">
                    {c.name}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
