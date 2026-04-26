import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Lara Nails Pro | Douceur & Beauté",
  description: "Salon de manucure premium : soins délicats et nail art artistique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-full flex flex-col`}>
        {children}
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}
