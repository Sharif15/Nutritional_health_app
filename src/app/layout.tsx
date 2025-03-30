import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar"
import "./globals.css";

export const metadata: Metadata = {
  title: "Blaster Hack 2025",
  description: "Generated for blaster Hack 2025",
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
        <div className="text-center text-sm text-gray-500">Dashboard links go here</div>
      </footer>
      </body>
    </html>
  );
}
