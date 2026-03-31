"use client";

import React, { useState } from "react";
import Image from "next/image";
import { db } from "@/app/firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Rasmlar
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
      // FIREBASEGA YUBORISH (Sizning bazangizdagi maydon nomlariga moslab)
      await addDoc(collection(db, "foydalanuvchilar"), {
        ism: formData.name,
        email: formData.email,
        phone: formData.phone,
        hamkorlik: formData.subject,
        xabar: formData.message,
        createdAt: serverTimestamp(), // Vaqt bo'yicha tartiblash uchun
      });

      setStatus({
        type: "success",
        msg: "Rahmat! Xabaringiz muvaffaqiyatli yuborildi.",
      });

      // Formani tozalash
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
      <div style={{ textAlign: "center", padding: "80px 20px 60px" }}>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
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
            fontSize: "18px",
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Savollaringiz bormi? Bizga yozing yoki qo'ng'iroq qiling.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          padding: "0 20px",
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
              width: "320px",
              padding: "40px 30px",
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
                hoveredCard === index ? "translateY(-10px)" : "translateY(0)",
              boxShadow:
                hoveredCard === index
                  ? "0 20px 40px rgba(126, 87, 226, 0.15)"
                  : "0 4px 6px -1px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                backgroundColor: theme.lightPurple,
                padding: "20px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            >
              <Image
                src={item.img}
                alt={item.title}
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>
            <h2
              style={{
                color: theme.purple,
                fontSize: "22px",
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
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {item.desc}
            </a>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "100px", position: "relative" }}>
        <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
          <img
            src={joylashuv.src}
            alt="Map"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            width: "min(90%, 850px)",
            padding: "clamp(30px, 5vw, 60px)",
            backgroundColor: theme.white,
            borderRadius: "32px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            margin: "-200px auto 100px",
            position: "relative",
            zIndex: "10",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "35px",
              textAlign: "center",
            }}
          >
            Xabar yuboring
          </h3>

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

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
            }}
          >
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Ismingiz *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Ismingiz..."
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Email *</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email..."
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Telefon</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Telefon..."
                style={inputStyle}
              />
            </div>
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Mavzu</label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Mavzu..."
                style={inputStyle}
              />
            </div>
            <div style={{ ...inputContainerStyle, gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Xabaringiz *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Xabar..."
                style={{ ...inputStyle, height: "120px", resize: "none" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: theme.purple,
                  color: theme.white,
                  padding: "16px 60px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Xabarni yuborish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};
const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#444",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: "15px",
  backgroundColor: "#f9fafb",
  boxSizing: "border-box",
};
