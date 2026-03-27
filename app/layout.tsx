import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GHVC Infotech — Motion-first digital marketing",
  description:
    "Dark, scroll-driven digital marketing studio experience — paid media, SEO, content, and lifecycle marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0e0e0e] text-[#f5f5f5]">
        <SmoothScrollProvider>
          <Header />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
