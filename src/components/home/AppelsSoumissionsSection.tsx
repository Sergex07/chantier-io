"use client";

import { useState } from "react";
import Link from "next/link";

type Badge = "urgent" | "nouveau" | "actif";

interface ModalData {
  tag: string;
  badge: Badge;
  title: string;
  gc: string;
  budget: string;
  date: string;
  region: string;
  offres: string;
  desc: string;
  reqs: string[];
  files: { name: string; size: string }[];
}

interface Row {
  cat: string;
  region: string;
  icon: React.ReactNode;
  name: string;
  gc: string;
  badge: Badge;
  date: string;
  sector: string;
  offres: string;
  offresZero?: boolean;
  modal: ModalData;
}

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "elec", label: "Électricité" },
  { key: "plomb", label: "Plomberie" },
  { key: "charp", label: "Charpenterie" },
  { key: "toit", label: "Toiture" },
  { key: "hvac", label: "HVAC" },
  { key: "peinture", label: "Peinture" },
  { key: "fond", label: "Fondation" },
  { key: "fen", label: "Porte et Fenêtre" },
  { key: "cer", label: "Céramique" },
  { key: "mac", label: "Maçonnerie" },
  { key: "esc", label: "Escalier" },
  { key: "vit", label: "Vitrier" },
  { key: "sab", label: "Sablage" },
  { key: "dem", label: "Démolition" },
  { key: "exc", label: "Excavation" },
  { key: "rev", label: "Revêtement extérieur" },
  { key: "iso", label: "Isolation" },
  { key: "gip", label: "Gypse & Plâtre" },
];

// SVG icons
const IconElec = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconToit = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconBeton = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>;
const IconHvac = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>;
const IconCharp = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>;
const IconPlomb = () => <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M12 2a9.96 9.96 0 016.29 2.226A9.963 9.963 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.76 1.116-5.26 2.924-7.087"/><path d="M12 6v6l4 2"/></svg>;

const ROWS: Row[] = [
  { cat: "elec", region: "rive-nord", icon: <IconElec />, name: "Électricité commerciale — Phase 2", gc: "GC Construction Laval · Laval", badge: "urgent", date: "14 avr.", sector: "Commercial", offres: "6 offres", modal: { tag: "⚡ Électricité", badge: "urgent", title: "Électricité commerciale — Phase 2", gc: "GC Construction Laval", budget: "40 000 – 55 000 $", date: "14 avril 2025", region: "Laval", offres: "6 offres reçues", desc: "Installation électrique complète pour un bâtiment commercial de 4 étages en phase 2. Travaux incluant tableaux électriques, circuits, éclairage et système de sécurité.", reqs: ["Licence RBQ obligatoire", "Attestation CCQ requise", "Assurance responsabilité 2M$+", "Expérience bâtiment commercial 5 ans+"], files: [{ name: "Plans électriques - Phase 2.pdf", size: "4.2 MB" }, { name: "Devis technique.pdf", size: "1.8 MB" }] } },
  { cat: "toit", region: "montreal", icon: <IconToit />, name: "Toiture membrane — Bâtiment commercial", gc: "Immeubles Beaumont · Montréal", badge: "nouveau", date: "30 avr.", sector: "Commercial", offres: "2 offres", modal: { tag: "🏠 Toiture", badge: "nouveau", title: "Toiture membrane — Bâtiment commercial", gc: "Immeubles Beaumont", budget: "80 000 $+", date: "30 avril 2025", region: "Montréal", offres: "2 offres reçues", desc: "Remplacement complet de la toiture membrane d'un bâtiment commercial de 12 000 pc.", reqs: ["Expérience toiture commerciale", "Licence RBQ", "Garantie 10 ans minimum"], files: [{ name: "Plan de toiture.pdf", size: "2.9 MB" }] } },
  { cat: "beton", region: "rive-sud", icon: <IconBeton />, name: "Dalle de béton — Entrepôt 8 000 pc", gc: "Groupe Industriel RS · Rive-Sud", badge: "nouveau", date: "1 mai", sector: "Industriel", offres: "4 offres", modal: { tag: "🏗️ Béton", badge: "nouveau", title: "Dalle de béton — Entrepôt 8 000 pc", gc: "Groupe Industriel RS", budget: "65 000 $", date: "1 mai 2025", region: "Rive-Sud", offres: "4 offres reçues", desc: "Coulée d'une dalle de béton industriel de 8 000 pieds carrés.", reqs: ["Expérience dalle industrielle", "Certification béton"], files: [{ name: "Plan architectural.pdf", size: "6.1 MB" }] } },
  { cat: "hvac", region: "rive-nord", icon: <IconHvac />, name: "Système HVAC — Multilogement 32 unités", gc: "Développement Nordique · Laval", badge: "urgent", date: "22 avr.", sector: "Résidentiel", offres: "1 offre", modal: { tag: "❄️ HVAC", badge: "urgent", title: "Système HVAC — Multilogement 32 unités", gc: "Développement Nordique", budget: "35 000 $", date: "22 avril 2025", region: "Laval", offres: "1 offre reçue", desc: "Installation d'un système HVAC centralisé pour un immeuble multilogement de 32 unités.", reqs: ["Licence RBQ chauffage-climatisation", "Démarrage urgent"], files: [{ name: "Schéma HVAC.pdf", size: "3.4 MB" }] } },
  { cat: "charp", region: "quebec", icon: <IconCharp />, name: "Charpenterie — Structure bois 3 étages", gc: "Constructions Paradis · Québec", badge: "nouveau", date: "5 mai", sector: "Résidentiel", offres: "3 offres", modal: { tag: "🪵 Charpenterie", badge: "nouveau", title: "Charpenterie — Structure bois 3 étages", gc: "Constructions Paradis", budget: "95 000 $", date: "5 mai 2025", region: "Québec", offres: "3 offres reçues", desc: "Construction de la structure en bois d'un bâtiment résidentiel de 3 étages.", reqs: ["Expérience structure multi-étages", "Licence RBQ"], files: [{ name: "Plans structuraux.pdf", size: "8.7 MB" }] } },
  { cat: "plomb", region: "rive-sud", icon: <IconPlomb />, name: "Plomberie — Immeuble 24 unités", gc: "Les Résidences Dion · Longueuil", badge: "actif", date: "10 mai", sector: "Résidentiel", offres: "5 offres", modal: { tag: "🔧 Plomberie", badge: "actif", title: "Plomberie — Immeuble 24 unités", gc: "Les Résidences Dion", budget: "48 000 $", date: "10 mai 2025", region: "Longueuil", offres: "5 offres reçues", desc: "Plomberie complète pour un immeuble résidentiel neuf de 24 unités.", reqs: ["Licence maître-plombier", "CCQ obligatoire"], files: [{ name: "Plans plomberie.pdf", size: "5.3 MB" }] } },
  { cat: "elec", region: "rive-nord", icon: <IconElec />, name: "Électricité — Parc industriel Phase 1", gc: "Parc Industriel Rive-Nord · Rive-Nord", badge: "nouveau", date: "15 mai", sector: "Industriel", offres: "0 offre", offresZero: true, modal: { tag: "⚡ Électricité", badge: "nouveau", title: "Électricité — Parc industriel Phase 1", gc: "Parc Industriel Rive-Nord", budget: "120 000 $", date: "15 mai 2025", region: "Rive-Nord", offres: "0 offre — soyez le premier !", desc: "Première phase électrique d'un nouveau parc industriel de 6 bâtiments.", reqs: ["Licence RBQ grandes installations", "Bonding requis"], files: [{ name: "Master plan électrique.pdf", size: "11.2 MB" }] } },
  { cat: "toit", region: "rive-sud", icon: <IconToit />, name: "Peinture extérieure — 60 condos", gc: "Syndic Condo Les Érables · Brossard", badge: "actif", date: "20 mai", sector: "Résidentiel", offres: "7 offres", modal: { tag: "🎨 Peinture", badge: "actif", title: "Peinture extérieure — 60 condos", gc: "Syndic Condo Les Érables", budget: "28 000 $", date: "20 mai 2025", region: "Brossard", offres: "7 offres reçues", desc: "Peinture extérieure complète de 4 bâtiments de condominiums.", reqs: ["Expérience peinture extérieure", "Équipe min. 4 personnes"], files: [{ name: "Devis peinture.pdf", size: "760 KB" }] } },
];

const BADGE_STYLES: Record<Badge, string> = {
  urgent: "bg-[#FFF0ED] text-[#4A5568] border border-[#FDDDD0]",
  nouveau: "bg-[#EDF8FF] text-[#1A7ABF] border border-[#C8E8FF]",
  actif: "bg-[#EDFBF0] text-[#1A8A38] border border-[#BAF0C8]",
};
const BADGE_LABELS: Record<Badge, string> = { urgent: "Urgent", nouveau: "Nouveau", actif: "Actif" };

// Modal
function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[500] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] p-10 max-w-[580px] w-full relative shadow-[0_20px_60px_rgba(0,0,0,0.2)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#6B6860] hover:bg-[#F7F7F7] hover:text-[#18170F] transition-colors text-sm"
        >
          ✕
        </button>
        <span className={`inline-block text-[0.68rem] font-bold px-3 py-1 rounded-full mb-[14px] uppercase tracking-[0.05em] ${BADGE_STYLES[data.badge]}`}>
          {data.tag}
        </span>
        <div className="text-[1.3rem] font-extrabold text-[#18170F] tracking-[-0.03em] mb-[6px] leading-snug">
          {data.title}
        </div>
        <div className="text-sm text-[#6B6860] mb-6">{data.gc} · {data.region}</div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[["Budget", data.budget], ["Début des travaux", data.date], ["Région", data.region], ["Offres reçues", data.offres]].map(([label, val]) => (
            <div key={label} className="bg-[#F7F7F7] rounded-[10px] px-4 py-[14px]">
              <div className="text-[0.68rem] font-bold text-[#6B6860] uppercase tracking-[0.06em] mb-1">{label}</div>
              <div className="text-base font-bold text-[#18170F]">{val}</div>
            </div>
          ))}
        </div>

        <div className="text-[0.72rem] font-bold text-[#6B6860] uppercase tracking-[0.06em] mb-2">Description du projet</div>
        <p className="text-sm text-[#18170F] leading-[1.7] mb-4">{data.desc}</p>

        <div className="text-[0.72rem] font-bold text-[#6B6860] uppercase tracking-[0.06em] mb-2 mt-4">Exigences</div>
        <div className="flex flex-col gap-[6px] mb-5">
          {data.reqs.map((r) => (
            <div key={r} className="flex items-center gap-2 text-[0.85rem] text-[#18170F]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#4A5568] shrink-0" />
              {r}
            </div>
          ))}
        </div>

        {data.files.length > 0 && (
          <>
            <div className="text-[0.72rem] font-bold text-[#6B6860] uppercase tracking-[0.06em] mb-[10px] mt-5">Documents & plans</div>
            <div className="flex flex-col gap-2 mb-1">
              {data.files.map((f) => (
                <div key={f.name} className="flex items-center justify-between px-4 py-3 bg-[#F7F7F7] border border-[#DDDDDD] rounded-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[34px] h-[34px] rounded-lg bg-white border border-[#DDDDDD] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#18170F] fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-semibold text-[#18170F]">{f.name}</div>
                      <div className="text-[0.72rem] text-[#6B6860]">{f.size}</div>
                    </div>
                  </div>
                  <a href="#" className="flex items-center gap-1 text-[0.75rem] font-semibold text-[#18170F] px-3 py-[6px] rounded-[7px] border border-[#DDDDDD] bg-white hover:bg-[#18170F] hover:text-white hover:border-[#18170F] transition-all">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Télécharger
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-[10px] mt-7 pt-6 border-t border-[#DDDDDD]">
          <Link href="/inscription" className="flex-1 text-center bg-[#18170F] text-white text-sm font-bold py-[13px] rounded-[10px] hover:opacity-80 transition-opacity">
            Soumettre une offre
          </Link>
          <a href="#" className="flex-1 text-center border border-[#DDDDDD] text-[#18170F] text-sm font-semibold py-[13px] rounded-[10px] hover:border-[#18170F] hover:bg-[#F7F7F7] transition-all">
            Poser une question
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AppelsSoumissionsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const filtered = ROWS.filter((r) => activeFilter === "all" || r.cat === activeFilter);

  return (
    <div className="py-16 px-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div className="text-[1.5rem] font-bold text-[#18170F] tracking-[-0.03em]">
          Demandes de soumissions en cours
        </div>
        <Link href="/demandes" className="text-sm font-semibold text-[#18170F] underline underline-offset-[3px]">
          Voir toutes les demandes →
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4 max-h-[88px] overflow-hidden">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-full border text-[0.78rem] font-semibold transition-all ${
              activeFilter === f.key
                ? "bg-[#18170F] text-white border-[#18170F]"
                : "bg-white text-[#6B6860] border-[#DDDDDD] hover:border-[#18170F] hover:text-[#18170F]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#DDDDDD] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid gap-3 px-5 py-[10px] bg-[#F7F7F7] border-b border-[#DDDDDD]"
          style={{ gridTemplateColumns: "1fr 100px 110px 90px 80px 110px 32px" }}>
          {["Projet", "Statut", "Début", "Secteur", "Offres", "Action", ""].map((h, i) => (
            <div key={i} className={`text-[0.68rem] font-bold text-[#6B6860] uppercase tracking-[0.07em] ${i === 0 ? "pl-[52px]" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {filtered.map((row, i) => (
          <div
            key={i}
            className="grid gap-3 px-5 py-[14px] border-b border-[#DDDDDD] last:border-b-0 cursor-pointer hover:bg-[#F7F7F7] transition-colors items-center"
            style={{ gridTemplateColumns: "1fr 100px 110px 90px 80px 110px 32px" }}
            onClick={() => setModalData(row.modal)}
          >
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-[10px] bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center shrink-0">
                {row.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#18170F] tracking-[-0.01em] truncate">{row.name}</div>
                <div className="text-[0.75rem] text-[#6B6860] mt-[2px] truncate">{row.gc}</div>
              </div>
            </div>

            {/* Badge */}
            <span className={`text-[0.65rem] font-bold px-[9px] py-[3px] rounded-full uppercase tracking-[0.03em] justify-self-start ${BADGE_STYLES[row.badge]}`}>
              {BADGE_LABELS[row.badge]}
            </span>

            {/* Date */}
            <span className="text-[0.8rem] font-semibold text-[#18170F] text-center">{row.date}</span>

            {/* Sector */}
            <span className="text-[0.72rem] font-semibold text-[#6B6860] bg-[#F7F7F7] border border-[#DDDDDD] px-2 py-[3px] rounded-full text-center justify-self-center">
              {row.sector}
            </span>

            {/* Offres */}
            <span className={`text-[0.78rem] font-semibold text-center ${row.offresZero ? "text-[#4A5568] font-bold" : "text-[#6B6860]"}`}>
              {row.offres}
            </span>

            {/* Button */}
            <Link
              href="/inscription"
              onClick={(e) => e.stopPropagation()}
              className="text-[0.72rem] font-bold px-[10px] py-[7px] rounded-lg bg-[#4A5568] text-white hover:bg-[#364152] transition-colors text-center"
            >
              Soumettre
            </Link>

            {/* Arrow */}
            <span className="text-[1.3rem] text-[#B0B0B0] text-center justify-self-center">›</span>
          </div>
        ))}
      </div>

      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </div>
  );
}
