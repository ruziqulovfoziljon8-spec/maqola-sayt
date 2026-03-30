"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      
      <aside
        style={{
          width: isOpen ? "280px" : "100px",
          backgroundColor: "#0f172a",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          padding: "25px 15px",
          color: "white",
          flexShrink: 0,
          overflow: "hidden",
          boxShadow: "10px 10px 40px rgba(0,0,0,0.15)",
          
          position: "fixed", 
          top: "100px",    
          left: "20px",   
          bottom: "30px", 
          borderRadius: "24px",
          zIndex: 100,
        }}
      >
        
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="logo-container"
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
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
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
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transition: "0.3s",
          }}
        >
          <Link href="/dashboard/maqola" className={`nav-item ${pathname === "/dashboard/maqola" ? "active" : ""}`}>
            <span className="icon">📝</span>
            <span className="text">Maqolalar</span>
          </Link>

          <Link href="/dashboard/foydalanuvchi" className={`nav-item ${pathname === "/dashboard/foydalanuvchi" ? "active" : ""}`}>
            <span className="icon">👥</span>
            <span className="text">Foydalanuvchilar</span>
          </Link>
        </nav>
      </aside>

      <main 
        style={{ 
          flex: 1, 
          padding: "30px", 
          marginLeft: isOpen ? "310px" : "130px", 
          transition: "margin-left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "30px",
            minHeight: "90vh",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
            border: "1px solid #f1f5f9",
          }}
        >
          {children}
        </div>
      </main>

      <style jsx global>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px;
          text-decoration: none;
          color: #94a3b8;
          border-radius: 14px;
          transition: 0.3s;
        }
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: white;
          transform: translateX(5px);
        }
        .nav-item.active {
          background-color: #6366f1;
          color: white;
          box-shadow: 0 8px 15px rgba(99, 102, 241, 0.3);
        }
        .icon { font-size: 20px; }
      `}</style>
    </div>
  );
}