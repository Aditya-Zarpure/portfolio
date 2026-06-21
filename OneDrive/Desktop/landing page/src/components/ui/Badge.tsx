import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

/**
 * Reusable chip label representing tag filters or categories.
 */
export default function Badge({ children, variant = 'primary', className, ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center text-xxs font-bold uppercase tracking-wider rounded px-2.5 py-0.5 border';

  const variants = {
    primary: 'bg-zinc-900 text-zinc-100 border-zinc-800',
    secondary: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    accent: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    outline: 'bg-transparent text-zinc-400 border-zinc-800',
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
