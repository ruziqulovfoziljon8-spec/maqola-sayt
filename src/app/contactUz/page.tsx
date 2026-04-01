"use client";

import React, { useState } from "react";
import Image from "next/image";
import { db } from "@/app/firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import frame1 from "../image/Frame1.png";
import frame4 from "../image/Frame4.png";
import frame2 from "../image/frame2.jpg";
import joylashuv from "../image/joylashuv.png";

export default function ContactUz() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const theme = {
    purple: "#7e57e2",
    lightPurple: "#f3effd",
    textDark: "#1a1a1a",
    textGray: "#7a7a7a",
    white: "#ffffff",
    border: "#e5e7eb",
    error: "#ff4d4f",
    success: "#52c41a",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ type: "", msg: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        msg: "Iltimos, barcha majburiy maydonlarni (Ism, Email, Xabar) to'ldiring!",
      });
      return;
    }

    try {
      await addDoc(collection(db, "foydalanuvchilar"), {
        ism: formData.name,
        email: formData.email,
        phone: formData.phone,
        hamkorlik: formData.subject,
        xabar: formData.message,
        createdAt: serverTimestamp(),
      });

      setStatus({
        type: "success",
        msg: "Rahmat! Xabaringiz muvaffaqiyatli yuborildi.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Xatolik:", error);
      setStatus({
        type: "error",
        msg: "Xatolik yuz berdi. Qayta urinib ko'ring.",
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.white,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .footer-link { color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: 0.3s; }
        .footer-link:hover { color: #7c4dff; }
        .social-icon { width: 35px; height: 35px; background: #7c4dff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none; font-size: 12px; font-weight: bold; transition: 0.3s; }
        .social-icon:hover { opacity: 0.8; transform: translateY(-3px); }
        .content-wrapper { 
          max-width: 1100px; 
          margin: 0 auto; 
          padding: 0 20px; 
        }
        input::placeholder, textarea::placeholder { color: #999; }

        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .newsletter-form {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
          }
          .newsletter-form input {
            width: 100% !important;
            max-width: none !important;
          }
          .newsletter-form button {
            width: 100%;
          }
          .map-container {
            height: 300px !important;
          }
          .form-container {
            margin-top: -100px !important;
            padding: 25px !important;
          }
        }

        @media (max-width: 480px) {
          .cards-container {
            gap: 15px !important;
          }
          .header-section {
            padding: 50px 15px 40px !important;
          }
        }
      `}</style>

      <div
        className="header-section"
        style={{ textAlign: "center", padding: "80px 20px 60px" }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: "800",
            color: theme.textDark,
            marginBottom: "20px",
          }}
        >
          Biz bilan bog'laning
        </h1>
        <p
          style={{
            color: theme.textGray,
            fontSize: "17px",
            lineHeight: "1.6",
            maxWidth: "550px",
            margin: "0 auto",
          }}
        >
          Savollaringiz bormi? Bizga yozing yoki qo'ng'iroq qiling.
        </p>
      </div>

      <div className="content-wrapper">
        <div
          className="cards-container"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              img: frame2,
              title: "Ofisimiz",
              desc: "Toshkent, Buxoro, Qorako‘l",
              link: "#",
            },
            {
              img: frame1,
              title: "Email",
              desc: "ruziqulovfoziljon8@gmail.com",
              link: "mailto:ruziqulovfoziljon8@gmail.com",
            },
            {
              img: frame4,
              title: "Telefon",
              desc: "+998 94 817 05 20",
              link: "tel:+998948170520",
            },
          ].map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                flex: "1 1 280px",
                maxWidth: "340px",
                padding: "35px 25px",
                borderRadius: "24px",
                backgroundColor: theme.white,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                border: `1px solid ${
                  hoveredCard === index ? theme.purple : theme.border
                }`,
                transform:
                  hoveredCard === index ? "translateY(-8px)" : "translateY(0)",
                boxShadow:
                  hoveredCard === index
                    ? "0 15px 35px rgba(126, 87, 226, 0.12)"
                    : "0 4px 6px -1px rgba(0,0,0,0.02)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: theme.lightPurple,
                  padding: "18px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h2
                style={{
                  color: theme.purple,
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h2>
              <a
                href={item.link}
                style={{
                  textAlign: "center",
                  color: theme.textGray,
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  wordBreak: "break-word",
                }}
              >
                {item.desc}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "100px", position: "relative" }}>
        <div
          className="map-container"
          style={{ width: "100%", height: "450px", overflow: "hidden" }}
        >
          <img
            src={joylashuv.src}
            alt="Map"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="content-wrapper">
          <div
            className="form-container"
            style={{
              padding: "clamp(20px, 5vw, 40px)",
              backgroundColor: theme.white,
              borderRadius: "24px",
              boxShadow: "0 20px 45px -10px rgba(0, 0, 0, 0.12)",
              marginTop: "-180px",
              position: "relative",
              zIndex: "10",
            }}
          >
            {status.msg && (
              <div
                style={{
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  textAlign: "center",
                  backgroundColor:
                    status.type === "error" ? "#fff2f0" : "#f6ffed",
                  border: `1px solid ${
                    status.type === "error" ? theme.error : theme.success
                  }`,
                  color: status.type === "error" ? theme.error : theme.success,
                }}
              >
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form-grid">
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  style={inputStyle}
                />
              </div>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  style={inputStyle}
                />
              </div>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your phone number"
                  style={inputStyle}
                />
              </div>
              <div style={inputContainerStyle}>
                <label style={labelStyle}>Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  type="text"
                  placeholder="Subject"
                  style={inputStyle}
                />
              </div>
              <div style={{ ...inputContainerStyle, gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  style={{ ...inputStyle, height: "140px", resize: "none" }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1", textAlign: "left" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: theme.purple,
                    color: theme.white,
                    padding: "16px 40px",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "fit-content",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Xabar yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: "#ffffff", padding: "80px 0 40px" }}>
        <div className="content-wrapper">
          <div style={newsletterBoxStyle}>
            <div style={newsletterContentStyle}>
              <h2
                style={{
                  fontSize: "clamp(22px, 4vw, 36px)",
                  fontWeight: "bold",
                  margin: "0 0 30px",
                  lineHeight: "1.2",
                }}
              >
                Bizning hikoyalarimizni har hafta pochta qutingizga olib boring.
              </h2>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your Email"
                  style={emailInputStyle}
                />
                <button style={getStartedButtonStyle}>Get started</button>
              </div>
              <p style={{ fontSize: "14px", opacity: 0.9, lineHeight: "1.5" }}>
                Get a response tomorrow if you submit by 9pm today. If we
                received after <br />{" "}
                <br style={{ display: "none" }} className="mobile-br" /> 9pm
                will get a reponse the following day.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#7c4dff",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Z
              </div>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1a1a1a",
                }}
              >
                Zarrin
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                flexWrap: "wrap",
                marginBottom: "35px",
              }}
            >
              <a href="#" className="footer-link">
                Home
              </a>
              <a href="#" className="footer-link">
                Blog
              </a>
              <a href="#" className="footer-link">
                About
              </a>
              <a href="#" className="footer-link">
                Contact Us
              </a>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "40px",
              }}
            >
              <a href="#" className="social-icon">
                FB
              </a>
              <a href="#" className="social-icon">
                IG
              </a>
              <a href="#" className="social-icon">
                LN
              </a>
              <a href="#" className="social-icon">
                YT
              </a>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "#f1f5f9",
                width: "100%",
                marginBottom: "25px",
              }}
            ></div>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Copyright Ideapeel Inc © 2023. All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const newsletterBoxStyle: React.CSSProperties = {
  backgroundColor: "#7c4dff",
  borderRadius: "24px",
  padding: "clamp(40px, 8vw, 80px) 20px",
  color: "white",
  textAlign: "center",
  marginBottom: "80px",
  position: "relative",
  overflow: "hidden",
};

const newsletterContentStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

const emailInputStyle: React.CSSProperties = {
  padding: "16px 24px",
  borderRadius: "8px",
  border: "none",
  width: "100%",
  maxWidth: "350px",
  fontSize: "16px",
  color: "white",
};

const getStartedButtonStyle: React.CSSProperties = {
  backgroundColor: "white",
  color: "#7c4dff",
  border: "none",
  borderRadius: "8px",
  padding: "16px 32px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#1a1a1a",
  textAlign: "left",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: "15px",
  backgroundColor: "#fff",
  boxSizing: "border-box",
};
