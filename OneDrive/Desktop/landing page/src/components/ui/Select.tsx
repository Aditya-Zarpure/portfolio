import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

/**
 * Select input dropdown validating selections and listing errors.
 */
export default function Select({ label, error, options, id, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          'w-full px-3 py-2 border rounded text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors',
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
