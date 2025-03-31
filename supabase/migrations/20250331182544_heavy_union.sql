/*
  # Authentication and Wallet System Schema

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to Supabase Auth
      - Tracks account type and verification status
    
    - `wallets`
      - Stores GigCoin balances
      - Tracks transaction history
      - Manages rewards and bonuses

    - `transactions`
      - Records all GigCoin movements
      - Tracks earnings, spending, and transfers

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  account_type text NOT NULL CHECK (account_type IN ('individual', 'group')),
  role text DEFAULT 'individual' CHECK (role IN ('admin', 'maintainer', 'regional', 'campus_head', 'group', 'individual')),
  display_name text,
  avatar_url text,
  bio text,
  skills text[],
  level integer DEFAULT 1,
  is_verified boolean DEFAULT false,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  balance bigint DEFAULT 0 CHECK (balance >= 0),
  total_earned bigint DEFAULT 0,
  total_spent bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid REFERENCES wallets(id) NOT NULL,
  amount bigint NOT NULL,
  type text NOT NULL CHECK (type IN ('earning', 'spending', 'transfer', 'reward')),
  description text,
  reference_id uuid, -- For linking to projects, events, etc.
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for wallets
CREATE POLICY "Users can read own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for transactions
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    wallet_id IN (
      SELECT id FROM wallets WHERE user_id = auth.uid()
    )
  );

-- Functions for wallet operations
CREATE OR REPLACE FUNCTION create_wallet_for_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO wallets (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger to create wallet for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_wallet_for_new_user();