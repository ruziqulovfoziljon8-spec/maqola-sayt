"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo1 from "../app/image/Logo1.png";
import { FiSearch, FiX, FiMenu, FiPlus } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdminPage = pathname.startsWith("/admin");
  const sidebarWidth = "280px";

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
          height: 85px;
          display: flex;
          background-color: #FCFCFC;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); 
          transition: all 0.3s ease;
          padding: 0 5%;
          
          left: ${isAdminPage ? sidebarWidth : "0"};
          width: ${isAdminPage ? `calc(100% - ${sidebarWidth})` : "90%"};
        }
        
        @media (max-width: 1200px) {
          .nav-container {
            padding: 0 30px;
          }
          .nav-right-section {
            gap: 15px !important;
          }
        }

        @media (max-width: 992px) { 
          .nav-container { 
            width: 90% !important; 
            left: 0 !important; 
            padding: 0 20px; 
            height: 70px;
          } 
          .nav-right-section {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
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
        .nav-link:hover { color: #7C4EE4; }
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
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #7C4EE4; font-weight: 700; }
        
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
        
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: ${isMobileMenuOpen ? "0" : "-100%"};
          width: 85%;
          max-width: 320px;
          height: 100vh;
          background-color: white;
          z-index: 2001;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
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
      `}</style>

      <div className="overlay-bg" onClick={() => setIsMobileMenuOpen(false)} />

      <nav className="nav-container">
        <div
          style={{
            position: "relative",
            height: "40px",
            width: "120px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Image
            src={logo1}
            alt="Zarrin Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

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
            >
              {isSearchOpen ? <FiX size={22} /> : <FiSearch size={22} />}
            </button>
          </div>

          <Link href="/admin">
            <button style={iconButtonStyle}>
              <FiPlus size={24} />
            </button>
          </Link>

          <Link href="/contactUz">
            <button style={contactButtonStyle}>Contact Us</button>
          </Link>
        </div>

        <button
          className="mobile-hamburger"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FiMenu size={28} />
        </button>
      </nav>

      <div className="mobile-drawer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{ fontWeight: "800", fontSize: "18px", color: "#7C4EE4" }}
          >
            MENYU
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={iconButtonStyle}
          >
            <FiX size={28} />
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                width: "100%",
                fontSize: "14px",
              }}
            />
            <FiSearch size={18} color="#777" />
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

        <div style={{ marginTop: "auto" }}>
          <Link href="/contactUz" onClick={() => setIsMobileMenuOpen(false)}>
            <button
              style={{ ...contactButtonStyle, width: "100%", padding: "15px" }}
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
  width: "130px",
  fontSize: "14px",
};

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "#1a1a1a",
  padding: "5px",
};

const contactButtonStyle: React.CSSProperties = {
  padding: "10px 22px",
  backgroundColor: "#7C4EE4",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
  textDecoration: "none",
  color: active ? "#7C4EE4" : "#333",
  fontWeight: "600",
  fontSize: "18px",
  padding: "12px 0",
  display: "block",
  borderBottom: "1px solid #eee",
});
