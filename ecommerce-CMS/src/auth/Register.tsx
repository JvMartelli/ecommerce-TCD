import { useAuth } from "@/auth/AuthProvider"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    try {
      await auth.register(name, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao criar conta");
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1a2b] flex items-center justify-center text-slate-100 px-6">
      <div className="max-w-md w-full bg-[#152238] border border-white/10 rounded-xl p-6">
        <div className="text-2xl font-bold mb-4">Criar conta</div>
        {error && <div className="text-red-400 mb-3">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="w-full px-3 py-2 rounded bg-[#0f1a2b] border border-white/10 text-slate-200" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 rounded bg-[#0f1a2b] border border-white/10 text-slate-200" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" className="w-full px-3 py-2 rounded bg-[#0f1a2b] border border-white/10 text-slate-200" />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white font-semibold">Criar conta</button>
        </form>
      </div>
    </div>
  );
}
