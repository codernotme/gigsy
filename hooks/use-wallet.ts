import { useState } from "react";

// Dummy transaction type
interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  description: string;
  createdAt: string;
}

// Dummy wallet type
interface Wallet {
  id: string;
  balance: number;
  userId: string;
}

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchWallet = async (userId: string) => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dummyWallet: Wallet = {
        id: '1',
        balance: 0,
        userId
      };
      
      setWallet(dummyWallet);
      setError(null);
    } catch (err) {
      setError('Failed to fetch wallet');
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTransactions = async (userId: string) => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return empty array for now
      setTransactions([]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    wallet,
    transactions,
    loading,
    error,
    fetchWallet,
    fetchTransactions
  };
}
