import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata: Metadata = {
  title: "Rooh-e-Mahboob — Artisanal Pure Attars & Luxury Perfumery",
  description:
    "Crafting the finest artisanal fragrances since generations. Explore our curated collection of pure attars, oud essences, and luxury perfume oils from Rooh-e-Mahboob. Free shipping on orders above ₹999.",
  icons: {
    icon: "/brand-logo.jpg",
    shortcut: "/brand-logo.jpg",
    apple: "/brand-logo.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#131921",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
