"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isNavbarVisible =
    pathname !== "/admin" && !pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        {isNavbarVisible && <Navbar />}

        <main
          style={{
            paddingTop: isNavbarVisible ? "90px" : "0px",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
