import { Transaction } from '@/types';

export async function getWallet(userId: string) {
  const response = await fetch(`/api/users/${userId}/wallet`);
  return response.json();
}

export async function getTransactions(userId: string) {
  const response = await fetch(`/api/users/${userId}/transactions`);
  return response.json();
}

export async function createTransaction(userId: string, data: Partial<Transaction>) {
  const response = await fetch(`/api/users/${userId}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}