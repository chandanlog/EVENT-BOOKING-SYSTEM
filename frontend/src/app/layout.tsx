"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CssBaseline } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  // Hide header and footer ONLY on the dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {!isDashboard && <Header />}  {/* Hide header on dashboard */}
        <main>{children}</main>
        {!isDashboard && <Footer />}  {/* Hide footer on dashboard */}
      </body>
    </html>
  );
}
