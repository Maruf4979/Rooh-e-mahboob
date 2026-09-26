"use client";

import React from "react";

const offers = [
  { text: "✨ RAMADAN SPECIAL: 20% OFF ON ALL ATTARS", code: "RAMADAN20" },
  { text: "🚚 FREE SHIPPING ON ORDERS ABOVE ₹999", code: "FREESHIP" },
  { text: "🎁 GET A FREE DISCOVERY VIAL ON ORDERS ABOVE ₹1499", code: "GIFTVIAL" },
  { text: "⭐ NEW ARRIVAL: MIDNIGHT OUD SUPREME NOW IN STOCK", code: "NEWOUD" },
  { text: "👑 WHOLESALE PRICING AVAILABLE FOR RETAILERS", code: "BULKSAVE" },
];

const OfferTicker: React.FC = () => {
  return (
    <div className="offer-ticker-container">
      <div className="ticker-track">
        {/* First set of offers */}
        <div className="ticker-group">
          {offers.map((offer, index) => (
            <div key={`offer-1-${index}`} className="ticker-item">
              <span className="ticker-text">{offer.text}</span>
              <span className="ticker-badge">CODE: {offer.code}</span>
              <span className="ticker-dot"></span>
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless looping */}
        <div className="ticker-group">
          {offers.map((offer, index) => (
            <div key={`offer-2-${index}`} className="ticker-item">
              <span className="ticker-text">{offer.text}</span>
              <span className="ticker-badge">CODE: {offer.code}</span>
              <span className="ticker-dot"></span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .offer-ticker-container {
          width: 100%;
          background: #131921;
          overflow: hidden;
          padding: 12px 0;
          border-bottom: 1px solid rgba(254, 189, 105, 0.15);
          border-top: 1px solid rgba(254, 189, 105, 0.1);
          position: relative;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: scroll-left 40s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        .ticker-group {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          padding: 0 40px;
        }

        .ticker-text {
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .ticker-badge {
          background: linear-gradient(135deg, #febd69 0%, #f3a847 100%);
          color: #131921;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
          margin-left: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .ticker-dot {
          width: 5px;
          height: 5px;
          background: #febd69;
          border-radius: 50%;
          margin-left: 40px;
          opacity: 0.5;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .offer-ticker-container {
            padding: 10px 0;
          }
          .ticker-text {
            font-size: 0.75rem;
          }
          .ticker-badge {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
};

export default OfferTicker;
