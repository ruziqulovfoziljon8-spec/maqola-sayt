"use client";

import { useState } from "react";
import suniy from "../imagess/suniyy1.png";
import blog11 from "../imagess/blog 1.jpg"
import blog22 from "../imagess/blog22.png"
import blog33 from "../imagess/blog33.png"
import blog44 from "../imagess/blog44.png"
import blog55 from "../imagess/blog50.jpg"
import blog66 from "../imagess/blog666.png"
import blog77 from "../imagess/blog777.png"
import blog88 from "../imagess/blog88.png"
import blog99 from "../imagess/blog99.png"

interface Post {
  id: number;
  title: string;
  desc: string;
  img: string;
  text: string;
}

export default function Blog() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  const posts = [
    {
      id: 1,
      title: "Yoshlar va ta’lim?",
      desc: "    Ta’lim jamiyat taraqqiyotining eng muhim omillaridan biridir Ayniqsa yoshlar uchun bilim olish kelajakdagi muvaffaqiyatning asosiy poydevori hisoblanadi...",
      img: blog11.src,
      text: "    Yoshlar qanchalik ko‘p bilim olsa, jamiyat ham shunchalik tez rivojlanadi. Shu sababli har bir yosh o‘z ustida ishlashi,yangi bilim va ko‘nikmalarni o‘rganishi juda muhimdir.",
    },
    {
      id: 2,
      title: "Internetning foydasi?",
      desc: "    Internet bugungi kunda dunyodagi eng katta axborot manbalaridan biri hisoblanadi. U orqali odamlar turli xil ma’lumotlarni tez va oson topishlari mumkin...",
      img: blog22.src,
      text: "    Internet yordamida masofadan turib o‘qish, ishlash va muloqot qilish imkoniyati mavjud. Ammo undan to‘g‘ri va foydali maqsadlarda foydalanish juda muhimdir.",
    },
    {
      id: 3,
      title: "Sport va sog‘lom turmush?",
      desc: "    Sport bilan shug‘ullanish inson salomatligini mustahkamlaydi va organizmni chiniqtiradi. Doimiy jismoniy mashqlar insonni kuchli va bardoshli qiladi...",
      img: blog33.src,
      text: "    Sog‘lom turmush tarzini tanlagan inson uzoq umr ko‘radi va o‘zini har doim tetik his qiladi. Shu sababli sport har bir inson hayotida muhim o‘rin tutadi.",
    },
    {
      id: 4,
      title: "Texnologiyalar rivoji?",
      desc: "  Zamonaviy texnologiyalar inson hayotini ancha osonlashtirdi.Bugungi kunda turli xil qurilmalar yordamida ko‘plab ishlar tez va samarali bajarilmoqda...",
      img: blog44.src,
      text: "    Texnologiyalar rivoji bilan birga yangi kasblar ham paydo bo‘lmoqda. Shuning uchun insonlar doimo yangi bilimlarni o‘rganib borishlari kerak.",
    },
    {
      id: 5,
      title: "Vaqtni to‘g‘ri boshqarish?",
      desc: "    Vaqt inson hayotidagi eng qimmat boyliklardan biridir.Uni to‘g‘ri boshqarish muvaffaqiyatga erishish uchun juda muhim hisoblanadi...",
      img: blog55.src,
      text: "    Reja asosida ishlash va vaqtni bekorga sarflamaslik insonni yanada samarali ishlashga yordam beradi.",
    },
    {
      id: 6,
      title: "Oila qadri?",
      desc: "    Oila inson hayotidagi eng muhim qadriyatlardan biridir.Oila a’zolari o‘rtasidagi mehr va hurmat baxtli hayotning asosidir...",
      img: blog66.src,
      text: "    Mustahkam oila jamiyatning ham mustahkam bo‘lishiga xizmat qiladi. Shu sababli oilani qadrlash har bir inson uchun muhimdir.",
    },
    {
      id: 7,
      title: "Mehnatsevarlik?",
      desc: "    Mehnatsevarlik insonni muvaffaqiyatga olib boradigan muhim fazilatlardan biridir. Mehnat qilgan inson har doim o‘z oldiga qo‘ygan maqsadlariga erishadi...",
      img: blog77.src,
      text: "    Jamiyat taraqqiyoti ham insonlarning mehnati orqali amalga oshadi. Shu sababli mehnat qilish har bir insonning hayotida muhim o‘rin tutadi.",
    },
    {
      id: 8,
      title: "Kitob o‘qishning ahamiyati?",
      desc: "    Kitob insonning eng yaqin do‘stlaridan biridir. Kitob o‘qish orqali inson yangi bilimlar oladi, dunyoqarashi kengayadi va fikrlash qobiliyati rivojlanadi...",
      img: blog88.src,
      text: "    Mutolaa qilish nafaqat bilim beradi, balki insonni sabrli, tafakkurli va madaniyatli qiladi. Shu sababli kitob o‘qish har bir inson hayotining muhim qismiga aylanishi kerak.",
    },
    {
      id: 9,
      title: "Halollik – eng katta boylik?",
      desc: "  Halol inson har doim hurmatga sazovor bo‘ladi...",
      img: blog99.src,
      text: "    Boylik yoki mansab vaqtinchalik bo‘lishi mumkin, lekin halollik insonni doimo yuksak darajada saqlab turadi.",
    },
  ];

  if (activePost) {
    return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "100px auto",
          padding: "0 20px",
          fontFamily: "sans-serif",
        }}
      >
        <button
          onClick={() => setActivePost(null)}
          style={{
            padding: "12px 25px",
            backgroundColor: "#7c4dff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            marginBottom: "30px",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#5e35b1")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#7c4dff")
          }
        >
          ← Orqaga qaytish
        </button>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            color: "#1a1a1a",
            marginBottom: "30px",
            lineHeight: "1.2",
          }}
        >
          {activePost.title}
        </h1>

        <div
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={activePost.img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ fontSize: "18px", lineHeight: "1.8", color: "#444" }}>
          <p>{activePost.text}</p>
          <div
            style={{
              margin: "40px 0",
              padding: "30px",
              borderLeft: "5px solid #7c4dff",
              backgroundColor: "#f3f0ff",
              fontStyle: "italic",
              fontSize: "20px",
              borderRadius: "0 20px 20px 0",
            }}
          >
            "People worry that computers will get too smart and take over the
            world, but the real problem is that they're too stupid and they've
            already taken over the world."
            <br />{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "normal",
              }}
            >
              — Pedro Domingos
            </span>
          </div>
          <p>{activePost.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <style>{`
        .blog-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .blog-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 30px rgba(124, 77, 255, 0.15) !important;
        }
        .blog-card:hover h3 {
          color: #7c4dff !important;
        }
        .read-more-btn {
          transition: 0.3s;
        }
        .read-more-btn:hover {
          letter-spacing: 1px;
          text-decoration: underline !important;
        }
      `}</style>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "100px 5% 40px",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#7e57e2",
            borderRadius: "30px",
            padding: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            fontFamily: "sans-serif",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(126, 87, 226, 0.3)",
          }}
        >
          <div style={{ flex: 1, paddingRight: "40px", zIndex: 2 }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                lineHeight: "1.1",
                marginBottom: "25px",
              }}
            >
              Sun’iy intellekt kelajakni qanday o‘zgartiradi?
            </h1>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                marginBottom: "35px",
                opacity: 0.9,
              }}
            >
              Sun’iy intellekt nafaqat robot texnikasi, balki kundalik
              hayotimizning ajralmas qismiga aylanmoqda...
            </p>
            <button
              style={{
                backgroundColor: "white",
                color: "#7e57e2",
                padding: "15px 40px",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Read more
            </button>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <img
              src={suniy.src}
              alt=""
              style={{
                height: "420px",
                width: "420px",
                objectFit: "cover",
                borderRadius: "25px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{ width: "100%", fontFamily: "sans-serif", padding: "60px 0" }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <h2
              style={{
                fontWeight: "800",
                fontSize: "42px",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Popular Post
            </h2>
            <button
              style={{
                backgroundColor: "#7c4dff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 28px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 10px 20px rgba(124, 77, 255, 0.2)",
              }}
            >
              View All
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 2.5%" }}>
            {posts.map((post) => (
              <div
                key={post.id}
                className="blog-card"
                style={{
                  width: "31.6%",
                  backgroundColor: "white",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{ width: "100%", height: "260px", overflow: "hidden" }}
                >
                  <img
                    src={post.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "0.5s",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "30px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "15px",
                      color: "#1a1a1a",
                      lineHeight: "1.3",
                      transition: "0.3s",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      marginBottom: "25px",
                    }}
                  >
                    {post.desc}
                  </p>
                  <div style={{ marginTop: "auto" }}>
                    <span
                      className="read-more-btn"
                      onClick={() => setActivePost(post)}
                      style={{
                        color: "#7c4dff",
                        fontWeight: "700",
                        fontSize: "16px",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      Read More...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
