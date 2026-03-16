"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import suniy from "../imagess/suniyy1.png"; 

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  text: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }));
        setPosts(data);
      } catch (error) {
        console.error("Firebase'dan ma'lumot olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
            marginBottom: "30px",
            fontWeight: "bold",
          }}
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
        <img
          src={activePost.img}
          alt={activePost.title}
          style={{
            width: "100%",
            height: "500px",
            borderRadius: "24px",
            objectFit: "cover",
            marginBottom: "40px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
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
        .blog-card { transition: all 0.4s ease; cursor: pointer; }
        .blog-card:hover { transform: translateY(-12px); box-shadow: 0 20px 30px rgba(124, 77, 255, 0.1) !important; }
        .blog-card:hover h3 { color: #7c4dff; }
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
              alt="AI Hero"
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

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 5%" }}>
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
              padding: "12px 28px",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View All
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Ma'lumotlar yuklanmoqda...</h2>
          </div>
        ) : (
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
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      marginBottom: "15px",
                      color: "#1a1a1a",
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
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
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
