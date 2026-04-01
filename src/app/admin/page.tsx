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
        router.push("/dashboard");
      } else {
        setValidationError("Username yoki parol xato!");
        setLoading(false);
      }
    }, 1200);
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
        className="aurora-1"
        style={{
          position: "absolute",
          width: "clamp(300px, 60vw, 600px)",
          height: "clamp(300px, 60vw, 600px)",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
          top: "-150px",
          left: "-100px",
          filter: "blur(80px)",
        }}
      ></div>
      <div
        className="aurora-2"
        style={{
          position: "absolute",
          width: "clamp(250px, 50vw, 500px)",
          height: "clamp(250px, 50vw, 500px)",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-50px",
          filter: "blur(80px)",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="login-form"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "clamp(32px, 8vw, 48px) clamp(24px, 6vw, 40px)",
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
          boxSizing: "border-box",
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
            marginBottom: "-10px",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
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
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: "800",
              color: "#fff",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>
            Xavfsiz tizimga kirish
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="input-field">
            <label
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)";
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
              }}
            />
          </div>

          <div className="input-field">
            <label
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box",
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.backgroundColor = "rgba(59, 130, 246, 0.05)";
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
              }}
            />
          </div>
        </div>

        {validationError && (
          <div
            style={{
              color: "#fb7185",
              fontSize: "14px",
              textAlign: "center",
              fontWeight: "500",
              background: "rgba(225, 29, 72, 0.1)",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid rgba(225, 29, 72, 0.2)",
            }}
          >
            {validationError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            background: loading
              ? "#1e293b"
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
          }}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!loading)
              e.currentTarget.style.transform = "translateY(-3px) scale(1.01)";
          }}
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!loading)
              e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          {loading ? "Tekshirilmoqda..." : "Tizimga Kirish"}
        </button>

        <div
          className="footer-demo"
          style={{
            textAlign: "center",
            marginTop: "10px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <p
            style={{
              color: "#475569",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "12px",
            }}
          >
            Demo Credentials:
          </p>
          <div
            className="demo-badges"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>
              User:{" "}
              <span style={{ color: "#fff", fontWeight: "600" }}>admin</span>
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>
              Pass:{" "}
              <span style={{ color: "#fff", fontWeight: "600" }}>admin123</span>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        
        @media (max-width: 480px) {
          .login-form {
            gap: 20px !important;
            border-radius: 24px !important;
          }
          .footer-demo {
            padding-top: 16px !important;
          }
          .demo-badges {
            flex-direction: column !important;
            gap: 8px !important;
          }
          input {
            padding: 14px 16px !important;
            font-size: 15px !important;
          }
        }

        @media (max-height: 700px) {
           .page-wrapper {
             align-items: flex-start !important;
             padding-top: 40px !important;
             overflow-y: auto !important;
           }
        }
      `}</style>
    </div>
  );
}
