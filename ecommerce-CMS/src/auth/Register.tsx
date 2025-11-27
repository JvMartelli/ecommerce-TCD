import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-10 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Criar Conta
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

          <button className="bg-white text-black rounded-xl py-3 font-semibold hover:bg-neutral-200 transition">
            Criar conta
          </button>
        </div>

        <p className="text-center text-neutral-400 mt-6 text-sm">
          Já tem conta?{" "}
          <Link to="/login" className="text-white hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
