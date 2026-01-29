import { Geist, Geist_Mono } from "next/font/google";
import BubbleBackground from "@/components/Background/BubbleBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LazaarWorks - Votre projet web commence ici",
  description: "Créez un cahier des charges complet pour votre futur site web avec LazaarWorks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BubbleBackground />
        {children}
      </body>
    </html>
  );
}
