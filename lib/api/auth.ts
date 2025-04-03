import { User, Profile } from '@/types';

export async function signIn(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Failed to sign in');
    return response.json();
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string, accountDetails: Partial<Profile>) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, ...accountDetails }),
    });
    if (!response.ok) throw new Error('Failed to sign up');
    return response.json();
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to sign out');
    return response.json();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function getProfile(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}/profile`);
    if (!response.ok) throw new Error(`Failed to fetch profile for user ID: ${userId}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  try {
    const response = await fetch(`/api/users/${userId}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update profile for user ID: ${userId}`);
    return response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}