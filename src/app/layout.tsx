import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-var",
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "DemoSeed — Realistic demo data for SaaS",
  description:
    "Generate locale-aware, narrative-driven fake data for your SaaS demo environments in seconds.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1C2130",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#F0EDE8",
              fontSize: "13px",
              borderRadius: "10px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            },
          }}
          theme="dark"
        />
      </body>
    </html>
  );
}
