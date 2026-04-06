"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        position: "relative",
      }}
    >
      <aside
        style={{
          width: isOpen ? "280px" : isMobile ? "0px" : "100px",
          backgroundColor: "#0f172a",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          padding: isOpen ? "25px 15px" : isMobile ? "0px" : "25px 10px",
          color: "white",
          flexShrink: 0,
          overflow: "hidden",
          boxShadow: isOpen ? "10px 0 40px rgba(0,0,0,0.15)" : "none",

          position: isMobile ? "fixed" : "sticky",
          top: isMobile ? "0" : "20px",
          left: isMobile ? (isOpen ? "0" : "-300px") : "20px",
          height: isMobile ? "100vh" : "calc(100vh - 40px)",
          bottom: "20px",
          borderRadius: isMobile ? "0px" : "24px",
          zIndex: 1000,
        }}
      >
        <div
          onClick={() => !isMobile && setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "40px",
            padding: "5px",
          }}
        >
          <div
            style={{
              minWidth: "60px",
              height: "60px",
              backgroundColor: "#6366f1",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.5)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </div>
          <span
            style={{
              fontWeight: "800",
              fontSize: "20px",
              whiteSpace: "nowrap",
              opacity: isOpen ? 1 : 0,
              color: "#f8fafc",
            }}
          >
            ADMIN
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
          }}
        >
          <Link
            href="/dashboard/maqola"
            className={`nav-item ${
              pathname === "/dashboard/maqola" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            <span className="icon">📝</span>
            {(isOpen || isMobile) && <span className="text">Maqolalar</span>}
          </Link>

          <Link
            href="/dashboard/foydalanuvchi"
            className={`nav-item ${
              pathname === "/dashboard/foydalanuvchi" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            <span className="icon">👥</span>
            {(isOpen || isMobile) && (
              <span className="text">Foydalanuvchilar</span>
            )}
          </Link>

          <div
            style={{
              marginTop: "auto",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "20px",
              marginBottom: "80px",
            }}
          >
            <Link
              href="/" 
              className="nav-item logout-item"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#f87171",
              }}
            >
              <span className="icon" style={{ fontSize: "22px" }}>
                🚀
              </span>
              {(isOpen || isMobile) && (
                <span className="text" style={{ fontWeight: "600" }}>
                  Saytga qaytish
                </span>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {isMobile && (
          <header
            style={{
              height: "70px",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              borderBottom: "1px solid #e2e8f0",
              position: "sticky",
              top: 0,
              zIndex: 50,
            }}
          >
            <button
              onClick={() => setIsOpen(true)}
              style={{
                background: "#6366f1",
                border: "none",
                color: "white",
                padding: "8px 12px",
                borderRadius: "10px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
            <span
              style={{
                marginLeft: "15px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Dashboard
            </span>
          </header>
        )}

        <main
          style={{
            flex: 1,
            padding: isMobile ? "15px" : "30px",
            marginLeft: isMobile ? "0px" : "20px",
            transition: "0.5s",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: isMobile ? "20px" : "40px",
              borderRadius: isMobile ? "20px" : "30px",
              minHeight: "calc(100vh - 80px)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
              border: "1px solid #f1f5f9",
            }}
          >
            {children}
          </div>
        </main>
      </div>

      {isMobile && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.3)",
            backdropFilter: "blur(4px)",
            zIndex: 900,
          }}
        />
      )}

      <style jsx global>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px;
          text-decoration: none;
          color: #94a3b8;
          border-radius: 16px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateX(5px);
        }
        .nav-item.active {
          background-color: #6366f1;
          color: white;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
        .logout-item:hover {
          background-color: rgba(239, 68, 68, 0.2) !important;
          color: #ef4444 !important;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }
        .icon {
          font-size: 20px;
          min-width: 24px;
          display: flex;
          justify-content: center;
        }
        .text {
          transition: opacity 0.3s;
        }

        @media (min-width: 1025px) {
          .text {
            display: ${isOpen ? "inline" : "none"};
          }
        }
      `}</style>
    </div>
  );
}
