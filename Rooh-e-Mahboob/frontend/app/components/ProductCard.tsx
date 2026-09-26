"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../lib/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <Link href={`/product/${product.slug}`} className="product-card-image-link">
        <div
          className="product-card-image"
          style={{ background: product.image ? "var(--surface-container)" : product.gradient }}
        >
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 360px) 100vw, (max-width: 480px) 50vw, (max-width: 900px) 50vw, 350px"
              style={{ objectFit: "cover" }}
              className="product-card-img"
            />
          ) : (
            <div className="product-card-bottle">
              {/* Stylized bottle shape */}
              <div className="bottle-cap" />
              <div className="bottle-neck" />
              <div className="bottle-body" style={{ borderColor: product.accent }} />
              <div className="bottle-shine" />
            </div>
          )}
        </div>
      </Link>

      <div className="product-card-content">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-tags">
          {product.tags.map((tag) => (
            <span key={tag} className="product-tag">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        <p className="product-card-desc">{product.description}</p>
        <div className="product-card-footer">
          <div className="product-card-price-group">
            <span className="product-card-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="product-card-original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <button
            className="btn-add-cart"
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
        </div>
      </div>
    </div>
  );
}
