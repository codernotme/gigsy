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
  created_at timestamptz DEFAULT now(),
  description text,
  reference_id uuid,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  recipient_wallet_id uuid REFERENCES wallets(id),
  UNIQUE(id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for wallets
CREATE POLICY "Users can view their own wallet"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Only system can modify wallets"
  ON wallets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'maintainer')));

-- Policies for transactions
CREATE POLICY "Users can view their own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wallets 
      WHERE wallets.id = transactions.wallet_id 
      AND wallets.user_id = auth.uid()
    )
  );

-- Triggers for wallet updates
CREATE OR REPLACE FUNCTION update_wallet_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'earning' OR NEW.type = 'reward' THEN
    UPDATE wallets 
    SET 
      balance = balance + NEW.amount,
      total_earned = total_earned + NEW.amount,
      updated_at = NOW()
    WHERE id = NEW.wallet_id;
  ELSIF NEW.type = 'spending' THEN
    UPDATE wallets 
    SET 
      balance = balance - NEW.amount,
      total_spent = total_spent + NEW.amount,
      updated_at = NOW()
    WHERE id = NEW.wallet_id;
  ELSIF NEW.type = 'transfer' AND NEW.recipient_wallet_id IS NOT NULL THEN
    -- Deduct from sender
    UPDATE wallets 
    SET 
      balance = balance - NEW.amount,
      total_spent = total_spent + NEW.amount,
      updated_at = NOW()
    WHERE id = NEW.wallet_id;
    
    -- Add to recipient
    UPDATE wallets 
    SET 
      balance = balance + NEW.amount,
      total_earned = total_earned + NEW.amount,
      updated_at = NOW()
    WHERE id = NEW.recipient_wallet_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_after_transaction
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_wallet_on_transaction();

-- Create function to generate wallet on user signup
CREATE OR REPLACE FUNCTION create_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO wallets (user_id, balance)
  VALUES (NEW.id, 100); -- Start with 100 GigCoins
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create a wallet when a new user signs up
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_wallet();