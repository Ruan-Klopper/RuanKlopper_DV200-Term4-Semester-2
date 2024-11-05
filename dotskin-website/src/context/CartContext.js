// src/context/CartContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from session storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to session storage whenever cart changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
