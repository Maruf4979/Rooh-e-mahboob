"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_STEPS = [
  { key: "PLACED", label: "Order Placed", icon: "📋" },
  { key: "PROCESSING", label: "Processing", icon: "⚙️" },
  { key: "SHIPPED", label: "Shipped", icon: "🚚" },
  { key: "DELIVERED", label: "Delivered", icon: "✅" },
];

function getStatusIndex(status: string): number {
  const s = status.toUpperCase();
  if (s.includes("PENDING") || s === "PLACED") return 0;
  if (s === "PROCESSING" || s === "CONFIRMED") return 1;
  if (s === "SHIPPED" || s === "IN_TRANSIT") return 2;
  if (s === "DELIVERED" || s === "COMPLETED") return 3;
  if (s === "CANCELLED") return -1;
  return 0;
}

function getPaymentLabel(method: string): string {
  switch (method) {
    case "CARD": return "Credit / Debit Card";
    case "UPI": return "UPI Payment";
    case "COD": return "Cash on Delivery";
    default: return method || "Cash on Delivery";
  }
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    try {
      const stored = localStorage.getItem("sidra_orders");
      if (stored) {
        const orders = JSON.parse(stored);
        const found = orders.find((o: any) => o.id === id);
        if (found) {
          setOrder(found);
        } else {
          // Provide demo order state if directly navigated
          setOrder({
            id: id,
            createdAt: new Date().toISOString(),
            status: "PLACED",
            paymentMethod: "COD",
            totalAmount: 1499,
            items: [
              {
                id: "item_demo",
                quantity: 1,
                price: 1499,
                product: {
                  name: "Rooh-e-Oud Artisanal",
                  category: "Attar",
                  gradient: "linear-gradient(135deg, #2b1d0c 0%, #d4af37 100%)",
                },
              },
            ],
          });
        }
      } else {
        setOrder({
          id: id,
          createdAt: new Date().toISOString(),
          status: "PLACED",
          paymentMethod: "COD",
          totalAmount: 1499,
          items: [
            {
              id: "item_demo",
              quantity: 1,
              price: 1499,
              product: {
                name: "Rooh-e-Oud Artisanal",
                category: "Attar",
                gradient: "linear-gradient(135deg, #2b1d0c 0%, #d4af37 100%)",
              },
            },
          ],
        });
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [id, status, router]);

  if (loading) {
    return (
      <div className="section text-center" style={{ padding: "5rem 1rem" }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="section text-center" style={{ padding: "5rem 1rem" }}>
        <h2>Order Not Found</h2>
        <Link href="/account/orders" className="btn-primary" style={{ marginTop: "1rem" }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusIdx = getStatusIndex(order.status || "PLACED");
  const isCancelled = order.status?.toUpperCase() === "CANCELLED";
  const items = order.items || [];
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const shipping = order.totalAmount > subtotal ? order.totalAmount - subtotal : 0;

  return (
    <>
      <div className="page-header">
        <h1>Order Details</h1>
        <p>Order #{order.id.slice(0, 10).toUpperCase()}</p>
      </div>

      <div className="account-layout">
        <nav className="account-sidebar">
          <Link href="/account">Dashboard</Link>
          <Link href="/account/orders" className="active">Orders</Link>
          <Link href="/collections">Shop More</Link>
        </nav>

        <div className="account-content">
          {/* Order Status Timeline */}
          <div className="account-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <h3 style={{ margin: 0 }}>Order Status</h3>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status.replace(/_/g, " ")}
              </span>
            </div>

            {isCancelled ? (
              <div style={{
                textAlign: "center",
                padding: "2rem",
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-md)",
                color: "var(--error, #d32f2f)"
              }}>
                <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>❌</p>
                <p style={{ fontWeight: 600 }}>This order has been cancelled</p>
              </div>
            ) : (
              <div className="order-timeline">
                {STATUS_STEPS.map((step, i) => (
                  <div
                    key={step.key}
                    className={`order-timeline-step ${i <= statusIdx ? "completed" : ""} ${i === statusIdx ? "current" : ""}`}
                  >
                    <div className="order-timeline-dot">
                      {i <= statusIdx ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`order-timeline-line ${i < statusIdx ? "completed" : ""}`} />
                    )}
                    <div className="order-timeline-label">
                      <span className="order-timeline-icon">{step.icon}</span>
                      <span>{step.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Info */}
          <div className="account-card">
            <h3>Order Information</h3>
            <div className="order-detail-grid">
              <div className="order-detail-item">
                <span className="order-detail-label">Order ID</span>
                <span className="order-detail-value" style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                  {order.id.slice(0, 10).toUpperCase()}
                </span>
              </div>
              <div className="order-detail-item">
                <span className="order-detail-label">Date Placed</span>
                <span className="order-detail-value">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </span>
              </div>
              <div className="order-detail-item">
                <span className="order-detail-label">Payment Method</span>
                <span className="order-detail-value">
                  {getPaymentLabel(order.paymentMethod)}
                </span>
              </div>
              <div className="order-detail-item">
                <span className="order-detail-label">Total Amount</span>
                <span className="order-detail-value" style={{ fontWeight: 700, color: "var(--primary)" }}>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="account-card">
            <h3>Items ({items.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map((item: any) => (
                <div key={item.id} className="order-detail-product">
                  <div
                    className="order-detail-product-swatch"
                    style={{ background: item.product?.gradient || "var(--surface-container)" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                      {item.product?.name || "Product"}
                    </h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>
                      {item.product?.category || "Fragrance"}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>
                      Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="order-detail-totals">
              <div className="order-detail-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="order-detail-total-row">
                <span>Shipping</span>
                <span>{shipping <= 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
              </div>
              <div className="order-detail-total-row grand">
                <span>Total</span>
                <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Back button */}
          <Link href="/account/orders" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
            color: "var(--primary)",
            textDecoration: "none",
            fontWeight: 500,
            marginTop: "0.5rem",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to All Orders
          </Link>
        </div>
      </div>
    </>
  );
}
