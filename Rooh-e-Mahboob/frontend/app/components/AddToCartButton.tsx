"use client";

import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <button
      className="btn-primary"
      style={{ flex: 1 }}
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          gradient: product.gradient,
        })
      }
    >
      Add to Cart
    </button>
  );
}
