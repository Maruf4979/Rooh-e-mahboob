"use client";
import { Suspense } from "react";

import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import AuthProvider from "./AuthProvider";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";

  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Suspense fallback={<div className="site-header" style={{ height: '110px' }} />}>
            {!isAuthPage && <Header />}
          </Suspense>
          <CartDrawer />
          <main style={{ flex: 1 }}>{children}</main>
          {!isAuthPage && <Footer />}
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
