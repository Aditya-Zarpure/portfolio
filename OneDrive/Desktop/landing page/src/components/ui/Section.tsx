import React from 'react';
import { clsx } from 'clsx';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * Page layout section establishing visual ryhthms and padding dividers.
 */
export default function Section({ children, spacing = 'md', className, ...props }: SectionProps) {
  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-20 md:py-28',
    lg: 'py-28 md:py-40',
  };

  return (
    <section className={clsx(paddings[spacing], className)} {...props}>
      {children}
    </section>
  );
}
