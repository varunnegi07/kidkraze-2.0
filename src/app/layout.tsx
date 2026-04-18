import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7c3aed',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kidkraze-2-0.vercel.app'),
  title: {
    default: "KidKraze - Kids Stationery, Toys, Gifts & School Supplies Online",
    template: "%s | KidKraze"
  },
  description: "Shop the best stationery, toys, gifts, and school supplies for kids. Free shipping, COD available, and fast delivery. Best prices on fancy diaries, pouches, keychains, and more.",
  keywords: ["kids stationery", "school supplies", "toys online", "gift sets", "fancy diaries", "keychains", "pouches", "kids gifts", "stationery shop"],
  authors: [{ name: "KidKraze" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kidkraze-2-0.vercel.app",
    siteName: "KidKraze",
    title: "KidKraze - Kids Stationery, Toys, Gifts & School Supplies",
    description: "Shop the best stationery, toys, gifts, and school supplies for kids.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "KidKraze - Kids Stationery, Toys, Gifts",
    description: "Shop the best stationery, toys, gifts, and school supplies for kids."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
