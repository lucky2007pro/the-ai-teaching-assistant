import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Mentor LMS",
  description: "AI yordamida uy vazifalarini tekshiruvchi ta'lim boshqaruv platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
