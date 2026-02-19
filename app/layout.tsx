import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using a modern font
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from 'sonner';
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PreFlight | Deployment Copilot",
  description: "Automated Production Readiness Reviews",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <SessionWrapper>
          <div className="relative flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16" />}> 
          <Header />
        </Suspense>
            <main className="flex-1">{children}
              <Toaster richColors theme="dark" position="top-right" />
            </main>
            <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}