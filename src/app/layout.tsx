import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Lara Cristina | Nail Designer — Villiers-sur-Marne 94350",
  description: "Lara Cristina — Nail Designer. Manucure, semi-permanent, blindagem, alongamento, banho de gel e nail art. 05 Route de Combault, Villiers-sur-Marne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth select-none bg-brand-ivory">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-full flex flex-col bg-brand-ivory text-brand-black lg:custom-cursor-none`}>
        <SmoothScroll>
          <CustomCursor />
          {children}
          <Toaster
            position="bottom-right"
            theme="light"
            richColors
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '0.5px solid rgba(201, 166, 107, 0.2)',
                color: '#0B0B0B',
                fontFamily: 'var(--font-sans)',
                borderRadius: '1.5rem',
              }
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
