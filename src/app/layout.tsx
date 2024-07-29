import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini RAG Chatbot for CBT",
  description: "Gemini RAG Chatbot for CBT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* header & footer will be added later */}
        <main>{children}</main>
      </body>
    </html>
  );
}
