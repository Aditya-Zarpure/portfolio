import React from 'react';
import { clsx } from 'clsx';

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * Toggle switch button displaying slide states and toggling properties.
 */
export default function Toggle({ label, checked, onChange, disabled = false }: ToggleProps) {
  return (
    <label className={clsx('inline-flex items-center', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <div
          className={clsx('w-10 h-6 rounded-full transition-colors', checked ? 'bg-slate-950' : 'bg-slate-300')}
        />
        <div
          className={clsx(
            'absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200',
            checked ? 'transform translate-x-4' : ''
          )}
        />
      </div>
      {label && <span className="ml-3 text-sm font-medium text-slate-700">{label}</span>}
    </label>
  );
}
