import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RBXPass — Активация кодов для Roblox и других игр",
  description: "Активируйте коды для получения Robux, V-Bucks и других игровых валют. Быстро, безопасно, с гарантией.",
  keywords: ["RBXPass", "Robux", "коды активации", "Roblox", "Fortnite", "PUBG", "игровая валюта", "геймпасс"],
  openGraph: {
    title: "RBXPass — Активация игровых кодов",
    description: "Активируйте коды для получения Robux и других игровых валют. Быстро и безопасно.",
    url: "https://rbxpass.ru",
    siteName: "RBXPass",
    locale: "ru_RU",
    type: "website",
  },
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
