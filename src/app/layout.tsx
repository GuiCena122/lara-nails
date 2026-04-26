import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Lara Nails | Studio de Beauté d'Exception",
  description: "L'élégance du nail art et le soin de la manucure russe au cœur de Paris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className={`${dmSans.variable} ${cormorant.variable} font-sans min-h-full flex flex-col bg-[#FDFBF9] text-[#1a1a1a]`}>
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
