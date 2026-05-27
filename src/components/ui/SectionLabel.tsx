"use client";
import { HTMLAttributes } from 'react';

const SectionLabel = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] font-body ${className}`}
      {...props}
    >
      <span className="w-6 h-[1px] bg-[var(--accent)] block" />
      {children}
    </div>
  );
};

export default SectionLabel;
