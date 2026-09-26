"use client";

import React, { useState, useEffect } from "react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
}

export default function LocationModal({ isOpen, onClose, onSelect }: LocationModalProps) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      onSelect("Mumbai (Current Location)");
      setLoading(false);
      onClose();
    }, 300);
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      // Simulate city lookup
      onSelect("Mumbai (400001)"); // Example
      onClose();
    } else {
      setError("Please enter a valid 6-digit pincode.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="location-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Choose your location</h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-desc">
            Select a delivery location to see product availability and delivery options.
          </p>

          <button className="detect-location-btn btn-primary" onClick={handleDetectLocation} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {loading ? "Detecting..." : "Use my current location"}
          </button>

          <div className="modal-divider">
            <span>or enter a pincode</span>
          </div>

          <form onSubmit={handlePincodeSubmit} className="pincode-form">
            <input
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="pincode-input"
            />
            <button type="submit" className="apply-btn">Apply</button>
          </form>

          {error && <p className="location-error">{error}</p>}

          <div className="popular-cities">
            <p>Popular Cities</p>
            <div className="city-chips">
              {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Lucknow", "Kolkata"].map(city => (
                <button key={city} onClick={() => { onSelect(city); onClose(); }} className="city-chip">
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8); /* Darker overlay */
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .location-modal {
          width: 100%;
          max-width: 450px;
          border-radius: 24px;
          padding: 40px;
          background: #131921; /* Solid dark background to match site */
          border: 1px solid rgba(254, 189, 105, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(254, 189, 105, 0.05);
          animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modal-pop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-lg);
        }
        .modal-header h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #fff;
          font-weight: 700;
        }
        .close-btn {
          opacity: 0.6;
          transition: opacity 0.2s;
          color: #fff;
          background: none;
          border: none;
          cursor: pointer;
        }
        .close-btn:hover { opacity: 1; }
        .modal-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .detect-location-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          font-weight: 700;
          border-radius: 12px;
          background: linear-gradient(135deg, #febd69 0%, #f3a847 100%);
          color: #131921;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .detect-location-btn:hover {
          transform: translateY(-2px);
        }
        .modal-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 30px 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .modal-divider::before, .modal-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }
        .pincode-form {
          display: flex;
          gap: 10px;
          margin-bottom: var(--space-xl);
        }
        .pincode-input {
          flex: 1;
          padding: 14px 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          outline: none;
          font-size: 1rem;
        }
        .pincode-input:focus { border-color: #febd69; }
        .apply-btn {
          padding: 0 24px;
          background: #131921;
          color: #febd69;
          border: 1px solid #febd69;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .apply-btn:hover {
          background: #febd69;
          color: #131921;
        }
        .location-error {
          color: var(--error);
          font-size: 0.85rem;
          margin-bottom: var(--space-md);
        }
        .popular-cities p {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 16px;
        }
        .city-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .city-chip {
          padding: 10px 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          font-size: 0.85rem;
          transition: all 0.2s;
          cursor: pointer;
        }
        .city-chip:hover {
          border-color: #febd69;
          background: rgba(254, 189, 105, 0.1);
          color: #febd69;
        }
      `}</style>
    </div>
  );
}
