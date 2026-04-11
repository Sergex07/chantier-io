import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chantier.io",
  description: "Plateforme de gestion pour professionnels du bâtiment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Toaster position="top-right" richColors />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
