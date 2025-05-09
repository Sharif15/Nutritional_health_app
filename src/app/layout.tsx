import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar"
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutrition App",
  description: "EAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}

      <footer className="bg-white shadow-inner p-4 mt-6">
        {<Navbar />}
        
      </footer>
      </body>
    </html>
  );
}
