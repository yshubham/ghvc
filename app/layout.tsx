import { CursorProvider } from "@/components/providers/CursorProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GHVC Infotech — Digital marketing agency",
  description:
    "Full-funnel digital marketing: paid media, SEO, content, social, and creative—GHVC Infotech helps brands grow with clear strategy and reporting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg-deep)] text-zinc-50">
        <div className="noise-overlay" aria-hidden />
        <SmoothScrollProvider>
          <CursorProvider>
            <Navigation />
            {children}
          </CursorProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
