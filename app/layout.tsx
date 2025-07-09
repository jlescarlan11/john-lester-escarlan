import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./_components/ToastContext";
import ToastContainer from "./_components/ToastContainer";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "John Lester Escarlan - Software Developer Portfolio",
  description:
    "Full-stack software developer specializing in React, TypeScript, and modern web technologies. View my projects, experience, and get in touch.",
  keywords: [
    "software developer",
    "full-stack",
    "React",
    "TypeScript",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "John Lester Escarlan" }],
  creator: "John Lester Escarlan",
  openGraph: {
    title: "John Lester Escarlan - Software Developer Portfolio",
    description:
      "Full-stack software developer specializing in React, TypeScript, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Lester Escarlan - Software Developer Portfolio",
    description:
      "Full-stack software developer specializing in React, TypeScript, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-base-100 text-base-content`}
      >
        <AuthProvider>
          <ToastProvider>
            <main className="min-h-dvh container max-w-7xl mx-auto py-4 lg:py-8 px-0 sm:px-4">
              {children}
            </main>
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
