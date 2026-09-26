"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "@/app/context/AuthContext";
import AvatarUploader from "@/app/components/AvatarUploader";
import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";
import { useRouter } from "next/navigation";

export default function AccountPage() {
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
        <p>Loading account details...</p>
      </div>
    );
  }

  const user = session?.user || {
    id: "usr_demo",
    name: "Valued Customer",
    email: "customer@sidra-attar.com",
    image: null,
    role: "MEMBER",
  };

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <>
      <div className="page-header">
        <h1>My Account</h1>
        <p>Manage your profile, orders, and preferences.</p>
      </div>

      <div className="account-layout">
        {/* Sidebar */}
        <nav className="account-sidebar">
          <Link href="/account" className="active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Dashboard
          </Link>
          <Link href="/account/orders">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Orders
          </Link>
          <Link href="/account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Wishlist
          </Link>
          <Link href="/account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
          </Link>
        </nav>

        {/* Content */}
        <div className="account-content">
          {/* Welcome Card */}
          <div className="account-card">
            <div className="account-welcome">
              <AvatarUploader userId={user.id} currentImageUrl={user.image} />
              <div>
                <h2>Welcome back, {user.name?.split(" ")[0] || "User"}</h2>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="account-stats">
              <div className="account-stat">
                <div className="value">{totalOrders}</div>
                <div className="label">Orders</div>
              </div>
              <div className="account-stat">
                <div className="value">₹{(totalSpent / 1000).toFixed(1)}K</div>
                <div className="label">Total Spent</div>
              </div>
              <div className="account-stat">
                <div className="value">{user.role === 'ADMIN' ? 'Admin' : 'Member'}</div>
                <div className="label">Tier</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="account-card">
            <h3>Profile Details</h3>
            <ProfileDetailsForm initialName={user.name || ""} />
          </div>

          {/* Recent Orders */}
          <div className="account-card">
            <h3>Recent Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>No recent orders found.</p>
            ) : (
              <div className="order-list">
                {orders.map((order) => (
                  <Link key={order.id} href={`/account/orders/${order.id}`} className="order-list-item" style={{ textDecoration: "none", color: "inherit" }}>
                    <div>
                      <div className="order-id">#{order.id.slice(0, 8).toUpperCase()}</div>
                      <div className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="order-price">₹{order.totalAmount.toLocaleString("en-IN")}</div>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Saved Addresses */}
          <div className="account-card">
            <h3>Saved Addresses</h3>
            <div className="address-grid">
              <div style={{
                padding: "1.25rem",
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-md)"
              }}>
                <div style={{
                  fontSize: "0.7rem", textTransform: "uppercase",
                  letterSpacing: "0.1em", fontWeight: 700,
                  color: "var(--secondary)", marginBottom: "0.5rem"
                }}>
                  Primary
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)", lineHeight: 1.5 }}>
                  Add your shipping address during your next checkout to save it here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
