import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity"> | CartItem, quantity?: number) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function safeParse(raw: string | null) {
  try {
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => safeParse(localStorage.getItem("cart")));

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(item: Omit<CartItem, "quantity"> | CartItem, quantity = 1) {
    const id = (item as any).id;
    if (!id) return;
    setItems((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], quantity: next[index].quantity + quantity };
        return next;
      }
      const newItem: CartItem = {
        id,
        name: (item as any).name || "",
        price: Number((item as any).price || 0),
        imageUrl: (item as any).imageUrl,
        quantity
      };
      return [...prev, newItem];
    });
  }

  function remove(id: string) {
    setItems((s) => s.filter((p) => p.id !== id));
  }

  function update(id: string, quantity: number) {
    if (quantity <= 0) {
      remove(id);
      return;
    }
    setItems((s) => s.map((p) => (p.id === id ? { ...p, quantity } : p)));
  }

  function clear() {
    setItems([]);
  }

  function count() {
    return items.reduce((sum, p) => sum + p.quantity, 0);
  }

  function total() {
    return items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
