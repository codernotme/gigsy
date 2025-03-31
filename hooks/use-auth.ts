import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  account_type: 'individual' | 'group';
  role: 'admin' | 'maintainer' | 'regional' | 'campus_head' | 'group' | 'individual';
  display_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, accountType: 'individual' | 'group') => {
    const result = await supabase.auth.signUp({ email, password });
    
    if (result.data.user) {
      // Create profile
      await supabase.from('profiles').insert([
        { 
          id: result.data.user.id,
          account_type: accountType,
          role: accountType, // default role matches account type
        }
      ]);
    }
    
    return result;
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  const isAdmin = () => profile?.role === 'admin';
  const isMaintainer = () => ['admin', 'maintainer'].includes(profile?.role || '');
  const isRegional = () => ['admin', 'maintainer', 'regional'].includes(profile?.role || '');
  const isCampusHead = () => ['admin', 'maintainer', 'regional', 'campus_head'].includes(profile?.role || '');

  return {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
    isMaintainer,
    isRegional,
    isCampusHead,
  };
}