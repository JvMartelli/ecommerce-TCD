import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = localStorage.getItem("sb-user");

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f1a2b] text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="bg-[#152238] p-6 border border-white/10 rounded-xl shadow text-center max-w-md">
          <h1 className="text-2xl font-bold text-blue-400 mb-3">Acesso restrito</h1>
          <p className="text-slate-300">Faça login para acessar esta área.</p>
          <a href="/login" className="inline-block mt-5 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white">
            Ir para Login
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
