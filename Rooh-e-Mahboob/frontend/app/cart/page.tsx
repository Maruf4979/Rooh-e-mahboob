"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const UPI_ID = "roohemahboob@upi"; // Placeholder — replace with real UPI ID

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { data: session, status } = useSession();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [stripeLoading, setStripeLoading] = useState(false);
  const [codLoading, setCodLoading] = useState(false);
  const [showCodConfirm, setShowCodConfirm] = useState(false);
  const [upiConfirmed, setUpiConfirmed] = useState(false);

  const shipping = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const saveMockOrder = (method: string, orderId: string) => {
    try {
      const existing = JSON.parse(localStorage.getItem("sidra_orders") || "[]");
      const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        totalAmount: grandTotal,
        status: "PLACED",
        paymentMethod: method,
        items: items.map((item) => ({
          id: "item_" + Math.random().toString(36).substring(2, 7),
          quantity: item.quantity,
          price: item.price,
          product: {
            id: item.id,
            name: item.name,
            category: "Attar",
            gradient: item.gradient || "var(--surface-container)",
          },
        })),
      };
      localStorage.setItem("sidra_orders", JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error("Failed to save order to local storage:", err);
    }
  };

  const handleStripeCheckout = async () => {
    if (!session) {
      window.location.href = "/auth/signin";
      return;
    }

    setStripeLoading(true);
    setTimeout(() => {
      const orderId = "RM_CARD_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      saveMockOrder("CARD", orderId);
      clearCart();
      setStripeLoading(false);
      window.location.href = "/checkout/success?session_id=" + orderId;
    }, 1200);
  };

  const handleCodUpiOrder = async (method: "COD" | "UPI") => {
    if (!session) {
      window.location.href = "/auth/signin";
      return;
    }

    setCodLoading(true);
    setTimeout(() => {
      const orderId = "RM_" + method + "_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      saveMockOrder(method, orderId);
      clearCart();
      setCodLoading(false);
      setShowCodConfirm(false);
      window.location.href = "/checkout/success?order_id=" + orderId;
    }, 1000);
  };

  const handlePlaceOrder = () => {
    if (!session) {
      window.location.href = "/auth/signin";
      return;
    }

    if (paymentMethod === "card") {
      handleStripeCheckout();
    } else if (paymentMethod === "upi") {
      handleCodUpiOrder("UPI");
    } else {
      // Show COD confirmation modal
      setShowCodConfirm(true);
    }
  };

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `upi://pay?pa=${UPI_ID}&pn=Rooh-e-Mahboob&am=${grandTotal}&cu=INR`
  )}`;

  return (
    <>
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your order and experience artisanal luxury.</p>
      </div>

      {items.length === 0 ? (
        <div className="section text-center" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--outline-variant)" strokeWidth="1" style={{ margin: "0 auto 1.5rem" }}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2 style={{ fontFamily: "var(--font-headline)", marginBottom: "0.5rem" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
            Add some luxury fragrances to your collection.
          </p>
          <Link href="/collections" className="btn-primary">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form">
            {/* Sign-in prompt if not authenticated */}
            {status !== "authenticated" && (
              <div className="checkout-section" style={{
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>Sign in for faster checkout</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>
                    Save your address and track your orders
                  </p>
                </div>
                <Link href="/auth/signin" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
                  Sign In
                </Link>
              </div>
            )}

            <div className="checkout-section">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter first name" defaultValue={session?.user?.name?.split(" ")[0] || ""} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter last name" defaultValue={session?.user?.name?.split(" ").slice(1).join(" ") || ""} />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" defaultValue={session?.user?.email || ""} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input type="text" placeholder="123 Main Street" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" placeholder="City" />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input type="text" placeholder="000000" />
                </div>
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="State" />
              </div>
            </div>

            <div className="checkout-section">
              <h3>Payment Method</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* COD Option */}
                <label className="payment-option" data-active={paymentMethod === "cod"}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                  <div className="payment-option-content">
                    <div className="payment-option-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <span className="payment-option-desc">Pay when your order arrives at your doorstep</span>
                  </div>
                </label>

                {/* UPI Option */}
                <label className="payment-option" data-active={paymentMethod === "upi"}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={() => { setPaymentMethod("upi"); setUpiConfirmed(false); }} />
                  <div className="payment-option-content">
                    <div className="payment-option-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                      <span>UPI Payment</span>
                    </div>
                    <span className="payment-option-desc">Pay via Google Pay, PhonePe, Paytm, or any UPI app</span>
                  </div>
                </label>

                {/* Card Option */}
                <label className="payment-option" data-active={paymentMethod === "card"}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <div className="payment-option-content">
                    <div className="payment-option-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                        <line x1="7" y1="15" x2="13" y2="15" />
                      </svg>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        Credit / Debit Card
                        <svg width="20" height="14" viewBox="0 0 32 22" fill="none" style={{ opacity: 0.7 }}>
                          <rect width="32" height="22" rx="3" fill="#635BFF"/>
                          <path d="M13.3 14.4h-2l1.2-7.4h2l-1.2 7.4zm8.4-7.2c-.4-.1-1-.3-1.8-.3-2 0-3.4 1-3.4 2.5 0 1.1 1 1.7 1.8 2 .8.4 1 .6 1 1 0 .5-.6.8-1.2.8-.8 0-1.2-.1-1.9-.4l-.3-.1-.3 1.7c.5.2 1.3.4 2.2.4 2.1 0 3.5-1 3.5-2.6 0-.9-.5-1.5-1.7-2.1-.7-.3-1.2-.6-1.2-1 0-.3.4-.7 1.2-.7.7 0 1.2.1 1.6.3l.2.1.3-1.6z" fill="#fff"/>
                        </svg>
                      </span>
                    </div>
                    <span className="payment-option-desc">Secure payment powered by Stripe</span>
                  </div>
                </label>
              </div>

              {/* UPI Details Panel */}
              {paymentMethod === "upi" && (
                <div className="payment-detail-panel">
                  <div className="payment-upi-section">
                    <div className="payment-upi-qr">
                      <img
                        src={upiQrUrl}
                        alt="UPI QR Code"
                        width={180}
                        height={180}
                        style={{ borderRadius: "var(--radius-sm)", background: "#fff", padding: "8px" }}
                      />
                    </div>
                    <div className="payment-upi-info">
                      <p style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        Scan & Pay ₹{grandTotal.toLocaleString("en-IN")}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "var(--on-surface-variant)", marginBottom: "1rem", lineHeight: 1.5 }}>
                        Open any UPI app (Google Pay, PhonePe, Paytm) and scan this QR code to complete your payment.
                      </p>
                      <div style={{
                        padding: "0.75rem",
                        background: "var(--surface-container-lowest)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.8rem",
                        marginBottom: "1rem",
                      }}>
                        <span style={{ color: "var(--on-surface-variant)", display: "block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                          UPI ID
                        </span>
                        <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{UPI_ID}</span>
                      </div>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        color: upiConfirmed ? "var(--primary)" : "var(--on-surface)",
                      }}>
                        <input
                          type="checkbox"
                          checked={upiConfirmed}
                          onChange={(e) => setUpiConfirmed(e.target.checked)}
                          style={{ accentColor: "var(--primary)" }}
                        />
                        I have completed the UPI payment
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Info Panel */}
              {paymentMethod === "card" && (
                <div className="payment-detail-panel">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    You&apos;ll be securely redirected to Stripe&apos;s checkout page to enter your card details.
                  </div>
                </div>
              )}
            </div>

            <button
              className="btn-primary w-full"
              onClick={handlePlaceOrder}
              disabled={stripeLoading || codLoading || (paymentMethod === "upi" && !upiConfirmed)}
              style={{ position: "relative" }}
            >
              {stripeLoading || codLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span className="spinner" />
                  Processing...
                </span>
              ) : paymentMethod === "card" ? (
                `Pay with Card · ₹${grandTotal.toLocaleString("en-IN")}`
              ) : paymentMethod === "upi" ? (
                `Confirm UPI Payment · ₹${grandTotal.toLocaleString("en-IN")}`
              ) : (
                `Place Order (COD) · ₹${grandTotal.toLocaleString("en-IN")}`
              )}
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="order-summary-card">
              <h3>Order Summary</h3>

              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div
                    className="order-item-swatch"
                    style={{ background: item.gradient }}
                  />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}

              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="order-total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="order-total-row grand">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {shipping === 0 && (
                <p style={{
                  marginTop: "1rem", fontSize: "0.75rem",
                  color: "#2e7d32", textAlign: "center"
                }}>
                  ✓ You qualify for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COD Confirmation Modal */}
      {showCodConfirm && (
        <>
          <div className="modal-overlay" onClick={() => setShowCodConfirm(false)} />
          <div className="cod-confirm-modal">
            <div className="cod-confirm-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-headline)", marginBottom: "0.5rem" }}>
              Confirm Cash on Delivery
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
              ₹{grandTotal.toLocaleString("en-IN")} will be collected in cash when your order is delivered to your address.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                className="btn-primary"
                onClick={() => handleCodUpiOrder("COD")}
                disabled={codLoading}
                style={{ minWidth: "140px" }}
              >
                {codLoading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <span className="spinner" />
                    Placing...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </button>
              <button
                onClick={() => setShowCodConfirm(false)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "transparent",
                  border: "1px solid var(--outline-variant)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--on-surface)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
