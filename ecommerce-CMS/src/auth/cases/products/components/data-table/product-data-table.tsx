import { productColumns } from "./product-columns"
import { useProducts } from "../../hooks/use-product"
import { AdminDataTable } from "@/components/admin/AdminDataTable"


export function ProductDataTable() {
  const { data: products, isLoading } = useProducts()

  return (
    <AdminDataTable
      columns={productColumns}
      data={products || []}
      isLoading={isLoading}
    />
  )
}
