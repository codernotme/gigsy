import { create } from 'zustand';

export type UserRole = 'admin' | 'maintainer' | 'ambassador' | 'group' | 'individual';

interface User {
  accountType: string;
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  gigCoins: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));