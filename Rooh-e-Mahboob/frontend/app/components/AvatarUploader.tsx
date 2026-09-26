"use client";

import { useState } from "react";
import { useSession } from "../context/AuthContext";

export default function AvatarUploader({
  userId,
  currentImageUrl,
}: {
  userId?: string;
  currentImageUrl?: string | null;
}) {
  const { updateUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setImageUrl(url);
        updateUser({ image: url });
        setLoading(false);
      };
      reader.onerror = () => {
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="account-avatar" style={{ position: "relative", cursor: "pointer", overflow: "hidden" }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        "U"
      )}
      
      {/* Hidden file input overlay */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        title="Click to change profile picture"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: loading ? "wait" : "pointer",
        }}
      />
      {loading && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <span className="spinner" style={{ width: "20px", height: "20px" }} />
        </div>
      )}
    </div>
  );
}
