import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";

type User = { id: string; name?: string; email?: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  async function login(email: string, password: string) {
    setLoading(true);
    const res = await api.post("/auth/login", { email, password });
    const data = res.data;
    setToken(data.token);
    setUser(data.user);
    setLoading(false);
    return data;
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    const res = await api.post("/auth/register", { name, email, password });
    const data = res.data;
    setToken(data.token);
    setUser(data.user);
    setLoading(false);
    return data;
  }

  function logout() {
    setToken(null);
    setUser(null);
    navigate("/login");
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
