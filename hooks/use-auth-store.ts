import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { getProfile } from '@/lib/api/auth';

export function useAuthGuard() {
  const { user, isAuthenticated, setProfile } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (user) {
      getProfile(user.id)
        .then((profile) => setProfile(profile))
        .catch((error) => {
          console.error('Error fetching profile:', error);
          router.push('/auth');
        });
    }
  }, [isAuthenticated, user, router, setProfile]);

  return { user, isAuthenticated };
}