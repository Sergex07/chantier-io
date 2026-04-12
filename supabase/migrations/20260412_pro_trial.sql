-- Add trial_ends_at column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz;

-- Widen plan constraint to include trial and free tiers
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_plan_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_plan_check
  CHECK (plan IN ('free','pro_trial','pro','entreprise','detaillant_std','detaillant_pro'));

-- Update handle_new_user trigger to set pro_trial + 14-day expiry on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, plan, trial_ends_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'nom',
    COALESCE(NEW.raw_user_meta_data->>'plan', 'professionnel'),
    'pro_trial',
    NOW() + INTERVAL '14 days'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
