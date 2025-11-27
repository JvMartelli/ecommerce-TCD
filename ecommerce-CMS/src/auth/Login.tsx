import { useState } from "react"
import { api } from "@/lib/axios"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/")
    } catch {
      setError("Credenciais inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-10 shadow-2xl">
        <h1 className="text-3xl font-semibold text-white text-center mb-8">
          Entrar
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black rounded-xl py-3 font-semibold mt-2 hover:bg-neutral-200 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-6 text-neutral-400 text-sm">
          Não tem conta?{" "}
          <Link to="/register" className="text-white hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
