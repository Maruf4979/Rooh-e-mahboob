"use client";

import Link from "next/link";

export default function WholesalePage() {
  return (
    <>
      {/* Wholesale Hero */}
      <div className="wholesale-hero">
        <h1>Wholesale Partnership</h1>
        <p>
          Access premium fragrance tiers and artisanal wedding supplies with
          dedicated business support. Join a legacy of excellence.
        </p>
      </div>

      {/* Tier Cards */}
      <div className="tier-cards">
        <div className="tier-card">
          <div className="tier-name">Silver</div>
          <div className="tier-discount">20%</div>
          <ul className="tier-features">
            <li>✓ Minimum 5 units per order</li>
            <li>✓ Standard shipping included</li>
            <li>✓ Email support</li>
            <li>✓ Access to core collection</li>
          </ul>
          <Link href="/contact" className="btn-primary dark w-full">
            Get Started
          </Link>
        </div>

        <div className="tier-card featured">
          <span className="tier-label">Most Popular</span>
          <div className="tier-name">Gold</div>
          <div className="tier-discount">30%</div>
          <ul className="tier-features">
            <li>✓ Minimum 12 units per order</li>
            <li>✓ Priority express shipping</li>
            <li>✓ Dedicated account manager</li>
            <li>✓ Full collection access</li>
            <li>✓ Custom labeling available</li>
          </ul>
          <Link href="/contact" className="btn-primary w-full">
            Apply Now
          </Link>
        </div>

        <div className="tier-card">
          <div className="tier-name">Platinum</div>
          <div className="tier-discount">35%</div>
          <ul className="tier-features">
            <li>✓ Minimum 24 units per order</li>
            <li>✓ Free express shipping</li>
            <li>✓ Priority stock access</li>
            <li>✓ Exclusive limited editions</li>
            <li>✓ Bespoke blending service</li>
          </ul>
          <Link href="/contact" className="btn-primary dark w-full">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Wholesale Benefits */}
      <section className="section-tonal">
        <div className="section">
          <div className="section-header">
            <span className="section-label">Why Partner With Us</span>
            <h2 className="section-title">Built for Business</h2>
          </div>

          <div className="trust-grid">
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>Guaranteed Authenticity</h4>
              <p>Every batch tested and certified for purity and quality.</p>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h4>Pan-India Delivery</h4>
              <p>Fast, reliable shipping across all major cities and towns.</p>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4>Dedicated Support</h4>
              <p>Your personal account manager for all business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Inquiry Form */}
      <div className="section">
        <div style={{
          maxWidth: "680px",
          margin: "0 auto",
          background: "var(--surface-container-lowest)",
          padding: "2.5rem",
          borderRadius: "var(--radius-lg)"
        }}>
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-label">Get Started</span>
            <h2 className="section-title">Wholesale Inquiry</h2>
            <p className="section-desc">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>Business Name</label>
                <input type="text" placeholder="Your business name" />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" placeholder="Full name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="business@email.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="form-group">
              <label>City / Region</label>
              <input type="text" placeholder="Where is your business located?" />
            </div>
            <div className="form-group">
              <label>Expected Monthly Volume</label>
              <select>
                <option>5 – 20 units</option>
                <option>20 – 50 units</option>
                <option>50 – 100 units</option>
                <option>100+ units</option>
              </select>
            </div>
            <div className="form-group">
              <label>Additional Notes</label>
              <textarea rows={4} placeholder="Tell us about your business and requirements..." />
            </div>
            <button type="submit" className="btn-primary w-full">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
