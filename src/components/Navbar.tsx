"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo1 from "../app/image/Logo1.png";
import { FiSearch, FiPlus, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav style={navStyle}>
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative", height: "50px", width: "150px" }}>
          <Image
            src={logo1}
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link href="/blog" style={linkStyle(pathname === "/blog")}>
          Blog
        </Link>
        <Link href="/about" style={linkStyle(pathname === "/about")}>
          About
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {isSearchOpen && (
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={searchInputStyle}
              />
            </form>
          )}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            style={iconButtonStyle}
          >
            {isSearchOpen ? <FiX size={22} /> : <FiSearch size={22} />}
          </button>
        </div>

        <Link href="/admin">
          <button style={iconButtonStyle} title="Yangi post qo'shish">
            <FiPlus size={24} color="#1a1a1a" />
          </button>
        </Link>

        <Link href="/contactUz">
          <button style={contactButtonStyle}>Contact Us</button>
        </Link>
      </div>
    </nav>
  );
}

const navStyle: React.CSSProperties = {
  width: "100%",
  height: "90px",
  display: "flex",
  backgroundColor: "#FCFCFC",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  padding: "0 80px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const linkStyle = (active: boolean): React.CSSProperties => ({
  textDecoration: "none",
  color: active ? "#7C4EE4" : "#1a1a1a",
  fontWeight: active ? "700" : "500",
  fontSize: "16px",
});

const searchInputStyle: React.CSSProperties = {
  padding: "10px 15px",
  borderRadius: "10px",
  border: "1px solid #7C4EE4",
  outline: "none",
  width: "180px",
  fontSize: "14px",
  marginRight: "10px",
};

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#444",
  transition: "0.3s",
};

const contactButtonStyle: React.CSSProperties = {
  padding: "12px 25px",
  backgroundColor: "#7C4EE4",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};
