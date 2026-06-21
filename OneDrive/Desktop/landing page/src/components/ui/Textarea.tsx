import React from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
}

/**
 * Textarea element rendering labels and validation exceptions.
 */
export default function Textarea({ label, error, id, className, labelClassName, rows = 4, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className={clsx('block text-sm font-medium text-slate-700 mb-1', labelClassName)}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={clsx(
          'w-full px-3 py-2 border rounded text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors',
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
