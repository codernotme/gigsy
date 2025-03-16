import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gigsy",
  description: "Empowering students through freelancing and collaboration opportunities on campus",
  keywords: "freelancing, student jobs, campus gigs, student freelancers, college projects, student marketplace, skill exchange, campus collaboration, student services",
  authors: [{ name: "Aryan", url: "https://github.com/codernotme" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gigsy.codernotme.me",
    title: "Gigsy",
    description: "Empowering students through freelancing and collaboration opportunities on campus",
    siteName: "Gigsy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gigsy - Campus Freelancing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigsy",
    description: "Empowering students through freelancing and collaboration opportunities on campus",
    images: ["/twitter-image.jpg"],
    creator: "@gigsy",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen pt-16`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}