"use client"; 

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        fontFamily: "Inter, system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "45vh",
          backgroundColor: "#7C4EE4",
          zIndex: 0,
          clipPath: "ellipse(100% 70% at 50% 0%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "550px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "50px 30px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            fontWeight: "900",
            margin: 0,
            color: "#7C4EE4",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "28px",
            color: "#1a1a1b",
            margin: "0",
            fontWeight: "700",
          }}
        >
          Sahifa topilmadi
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "350px",
            margin: "0 0 15px 0",
          }}
        >
          Kechirasiz, siz qidirayotgan havola o'chirilgan yoki manzili
          o'zgartirilgan bo'lishi mumkin.
        </p>

        <Link href="/blog">
          <button
            style={{
              padding: "16px 40px",
              backgroundColor: "#7C4EE4",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(124, 78, 228, 0.3)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Bosh sahifaga qaytish
          </button>
        </Link>
      </div>
    </div>
  );
}
