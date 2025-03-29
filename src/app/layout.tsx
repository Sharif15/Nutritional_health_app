import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
