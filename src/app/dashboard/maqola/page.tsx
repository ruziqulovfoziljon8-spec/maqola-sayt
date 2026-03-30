"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  desc: string;
  img: string;
  category?: string;
}

export default function Maqola() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Hammasi");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const categories = ["Hammasi", "Halollik", "Oila", "Sport", "Texnologiya"];

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      }));
      setPosts(data);
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Rostdan ham o'chirmoqchimisiz?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        alert("O'chirishda xatolik!");
      }
    }
  };

  // 3. TAHRIRLASH (EDIT) - MODALNI OCHISH
  const openEditModal = (post: Post) => {
    setEditingPost({ ...post, category: post.category || "Hammasi" });
    setIsEditModalOpen(true);
  };

  // 4. TAHRIRLANGAN MA'LUMOTNI FIREBASE-GA SAQLASH
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    try {
      const postRef = doc(db, "posts", editingPost.id);
      await updateDoc(postRef, {
        title: editingPost.title,
        desc: editingPost.desc,
        img: editingPost.img,
        category: editingPost.category,
      });

      // UI-ni yangilash
      setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
      setIsEditModalOpen(false);
      alert("Muvaffaqiyatli yangilandi!");
    } catch (error) {
      alert("Yangilashda xatolik!");
    }
  };

  const filteredPosts = posts.filter((post) => {
    // Qidiruv maydoni bo'yicha (Title ichidan qidiradi)
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "Hammasi" ||
      post.category === activeTab ||
      post.title.toLowerCase().includes(activeTab.toLowerCase());

    return matchesSearch && matchesTab;
  });

  return (
    <div
      style={{
        color: "#1e293b",
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "15px 25px",
          borderRadius: "20px",
          marginBottom: "35px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                backgroundColor: activeTab === cat ? "#6366f1" : "#f1f5f9",
                color: activeTab === cat ? "white" : "#64748b",
                fontWeight: "600",
                transition: "0.3s",
              }}
            >
              {cat}
            </button>
          ))}
          <input
            type="text"
            placeholder="Sarlavha bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              outline: "none",
              width: "250px",
            }}
          />
        </div>
        <button
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "12px 24px",
            borderRadius: "14px",
            border: "none",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + Maqola qo'shish
        </button>
      </div>

      <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "40px" }}>
        {activeTab === "Hammasi" ? "Barcha Maqolalar" : `${activeTab} bo'limi`}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              style={{
                backgroundColor: "white",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(0,0,0,0.04)",
                border: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={post.img || "https://via.placeholder.com/400x220"}
                alt={post.title}
                style={{ width: "100%", height: "220px", objectFit: "cover" }}
              />
              <div style={{ padding: "25px", flexGrow: 1 }}>

                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: "10px 0",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    height: "60px",
                    overflow: "hidden",
                  }}
                >
                  {post.desc}
                </p>
                <div
                  style={{ display: "flex", gap: "12px", marginTop: "20px" }}
                >
                  <button
                    onClick={() => openEditModal(post)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: "#fee2e2",
                      color: "#ef4444",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Ma'lumot topilmadi...
          </p>
        )}
      </div>

      {isEditModalOpen && editingPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "24px",
              width: "500px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Maqolani tahrirlash</h2>
            <form
              onSubmit={handleUpdate}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Sarlavha
              </label>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, title: e.target.value })
                }
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
                required
              />

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Kategoriya
              </label>
              <select
                value={editingPost.category}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, category: e.target.value })
                }
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "white",
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Qisqa tavsif
              </label>
              <textarea
                value={editingPost.desc}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, desc: e.target.value })
                }
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  height: "80px",
                }}
                required
              />

              <label style={{ fontSize: "14px", fontWeight: "600" }}>
                Rasm manzili (URL)
              </label>
              <input
                type="text"
                value={editingPost.img}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, img: e.target.value })
                }
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#6366f1",
                    color: "white",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    backgroundColor: "#eee",
                    borderRadius: "10px",
                    border: "none",
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

      <style jsx>{`
        .post-card {
          transition: 0.3s;
        }
        .post-card:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </div>
  );
}
