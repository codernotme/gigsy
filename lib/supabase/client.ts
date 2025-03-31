import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for browser-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database schema tables
export type Profile = {
  id: string;
  account_type: 'individual' | 'group';
  role: 'admin' | 'maintainer' | 'regional' | 'campus_head' | 'group' | 'individual';
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[]; // Add the skills property as an optional array of strings
  level: number;
  is_verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
};

export type Wallet = {
  id: string;
  user_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  wallet_id: string;
  amount: number;
  type: 'earning' | 'spending' | 'transfer' | 'reward';
  created_at: string;
  description?: string;
  reference_id?: string;
  status: 'pending' | 'completed' | 'failed';
  recipient_wallet_id?: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  skills_required: string[];
  created_at: string;
  updated_at: string;
};

export type Bid = {
  id: string;
  project_id: string;
  bidder_id: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Milestone = {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  due_date: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  organizer_id: string;
  start_date: string;
  end_date: string;
  location?: string;
  max_participants?: number;
  reward_amount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  status: 'registered' | 'attended' | 'no_show';
  reward_claimed: boolean;
  created_at: string;
  updated_at: string;
};

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) console.error('Error fetching user profile:', error);
  return data;
}