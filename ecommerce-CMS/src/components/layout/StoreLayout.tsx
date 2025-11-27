import { useState } from "react"
import { Outlet } from "react-router-dom"
import HomeSidebar from "./HomeSidebar"
import Navbar from "./Navbar"

export default function StoreLayout() {
  const [open, setOpen] = useState(true)

  return (
    <>
      <HomeSidebar open={open} setOpen={setOpen} />

      <div
        className={`
          min-h-screen bg-[#0d1117] text-white
          transition-all duration-300
          ${open ? "pl-64" : "pl-20"}
        `}
      >
        <Navbar />

        <div className="pt-6 px-8">
          <Outlet />
        </div>
      </div>
    </>
  )
}
