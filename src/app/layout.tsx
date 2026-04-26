import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300","400","500","600"] });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["300","400","500","600","700"],
  style: ["normal","italic"]
});

export const metadata: Metadata = {
  title: "Lara Nails — Studio de Beauté d'Exception",
  description: "Manucure russe, nail art autoral et soins d'exception dans un cadre luxueux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans min-h-full flex flex-col`}>
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
