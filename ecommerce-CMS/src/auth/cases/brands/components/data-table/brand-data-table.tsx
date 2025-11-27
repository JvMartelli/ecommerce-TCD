import { brandColumns } from "./brand-columns"
import { useBrands } from "../../hooks/use-brand"
import { AdminDataTable } from "@/components/admin/AdminDataTable"


export function BrandDataTable() {
  const { data: brands, isLoading } = useBrands()

  return (
    <AdminDataTable
      columns={brandColumns}
      data={brands || []}
      isLoading={isLoading}
    />
  )
}
