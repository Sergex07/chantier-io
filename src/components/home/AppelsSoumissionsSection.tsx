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

const IconElec = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconToit = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconBeton = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>;
const IconHvac = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg>;
const IconCharp = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 00-3.94-1.64H9l.92.82A6.18 6.18 0 0112 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>;
const IconPlomb = () => <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><path d="M12 2a9.96 9.96 0 016.29 2.226A9.963 9.963 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.76 1.116-5.26 2.924-7.087"/><path d="M12 6v6l4 2"/></svg>;

const BADGE_COLORS: Record<Badge, { bg: string; color: string; border: string }> = {
  urgent: { bg: "#FFF0ED", color: "#4A5568", border: "#FDDDD0" },
  nouveau: { bg: "#EDF8FF", color: "#1A7ABF", border: "#C8E8FF" },
  actif: { bg: "#EDFBF0", color: "#1A8A38", border: "#BAF0C8" },
};
const BADGE_LABELS: Record<Badge, string> = { urgent: "Urgent", nouveau: "Nouveau", actif: "Actif" };

const ROWS: Row[] = [
  { cat: "elec", region: "rive-nord", icon: <IconElec />, name: "Électricité commerciale — Phase 2", gc: "GC Construction Laval · Laval", badge: "urgent", date: "14 avr.", sector: "Commercial", offres: "6 offres", modal: { tag: "⚡ Électricité", badge: "urgent", title: "Électricité commerciale — Phase 2", gc: "GC Construction Laval", budget: "40 000 – 55 000 $", date: "14 avril 2025", region: "Laval", offres: "6 offres reçues", desc: "Installation électrique complète pour un bâtiment commercial de 4 étages en phase 2.", reqs: ["Licence RBQ obligatoire", "Attestation CCQ requise", "Assurance responsabilité 2M$+", "Expérience bâtiment commercial 5 ans+"], files: [{ name: "Plans électriques - Phase 2.pdf", size: "4.2 MB" }, { name: "Devis technique.pdf", size: "1.8 MB" }] } },
  { cat: "toit", region: "montreal", icon: <IconToit />, name: "Toiture membrane — Bâtiment commercial", gc: "Immeubles Beaumont · Montréal", badge: "nouveau", date: "30 avr.", sector: "Commercial", offres: "2 offres", modal: { tag: "🏠 Toiture", badge: "nouveau", title: "Toiture membrane — Bâtiment commercial", gc: "Immeubles Beaumont", budget: "80 000 $+", date: "30 avril 2025", region: "Montréal", offres: "2 offres reçues", desc: "Remplacement complet de la toiture membrane d'un bâtiment commercial de 12 000 pc.", reqs: ["Expérience toiture commerciale", "Licence RBQ", "Garantie 10 ans minimum"], files: [{ name: "Plan de toiture.pdf", size: "2.9 MB" }] } },
  { cat: "beton", region: "rive-sud", icon: <IconBeton />, name: "Dalle de béton — Entrepôt 8 000 pc", gc: "Groupe Industriel RS · Rive-Sud", badge: "nouveau", date: "1 mai", sector: "Industriel", offres: "4 offres", modal: { tag: "🏗️ Béton", badge: "nouveau", title: "Dalle de béton — Entrepôt 8 000 pc", gc: "Groupe Industriel RS", budget: "65 000 $", date: "1 mai 2025", region: "Rive-Sud", offres: "4 offres reçues", desc: "Coulée d'une dalle de béton industriel de 8 000 pieds carrés.", reqs: ["Expérience dalle industrielle", "Certification béton"], files: [{ name: "Plan architectural.pdf", size: "6.1 MB" }] } },
  { cat: "hvac", region: "rive-nord", icon: <IconHvac />, name: "Système HVAC — Multilogement 32 unités", gc: "Développement Nordique · Laval", badge: "urgent", date: "22 avr.", sector: "Résidentiel", offres: "1 offre", modal: { tag: "❄️ HVAC", badge: "urgent", title: "Système HVAC — Multilogement 32 unités", gc: "Développement Nordique", budget: "35 000 $", date: "22 avril 2025", region: "Laval", offres: "1 offre reçue", desc: "Installation d'un système HVAC centralisé pour un immeuble multilogement de 32 unités.", reqs: ["Licence RBQ chauffage-climatisation", "Démarrage urgent"], files: [{ name: "Schéma HVAC.pdf", size: "3.4 MB" }] } },
  { cat: "charp", region: "quebec", icon: <IconCharp />, name: "Charpenterie — Structure bois 3 étages", gc: "Constructions Paradis · Québec", badge: "nouveau", date: "5 mai", sector: "Résidentiel", offres: "3 offres", modal: { tag: "🪵 Charpenterie", badge: "nouveau", title: "Charpenterie — Structure bois 3 étages", gc: "Constructions Paradis", budget: "95 000 $", date: "5 mai 2025", region: "Québec", offres: "3 offres reçues", desc: "Construction de la structure en bois d'un bâtiment résidentiel de 3 étages.", reqs: ["Expérience structure multi-étages", "Licence RBQ"], files: [{ name: "Plans structuraux.pdf", size: "8.7 MB" }] } },
  { cat: "plomb", region: "rive-sud", icon: <IconPlomb />, name: "Plomberie — Immeuble 24 unités", gc: "Les Résidences Dion · Longueuil", badge: "actif", date: "10 mai", sector: "Résidentiel", offres: "5 offres", modal: { tag: "🔧 Plomberie", badge: "actif", title: "Plomberie — Immeuble 24 unités", gc: "Les Résidences Dion", budget: "48 000 $", date: "10 mai 2025", region: "Longueuil", offres: "5 offres reçues", desc: "Plomberie complète pour un immeuble résidentiel neuf de 24 unités.", reqs: ["Licence maître-plombier", "CCQ obligatoire"], files: [{ name: "Plans plomberie.pdf", size: "5.3 MB" }] } },
  { cat: "elec", region: "rive-nord", icon: <IconElec />, name: "Électricité — Parc industriel Phase 1", gc: "Parc Industriel Rive-Nord · Rive-Nord", badge: "nouveau", date: "15 mai", sector: "Industriel", offres: "0 offre", offresZero: true, modal: { tag: "⚡ Électricité", badge: "nouveau", title: "Électricité — Parc industriel Phase 1", gc: "Parc Industriel Rive-Nord", budget: "120 000 $", date: "15 mai 2025", region: "Rive-Nord", offres: "0 offre — soyez le premier !", desc: "Première phase électrique d'un nouveau parc industriel de 6 bâtiments.", reqs: ["Licence RBQ grandes installations", "Bonding requis"], files: [{ name: "Master plan électrique.pdf", size: "11.2 MB" }] } },
  { cat: "toit", region: "rive-sud", icon: <IconToit />, name: "Peinture extérieure — 60 condos", gc: "Syndic Condo Les Érables · Brossard", badge: "actif", date: "20 mai", sector: "Résidentiel", offres: "7 offres", modal: { tag: "🎨 Peinture", badge: "actif", title: "Peinture extérieure — 60 condos", gc: "Syndic Condo Les Érables", budget: "28 000 $", date: "20 mai 2025", region: "Brossard", offres: "7 offres reçues", desc: "Peinture extérieure complète de 4 bâtiments de condominiums.", reqs: ["Expérience peinture extérieure", "Équipe min. 4 personnes"], files: [{ name: "Devis peinture.pdf", size: "760 KB" }] } },
];

function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  const bc = BADGE_COLORS[data.badge];
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "white", borderRadius: 20, padding: 40, maxWidth: 580, width: "100%", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%", border: "1px solid #DDDDDD", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", color: "#6B6860" }}
        >
          ✕
        </button>

        <span style={{ display: "inline-block", fontSize: "0.68rem", fontWeight: 700, padding: "4px 12px", borderRadius: 999, marginBottom: 14, textTransform: "uppercase" as const, letterSpacing: "0.05em", background: bc.bg, color: bc.color, border: `1px solid ${bc.border}` }}>
          {data.tag}
        </span>
        <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#18170F", letterSpacing: "-0.03em", marginBottom: 6, lineHeight: 1.25 }}>{data.title}</div>
        <div style={{ fontSize: "0.875rem", color: "#6B6860", marginBottom: 24 }}>{data.gc} · {data.region}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[["Budget", data.budget], ["Début des travaux", data.date], ["Région", data.region], ["Offres reçues", data.offres]].map(([label, val]) => (
            <div key={label} style={{ background: "#F7F7F7", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6B6860", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#18170F" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6B6860", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 8 }}>Description du projet</div>
        <p style={{ fontSize: "0.875rem", color: "#18170F", lineHeight: 1.7, marginBottom: 16 }}>{data.desc}</p>

        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6B6860", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 8, marginTop: 16 }}>Exigences</div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, marginBottom: 20 }}>
          {data.reqs.map((r) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#18170F" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A5568", flexShrink: 0 }} />
              {r}
            </div>
          ))}
        </div>

        {data.files.length > 0 && (
          <>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6B6860", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 10, marginTop: 20 }}>Documents & plans</div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 4 }}>
              {data.files.map((f) => (
                <div key={f.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#F7F7F7", border: "1px solid #DDDDDD", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "white", border: "1px solid #DDDDDD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: "#18170F", fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#18170F" }}>{f.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#6B6860" }}>{f.size}</div>
                    </div>
                  </div>
                  <a href="#" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", fontWeight: 600, color: "#18170F", padding: "6px 12px", borderRadius: 7, border: "1px solid #DDDDDD", background: "white", textDecoration: "none" }}>
                    Télécharger
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 28, paddingTop: 24, borderTop: "1px solid #DDDDDD" }}>
          <Link href="/inscription" style={{ flex: 1, textAlign: "center" as const, background: "#18170F", color: "white", fontSize: "0.875rem", fontWeight: 700, padding: "13px 0", borderRadius: 10, textDecoration: "none" }}>
            Soumettre une offre
          </Link>
          <a href="#" style={{ flex: 1, textAlign: "center" as const, border: "1px solid #DDDDDD", color: "#18170F", fontSize: "0.875rem", fontWeight: 600, padding: "13px 0", borderRadius: 10, textDecoration: "none" }}>
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
    <div style={{ padding: "64px 40px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18170F", letterSpacing: "-0.03em" }}>
            Demandes de soumissions en cours
          </div>
          <Link href="/demandes" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18170F", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Voir toutes les demandes →
          </Link>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginBottom: 16, maxHeight: 88, overflow: "hidden" }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: "7px 16px",
                borderRadius: 999,
                border: `1px solid ${activeFilter === f.key ? "#18170F" : "#DDDDDD"}`,
                background: activeFilter === f.key ? "#18170F" : "white",
                color: activeFilter === f.key ? "white" : "#6B6860",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ border: "1px solid #DDDDDD", borderRadius: 16, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 110px 90px 80px 110px 32px", gap: 12, padding: "10px 20px", background: "#F7F7F7", borderBottom: "1px solid #DDDDDD" }}>
            {["Projet", "Statut", "Début", "Secteur", "Offres", "Action", ""].map((h, i) => (
              <div key={i} style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6B6860", textTransform: "uppercase" as const, letterSpacing: "0.07em", paddingLeft: i === 0 ? 52 : 0 }}>
                {h}
              </div>
            ))}
          </div>

          {filtered.map((row, i) => {
            const bc = BADGE_COLORS[row.badge];
            return (
              <div
                key={i}
                onClick={() => setModalData(row.modal)}
                style={{ display: "grid", gridTemplateColumns: "1fr 100px 110px 90px 80px 110px 32px", gap: 12, padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #DDDDDD" : "none", cursor: "pointer", alignItems: "center", background: "white" }}
              >
                {/* Project name */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F4F4F5", border: "1px solid #E4E4E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {row.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18170F", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{row.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6B6860", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{row.gc}</div>
                  </div>
                </div>

                {/* Badge */}
                <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, padding: "3px 9px", borderRadius: 999, textTransform: "uppercase" as const, letterSpacing: "0.03em", background: bc.bg, color: bc.color, border: `1px solid ${bc.border}`, whiteSpace: "nowrap" as const }}>
                  {BADGE_LABELS[row.badge]}
                </span>

                {/* Date */}
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#18170F", textAlign: "center" as const }}>{row.date}</span>

                {/* Sector */}
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B6860", background: "#F7F7F7", border: "1px solid #DDDDDD", padding: "3px 8px", borderRadius: 999, textAlign: "center" as const }}>{row.sector}</span>

                {/* Offres */}
                <span style={{ fontSize: "0.78rem", fontWeight: row.offresZero ? 700 : 600, color: row.offresZero ? "#4A5568" : "#6B6860", textAlign: "center" as const }}>{row.offres}</span>

                {/* CTA button */}
                <Link
                  href="/inscription"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: "0.72rem", fontWeight: 700, padding: "7px 10px", borderRadius: 8, background: "#4A5568", color: "white", textDecoration: "none", textAlign: "center" as const }}
                >
                  Soumettre
                </Link>

                {/* Arrow */}
                <span style={{ fontSize: "1.3rem", color: "#B0B0B0", textAlign: "center" as const }}>›</span>
              </div>
            );
          })}
        </div>
      </div>

      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </div>
  );
}
