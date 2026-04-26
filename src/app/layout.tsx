import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["300","400","500","600","700","800","900"],
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
      <body className={`${dmSans.variable} font-sans min-h-full flex flex-col bg-[#0D0D0D]`}>
        {children}
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
