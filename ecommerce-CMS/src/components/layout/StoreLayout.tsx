import { Outlet } from "react-router-dom"
import HomeSidebar from "./HomeSidebar"
import Navbar from "./Navbar"

export default function StoreLayout() {
  return (
    <div className="flex">
      <HomeSidebar />

      <div className="flex-1 min-h-screen bg-[#0d1117] text-white">
        <Navbar />

        <div className="pt-6 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
