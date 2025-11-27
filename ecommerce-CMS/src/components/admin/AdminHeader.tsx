import { Link } from "react-router-dom"

export function AdminHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <div className="text-sm text-slate-400 flex gap-2">
        <Link to="/admin" className="hover:text-white">Admin</Link>
        <span>/</span>
        <span className="text-white">{title}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mt-2">{title}</h1>
    </div>
  )
}
