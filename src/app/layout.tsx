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
        <main className="flex-1 pt-16">{children}</main>
        <footer className="border-t border-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <span className="text-sm font-bold tracking-tight text-black">
              Chantier<span className="text-gray-400">.io</span>
            </span>
            <p className="text-xs text-gray-400">
              © 2025 Chantier.io. Tous droits réservés.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
