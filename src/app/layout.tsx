import Navbar from "@/components/Layout/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "@/lib/auth/AuthContext";
import Footer from "@/components/Layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Pierre.V Photographie",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`min-h-screen bg-background ${GeistSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContext>
            <div className="relative flex min-h-screen flex-col">
              <NextTopLoader />
              <Navbar />
              {children}
              <Toaster />
              <Footer />
            </div>
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}

/*

faire un layout pour les pages pour que ca soit niquel?
<html lang="fr" suppressHydrationWarning>
 <body className={inter.className}> 
<body className={`min-h-screen bg-background ${inter.className}`}>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthContext>
      <div className="relative flex min-h-screen flex-col">
        <NextTopLoader />
        <Navbar />
        <div className="flex 1">{children}</div>
        <Toaster />
        <Footer />
      </div>
    </AuthContext>
  </ThemeProvider>
</body>
</html> */
