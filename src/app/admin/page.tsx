"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!username || !password) {
      setValidationError("Username va parol kiritish shart!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        router.push("/dashboard/maqola");
      } else {
        setValidationError("Username yoki parol xato!");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      className="page-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#05070a",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
          top: "-150px",
          left: "-100px",
          filter: "blur(80px)",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "48px 40px",
          borderRadius: "32px",
          background: "rgba(13, 17, 23, 0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 25px 80px -20px rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            alignSelf: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "3px solid white",
              borderRadius: "4px",
            }}
          ></div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#fff",
              margin: "0 0 8px 0",
            }}
          >
            Xush kelibsiz
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>
            Tizimga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="input-field">
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Username ni kiriting..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div className="input-field">
            <label style={labelStyle}>Parol</label>
            <input
              type="password"
              placeholder="Parolni kiriting..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {validationError && <div style={errorStyle}>{validationError}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            background: loading
              ? "#1e293b"
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Tekshirilmoqda..." : "Tizimga Kirish"}
        </button>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        
        input:focus {
          border-color: #3b82f6 !important;
          background-color: rgba(59, 130, 246, 0.05) !important;
          outline: none;
        }

        button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "13px",
  fontWeight: "600",
  display: "block",
  marginBottom: "8px",
  textTransform: "uppercase",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 20px",
  borderRadius: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#fff",
  fontSize: "16px",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "18px",
  borderRadius: "16px",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  transition: "all 0.3s ease",
};

const errorStyle: React.CSSProperties = {
  color: "#fb7185",
  fontSize: "14px",
  textAlign: "center",
  background: "rgba(225, 29, 72, 0.1)",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(225, 29, 72, 0.2)",
};
