import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  premiumBorder?: boolean;
}

/**
 * Reusable panel card component, rendering soft glassmorphism backdrops
 * and optional premium glow border boundaries.
 */
export default function Card({
  children,
  hoverable = false,
  premiumBorder = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-xl p-6 transition-all duration-350',
        hoverable && 'hover:border-zinc-700/80 hover:-translate-y-0.5 shadow-sm hover:shadow-md',
        premiumBorder && 'premium-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
