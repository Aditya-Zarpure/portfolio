"use client";
import { HTMLAttributes } from 'react';

const SectionWrapper = ({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <section 
      className={`py-[80px] md:py-[120px] w-full max-w-[1200px] mx-auto px-[24px] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
