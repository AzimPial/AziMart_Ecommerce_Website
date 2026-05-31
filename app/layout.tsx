import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WishlistDrawer } from "@/components/layout/WishlistDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AziMart - Move Forward",
    template: "%s | AziMart",
  },
  description: "Premium footwear and apparel. Move Forward with AziMart.",
  keywords: ["shoes", "footwear", "sneakers", "apparel", "fashion", "AziMart"],
  authors: [{ name: "AziMart" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://azimart.com",
    siteName: "AziMart",
    title: "AziMart - Move Forward",
    description: "Premium footwear and apparel. Move Forward with AziMart.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AziMart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AziMart - Move Forward",
    description: "Premium footwear and apparel. Move Forward with AziMart.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <MobileMenu />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}