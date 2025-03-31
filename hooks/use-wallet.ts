import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './use-auth';

interface Wallet {
  id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'earning' | 'spending' | 'transfer' | 'reward';
  description: string;
  created_at: string;
}

export function useWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadWallet() {
      try {
        // Get wallet
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (walletError) throw walletError;
        setWallet(walletData);

        // Get recent transactions
        const { data: txData, error: txError } = await supabase
          .from('transactions')
          .select('*')
          .eq('wallet_id', walletData.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (txError) throw txError;
        setTransactions(txData);
      } catch (error) {
        console.error('Error loading wallet:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, [user]);

  return {
    wallet,
    transactions,
    loading,
    refreshWallet: () => setLoading(true), // This will trigger the useEffect
  };
}