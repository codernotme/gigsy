'use client';

import { toast } from './use-toast';
import { ElementRef, ComponentPropsWithoutRef } from 'react';
import { ToastActionElement } from '../components/ui/toast';

interface MinecraftToastProps {
  title?: string;
  description?: string;
  action?: ToastActionElement;
  icon?: string;
}

export function useMinecraftToast() {
  const success = ({ title, description, action, icon = '✅' }: MinecraftToastProps) => {
    toast({
      title: title ? (
        <div className="flex items-center space-x-2">
          <span className="minecraft-style">{icon}</span>
          <span className="minecraft-style">{title}</span>
        </div>
      ) : null,
      description: description ? <span className="minecraft-style">{description}</span> : null,
      action,
      variant: 'default',
      className: 'pixel-border bg-green-50 dark:bg-green-900/20 border-green-400',
    });
  };

  const error = ({ title, description, action, icon = '❌' }: MinecraftToastProps) => {
    toast({
      title: title ? (
        <div className="flex items-center space-x-2">
          <span className="minecraft-style">{icon}</span>
          <span className="minecraft-style">{title}</span>
        </div>
      ) : null,
      description: description ? <span className="minecraft-style">{description}</span> : null,
      action,
      variant: 'destructive',
      className: 'pixel-border',
    });
  };

  const warning = ({ title, description, action, icon = '⚠️' }: MinecraftToastProps) => {
    toast({
      title: title ? (
        <div className="flex items-center space-x-2">
          <span className="minecraft-style">{icon}</span>
          <span className="minecraft-style">{title}</span>
        </div>
      ) : null,
      description: description ? <span className="minecraft-style">{description}</span> : null,
      action,
      variant: 'default',
      className: 'pixel-border bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400',
    });
  };

  const info = ({ title, description, action, icon = 'ℹ️' }: MinecraftToastProps) => {
    toast({
      title: title ? (
        <div className="flex items-center space-x-2">
          <span className="minecraft-style">{icon}</span>
          <span className="minecraft-style">{title}</span>
        </div>
      ) : null,
      description: description ? <span className="minecraft-style">{description}</span> : null,
      action,
      variant: 'default',
      className: 'pixel-border bg-blue-50 dark:bg-blue-900/20 border-blue-400',
    });
  };

  const achievement = ({ title, description, action, icon = '🏆' }: MinecraftToastProps) => {
    toast({
      title: title ? (
        <div className="flex items-center space-x-2">
          <span className="minecraft-style">{icon}</span>
          <span className="minecraft-style">{title}</span>
        </div>
      ) : null,
      description: description ? <span className="minecraft-style">{description}</span> : null,
      action,
      variant: 'default',
      className: 'pixel-border bg-purple-50 dark:bg-purple-900/20 border-purple-400',
    });
  };

  return {
    success,
    error,
    warning,
    info,
    achievement,
  };
}
