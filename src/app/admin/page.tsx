"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
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
    }, 1000); 
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #2563eb, #1e40af)",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "360px",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          backgroundColor: "#1f2937",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Welcome Back
        </h1>

        <p style={{ textAlign: "center", color: "#9ca3af", margin: 0 }}>
          Sign in to your dashboard
        </p>

        <div>
          <label
            style={{
              color: "#d1d5db",
              fontSize: "14px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              backgroundColor: "#111827",
              border: "1px solid #4b5563",
              color: "#ffffff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label
            style={{
              color: "#d1d5db",
              fontSize: "14px",
              display: "block",
              marginBottom: "4px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              backgroundColor: "#111827",
              border: "1px solid #4b5563",
              color: "#ffffff",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {validationError && (
          <div
            style={{
              color: "#ff4d4d",
              fontSize: "14px",
              textAlign: "center",
              fontWeight: "600",
              backgroundColor: "rgba(255, 77, 77, 0.1)",
              padding: "8px",
              borderRadius: "4px",
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
            padding: "12px 0",
            borderRadius: "8px",
            border: "1px solid #60a5fa",
            backgroundColor: loading ? "#4b5563" : "transparent",
            color: "#ffffff",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseOver={(e) =>
            !loading && (e.target.style.backgroundColor = "#2563eb")
          }
          onMouseOut={(e) =>
            !loading && (e.target.style.backgroundColor = "transparent")
          }
        >
          {loading ? "Checking..." : "Sign In"}
        </button>

        <div
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#9ca3af",
            paddingTop: "10px",
            borderTop: "1px solid #374151",
          }}
        >
          <p style={{ fontWeight: "600", marginBottom: "4px" }}>
            Demo Credentials:
          </p>
          <p style={{ margin: "2px 0" }}>
            Username: <span style={{ color: "#ffffff" }}>admin</span>
          </p>
          <p style={{ margin: "2px 0" }}>
            Password: <span style={{ color: "#ffffff" }}>admin123</span>
          </p>
        </div>
      </form>
    </div>
  );
}
