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
    <html lang="fr" className="antialiased">
      <body className={inter.className}>
        <Toaster position="top-right" richColors />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
