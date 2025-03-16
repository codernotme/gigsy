import React from 'react';
import { useTheme } from 'next-themes';

interface GigbitBadgeProps {
  amount: number;
  showPrefix?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GigbitBadge({
  amount,
  showPrefix = true,
  size = 'md',
  className = '',
}: GigbitBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };
  
  return (
    <div 
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${className}`}
      style={{
        background: isDark ? 'linear-gradient(to right, #f59e0b80, #d9770680)' : 'linear-gradient(to right, #f59e0b, #d97706)', 
        color: isDark ? '#fff' : '#fff'
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        width={size === 'lg' ? '18' : size === 'md' ? '16' : '14'} 
        height={size === 'lg' ? '18' : size === 'md' ? '16' : '14'} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
          fill="currentColor"
        />
      </svg>
      <span>
        {showPrefix && "+"}{amount.toLocaleString()} {amount === 1 ? 'Gigbit' : 'Gigbits'}
      </span>
    </div>
  );
}
