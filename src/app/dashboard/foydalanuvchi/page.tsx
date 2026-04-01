"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Foydalanuvchi() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "foydalanuvchilar"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Ushbu xabarni o'chirmoqchimisiz?");

    if (confirmDelete) {
      try {
        const docRef = doc(db, "foydalanuvchilar", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Admin Panel</h1>
        <p style={subtitleStyle}>Kelib tushgan murojaatlar: {data.length} ta</p>
      </div>

      {loading ? (
        <div style={statusMessage}>Bazadan ma'lumotlar yuklanmoqda...</div>
      ) : (
        <div style={gridStyle}>
          {data.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div style={cardHeader}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    minWidth: "200px", 
                  }}
                >
                  <div style={avatarStyle}>
                    {item.ism?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <h3 style={nameStyle}>{item.ism}</h3>
                    <span style={dateStyle}>
                      {item.createdAt?.toDate().toLocaleString("uz-UZ")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={deleteButtonStyle}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fee2e2")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <span style={{ color: "#ef4444" }}>🗑️</span>
                </button>
              </div>

              <div style={cardBody}>
                <div style={infoRow}>
                  <span style={labelStyle}>📧 Email:</span>
                  <span style={valueStyle}>{item.email}</span>
                </div>
                <div style={infoRow}>
                  <span style={labelStyle}>📞 Tel:</span>
                  <span style={valueStyle}>{item.phone}</span>
                </div>
                <div style={infoRow}>
                  <span style={labelStyle}>📌 Mavzu:</span>
                  <span style={subjectTag}>{item.hamkorlik}</span>
                </div>

                <div style={messageBox}>
                  <p style={messageText}>{item.xabar}</p>
                </div>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div style={emptyState}>Hozircha hech qanday xabar kelmagan.</div>
          )}
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 640px) {
          .admin-container {
            padding: 20px 15px !important;
          }
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
          .info-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2px;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
}


const containerStyle: React.CSSProperties = {
  padding: "40px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(24px, 5vw, 32px)",
  color: "#1e293b",
  fontWeight: "800",
  margin: "0 0 10px 0",
};

const subtitleStyle: React.CSSProperties = {
  color: "#64748b",
  fontSize: "14px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  border: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column",
};

const cardHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "15px",
  flexWrap: "wrap", 
  gap: "10px",
};

const avatarStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: "#7e57e2",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  flexShrink: 0,
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "1px solid #fecaca",
  borderRadius: "10px",
  width: "38px",
  height: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "0.3s",
  flexShrink: 0,
};

const nameStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "700",
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const dateStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  display: "block",
};

const cardBody: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const infoRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  gap: "10px",
  flexWrap: "wrap", 
};

const labelStyle: React.CSSProperties = {
  color: "#64748b",
  whiteSpace: "nowrap",
};

const valueStyle: React.CSSProperties = {
  color: "#334155",
  fontWeight: "600",
  wordBreak: "break-all", 
  textAlign: "right",
};

const subjectTag: React.CSSProperties = {
  backgroundColor: "#f3effd",
  color: "#7e57e2",
  padding: "4px 10px",
  borderRadius: "8px",
  fontSize: "11px",
  fontWeight: "bold",
};

const messageBox: React.CSSProperties = {
  marginTop: "5px",
  padding: "12px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #f1f5f9",
};

const messageText: React.CSSProperties = {
  fontSize: "13px",
  color: "#475569",
  margin: 0,
  lineHeight: "1.5",
  wordBreak: "break-word",
};

const statusMessage: React.CSSProperties = {
  textAlign: "center",
  padding: "50px",
  color: "#64748b",
};

const emptyState: React.CSSProperties = {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "40px 20px",
  color: "#94a3b8",
  border: "2px dashed #e2e8f0",
  borderRadius: "16px",
};
