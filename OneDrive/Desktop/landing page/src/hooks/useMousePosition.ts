'use client';

import { useEffect, useRef } from 'react';

/**
 * useMousePosition - High-performance custom hook that monitors cursor position 
 * relative to a target element bounding box, updating native CSS variables (--mouse-x, --mouse-y)
 * directly on the DOM style declaration. This bypasses React re-render loops completely,
 * securing stable 60fps tracking.
 */
export default function useMousePosition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Standard media check to bypass listeners on touch-only (mobile) viewports
    const isMousePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isMousePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // relative x position
      const y = e.clientY - rect.top;  // relative y position
      
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return containerRef;
}
