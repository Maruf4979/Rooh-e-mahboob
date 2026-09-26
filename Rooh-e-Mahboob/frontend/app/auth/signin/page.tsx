"use client";

import { useState } from "react";
import { signIn } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/account");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-standalone-wrapper">
      {/* Top Left Logo */}
      <div className="auth-header-fixed">
        <Link href="/" className="auth-logo">
          <div className="auth-logo-brand">
            <Image 
              src="/brand-logo.jpg" 
              alt="Rooh-e-Mahboob" 
              width={42} 
              height={42} 
              className="auth-logo-img" 
            />
            <div className="auth-logo-text-group">
              <span className="logo-text">Rooh-e-Mahboob</span>
              <span className="logo-sub">Fragrances</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="auth-container">
        <div className="auth-card glass-premium">
          <div className="auth-title-area">
            <Image 
              src="/brand-logo.jpg" 
              alt="Rooh-e-Mahboob" 
              width={68} 
              height={68} 
              className="auth-card-logo-img" 
            />
            <h1>Welcome Back</h1>
            <p>Access your exclusive collection</p>
          </div>

          {error && (
            <div className="auth-error-message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-refined">
            <div className="auth-input-field">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  data-testid="login-email"
                />
              </div>
            </div>

            <div className="auth-input-field">
              <div className="label-with-link">
                <label htmlFor="password">Password</label>
                <Link href="#" className="small-link">Forgot?</Link>
              </div>
              <div className="input-icon-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  data-testid="login-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
              data-testid="login-submit"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="auth-divider-refined">
            <span>OR CONTINUE WITH</span>
          </div>

          <button
            className="auth-google-btn"
            onClick={() => signIn("google", { callbackUrl: "/account", redirect: true })}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          <div className="auth-footer-refined">
            <p>New to Rooh-e-Mahboob? <Link href="/auth/signup">Create an account</Link></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-standalone-wrapper {
          min-height: 100vh;
          background: radial-gradient(circle at center, #1a1a2e 0%, #0f0f1a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', sans-serif;
          position: relative;
        }
        .auth-header-fixed {
          position: absolute;
          top: 30px;
          left: 30px;
        }
        .auth-container {
          width: 100%;
          max-width: 480px; /* Slightly wider for square look */
          animation: fadeIn 0.6s ease-out;
        }
        .auth-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .auth-logo-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .auth-logo-img {
          border-radius: 50%;
          border: 1.5px solid #d4af37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
          object-fit: cover;
        }
        .auth-logo-text-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.1;
        }
        .auth-card-logo-img {
          border-radius: 50%;
          border: 1.5px solid #d4af37;
          box-shadow: 0 0 16px rgba(212, 175, 55, 0.45);
          object-fit: cover;
          margin: 0 auto 14px;
          display: block;
        }
        .logo-text {
          font-size: 1.8rem; /* Slightly smaller for corner */
          font-weight: 800;
          color: #febd69;
          letter-spacing: -1px;
          line-height: 1;
        }
        .logo-sub {
          font-family: 'Alex Brush', 'Dancing Script', cursive;
          font-size: 1.25rem;
          color: #febd69;
          text-transform: none;
          letter-spacing: 1px;
          margin-top: 1px;
        }
        @media (max-width: 640px) {
          .auth-logo-text-group {
            display: none !important;
          }
        }
        .glass-premium {
          background: rgba(19, 25, 33, 0.85); /* More solid background */
          backdrop-filter: blur(20px);
          border: 1px solid rgba(254, 189, 105, 0.2);
          border-radius: 20px;
          padding: 50px; /* Increased padding for squareness */
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          aspect-ratio: 1 / 1; /* Force square aspect ratio if content permits */
          justify-content: center;
        }
        @media (max-width: 600px) {
          .glass-premium {
            aspect-ratio: auto; /* Fallback for small screens */
            padding: 30px;
          }
          .auth-header-fixed {
            position: static;
            margin-bottom: 30px;
            text-align: center;
          }
          .auth-logo {
            align-items: center;
          }
        }
        .auth-title-area {
          text-align: center;
          margin-bottom: 30px;
        }
        .auth-title-area h1 {
          color: #fff;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .auth-title-area p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
        }
        .auth-error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
          font-size: 0.85rem;
        }
        .auth-input-field {
          margin-bottom: 20px;
        }
        .auth-input-field label {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .label-with-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .small-link {
          color: #febd69;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .input-icon-wrapper {
          position: relative;
        }
        .input-icon-wrapper svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
        }
        .input-icon-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 12px 12px 42px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .input-icon-wrapper input:focus {
          outline: none;
          border-color: #febd69;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(254, 189, 105, 0.1);
        }
        .auth-primary-btn {
          width: 100%;
          background: #febd69;
          color: #131921;
          border: none;
          border-radius: 12px;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
        }
        .auth-primary-btn:hover {
          background: #f3a847;
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -10px rgba(243, 168, 71, 0.5);
        }
        .auth-primary-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-divider-refined {
          display: flex;
          align-items: center;
          margin: 25px 0;
          color: rgba(255, 255, 255, 0.2);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .auth-divider-refined::before, .auth-divider-refined::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .auth-divider-refined span {
          padding: 0 15px;
        }
        .auth-google-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .auth-google-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .auth-footer-refined {
          margin-top: 30px;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }
        .auth-footer-refined a {
          color: #febd69;
          text-decoration: none;
          font-weight: 600;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 480px) {
          .glass-premium {
            padding: 25px;
          }
        }
      `}</style>
    </div>
  );
}
