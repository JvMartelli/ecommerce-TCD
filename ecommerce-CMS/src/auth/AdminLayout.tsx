import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0f1a2b] text-slate-100">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
