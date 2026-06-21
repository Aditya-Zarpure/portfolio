'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';

interface ClientWrapperProps {
  children: React.ReactNode;
}

/**
 * ClientWrapper - Client-side layout boundary that orchestrates our premium entry
 * loading countdown, toggles body scroll boundaries during loader state, and performs
 * an elegant delayed fade-in transition on all children contents.
 */
export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll locking while the premium loader is mounting
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* 1. Cinematic Loading Overlay Panel */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Page layout children content fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
