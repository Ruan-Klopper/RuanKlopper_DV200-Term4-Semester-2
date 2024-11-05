// src/app/products/[id]/page.js

import React from "react";
import "../../global.css";

// Function to generate metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  // Use a relative URL
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  const product = await res.json();

  if (!product || !product.name) {
    return {
      title: "Product Not Found",
      description: "This product does not exist.",
    };
  }

  return {
    title: product.name,
    description: product.description || "Product details",
    // Additional meta tags...
  };
}

// Dynamically import the client component
const ProductSingleView = React.lazy(() => import("./ProductSingleView"));

export default function ProductPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ProductSingleView />
    </React.Suspense>
  );
}
