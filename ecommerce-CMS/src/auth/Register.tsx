import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { api } from "@/lib/axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: supaError } = await supabase.auth.signUp({
        email,
        password
      });

      if (supaError) {
        setError(supaError.message);
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setError("Erro ao criar usuário.");
        setLoading(false);
        return;
      }

      await api.post("/customers", {
        supabaseId: user.id,
        name,
        email
      });

      localStorage.setItem("sb-user", JSON.stringify(user));

      navigate("/");
    } catch {
      setError("Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-10 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-8">Criar Conta</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#0a0a0a] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none"
          />

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
            className="bg-white text-black rounded-xl py-3 font-semibold hover:bg-neutral-200 transition"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-neutral-400 mt-6 text-sm">
          Já tem conta?{" "}
          <Link to="/login" className="text-white hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
