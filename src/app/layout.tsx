import Navbar from "@/components/Layout/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "@/lib/auth/AuthContext";
import Footer from "@/components/Layout/Footer/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pierre.V Photographie",
  description:
    "Découvrez les photographies de Pierre V. Parcourez sa collection d'images captivantes et explorez son travail. Site officiel de Pierre.V Photographie.",
  // openGraph: {
  //   title: "Pierre.V",
  //   description:
  //     "Découvrez les photographies de Pierre V. Parcourez sa collection d'images captivantes et explorez son travail. Site officiel de Pierre.V.",
  //   url: "http://localhost:3000",
  //   siteName: "Pierre.V",
  //   images: [
  //     {
  //       url: "/assets/opengraph-image.png",
  //       width: 1260,
  //       height: 800,
  //     },
  //   ],
  //   locale: "fr-FR",
  //   type: "website",
  // },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo blanc.png" sizes="36x36" />
        <Script
          strategy="afterInteractive"
          src={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
        />
        <Script
          strategy="afterInteractive"
          id="google-analytics"
        >{`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');`}</Script>

        <script></script>
      </head>
      <body className={`min-h-screen bg-background ${GeistSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthContext>
            <div className="relative flex min-h-screen flex-col">
              <NextTopLoader showSpinner={false} />
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
