'use client';

import { Loader2, RefreshCw, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Pulsing dots loader
export function PulsingDots({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
    >
      <div className="flex space-x-2">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary"></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary [animation-delay:0.2s]"></div>
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}

// Bouncing dots loader
export function BouncingDots({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
    >
      <div className="flex space-x-1">
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
      </div>
    </div>
  );
}

// Spinning circle loader
export function SpinningCircle({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
    </div>
  );
}

// Multiple spinner options
export function CustomSpinner({
  variant = 'loader2',
  size = 'md',
  className,
}: {
  variant?: 'loader2' | 'refresh' | 'rotate';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  const icons = {
    loader2: Loader2,
    refresh: RefreshCw,
    rotate: RotateCw,
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
    >
      <Icon className={cn('animate-spin text-primary', sizeClasses[size])} />
    </div>
  );
}
