ALTER TABLE profiles ADD COLUMN IF NOT EXISTS metier text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS niveau_ccq text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS carte_asp boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS carte_ccq text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS disponibilite text DEFAULT 'non_specifie';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS taux_horaire integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS annees_experience integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS certifications text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS permis_conduire text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS machinerie text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS open_to_work boolean DEFAULT false;

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free','public','travailleur','pro_trial','pro','entreprise','detaillant_std','detaillant_pro'));
