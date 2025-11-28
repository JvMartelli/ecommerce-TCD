import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/axios";

type Favorite = {
  id: string;
  productId: string;
  product: any;
};

type FavoriteContextValue = {
  favorites: Favorite[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
};

const FavoriteContext = createContext<FavoriteContextValue | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const customer = JSON.parse(localStorage.getItem("customer") || "null");

  async function loadFavorites() {
    if (!customer) return;
    const res = await api.get(`/favorites/${customer.id}`);
    setFavorites(res.data || []);
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function toggleFavorite(productId: string) {
    if (!customer) {
      alert("Faça login para favoritar produtos.");
      return;
    }

    const existing = favorites.find(f => f.productId === productId);

    if (existing) {
      
      await api.delete(`/favorites/${existing.id}`);
      setFavorites(prev => prev.filter(f => f.id !== existing.id));
      return;
    }

    
    const res = await api.post("/favorites", {
      customerId: customer.id,
      productId
    });

    setFavorites(prev => [...prev, res.data]);
  }

  function isFavorite(productId: string) {
    return favorites.some(f => f.productId === productId);
  }

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoriteProvider");
  return ctx;
}
