import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Basic pulsing placeholder component.
 */
export default function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={clsx('animate-pulse bg-zinc-800 rounded', className)} {...props} />;
}

/**
 * Pulsing skeleton block representing ProjectCard content during API loads.
 */
export function ProjectCardSkeleton() {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col h-full space-y-4 p-5">
      <Skeleton className="aspect-video w-full rounded-md" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="flex gap-4 pt-3 border-t border-zinc-800/85">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}
