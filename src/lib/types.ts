export type Role = "professionnel" | "entreprise" | "detaillant" | "admin";
export type Plan = "professionnel" | "entreprise" | "detaillant";

export type StatutDemande = "ouvert" | "en_cours" | "ferme" | "annule";
export type StatutSoumission = "en_attente" | "acceptee" | "refusee" | "retiree";
export type TypePoste = "temps_plein" | "temps_partiel" | "contrat" | "stage";
export type StatutEmploi = "actif" | "ferme" | "brouillon";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  plan: Plan | null;
  phone: string | null;
  region: string | null;
  ville: string | null;
  description: string | null;
  website: string | null;
  stripe_customer_id: string | null;
  verified: boolean;
  rbq_numero: string | null;
  ccq_numero: string | null;
}

export interface Specialite {
  id: string;
  nom: string;
  slug: string;
}

export interface Demande {
  id: string;
  entreprise_id: string;
  titre: string;
  description: string;
  specialite_id: string | null;
  region: string | null;
  ville: string | null;
  secteur: string | null;
  budget_min: number | null;
  budget_max: number | null;
  date_debut: string | null;
  statut: StatutDemande;
  created_at: string;
}

export interface DemandeFichier {
  id: string;
  demande_id: string;
  nom: string;
  url: string;
  taille: number;
}

export interface Soumission {
  id: string;
  demande_id: string;
  pro_id: string;
  montant: number;
  delai: string | null;
  message: string | null;
  statut: StatutSoumission;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  contenu: string;
  lu: boolean;
  created_at: string;
}

export interface Evaluation {
  id: string;
  evaluateur_id: string;
  evalue_id: string;
  demande_id: string;
  note: number;
  commentaire: string | null;
}

export interface Emploi {
  id: string;
  entreprise_id: string;
  titre: string;
  description: string;
  specialite_id: string | null;
  region: string | null;
  ville: string | null;
  type_poste: TypePoste;
  salaire_min: number | null;
  salaire_max: number | null;
  statut: StatutEmploi;
}

export interface Detaillant {
  id: string;
  profile_id: string;
  nom: string;
  description: string | null;
  logo_url: string | null;
  escompte: number | null;
  region: string | null;
  site_web: string | null;
  plan: Plan | null;
}

// Relations utiles
export interface DemandeAvecRelations extends Demande {
  entreprise?: Profile;
  specialite?: Specialite;
  fichiers?: DemandeFichier[];
  soumissions?: Soumission[];
}

export interface SoumissionAvecRelations extends Soumission {
  pro?: Profile;
  demande?: Demande;
}

export interface EmploiAvecRelations extends Emploi {
  entreprise?: Profile;
  specialite?: Specialite;
}
