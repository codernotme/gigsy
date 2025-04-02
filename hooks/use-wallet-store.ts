import { create } from 'zustand';
import { Wallet, Transaction } from '@/types';
import { getWallet, getTransactions, createTransaction } from '@/lib/api/wallet';

interface WalletState {
  wallet: Wallet | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchWallet: (userId: string) => Promise<void>;
  fetchTransactions: (userId: string) => Promise<void>;
  addTransaction: (userId: string, transaction: Partial<Transaction>) => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  transactions: [],
  loading: false,
  error: null,
  fetchWallet: async (userId) => {
    set({ loading: true });
    try {
      const wallet = await getWallet(userId);
      set({ wallet, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch wallet' });
    } finally {
      set({ loading: false });
    }
  },
  fetchTransactions: async (userId) => {
    set({ loading: true });
    try {
      const transactions = await getTransactions(userId);
      set({ transactions, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch transactions' });
    } finally {
      set({ loading: false });
    }
  },
  addTransaction: async (userId, transaction) => {
    set({ loading: true });
    try {
      const newTransaction = await createTransaction(userId, transaction);
      set((state) => ({
        transactions: [...state.transactions, newTransaction],
        error: null,
      }));
    } catch (error) {
      set({ error: 'Failed to create transaction' });
    } finally {
      set({ loading: false });
    }
  },
}));