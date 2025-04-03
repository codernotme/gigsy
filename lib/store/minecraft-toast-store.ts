import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'achievement';

export interface MinecraftToast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  icon?: string;
  sound?: boolean;
}

interface ToastState {
  toasts: MinecraftToast[];
  addToast: (toast: Omit<MinecraftToast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useMinecraftToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = uuidv4();
    const defaultDuration = toast.type === 'achievement' ? 5000 : 3000;
    
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          duration: defaultDuration,
          sound: true,
          ...toast,
        },
      ],
    }));
    
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));
