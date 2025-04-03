'use client';

import * as React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Trophy, Info } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { MinecraftToast as ToastProps } from '@/lib/store/minecraft-toast-store';
import { useMinecraftToastStore } from '@/lib/store/minecraft-toast-store';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden border-2 p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
  {
    variants: {
      variant: {
        success: 'border-green-600 bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
        error: 'border-red-600 bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
        info: 'border-blue-600 bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
        warning: 'border-yellow-600 bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
        achievement: 'border-purple-600 bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

// CSS for pixelated borders
const pixelBorder = `
  .pixel-border {
    image-rendering: pixelated;
    position: relative;
  }
  .pixel-border::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid;
    border-image-slice: 2;
    border-image-width: 2;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAALElEQVQYV2NkIAAYSSn4HwhwA3EhMYpggiAFuBShK8QqDTMVLg3XjqwVQwEAzOkHFMJ5FiwAAAAASUVORK5CYII=");
  }
`;

type IconMap = {
  [key in ToastProps['type']]: React.ReactNode;
};

const icons: IconMap = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  achievement: <Trophy className="h-5 w-5" />,
};

export const MinecraftToast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ToastProps
>(({ className, id, title, description, type, ...props }, ref) => {
  const { removeToast } = useMinecraftToastStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    if (props.duration && props.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id);
      }, props.duration);
      return () => clearTimeout(timer);
    }
  }, [id, props.duration, removeToast]);

  // Play sound effect when toast appears
  React.useEffect(() => {
    if (mounted && props.sound) {
      const audio = new Audio(type === 'achievement' 
        ? '/sounds/minecraft-level-up.mp3' 
        : '/sounds/minecraft-pop.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if audio cannot be played (e.g., user hasn't interacted with page yet)
      });
    }
  }, [mounted, type, props.sound]);

  return (
    <>
      <style>{pixelBorder}</style>
      <div
        ref={ref}
        className={cn(
          'minecraft-toast pixel-border font-minecraft', 
          toastVariants({ variant: type }), 
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="toast-icon">{icons[type]}</div>
          <div className="grid gap-1">
            <div className="text-base font-bold leading-none tracking-wider">
              {title}
            </div>
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => removeToast(id)}
          className="absolute right-2 top-2 rounded-sm p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
});

MinecraftToast.displayName = 'MinecraftToast';
