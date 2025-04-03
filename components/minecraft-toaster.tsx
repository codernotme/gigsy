'use client';

import { useMinecraftToastStore } from '@/lib/store/minecraft-toast-store';
import { MinecraftToast } from '@/components/ui/minecraft-toast';

export function MinecraftToaster() {
  const { toasts } = useMinecraftToastStore();

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:bottom-0 sm:right-0 sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <MinecraftToast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          sound={toast.sound}
          className="toast-animate-in"
        />
      ))}
    </div>
  );
}
