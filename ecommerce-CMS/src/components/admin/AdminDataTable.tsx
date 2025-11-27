import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

export function AdminDataTable({ columns, data, isLoading }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl shadow-md backdrop-blur-sm p-4">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-full rounded bg-white/10"
            />
          ))}
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}
