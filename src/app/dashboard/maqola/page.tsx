"use client";

import { useEffect, useState, type FormEvent } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  desc: string;
  text: string;
  img: string;
}

export default function Maqola() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Hammasi");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [newPost, setNewPost] = useState({
    title: "",
    desc: "",
    text: "",
    img: "",
  });

  const categories = ["Hammasi", "Halollik", "Oila", "Sport", "Texnologiya"];

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, "id">),
      })) as Post[];
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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "Hammasi" ||
      post.title.toLowerCase().includes(activeTab.toLowerCase());
    return matchesSearch && matchesTab;
  });

  const handleAddPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...newPost,
        createdAt: new Date().toISOString(),
      });
      setPosts([{ id: docRef.id, ...newPost }, ...posts]);
      setIsAddModalOpen(false);
      setNewPost({ title: "", desc: "", text: "", img: "" });
    } catch (error) {
      alert("Xatolik yuz berdi!");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Ushbu maqolani o'chirmoqchimisiz?")) {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPost) return;
    try {
      await updateDoc(doc(db, "posts", editingPost.id), {
        title: editingPost.title,
        desc: editingPost.desc,
        text: editingPost.text,
        img: editingPost.img,
      });
      setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)));
      setIsEditModalOpen(false);
    } catch (error) {
      alert("Xatolik!");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="category-btn"
              style={{
                padding: "10px 22px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                backgroundColor: activeTab === cat ? "#4f46e5" : "#f1f5f9",
                color: activeTab === cat ? "#fff" : "#64748b",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            type="text"
            placeholder="Sarlavhadan qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              width: "280px",
              outline: "none",
              transition: "border 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="add-btn"
            style={{
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            + Qo'shish
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {loading ? (
          <div
            style={{
              textAlign: "center",
              gridColumn: "1/-1",
              padding: "50px",
              color: "#64748b",
            }}
          >
            Yuklanmoqda...
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              style={{
                border: "none",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ overflow: "hidden", height: "220px" }}>
                <img
                  src={post.img || "https://via.placeholder.com/400x200"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s",
                  }}
                  className="card-img"
                />
              </div>
              <div style={{ padding: "24px", flexGrow: 1 }}>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "20px",
                    color: "#1e293b",
                    fontWeight: "700",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                  }}
                >
                  {post.desc}
                </p>
                <div
                  style={{ marginTop: "auto", display: "flex", gap: "12px" }}
                >
                  <button
                    onClick={() => openEditModal(post)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#3b82f6",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "opacity 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Tahrir
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#fee2e2",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "background 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fecaca")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fee2e2")
                    }
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ animation: "slideUp 0.4s ease-out" }}
          >
            <h3
              style={{
                marginBottom: "20px",
                fontSize: "24px",
                color: "#1e293b",
              }}
            >
              {isAddModalOpen ? "Yangi Maqola" : "Tahrirlash"}
            </h3>
            <form
              onSubmit={isAddModalOpen ? handleAddPost : handleUpdate}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <input
                type="text"
                placeholder="Rasm URL"
                value={isAddModalOpen ? newPost.img : editingPost?.img}
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewPost({ ...newPost, img: e.target.value })
                    : setEditingPost({ ...editingPost!, img: e.target.value })
                }
                required
                className="input-style"
              />
              <input
                type="text"
                placeholder="Sarlavha (Title)"
                value={isAddModalOpen ? newPost.title : editingPost?.title}
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewPost({ ...newPost, title: e.target.value })
                    : setEditingPost({ ...editingPost!, title: e.target.value })
                }
                required
                className="input-style"
              />
              <input
                type="text"
                placeholder="Qisqa tavsif (Desc)"
                value={isAddModalOpen ? newPost.desc : editingPost?.desc}
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewPost({ ...newPost, desc: e.target.value })
                    : setEditingPost({ ...editingPost!, desc: e.target.value })
                }
                required
                className="input-style"
              />
              <textarea
                placeholder="To'liq matn (Text)"
                value={isAddModalOpen ? newPost.text : editingPost?.text}
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewPost({ ...newPost, text: e.target.value })
                    : setEditingPost({ ...editingPost!, text: e.target.value })
                }
                required
                className="input-style"
                style={{ height: "120px", resize: "none" }}
              />
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "none",
                    backgroundColor: isAddModalOpen ? "#10b981" : "#3b82f6",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.98)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {isAddModalOpen ? "Saqlash" : "Yangilash"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "14px",
                    border: "none",
                    backgroundColor: "#f1f5f9",
                    color: "#64748b",
                    borderRadius: "12px",
                    fontWeight: "600",
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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 40px;
          border-radius: 28px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .input-style {
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          font-size: 15px;
          transition: all 0.3s;
        }
        .input-style:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }
        .post-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .post-card:hover .card-img {
          transform: scale(1.08);
        }
        .category-btn:hover {
          background-color: #e2e8f0;
          transform: translateY(-2px);
        }
        .add-btn:hover {
          background-color: #059669;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
