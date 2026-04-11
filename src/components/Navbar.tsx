"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HouseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  </svg>
);

const NAV_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[300] h-20 flex items-center justify-between px-10 transition-all duration-300 ${
        s ? "bg-white/97 shadow-[0_1px_0_#DDDDDD]" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-8 h-8 bg-[#4A5568] rounded-lg flex items-center justify-center shrink-0">
          <HouseIcon className="w-4 h-4" />
        </div>
        <span
          className={`font-extrabold text-[1.1rem] tracking-[-0.03em] transition-colors duration-300 ${
            s ? "text-[#18170F]" : "text-white"
          }`}
        >
          Chantier.io
        </span>
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-1 list-none">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`text-sm font-medium px-[14px] py-[7px] rounded-lg transition-all whitespace-nowrap ${
                s
                  ? "text-[#6B6860] hover:text-[#18170F] hover:bg-[#F7F7F7]"
                  : "text-white/85 hover:text-white hover:bg-white/12"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center gap-2">
        <Link
          href="/connexion"
          className={`text-sm font-semibold px-[14px] py-2 rounded-[22px] transition-all ${
            s
              ? "text-[#18170F] hover:bg-[#F7F7F7]"
              : "text-white hover:bg-white/15"
          }`}
        >
          Connexion
        </Link>
        <Link
          href="/inscription"
          className={`text-sm font-semibold px-[18px] py-[9px] rounded-[22px] transition-shadow ${
            s
              ? "bg-[#18170F] text-white hover:shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
              : "bg-white text-[#18170F] hover:shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
          }`}
        >
          Inscription
        </Link>
      </div>
    </header>
  );
}
