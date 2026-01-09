import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATP",
  description: "أفضل جيم في دمنهور",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="scrollbar-thumb-yellow/70 scrollbar-track-transparent scrollbar-thin **:scrollbar-thin scroll-smooth"
    >
      <body
        className={`${readexPro.variable} font-readex-pro overflow-x-hidden bg-black text-white antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
