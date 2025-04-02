import { create } from 'zustand';
import { User, Profile } from '@/types';
import { signIn, signOut as apiSignOut } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { user, profile } = await signIn(email, password);
      set({ user, profile, isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await apiSignOut();
      set({ user: null, profile: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
}));