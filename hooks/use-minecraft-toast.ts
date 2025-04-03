import { useCallback } from 'react';
import { useMinecraftToastStore, type ToastType } from '@/lib/store/minecraft-toast-store';

export interface UseMinecraftToastOptions {
  title: string;
  description?: string;
  duration?: number;
  icon?: string;
  sound?: boolean;
}

export function useMinecraftToast() {
  const { addToast, removeToast, clearToasts } = useMinecraftToastStore();

  const toast = useCallback(
    (options: UseMinecraftToastOptions & { type?: ToastType }) => {
      const { type = 'info', ...rest } = options;
      return addToast({ type, ...rest });
    },
    [addToast]
  );

  const success = useCallback(
    (options: UseMinecraftToastOptions) => 
      toast({ ...options, type: 'success' }),
    [toast]
  );

  const error = useCallback(
    (options: UseMinecraftToastOptions) => 
      toast({ ...options, type: 'error' }),
    [toast]
  );

  const info = useCallback(
    (options: UseMinecraftToastOptions) => 
      toast({ ...options, type: 'info' }),
    [toast]
  );

  const warning = useCallback(
    (options: UseMinecraftToastOptions) => 
      toast({ ...options, type: 'warning' }),
    [toast]
  );

  const achievement = useCallback(
    (options: UseMinecraftToastOptions) => 
      toast({ ...options, type: 'achievement' }),
    [toast]
  );

  return {
    toast,
    success,
    error,
    info,
    warning,
    achievement,
    dismiss: removeToast,
    clearAll: clearToasts,
  };
}
