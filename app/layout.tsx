import { Inter, JetBrains_Mono, Keania_One, Geist } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Header } from "./components/header";

import { cn } from "@/lib/utils";
import { Particles } from "@/components/ui/particles";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const keaniaOne = Keania_One({
  variable: "--font-keania",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        inter.variable,
        jetbrainsMono.variable,
        keaniaOne.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className={`bg-[#07111f] text-gray-100 antialiased min-h-screen`}>
        {/* BackGround de Particulas */}
        <Particles
          className="pointer-events-none"
          quantity={150}
          staticity={30}
          color="#49BEB0"
        />
        {/* Site em si */}
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
