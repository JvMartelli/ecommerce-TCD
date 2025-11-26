import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function add(product: any, quantity: number = 1) {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity }];
    });
  }

  function remove(id: string) {
    setItems(prev => prev.filter(p => p.id !== id));
  }

  function update(id: string, quantity: number) {
    setItems(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
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

  return {
    items,
    add,
    remove,
    update,
    clear,
    count,
    total,
  };
}
