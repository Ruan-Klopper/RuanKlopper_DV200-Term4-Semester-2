// src/hooks/useCart.js

import { useState, useEffect } from "react";

// Utility to get cart data from session storage
const getCartFromSession = () => {
  if (typeof window !== "undefined") {
    const cart = window.sessionStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const useCart = () => {
  const [cart, setCart] = useState(getCartFromSession());

  // Save cart to session storage whenever it changes
  useEffect(() => {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const newItem = { ...product, quantity, uniqueId: Date.now() };
      return [...prevCart, newItem];
    });
  };

  const updateCartQuantity = (uniqueId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    addToCart,
    updateCartQuantity,
    clearCart,
  };
};
