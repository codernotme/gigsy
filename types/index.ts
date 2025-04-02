export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  accountType: 'individual' | 'group';
  role: 'admin' | 'maintainer' | 'regional' | 'campus_head' | 'group' | 'individual';
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  skills: string[];
  level: number;
  isVerified: boolean;
  verifiedBy: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'earning' | 'spending' | 'transfer' | 'reward';
  description?: string;
  referenceId?: string;
  status: 'pending' | 'completed' | 'failed';
  recipientWalletId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  budget: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  skillsRequired: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  projectId: string;
  bidderId: string;
  amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
  rewardAmount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: 'registered' | 'attended' | 'no_show';
  rewardClaimed: boolean;
  createdAt: string;
  updatedAt: string;
}