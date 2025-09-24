import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Budget App",
  description: "Track your accounts and expenses, offline-first.",
  manifest: "/manifest.json",
  themeColor: "#16a34a",
  icons: {
    icon: "https://images.vexels.com/media/users/3/196662/isolated/preview/cfaa8a7b6e16d1b50914720bee0002d5-linda-vista-lateral-de-dino.png",
    apple: "https://images.vexels.com/media/users/3/196662/isolated/preview/cfaa8a7b6e16d1b50914720bee0002d5-linda-vista-lateral-de-dino.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
