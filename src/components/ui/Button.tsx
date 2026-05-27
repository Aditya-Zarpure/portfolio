"use client";
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-body rounded-[2px] transition-all duration-300 ease-in-out";
    
    // Size styles
    const sizeStyles = size === 'sm' ? "px-4 py-2 text-sm" : "px-[28px] py-[12px]";
    
    // Variant styles
    let variantStyles = "";
    if (variant === 'primary') {
      variantStyles = "bg-[var(--accent)] text-[#0C0C0C] font-medium hover:bg-[var(--accent-dim)]";
    } else if (variant === 'ghost') {
      variantStyles = "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]";
    }
    
    return (
      <button 
        ref={ref}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
