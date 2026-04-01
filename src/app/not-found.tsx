"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .error-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          position: relative;
          z-index: 1;
        }
        .error-card {
          width: 100%;
          max-width: 550px;
          background: #ffffff;
          border-radius: 24px;
          padding: 50px 30px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .error-number {
          font-size: clamp(80px, 15vw, 120px); 
          font-weight: 900;
          margin: 0;
          color: #7C4EE4;
          line-height: 1;
        }

        .subscribe-banner {
          background-color: #7C4EE4;
          padding: clamp(40px, 8vh, 80px) 20px;
          text-align: center;
          color: white;
          position: relative;
        }
        .sub-title {
          font-size: clamp(22px, 5vw, 32px);
          fontWeight: 700;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.3;
        }
        .sub-input-group {
          display: flex;
          flex-direction: row; 
          justify-content: center;
          gap: 10px;
          max-width: 500px;
          margin: 30px auto 20px;
        }
        .sub-input-group input {
          flex: 1;
          padding: 15px;
          border-radius: 12px;
          border: none;
          width: 100%;
        }
        .sub-input-group button {
          padding: 15px 30px;
          border-radius: 12px;
          border: 1px solid white;
          background: transparent;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          white-space: nowrap;
        }
        .sub-input-group button:hover {
          background: white;
          color: #7C4EE4;
        }

        .footer-main {
          background: white;
          padding: 60px 20px 40px;
          text-align: center;
        }
        .footer-nav {
          display: flex;
          justify-content: center;
          gap: clamp(15px, 4vw, 30px);
          margin: 30px 0;
          flex-wrap: wrap; 
        }
        .footer-nav a {
          text-decoration: none;
          color: #1a1a1a;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.3s;
        }
        .footer-nav a:hover {
          color: #7C4EE4;
        }
        .social-link {
          width: 40px;
          height: 40px;
          background: #7C4EE4;
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 8px;
          transition: transform 0.3s;
          text-decoration: none;
        }
        .social-link:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 600px) {
          .sub-input-group {
            flex-direction: column; 
          }
          .error-card {
            padding: 40px 20px;
          }
          .error-section {
            padding: 40px 15px;
          }
        }
      `}</style>

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

      <section className="error-section">
        <div className="error-card">
          <h1 className="error-number">404</h1>
          <h2
            style={{
              fontSize: "clamp(20px, 4vw, 28px)",
              color: "#1a1a1b",
              margin: "15px 0",
              fontWeight: "700",
            }}
          >
            Sahifa topilmadi
          </h2>
          <p
            style={{
              color: "#666",
              marginBottom: "30px",
              lineHeight: "1.6",
              fontSize: "15px",
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
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0 8px 20px rgba(124, 78, 228, 0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Bosh sahifaga qaytish
            </button>
          </Link>
        </div>
      </section>

      <div className="subscribe-banner">
        <h2 className="sub-title">
          Bizning hikoyalarimizni bizdan har hafta pochta qutingizga olib
          boring.
        </h2>
        <div className="sub-input-group">
          <input
            type="email"
            placeholder="Your Email"
            aria-label="Email address"
          />
          <button type="button">Get started</button>
        </div>
        <p style={{ fontSize: "14px", opacity: 0.9, marginTop: "10px" }}>
          Get a response tomorrow if you submit by 9pm today.
        </p>
      </div>

      <footer className="footer-main">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "#7C4EE4",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Z
          </div>
          <span
            style={{ fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}
          >
            Zarrin
          </span>
        </div>

        <nav className="footer-nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contactUz">Contact Us</Link>
        </nav>

        <div style={{ marginBottom: "35px" }}>
          <a href="#" className="social-link" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="social-link" aria-label="Linkedin">
            <FaLinkedinIn />
          </a>
          <a href="#" className="social-link" aria-label="Youtube">
            <FaYoutube />
          </a>
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "25px",
            fontSize: "13px",
            color: "#888",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          Copyright Ideapeel Inc © 2023. All Right Reserved
        </div>
      </footer>
    </div>
  );
}
