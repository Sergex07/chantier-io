"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  {
    id: "professionnel",
    label: "Professionnel",
    price: "10$/mois",
    description: "Pour les indépendants et freelances",
  },
  {
    id: "entreprise",
    label: "Entreprise",
    price: "25$/mois",
    description: "Pour les équipes et PME",
  },
  {
    id: "detaillant",
    label: "Détaillant",
    price: "29$/mois",
    description: "Pour les commerces de détail",
  },
];

export default function InscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlan) {
      setError("Veuillez choisir un type de compte.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { plan: selectedPlan },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/connexion?registered=1";
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-2xl font-bold tracking-tight text-black">
            Chantier<span className="text-gray-400">.io</span>
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-black mb-1">
          Créer un compte
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="text-black underline underline-offset-2">
            Se connecter
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan selector */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Type de compte
            </p>
            <div className="grid grid-cols-1 gap-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex items-center justify-between px-4 py-3 border text-left transition-colors ${
                    selectedPlan === plan.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-black hover:border-gray-400"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm">{plan.label}</p>
                    <p
                      className={`text-xs mt-0.5 ${
                        selectedPlan === plan.id ? "text-gray-300" : "text-gray-400"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold ml-4 shrink-0">
                    {plan.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors"
              placeholder="8 caractères minimum"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-medium py-2.5 hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>
      </div>
    </div>
  );
}
