import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import Header from "@/components/layouts/Header";
import Tabsbar from "@/components/common/Tabsbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FoMoney SonicX - Line Mini App",
  description: "FoMoney PWA application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen w-full justify-center bg-homepage-bg bg-cover bg-center bg-no-repeat antialiased`}
      >
        <Toaster />
        <div className="w-full max-w-[450px] overflow-hidden rounded-lg border-purple-600 md:border touch-none overscroll-contain">
          <AppProvider>
            <Header />
            <Tabsbar />
            {children}
            <Footer />
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
