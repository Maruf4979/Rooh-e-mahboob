"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <h1>Our Story</h1>
        <p>
          Discover the heritage, passion, and craftsmanship behind Rooh-e-Mahboob.
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--space-3xl) var(--space-xl)" }}>
        {/* Mission Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-3xl)", alignItems: "center", marginBottom: "var(--space-4xl)" }}>
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "var(--space-md)", color: "var(--primary)" }}>Our Mission</h2>
            <p style={{ color: "var(--on-surface-variant)", lineHeight: 1.8, marginBottom: "var(--space-md)" }}>
              At Rooh-e-Mahboob, our mission is to bring the timeless elegance of authentic, 
              alcohol-free attars to the modern world. We believe that a fragrance is more than just a scent; 
              it is an invisible garment that speaks volumes about who you are. We strive to craft 
              the purest blends using traditional distillation methods passed down through generations.
            </p>
            <p style={{ color: "var(--on-surface-variant)", lineHeight: 1.8 }}>
              We are committed to sourcing the finest natural ingredients globally, ensuring that every 
              drop of our attar delivers an unforgettable olfactory experience that respects both 
              nature and heritage.
            </p>
          </div>
          <div style={{ position: "relative", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, var(--secondary-container), var(--primary-container))", opacity: 0.8 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--on-primary)", padding: "2rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "2rem", fontStyle: "italic", fontWeight: 300 }}>"Fragrance is the voice of the soul."</h3>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-3xl)", alignItems: "center", direction: "rtl" }}>
          <div style={{ direction: "ltr" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "var(--space-md)", color: "var(--primary)" }}>Our Vision</h2>
            <p style={{ color: "var(--on-surface-variant)", lineHeight: 1.8, marginBottom: "var(--space-md)" }}>
              Our vision is to be the world's most trusted and beloved purveyor of premium attars and oud. 
              We envision a future where the rich traditions of Eastern perfumery seamlessly blend with 
              contemporary lifestyles, making luxury fragrances accessible to connoisseurs everywhere.
            </p>
            <p style={{ color: "var(--on-surface-variant)", lineHeight: 1.8, marginBottom: "var(--space-xl)" }}>
              Through innovation, sustainability, and an unwavering dedication to quality, we aim to preserve 
              the ancient art of attar-making while continually pushing the boundaries of olfactory artistry.
            </p>
            <Link href="/collections/all" className="btn-primary">
              Explore Our Collection
            </Link>
          </div>
          <div style={{ position: "relative", height: "400px", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-xl)", direction: "ltr" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--primary), var(--primary-container))" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--secondary)" }}>
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
