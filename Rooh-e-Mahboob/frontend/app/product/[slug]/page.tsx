import Link from "next/link";
import Image from "next/image";
import { getProductBySlug, getRelatedProducts } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";
import AddToCartButton from "@/app/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return (
      <div className="section text-center">
        <h1 style={{ fontFamily: "var(--font-headline)", marginBottom: "1rem" }}>
          Product Not Found
        </h1>
        <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
          The product you&apos;re looking for doesn&apos;t exist in our database.
        </p>
        <Link href="/collections" className="btn-primary">
          Browse Collections
        </Link>
      </div>
    );
  }

  const related = await getRelatedProducts(product);
  const profile = product.profile || {};

  return (
    <>
      <div className="pdp-layout">
        {/* Product Image */}
        <div className="pdp-image" style={{ background: product.image ? "var(--surface-container)" : product.gradient }}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: "cover" }}
              priority
            />
          ) : (
            <div className="pdp-bottle">
              <div className="bottle-cap" />
              <div className="bottle-neck" />
              <div
                className="bottle-body"
                style={{ borderColor: product.accent }}
              />
              <div className="bottle-shine" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pdp-info">
          <div>
            <span className="pdp-category">{product.category}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-price-row">
            <span className="pdp-price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="pdp-original-price">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="pdp-price-label">Retail Price</span>
          </div>

          {/* Wholesale Tiers */}
          {product.wholesalePrices && product.wholesalePrices.length > 0 && (
            <div className="pdp-wholesale">
              <h3>Wholesale Volume Pricing</h3>
              <div className="pdp-wholesale-tiers">
                {product.wholesalePrices.map((tier) => (
                  <div key={tier.minQty} className="wholesale-tier">
                    <div className="tier-qty">{tier.minQty}+ Units</div>
                    <div className="tier-price">
                      ₹{tier.price.toLocaleString("en-IN")} ea
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Story */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "1.2rem",
                marginBottom: "0.75rem",
              }}
            >
              About This Product
            </h3>
            <p className="pdp-story">{product.story}</p>
          </div>

          {/* Profile */}
          {Object.keys(profile).length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                  color: "var(--on-surface-variant)",
                  marginBottom: "0.75rem",
                }}
              >
                The Profile
              </h3>
              <div className="pdp-profile">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key} className="pdp-profile-item">
                    <div className="label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div className="value">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Occasions */}
          {product.occasions && product.occasions.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 700,
                  color: "var(--on-surface-variant)",
                  marginBottom: "0.75rem",
                }}
              >
                Occasion
              </h3>
              <div className="pdp-occasions">
                {product.occasions.map((occ) => (
                  <span key={occ} className="pdp-occasion-tag">
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pdp-actions">
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              gradient: product.gradient
            }} />
            <Link
              href="/wholesale"
              className="btn-primary dark"
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              Wholesale Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-tonal">
          <div className="section">
            <div className="section-header">
              <span className="section-label">You May Also Love</span>
              <h2 className="section-title">From the Same Collection</h2>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
