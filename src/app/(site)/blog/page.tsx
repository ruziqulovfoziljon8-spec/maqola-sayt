"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import suniy from "../imagess/suniyy1.png";

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  text: string;
  date?: string;
  likes: number;
  views: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const heroPost: Post = {
    id: "hero-special",
    title: "Sun’iy intellekt kelajakni qanday o‘zgartiradi?",
    desc: "Sun’iy intellekt nafaqat robot texnikasi, balki kundalik hayotimizning ajralmas qismiga aylanmoqda...",
    text: "Sun’iy intellekt (AI) texnologiyalari bugungi kunda tibbiyot, ta'lim, transport va iqtisodiyot kabi barcha sohalarga kirib bormoqda. Kelajakda AI inson mehnatini yengillashtirish bilan birga, yangi kasb turlarining paydo bo'lishiga ham sabab bo'ladi. Ma'lumotlarni qayta ishlash tezligi va aniqligi bo'yicha inson imkoniyatlaridan o'zib ketayotgan ushbu texnologiya, kundalik turmush tarzimizni butunlay yangi bosqichga olib chiqadi.",
    img: suniy.src,
    likes: 24500,
    views: 50000,
    date: "31.03.2026",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => {
          const res = doc.data();
          return {
            id: doc.id,
            ...res,
            likes: res.likes || 0,
            views: res.views || 0,
            date: res.date || "31.03.2026",
          } as Post;
        });
        setPosts(data);
        const savedLikes = JSON.parse(
          localStorage.getItem("userLikes") || "[]"
        );
        setLikedPosts(savedLikes);
      } catch (error) {
        console.error("Firebase'dan ma'lumot olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenPost = async (post: Post) => {
    setActivePost(post);
    // Faqat bazadan kelgan postlar uchun viewni oshiramiz
    if (post.id !== "hero-special") {
      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, { views: increment(1) });
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
        );
      } catch (e) {
        console.error("Views error:", e);
      }
    }
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (postId === "hero-special" || likedPosts.includes(postId)) return;

    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, { likes: increment(1) });
      const newLikes = [...likedPosts, postId];
      setLikedPosts(newLikes);
      localStorage.setItem("userLikes", JSON.stringify(newLikes));
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
      );
    } catch (e) {
      console.error("Like error:", e);
    }
  };

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
        <button onClick={() => setActivePost(null)} style={backButtonStyle}>
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
        <img
          src={activePost.img}
          alt={activePost.title}
          style={activeImageStyle}
        />
        <div style={{ fontSize: "20px", lineHeight: "1.8", color: "#444" }}>
          <p>{activePost.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`
        .blog-card { transition: all 0.4s ease; cursor: default; }
        .blog-card:hover { transform: translateY(-12px); box-shadow: 0 20px 30px rgba(124, 77, 255, 0.1) !important; }
        .stat-badge { display: flex; align-items: center; gap: 6px; background: #ffffff; color: #475569; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #e2e8f0; cursor: pointer; }
        .heart-icon { color: #94a3b8; transition: 0.3s; }
        .heart-active { color: #ff4d4d !important; }
        .read-more-btn { color: #7c4dff; fontWeight: 700; fontSize: 16px; cursor: pointer; transition: 0.3s; }
        .read-more-btn:hover { opacity: 0.7; text-decoration: underline; }
      `}</style>

      {!showAll && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "100px 5% 40px",
          }}
        >
          <div style={heroCardStyle}>
            <div style={{ flex: 1, paddingRight: "40px", zIndex: 2 }}>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  marginBottom: "25px",
                }}
              >
                {heroPost.title}
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  marginBottom: "35px",
                  opacity: 0.9,
                }}
              >
                {heroPost.desc}
              </p>
              <button
                onClick={() => handleOpenPost(heroPost)}
                style={heroButtonStyle}
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
              <img src={suniy.src} alt="AI Hero" style={heroImageStyle} />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: showAll ? "100px 5% 60px" : "60px 5%",
        }}
      >
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
            {showAll ? "Barcha maqolalar" : "So'nggi maqolalar"}
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            style={viewAllButtonStyle}
          >
            {showAll ? "Asosiyga qaytish" : "Hammasini ko'rish"}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Yuklanmoqda...</h2>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 2.5%" }}>
            {posts.map((post) => (
              <div key={post.id} className="blog-card" style={cardStyle}>
                <div
                  style={{ width: "100%", height: "260px", overflow: "hidden" }}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      📅 {post.date}
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div
                        className="stat-badge"
                        onClick={(e) => handleLike(e, post.id)}
                      >
                        <span
                          className={`heart-icon ${
                            likedPosts.includes(post.id) ? "heart-active" : ""
                          }`}
                        >
                          ❤
                        </span>
                        {post.likes}
                      </div>
                      <div className="stat-badge">
                        <span style={{ color: "#94a3b8" }}>👁</span>
                        {post.views}
                      </div>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "15px",
                      color: "#1a1a1a",
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
                      onClick={() => handleOpenPost(post)}
                    >
                      Read More...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const heroCardStyle: any = {
  width: "100%",
  backgroundColor: "#7e57e2",
  borderRadius: "30px",
  padding: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "white",
  boxShadow: "0 20px 40px rgba(126, 87, 226, 0.3)",
};
const heroButtonStyle: any = {
  backgroundColor: "white",
  color: "#7e57e2",
  padding: "15px 40px",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};
const heroImageStyle: any = {
  height: "420px",
  width: "420px",
  objectFit: "cover",
  borderRadius: "25px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
};
const viewAllButtonStyle: any = {
  backgroundColor: "#7c4dff",
  color: "white",
  padding: "12px 28px",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};
const cardStyle: any = {
  width: "31.6%",
  backgroundColor: "white",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
};
const backButtonStyle: any = {
  padding: "12px 25px",
  backgroundColor: "#7c4dff",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "30px",
  fontWeight: "bold",
};
const activeImageStyle: any = {
  width: "100%",
  height: "500px",
  borderRadius: "24px",
  objectFit: "cover",
  marginBottom: "40px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
};
