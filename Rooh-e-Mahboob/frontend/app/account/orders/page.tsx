"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sidra_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch {
      setOrders([]);
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="section text-center" style={{ padding: "5rem 1rem" }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>My Orders</h1>
        <p>Track and manage your fragrance collection history.</p>
      </div>

      <div className="account-layout">
        <nav className="account-sidebar">
          <Link href="/account">Dashboard</Link>
          <Link href="/account/orders" className="active">Orders</Link>
          <Link href="/collections">Shop More</Link>
        </nav>

        <div className="account-content">
          <div className="account-card">
            <h3>Order History</h3>
            {orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <p style={{ color: "var(--on-surface-variant)", marginBottom: "1.5rem" }}>
                  You haven&apos;t placed any orders yet.
                </p>
                <Link href="/collections" className="btn-primary">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {orders.map((order) => (
                  <Link 
                    key={order.id} 
                    href={`/account/orders/${order.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div 
                      style={{ 
                        border: "1px solid var(--outline-variant)", 
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        cursor: "pointer",
                      }}
                      className="order-card-hover"
                    >
                      <div style={{ 
                        padding: "1rem", 
                        background: "var(--surface-container-low)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid var(--outline-variant)"
                      }}>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", display: "block" }}>ORDER PLACED</span>
                          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", display: "block" }}>TOTAL</span>
                          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>₹{order.totalAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", display: "block" }}>STATUS</span>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", display: "block" }}>ORDER #</span>
                          <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{order.id.slice(0, 10).toUpperCase()}</span>
                        </div>
                      </div>
                      
                      <div style={{ padding: "1rem" }}>
                        {(order.items || []).map((item: any, idx: number) => (
                          <div key={item.id || idx} style={{ 
                            display: "flex", 
                            gap: "1rem", 
                            padding: "0.5rem 0",
                            borderBottom: idx === order.items.length - 1 ? "none" : "1px solid var(--surface-container-lowest)"
                          }}>
                            <div style={{ 
                              width: "60px", 
                              height: "60px", 
                              background: item.product?.gradient || "var(--surface-container)",
                              borderRadius: "var(--radius-sm)",
                              flexShrink: 0
                            }} />
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}>{item.product?.name || "Product"}</h4>
                              <p style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>Qty: {item.quantity}</p>
                            </div>
                            <div style={{ fontWeight: 500 }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
