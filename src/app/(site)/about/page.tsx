"use client";
import about from "../imagess/about1.png";
import React, { useState } from "react";

export default function About() {
  const [activeCard, setActiveCard] = useState<number>(1);

  const colors = {
    purple: "#7c4dff",
    dark: "#1a1a1a",
    gray: "#666",
    lightGray: "#f8f9fa",
    white: "#ffffff",
    border: "#eeeeee",
  };

  return (
    <div
      style={{
        backgroundColor: colors.white,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: colors.dark,
      }}
    >
      <style>{`
        .footer-link { color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: 0.3s; }
        .footer-link:hover { color: #7c4dff; }
        .social-icon { width: 35px; height: 35px; background: #7c4dff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none; font-size: 12px; font-weight: bold; transition: 0.3s; }
        .social-icon:hover { opacity: 0.8; transform: translateY(-3px); }
      `}</style>

      <div
        style={{ maxWidth: "1140px", margin: "0 auto", padding: "80px 20px" }}
      >
        <header style={{ textAlign: "center", marginBottom: "80px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: "700",
              color: colors.purple,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "20px",
              padding: "8px 20px",
              backgroundColor: "rgba(124, 77, 255, 0.08)",
              borderRadius: "100px",
            }}
          >
            Biz haqimizda
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "900",
              lineHeight: "1.1",
              marginBottom: "25px",
              letterSpacing: "-1px",
            }}
          >
            Ijodiy blog yozish va <br /> nashr etish platformasi
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: colors.gray,
              lineHeight: "1.8",
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            Biz sifatli kontent yaratish orqali odamlarning dunyoqarashini
            kengaytirishga, yangi g'oyalarni ommalashtirishga intilamiz.
          </p>
        </header>

        <div
          style={{
            width: "100%",
            borderRadius: "40px",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
            marginBottom: "100px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <img
            src={about.src}
            alt="Jamoaviy ish"
            style={{ width: "100%", display: "block", height: "auto" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            marginBottom: "80px",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "800",
              flex: "1 1 500px",
              margin: 0,
              lineHeight: "1.2",
            }}
          >
            Jamoamiz qanday ishlashini <br /> ko'rsatib beramiz
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: colors.gray,
              flex: "1 1 400px",
              lineHeight: "1.7",
              paddingLeft: "25px",
              borderLeft: `4px solid ${colors.purple}`,
            }}
          >
            Har bir maqola ortida katta izlanish, jamoaviy muhokama va
            sinchkovlik bilan o'tkazilgan tahlillar yotadi.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
            marginBottom: "100px",
          }}
        >
          {[
            {
              id: 1,
              num: "01",
              title: "G'oya yaratish",
              text: "Mavzu tanlashdan oldin bozor trendlarini tahlil qilamiz. Biz o'quvchilarimiz uchun eng dolzarb g'oyalarni saralaymiz.",
            },
            {
              id: 2,
              num: "02",
              title: "Tahlil qilish",
              text: "Faqat tasdiqlangan faktlarni taqdim etamiz. Har bir raqam va manbalar ekspertlarimiz tomonidan chuqur tekshiriladi.",
            },
            {
              id: 3,
              num: "03",
              title: "Nashr etish",
              text: "Tayyor materiallar zamonaviy dizayn va qulay formatda saytga joylanadi. Sizga faqatgina mutolaadan zavqlanish qoladi.",
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveCard(item.id)}
              style={{
                padding: "60px 45px",
                borderRadius: "40px",
                backgroundColor:
                  activeCard === item.id ? colors.purple : colors.lightGray,
                color: activeCard === item.id ? colors.white : colors.dark,
                boxShadow:
                  activeCard === item.id
                    ? "0 30px 60px rgba(124, 77, 255, 0.25)"
                    : "none",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer",
                border:
                  activeCard === item.id
                    ? "none"
                    : `1px solid ${colors.border}`,
                transform:
                  activeCard === item.id
                    ? "translateY(-15px)"
                    : "translateY(0)",
              }}
            >
              <span
                style={{
                  fontSize: "60px",
                  fontWeight: "900",
                  color:
                    activeCard === item.id
                      ? "rgba(255,255,255,0.3)"
                      : "#e0e0e0",
                  display: "block",
                  marginBottom: "25px",
                }}
              >
                {item.num}
              </span>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  marginBottom: "15px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  opacity: activeCard === item.id ? 0.9 : 0.7,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: "#ffffff", padding: "80px 0 40px" }}>
        <div style={newsletterBoxStyle}>
          <div style={newsletterContentStyle}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: "bold",
                margin: "0 0 20px",
              }}
            >
              Bizning hikoyalarimizni bizdan har hafta pochta qutingizga olib
              boring.
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <input
                type="email"
                placeholder="Your Email"
                style={emailInputStyle}
              />
              <button style={getStartedButtonStyle}>Get started</button>
            </div>
            <p
              style={{
                fontSize: "14px",
                opacity: 0.8,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Get a response tomorrow if you submit by 9pm today. If we received
              after 9pm will get a reponse the following day.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
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
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
              >
                Z
              </span>
            </div>
            <span
              style={{ fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}
            >
              Zarrin
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(20px, 5vw, 40px)",
              flexWrap: "wrap",
              marginBottom: "40px",
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
              backgroundColor: "#e2e8f0",
              width: "100%",
              marginBottom: "30px",
            }}
          ></div>

          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Copyright Ideapeel Inc © 2023. All Right Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

const newsletterBoxStyle: React.CSSProperties = {
  maxWidth: "1140px",
  margin: "0 auto 80px",
  backgroundColor: "#7c4dff",
  borderRadius: "30px",
  padding: "80px 20px",
  color: "white",
  textAlign: "center",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)",
};

const newsletterContentStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
};

const emailInputStyle: React.CSSProperties = {
  padding: "15px 25px",
  borderRadius: "10px",
  border: "none",
  width: "100%",
  maxWidth: "350px",
  fontSize: "16px",
};

const getStartedButtonStyle: React.CSSProperties = {
  backgroundColor: "white",
  color: "#7c4dff",
  border: "none",
  borderRadius: "10px",
  padding: "15px 35px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};
