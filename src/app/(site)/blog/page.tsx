"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function BlogContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

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

  const filteredPosts = posts.filter((post) => {
    return (
      post.title?.toLowerCase().includes(searchQuery) ||
      post.desc?.toLowerCase().includes(searchQuery)
    );
  });

  const handleOpenPost = async (post: Post) => {
    setActivePost(post);
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
    window.scrollTo(0, 0);
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
        <h1 className="active-title">{activePost.title}</h1>
        <img
          src={activePost.img}
          alt={activePost.title}
          style={activeImageStyle}
        />
        <div style={{ fontSize: "20px", lineHeight: "1.8", color: "#444" }}>
          <p>{activePost.text}</p>
        </div>
        <style>{`.active-title { font-size: clamp(28px, 5vw, 48px); font-weight: 800; color: #1a1a1a; margin-bottom: 30px; }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        @media (max-width: 1100px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }

        .hero-card { display: flex; align-items: center; justify-content: space-between; background: #7e57e2; border-radius: 30px; padding: 60px; color: white; }
        @media (max-width: 900px) { 
            .hero-card { flex-direction: column; text-align: center; padding: 40px 20px; }
            .hero-img { width: 100% !important; height: auto !important; max-width: 380px; margin-top: 30px; }
            .hero-title { font-size: 32px !important; }
        }

        .blog-card { transition: all 0.4s ease; background: white; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 10px 20px rgba(0,0,0,0.04); }
        .blog-card:hover { transform: translateY(-12px); box-shadow: 0 20px 30px rgba(124, 77, 255, 0.15) !important; }
        
        .stat-badge { display: flex; align-items: center; gap: 6px; background: #ffffff; color: #475569; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #e2e8f0; cursor: pointer; }
        .heart-active { color: #ff4d4d !important; }
        .read-more-btn { color: #7c4dff; font-weight: 700; font-size: 16px; cursor: pointer; }
        
        .footer-link { text-decoration: none; color: #1a1a1a; font-weight: 500; transition: 0.3s; }
        .footer-link:hover { color: #7c4dff; }

        .social-icon { 
            width: 35px; height: 35px; border-radius: 50%; background: #7c4dff; color: white; 
            display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; transition: 0.3s;
        }
        .social-icon:hover { transform: scale(1.1); opacity: 0.9; }

        @media (max-width: 600px) {
            .newsletter-container { flex-direction: column; width: 100%; }
            .newsletter-input { width: 100% !important; margin-bottom: 10px; }
            .newsletter-btn { width: 100%; }
            .footer-nav { gap: 15px !important; }
        }
      `}</style>

      {!showAll && !searchQuery && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "100px 5% 40px",
          }}
        >
          <div className="hero-card">
            <div style={{ flex: 1 }}>
              <h1
                className="hero-title"
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
                style={{ fontSize: "18px", opacity: 0.9, marginBottom: "35px" }}
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
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <img
                src={suniy.src}
                alt="AI"
                style={heroImageStyle}
                className="hero-img"
              />
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: showAll || searchQuery ? "100px 5% 60px" : "60px 5%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontWeight: "900",
              fontSize: "clamp(20px, 4vw, 25px)",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            {searchQuery ? "Natijalar" : "So'nggi maqolalar"}
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            style={viewAllButtonStyle}
          >
            {showAll ? "Orqaga" : "View All"}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Malumotlar yuklanmoqda...</h2>
          </div>
        ) : (
          <div className="blog-grid">
            {(searchQuery
              ? filteredPosts
              : showAll
              ? posts
              : posts.slice(0, 10000000000000000000000000)
            ).map((post) => (
              <div key={post.id} className="blog-card">
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
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                      📅 {post.date}
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div
                        className="stat-badge"
                        onClick={(e) => handleLike(e, post.id)}
                      >
                        <span
                          className={
                            likedPosts.includes(post.id) ? "heart-active" : ""
                          }
                        >
                          ❤
                        </span>{" "}
                        {post.likes}
                      </div>
                      <div className="stat-badge">👁 {post.views}</div>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "15px",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
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

      <footer
        style={{
          backgroundColor: "#ffffff",
          padding: "80px 0 40px",
          borderTop: "1px solid #eee",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div style={newsletterBoxStyle}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 40px)",
                  fontWeight: "bold",
                  marginBottom: "25px",
                  lineHeight: 1.2,
                }}
              >
                Bizning hikoyalarimizni bizdan har hafta pochta qutingizga olib
                boring.
              </h2>
              <div className="newsletter-container">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="newsletter-input"
                  style={emailInputStyle}
                />
                <button
                  className="newsletter-btn"
                  style={getStartedButtonStyle}
                >
                  Get started
                </button>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  opacity: 0.7,
                  marginTop: "20px",
                  lineHeight: 1.5,
                }}
              >
                Get a response tomorrow if you submit by 9pm today. If we
                received after <br /> 9pm will get a response the following day.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#7c4dff",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path
                    d="M2 17L12 22L22 17"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
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
              className="footer-nav"
              style={{
                display: "flex",
                gap: "30px",
                marginBottom: "30px",
                flexWrap: "wrap",
                justifyContent: "center",
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

            <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>
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
                width: "100%",
                height: "1px",
                backgroundColor: "#eee",
                marginBottom: "30px",
              }}
            ></div>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              Copyright Ideapeel Inc © 2023. All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Blog() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "100px", textAlign: "center" }}>
          Yuklanmoqda...
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}

const heroButtonStyle: any = {
  backgroundColor: "white",
  color: "#7e57e2",
  padding: "15px 40px",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};
const heroImageStyle: any = {
  height: "400px",
  width: "400px",
  objectFit: "cover",
  borderRadius: "25px",
};
const viewAllButtonStyle: any = {
  backgroundColor: "#7c4dff",
  color: "white",
  padding: "12px 25px",
  border: "none",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
const backButtonStyle: any = {
  padding: "12px 25px",
  backgroundColor: "#7c4dff",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "30px",
};
const activeImageStyle: any = {
  width: "100%",
  maxHeight: "500px",
  borderRadius: "24px",
  objectFit: "cover",
  marginBottom: "40px",
};

const newsletterBoxStyle: any = {
  backgroundColor: "#7c4dff",
  borderRadius: "24px",
  padding: "60px 40px",
  color: "white",
  textAlign: "center",
  marginBottom: "60px",
  backgroundImage:
    "radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent), radial-gradient(circle at bottom right, rgba(255,255,255,0.1), transparent)",
};

const emailInputStyle: any = {
  padding: "16px 25px",
  borderRadius: "10px",
  border: "none",
  marginRight: "15px",
  width: "350px",
  fontSize: "16px",
  color: "#333",
};

const getStartedButtonStyle: any = {
  backgroundColor: "white",
  color: "#7c4dff",
  border: "none",
  borderRadius: "10px",
  padding: "16px 35px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};
