"use client";

import { useState } from "react";

const SPECIALITES = [
  "Tous",
  "Électricité",
  "Plomberie",
  "Charpenterie",
  "Toiture",
  "Excavation",
  "Peinture",
  "CVAC",
];

const DEMANDES = [
  {
    id: 1,
    titre: "Réfection toiture commerciale",
    specialite: "Toiture",
    region: "Montréal",
    budget: "15 000 – 25 000 $",
    date_debut: "2025-05-01",
    soumissions: 3,
  },
  {
    id: 2,
    titre: "Installation système électrique entrepôt",
    specialite: "Électricité",
    region: "Laval",
    budget: "8 000 – 12 000 $",
    date_debut: "2025-04-20",
    soumissions: 5,
  },
  {
    id: 3,
    titre: "Plomberie résidentielle — rénovation complète",
    specialite: "Plomberie",
    region: "Québec",
    budget: "5 000 – 9 000 $",
    date_debut: "2025-04-28",
    soumissions: 2,
  },
  {
    id: 4,
    titre: "Construction ossature bois — chalet",
    specialite: "Charpenterie",
    region: "Laurentides",
    budget: "40 000 – 60 000 $",
    date_debut: "2025-06-01",
    soumissions: 1,
  },
  {
    id: 5,
    titre: "Excavation et terrassement — terrain résidentiel",
    specialite: "Excavation",
    region: "Longueuil",
    budget: "10 000 – 18 000 $",
    date_debut: "2025-05-10",
    soumissions: 4,
  },
  {
    id: 6,
    titre: "Peinture intérieure immeuble 12 logements",
    specialite: "Peinture",
    region: "Montréal",
    budget: "12 000 – 20 000 $",
    date_debut: "2025-05-15",
    soumissions: 6,
  },
];

export default function DemandesTable() {
  const [filtre, setFiltre] = useState("Tous");

  const filtrees =
    filtre === "Tous"
      ? DEMANDES
      : DEMANDES.filter((d) => d.specialite === filtre);

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SPECIALITES.map((s) => (
          <button
            key={s}
            onClick={() => setFiltre(s)}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
              filtre === s
                ? "bg-[#4A5568] text-white border-[#4A5568]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#4A5568] hover:text-[#4A5568]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Titre
              </th>
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">
                Spécialité
              </th>
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">
                Région
              </th>
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Budget
              </th>
              <th className="text-left py-3 pr-4 font-medium text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">
                Début
              </th>
              <th className="text-left py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Soumissions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtrees.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-3 pr-4">
                  <span className="font-medium text-black group-hover:text-[#4A5568] transition-colors cursor-pointer">
                    {d.titre}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-500 hidden md:table-cell">
                  {d.specialite}
                </td>
                <td className="py-3 pr-4 text-gray-500 hidden md:table-cell">
                  {d.region}
                </td>
                <td className="py-3 pr-4 text-gray-700 font-medium">{d.budget}</td>
                <td className="py-3 pr-4 text-gray-500 hidden lg:table-cell">
                  {new Date(d.date_debut).toLocaleDateString("fr-CA", {
                    day: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                    {d.soumissions}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtrees.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-10">
          Aucune demande pour cette spécialité.
        </p>
      )}
    </div>
  );
}
