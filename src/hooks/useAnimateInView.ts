import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useAnimateInView = (margin = "-80px") => {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once: true, margin: margin as any });

  const defaultTransition = {
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1],
  };

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: defaultTransition }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: defaultTransition }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: defaultTransition }
    },
    slideRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: defaultTransition }
    }
  };

  return { ref, isInView, variants };
};
