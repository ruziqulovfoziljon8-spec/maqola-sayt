"use client";

import { useEffect, useState, Suspense } from "react"; // Suspense qo'shildi
import { useSearchParams } from "next/navigation"; // useSearchParams qo'shildi
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
  const searchParams = useSearchParams(); // URL'dan search parametrni olish
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
        .footer-link { color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; }
        .footer-link:hover { color: #7c4dff; }
        .social-icon { width: 35px; height: 35px; background: #7c4dff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; text-decoration: none; font-size: 12px; font-weight: bold; }
      `}</style>

      {/* Hero faqat qidiruv bo'lmaganda ko'rinadi */}
      {!showAll && !searchQuery && (
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
          padding: showAll || searchQuery ? "100px 5% 60px" : "60px 5%",
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
            {searchQuery
              ? `"${searchQuery}" bo'yicha natijalar`
              : showAll
              ? "Barcha maqolalar"
              : "So'nggi maqolalar"}
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            style={viewAllButtonStyle}
          >
            {showAll ? "Asosiyga qaytish" : "View All"}
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Malumotlar yuklanmoqda...</h2>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 2.5%" }}>
            {(searchQuery ? filteredPosts : posts).map((post) => (
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
            {searchQuery && filteredPosts.length === 0 && (
              <p
                style={{ textAlign: "center", width: "100%", fontSize: "18px" }}
              >
                Hech narsa topilmadi...
              </p>
            )}
          </div>
        )}
      </div>

      <footer style={{ backgroundColor: "#ffffff", padding: "80px 0 40px" }}>
        <div style={newsletterBoxStyle}>
          <div style={newsletterContentStyle}>
            <h2
              style={{
                fontSize: "36px",
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
          style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}
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
              gap: "40px",
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
              width: "90%",
              margin: "0 auto 30px",
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

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}

const newsletterBoxStyle: any = {
  maxWidth: "1300px",
  margin: "0 auto 80px",
  backgroundColor: "#7c4dff",
  borderRadius: "30px",
  padding: "80px 40px",
  color: "white",
  textAlign: "center",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)",
};

const newsletterContentStyle: any = {
  maxWidth: "800px",
  margin: "0 auto",
};

const emailInputStyle: any = {
  padding: "15px 25px",
  borderRadius: "10px",
  border: "none",
  width: "350px",
  fontSize: "16px",
};

const getStartedButtonStyle: any = {
  backgroundColor: "white",
  color: "#7c4dff",
  border: "none",
  borderRadius: "10px",
  padding: "0 35px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

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
