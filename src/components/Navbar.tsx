"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo1 from "../app/image/Logo1.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: "100%",
        height: "90px",
        display: "flex",
        backgroundColor: "#FCFCFC",
        justifyContent: "space-between",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "fixed", 
        top: 0,
        left: 0,
        zIndex: 1000, 
      }}
    >
      <div
        style={{
          width: "300px",
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo1.src} alt="Logo" style={{ height: "50px" }} />
      </div>

      <div
        style={{
          width: "600px",
          height: "90px",
          display: "flex",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Link
          href="/blog"
          style={{
            textDecoration: pathname === "/blog" ? "underline" : "none",
            color: pathname === "/blog" ? "#7C4EE4" : "black",
            fontWeight: pathname === "/blog" ? "bold" : "normal",
          }}
        >
          Blog
        </Link>

        <Link
          href="/about"
          style={{
            textDecoration: pathname === "/about" ? "underline" : "none",
            color: pathname === "/about" ? "#7C4EE4" : "black",
            fontWeight: pathname === "/about" ? "bold" : "normal",
          }}
        >
          About
        </Link>

        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          🔍
        </button>

        <Link href="/admin">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            ➕
          </button>
        </Link>

        <Link href="/contactUz">
          <button
            style={{
              width: "180px",
              height: "50px",
              backgroundColor: "#7C4EE4",
              borderRadius: "10px",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Contact Us
          </button>
        </Link>
      </div>
    </nav>
  );
}
