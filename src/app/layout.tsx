import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#18181B",
              border: "1px solid #3F3F46",
              color: "#FAFAFA",
              fontSize: "13px",
            },
          }}
          theme="dark"
        />
      </body>
    </html>
  );
}
