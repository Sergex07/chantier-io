-- Add 'public' plan for grand public (homeowners) accounts
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free','public','pro_trial','pro','entreprise','detaillant_std','detaillant_pro'));
