import Image from "next/image";
import frame1 from "../image/Frame1.png";
import frame4 from "../image/Frame4.png";
import frame2 from "../image/frame2.jpg";
import joylashuv from "../image/joylashuv.png"

export default function ContactUz() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", padding: "50px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>Get in Touch</h1>
        <p style={{ color: "#999999", fontSize: "18px", lineHeight: "1.5" }}>
          Contact us to publish your content and show ads on our <br />
          website and get a good reach.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "300px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={frame2} alt="Office" width={100} height={100} />
          <h2
            style={{
              color: "blue",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "15px 0 5px",
            }}
          >
            Office
          </h2>
          <p style={{ textAlign: "center", color: "#7A7A7A" }}>
            Tashkent, Buxoro, Qorako‘l
          </p>
        </div>

        <div
          style={{
            width: "300px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={frame1} alt="Email" width={100} height={100} />
          <h2
            style={{
              color: "blue",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "15px 0 5px",
            }}
          >
            Email
          </h2>
          <a
            href="mailto:ruziqulovfoziljon8@gmail.com"
            style={{ textAlign: "center", color: "#7A7A7A" }}
          >
            ruziqulovfoziljon8@gmail.com
          </a>
        </div>

        <div
          style={{
            width: "300px",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={frame4} alt="Phone" width={100} height={100} />
          <h2
            style={{
              color: "blue",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "15px 0 5px",
            }}
          >
            Phone
          </h2>
          <a
            href="tel:+99894-817-05-20"
            style={{ textAlign: "center", color: "#7A7A7A" }}
          >
            +998 94 817 05 20
          </a>
        </div>
      </div>

      <div
        style={{
          fontFamily: "sans-serif",
          backgroundColor: "#f9f9f9",
          paddingBottom: "100px",
        }}
      >
        {/* Xarita qismi (Orqa fon) */}
        <div
          style={{
            width: "100%",
            height: "400px",
            overflow: "hidden",
            position: "relative",
            marginTop:'100px'
          }}
        >
          <img
            src={joylashuv.src}
            alt="Map"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Oq Forma qismi (Xarita ustiga chiqib turadi) */}
        <div
          style={{
            width: "800px",
            padding: "60px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)", // Qalinroq soya
            margin: "0 auto",
            position: "relative",
            marginTop: "-150px", // Formani xarita ustiga chiqarish uchun manfiy margin
            zIndex: "10",
            boxSizing: "border-box",
          }}
        >
          {/* 1-QATOR: Name va Email */}
          <div style={{ display: "flex", gap: "30px", marginBottom: "25px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Name
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Email
              </label>
              <input
                type="email"
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* 2-QATOR: Phone va Subject */}
          <div style={{ display: "flex", gap: "30px", marginBottom: "25px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Phone
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Subject
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Message qismi */}
          <div style={{ marginBottom: "40px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Message
            </label>
            <textarea
              style={{
                width: "100%",
                height: "180px",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            ></textarea>
          </div>

          {/* Tugma */}
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "#7e57e2",
                color: "white",
                padding: "14px 45px",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
