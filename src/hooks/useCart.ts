// hooks/useCart.ts
import { useState } from 'react';

// Defines the return structure and types for the hook
interface CartHook {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
}

export const useCart = (): CartHook => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (productId: string) => {
    // Prevent adding duplicates for simplicity
    if (!items.includes(productId)) {
      setItems((prevItems) => [...prevItems, productId]);
    }
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((id) => id !== productId));
  };

  return { items, addItem, removeItem };
};
