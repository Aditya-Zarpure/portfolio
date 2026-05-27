import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageLoader from "@/components/ui/PageLoader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Aditya Zarpure \u2014 Freelance Web Developer",
  description: "Full-stack web developer specialising in React, Next.js, and building premium digital experiences for ambitious brands.",
};

export const viewport = {
  themeColor: "#0C0C0C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased flex flex-col min-h-screen overflow-x-hidden">
        <PageLoader />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[10001] bg-[var(--surface)] border border-[var(--border)] px-4 py-2 text-[var(--text-primary)] rounded">
          Skip to content
        </a>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content" role="main" className="flex-grow pt-[72px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
