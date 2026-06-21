import React from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Centered responsive container ensuring margins are consistent.
 */
export default function Container({ children, size = 'md', className, ...props }: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
  };

  return (
    <div className={clsx('w-full mx-auto px-6 md:px-8', sizes[size], className)} {...props}>
      {children}
    </div>
  );
}
