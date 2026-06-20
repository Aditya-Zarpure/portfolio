"use client";

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Button from '@/components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:pl-[8%] w-full overflow-hidden" id="hero">
      {/* Background glow */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 0% 50%, rgba(201,169,110,0.04) 0%, transparent 50%)'
        }}
      />

      <motion.div 
        className="w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >


        <motion.h1 
          variants={itemVariants} 
          className="font-display font-light text-[var(--text-primary)] leading-[1.1]" 
          style={{ fontSize: 'clamp(56px, 8vw, 120px)' }}
        >
          Crafting Digital<br />
          <span className="italic text-[var(--accent)]">Experiences.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="max-w-[480px] text-[16px] text-[var(--text-muted)] font-body leading-[1.7] mt-[24px]"
        >
          I&apos;m a full-stack web developer building fast, clean, and privacy-first digital products.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-[16px] mt-[40px]">
          <Button variant="ghost">View My Work</Button>
          <Button variant="primary">Let&apos;s Talk</Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-6 md:left-[8%] flex items-center gap-4 text-[11px] tracking-[0.2em] text-[var(--text-muted)] font-body uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-12 h-[1px] bg-[var(--text-muted)] opacity-30" />
        <span>Scroll</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
