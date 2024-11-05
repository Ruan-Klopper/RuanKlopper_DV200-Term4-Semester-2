// src/app/components/ClientRoot.js
"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export default function ClientRoot({ children }) {
  return (
    <CartProvider>
      <SessionProvider>{children}</SessionProvider>
    </CartProvider>
  );
}
