'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Custom smooth cubic-bezier reveal container.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 12,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom sleek SaaS cubic-bezier easing curve
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
}

/**
 * Wrapper staggering child reveals sequentially.
 */
export function StaggerContainer({ children, staggerDelay = 0.08, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sub-item revealing inside StaggerContainer utilizing fluid spring physics.
 */
export function StaggerItem({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 120,
            damping: 18,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
