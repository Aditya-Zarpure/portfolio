'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Premium Entry Loader - Highly sophisticated, minimalist loader featuring 
 * outward-tracking monospaced typography, a center-originating micro progress bar,
 * and a smooth decelerated exit fade.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Linearly increment progress bar over 1.4s to leave 200ms for exit handshakes
    const duration = 1400;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress((prev) => Math.min(prev + increment, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        // Fire completion callback after an intentional 200ms pause to settle visual states
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.015,
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[100] w-full h-full bg-zinc-950 flex flex-col items-center justify-center select-none"
    >
      <div className="space-y-6 w-full max-w-[280px] flex flex-col items-center">
        
        {/* Brand Accent Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-violet-400 mb-2 shadow-inner"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
        </motion.div>

        {/* Monospaced Lettering - Tracking Outwards */}
        <div className="overflow-hidden flex justify-center py-1">
          <motion.h1
            initial={{ letterSpacing: '0.2em', opacity: 0 }}
            animate={{ letterSpacing: '0.45em', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-bold font-mono text-zinc-200 uppercase tracking-[0.45em] ml-[0.45em] text-center"
          >
            Studio // Digital
          </motion.h1>
        </div>

        {/* Micro Progress Line (1px height) */}
        <div className="w-48 h-[1px] bg-zinc-900 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            style={{ originX: 0.5 }}
            transition={{ ease: 'linear', duration: 0.1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
          />
        </div>

        {/* Quiet Percentage readout */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          className="text-[8px] font-mono text-zinc-500 tracking-widest"
        >
          SYS_READY_{Math.round(progress)}%
        </motion.span>

      </div>
    </motion.div>
  );
}
