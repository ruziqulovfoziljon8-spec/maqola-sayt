import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        width: "90%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 0,
          width: "100%",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 50 C150 150 350 0 500 80 S750 150 800 50"
            fill="transparent"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M0 70 C150 170 350 20 500 100 S750 170 800 70"
            fill="transparent"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M0 90 C150 190 350 40 500 120 S750 190 800 90"
            fill="transparent"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div
        style={{
          width: "820px",
          height: "480px",
          backgroundColor: "#7C4EE4",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRadius: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "180px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          404
        </h1>
        <p style={{ color: "white" }}> Sorry!</p>
        <p style={{ color: "white", marginBottom: "20px" }}>
          The link is broken, try to refresh or go to home
        </p>
        <Link href="/blog">
          <button
            style={{
              width: "200px",
              height: "60px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#FAFAFA",
            }}
          >
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
}
