import React from 'react';
import { clsx } from 'clsx';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

/**
 * Standard section heading block, displaying badges, titles, and descriptions.
 */
export default function SectionTitle({
  title,
  subtitle,
  badge,
  align = 'left',
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        'space-y-3 max-w-2xl',
        align === 'center' ? 'text-center mx-auto' : 'text-left',
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-block text-xxs font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/10 border border-brand-accent/20 rounded-full px-3 py-0.5">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight sm:text-3xl leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
