import { categoryColumns } from "./category-columns"
import { useCategories } from "../../hooks/use-category"
import { AdminDataTable } from "@/components/admin/AdminDataTable"


export function CategoryDataTable() {
  const { data: categories, isLoading } = useCategories()

  return (
    <AdminDataTable
      columns={categoryColumns}
      data={categories || []}
      isLoading={isLoading}
    />
  )
}
