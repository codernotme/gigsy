'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Wallet, Transaction } from '@/lib/supabase/client';

export function useWallet(userId: string) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchWallet = async () => {
      setLoading(true);
      const { data: walletData, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) console.error('Error fetching wallet:', error);
      else setWallet(walletData);

      setLoading(false);
    };

    const fetchTransactions = async () => {
      const { data: transactionData, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', wallet?.id);

      if (error) console.error('Error fetching transactions:', error);
      else setTransactions(transactionData || []);
    };

    fetchWallet();
    if (wallet) fetchTransactions();
  }, [userId, wallet?.id]);

  return { wallet, transactions, loading };
}