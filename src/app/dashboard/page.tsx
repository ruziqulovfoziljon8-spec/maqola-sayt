"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  text: string;
  category: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Hammasi");
  const [searchTerm, setSearchTerm] = useState("");
  const [activePost, setActivePost] = useState<Post | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    img: "",
    desc: "",
    text: "",
  });

  const theme = {
    purple: "#6366f1",
    purpleHover: "#4f46e5",
    lightPurple: "#eef2ff",
    white: "#ffffff",
    bg: "#f8fafc",
    textDark: "#0f172a",
    textGray: "#64748b",
    green: "#10b981",
    red: "#ef4444",
    blue: "#3b82f6",
    cardShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    hoverShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  const categories = ["Hammasi", "Halollik", "Oila", "Sport", "Texnologiya"];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }));
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const postRef = doc(db, "posts", editingId);
        await updateDoc(postRef, { ...newPost });
      } else {
        await addDoc(collection(db, "posts"), {
          ...newPost,
          category: "Maqola",
          createdAt: serverTimestamp(),
        });
      }
      setIsModalOpen(false);
      setEditingId(null);
      setNewPost({ title: "", img: "", desc: "", text: "" });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (post: Post) => {
    setEditingId(post.id);
    setNewPost({
      title: post.title,
      img: post.img,
      desc: post.desc,
      text: post.text,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    let result = posts;
    if (activeTab !== "Hammasi") {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(activeTab.toLowerCase())
      );
    }
    if (searchTerm) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(result);
  }, [activeTab, searchTerm, posts]);

  if (activePost) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "32px",
          boxShadow: theme.cardShadow,
          fontFamily: "inherit",
        }}
      >
        <button
          onClick={() => setActivePost(null)}
          style={{
            padding: "12px 24px",
            background: theme.lightPurple,
            color: theme.purple,
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "30px",
            fontWeight: "700",
            transition: "0.3s",
          }}
        >
          ← Orqaga
        </button>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "900",
            color: theme.textDark,
            marginBottom: "24px",
            lineHeight: "1.2",
          }}
        >
          {activePost.title}
        </h1>
        <img
          src={activePost.img}
          style={{
            width: "100%",
            borderRadius: "24px",
            marginBottom: "30px",
            boxShadow: theme.cardShadow,
          }}
          alt=""
        />
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "19px",
            color: "#334155",
          }}
        >
          {activePost.text}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "32px",
              width: "550px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h2
              style={{
                marginBottom: "30px",
                fontSize: "28px",
                fontWeight: "800",
                color: theme.textDark,
              }}
            >
              {editingId ? "Tahrirlash" : "Yangi Maqola"}
            </h2>
            <form
              onSubmit={handleSavePost}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <input
                required
                placeholder="Sarlavha"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
              <input
                required
                placeholder="Rasm URL"
                value={newPost.img}
                onChange={(e) =>
                  setNewPost({ ...newPost, img: e.target.value })
                }
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
              <input
                required
                placeholder="Qisqa ta'rif"
                value={newPost.desc}
                onChange={(e) =>
                  setNewPost({ ...newPost, desc: e.target.value })
                }
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
              <textarea
                required
                placeholder="Asosiy matn..."
                rows={5}
                value={newPost.text}
                onChange={(e) =>
                  setNewPost({ ...newPost, text: e.target.value })
                }
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  outline: "none",
                  background: "#f8fafc",
                  resize: "none",
                }}
              />
              <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: "16px",
                    background: theme.purple,
                    color: "white",
                    border: "none",
                    borderRadius: "16px",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                  }}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "#f1f5f9",
                    color: theme.textDark,
                    border: "none",
                    borderRadius: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 30px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "16px 20px",
          borderRadius: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  activeTab === cat ? theme.purple : "transparent",
                color: activeTab === cat ? "white" : theme.textGray,
                fontWeight: "700",
                transition: "0.3s",
                fontSize: "14px",
              }}
            >
              {cat}
            </button>
          ))}
          <input
            type="text"
            placeholder="Sarlavhadan qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              width: "240px",
              outline: "none",
              fontSize: "14px",
              background: "white",
            }}
          />
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setNewPost({ title: "", img: "", desc: "", text: "" });
            setIsModalOpen(true);
          }}
          style={{
            background: theme.purple,
            color: "white",
            padding: "12px 28px",
            borderRadius: "14px",
            border: "none",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2)",
            fontSize: "15px",
          }}
        >
          + Maqola qo'shish
        </button>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto 40px", padding: "0 10px" }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "900",
            color: theme.textDark,
            letterSpacing: "-2px",
            marginBottom: "8px",
          }}
        >
          Maqolalar
        </h1>
        <p
          style={{ color: theme.textGray, fontSize: "18px", fontWeight: "500" }}
        >
          Platformadagi barcha maqolalarni boshqarish
        </p>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "40px",
        }}
      >
        {loading ? (
          <h2
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: theme.textGray,
            }}
          >
            Yuklanmoqda...
          </h2>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "white",
                borderRadius: "32px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: theme.cardShadow,
                border: "1px solid #f1f5f9",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = theme.hoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = theme.cardShadow;
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "240px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={post.img}
                  onClick={() => setActivePost(post)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  alt=""
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
                  onClick={() => setActivePost(post)}
                  style={{
                    cursor: "pointer",
                    marginBottom: "12px",
                    fontSize: "24px",
                    fontWeight: "900",
                    color: theme.textDark,
                    lineHeight: "1.2",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: theme.textGray,
                    lineHeight: "1.6",
                    marginBottom: "25px",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.desc}
                </p>

                <div
                  style={{ marginTop: "auto", display: "flex", gap: "10px" }}
                >
                  <button
                    onClick={() => startEdit(post)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: theme.blue,
                      color: "white",
                      border: "none",
                      borderRadius: "14px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#fee2e2",
                      color: theme.red,
                      border: "none",
                      borderRadius: "14px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
