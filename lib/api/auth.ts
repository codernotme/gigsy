import { User, Profile } from '@/types';

export async function signIn(email: string, password: string) {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function signUp(email: string, password: string, accountDetails: Partial<Profile>) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, ...accountDetails }),
  });
  return response.json();
}

export async function signOut() {
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
  });
  return response.json();
}

export async function getProfile(userId: string) {
  const response = await fetch(`/api/users/${userId}/profile`);
  return response.json();
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  const response = await fetch(`/api/users/${userId}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}