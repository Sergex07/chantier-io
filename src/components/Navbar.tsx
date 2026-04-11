"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
              fill="#F97316"
              stroke="#F97316"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-base font-bold tracking-tight text-black">
            Chantier<span className="text-gray-400">.io</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/a-propos"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/comment-ca-marche"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Comment ça marche
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/inscription"
            className="text-sm font-medium bg-black text-white px-4 py-2 hover:bg-gray-900 transition-colors"
          >
            Inscription
          </Link>
        </div>
      </div>
    </header>
  );
}
