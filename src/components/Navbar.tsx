"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo1 from "../app/image/Logo1.png";
import { FiSearch, FiPlus, FiX, FiMenu } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .nav-container {
          width: 100%;
          height: 85px;
          display: flex;
          background-color: #FCFCFC;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          padding: 0 80px;
          box-shadow: 0 50px 50px rgba(0, 0, 0, 0.05); 
          transition: all 0.3s ease;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          color: #1a1a1a;
          font-weight: 500;
          font-size: 16px;
          padding: 8px 0;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #7C4EE4;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #7C4EE4;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #7C4EE4;
          font-weight: 700;
        }

        .nav-right-section {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .mobile-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #1a1a1a;
          padding: 5px;
          transition: transform 0.2s ease;
        }
        
        .mobile-hamburger:active {
          transform: scale(0.9);
        }

        .desktop-search-form {
          display: flex;
          align-items: center;
          background: #f1f1f1;
          padding: 5px 15px;
          border-radius: 12px;
          margin-right: 10px;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 1100px) {
          .nav-container { padding: 0 40px; }
        }

        @media (max-width: 992px) {
          .nav-right-section { display: none; }
          .mobile-hamburger { display: block; } 
          .nav-container { height: 75px; padding: 0 5%; }
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: ${isMobileMenuOpen ? "0" : "-100%"};
          width: 80%;
          max-width: 350px;
          height: 100vh;
          background-color: white;
          z-index: 2001;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .overlay-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          z-index: 2000;
          display: ${isMobileMenuOpen ? "block" : "none"};
          backdrop-filter: blur(2px);
        }

        .icon-btn:hover {
          color: #7C4EE4 !important;
          transform: translateY(-2px);
        }
        
        .contact-btn:hover {
          background-color: #6a3bc9 !important;
          box-shadow: 0 4px 15px rgba(124, 78, 228, 0.3);
        }
      `}</style>

      <div className="overlay-bg" onClick={() => setIsMobileMenuOpen(false)} />

      <nav className="nav-container">
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            style={{
              position: "relative",
              height: "45px",
              width: "140px",
              transition: "transform 0.3s ease",
            }}
            className="icon-btn"
          >
            <Image
              src={logo1}
              alt="Zarrin Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </Link>

        <div className="nav-right-section">
          <Link
            href="/blog"
            className={`nav-link ${pathname === "/blog" ? "active" : ""}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`nav-link ${pathname === "/about" ? "active" : ""}`}
          >
            About
          </Link>

          <div style={{ display: "flex", alignItems: "center" }}>
            {isSearchOpen && (
              <form onSubmit={handleSearch} className="desktop-search-form">
                <input
                  type="text"
                  placeholder="Qidiruv..."
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
              className="icon-btn"
            >
              {isSearchOpen ? <FiX size={22} /> : <FiSearch size={22} />}
            </button>
          </div>

          <Link href="/admin">
            <button style={iconButtonStyle} className="icon-btn">
              <FiPlus size={24} />
            </button>
          </Link>

          <Link href="/contactUz">
            <button style={contactButtonStyle} className="contact-btn">
              Contact Us
            </button>
          </Link>
        </div>

        <button
          className="mobile-hamburger"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FiMenu size={30} />
        </button>
      </nav>

      <div className="mobile-drawer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <span
            style={{ fontWeight: "800", fontSize: "20px", color: "#7C4EE4" }}
          >
            Menyu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={iconButtonStyle}
          >
            <FiX size={30} />
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid transparent",
              transition: "border 0.3s ease",
            }}
            className="search-box-mobile"
          >
            <input
              type="text"
              placeholder="Maqola qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                width: "100%",
                fontSize: "16px",
              }}
            />
            <FiSearch size={20} color="#777" />
          </div>
        </form>

        <Link
          href="/blog"
          onClick={() => setIsMobileMenuOpen(false)}
          style={mobileLinkStyle(pathname === "/blog")}
        >
          Blog
        </Link>
        <Link
          href="/about"
          onClick={() => setIsMobileMenuOpen(false)}
          style={mobileLinkStyle(pathname === "/about")}
        >
          About
        </Link>
        <Link
          href="/admin"
          onClick={() => setIsMobileMenuOpen(false)}
          style={mobileLinkStyle(pathname === "/admin")}
        >
          Post Qo'shish
        </Link>

        <div style={{ marginTop: "auto", paddingBottom: "20px" }}>
          <Link href="/contactUz" onClick={() => setIsMobileMenuOpen(false)}>
            <button
              className="contact-btn"
              style={{ ...contactButtonStyle, width: "100%", padding: "18px" }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

const searchInputStyle: React.CSSProperties = {
  border: "none",
  background: "none",
  outline: "none",
  width: "150px",
  fontSize: "14px",
};

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "#1a1a1a",
  transition: "all 0.3s ease",
};

const contactButtonStyle: React.CSSProperties = {
  padding: "12px 28px",
  backgroundColor: "#7C4EE4",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  transition: "all 0.3s ease",
};

const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
  textDecoration: "none",
  color: active ? "#7C4EE4" : "#333",
  fontWeight: "600",
  fontSize: "20px",
  padding: "15px 0",
  borderBottom: "1px solid #f0f0f0",
  display: "block",
  transition: "padding-left 0.3s ease",
});
