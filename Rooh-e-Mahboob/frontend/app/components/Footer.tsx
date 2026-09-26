"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-heritage-bar" />
      
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <Image 
              src="/brand-logo.jpg" 
              alt="Rooh-e-Mahboob Logo" 
              width={54} 
              height={54} 
              className="footer-logo-img" 
            />
            <div className="footer-logo-text-wrap">
              <span className="logo-text">Rooh-e-Mahboob</span>
              <span className="logo-sub">Fragrances</span>
            </div>
          </div>
          <p className="footer-tagline">
            Crafting the finest artisanal fragrances since generations. At Rooh-e-Mahboob, our
            legacy is defined by purity, tradition, and the art of modern luxury.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Collections Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Collections</h4>
          <ul>
            <li><Link href="/collections?cat=Attars">Signature Attars</Link></li>
            <li><Link href="/collections?cat=Perfumes">Perfumes & Sprays</Link></li>
            <li><Link href="/collections?cat=Cosmetics">Cosmetics</Link></li>
            <li><Link href="/collections?cat=Fancy+Items">Fancy Items</Link></li>
          </ul>
        </div>

        {/* Occasions Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Occasions</h4>
          <ul>
            <li><Link href="/collections?cat=Gifts">Gift Sets & Hampers</Link></li>
            <li><Link href="/collections?cat=Sadi+Items+%28Nikah%29">Sadi / Nikah Items</Link></li>
            <li><Link href="/collections?cat=Prayer+Items+%28Namaz%29">Prayer / Namaz</Link></li>
            <li><Link href="/wholesale">Wholesale Portal</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-col footer-newsletter">
          <h4 className="footer-col-title">Stay Connected</h4>
          <p>Join our newsletter for exclusive launches and heritage stories.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email" suppressHydrationWarning />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Rooh-e-Mahboob. All rights reserved.</p>
        <div className="footer-legal">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
