import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LootHub - Универсальный магазин цифровых кодов",
  description: "Активация кодов для Roblox, Fortnite, PlayStation Plus, Xbox Game Pass, Steam и других игр",
  keywords: ["LootHub", "коды активации", "Roblox", "Fortnite", "PS Plus", "Xbox", "Steam", "цифровые товары"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
