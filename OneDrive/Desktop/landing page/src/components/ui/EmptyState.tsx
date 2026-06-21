import React from 'react';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

/**
 * Reusable layout placeholder card rendered when listing queries return empty datasets.
 */
export default function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-900/20 max-w-md mx-auto my-8">
      {icon && <div className="mb-4 text-zinc-500">{icon}</div>}
      <h3 className="text-base font-bold text-zinc-100 mb-1">{title}</h3>
      <p className="text-xs text-zinc-400 leading-relaxed mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
