import { BreadCrumb } from "@/components/layout/bread-crumb"
import { CategoryDataTable } from "./data-table/category-data-table"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Outlet, useNavigate } from "react-router-dom"

export function CategoryLayout() {
  const navigate = useNavigate()

  function handleCreate() {
    navigate("/admin/categories/new")
  }

  return (
    <div className="p-6">
      <BreadCrumb title="Categorias" />

      <div className="w-full flex flex-col gap-6 mt-6">
        
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div className="w-full sm:w-96">
            <InputGroup>
              <InputGroupInput placeholder="Buscar..." />
              <InputGroupAddon>
                <Search className="text-slate-400" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="size-4" />
            Adicionar
          </Button>
        </div>

        
        <CategoryDataTable />

        <Outlet />
      </div>
    </div>
  )
}
