"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Courriel ou mot de passe invalide.");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-2xl font-bold tracking-tight text-black">
            Chantier<span className="text-gray-400">.io</span>
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-black mb-1">Connexion</h1>
        <p className="text-sm text-gray-500 mb-8">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="text-black underline underline-offset-2">
            S&apos;inscrire
          </Link>
        </p>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 px-4 py-2.5 text-sm font-medium text-black hover:border-gray-400 transition-colors disabled:opacity-50 mb-6"
        >
          <GoogleIcon />
          {googleLoading ? "Redirection..." : "Continuer avec Google"}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Courriel
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Mot de passe
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-xs text-gray-400 hover:text-black transition-colors"
              >
                Oublié ?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-medium py-2.5 hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
