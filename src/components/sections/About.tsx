"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.1 }
    }
  };

  return (
    <SectionWrapper id="about">
      <div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-[60px] md:gap-[100px] items-start"
      >
        {/* Left Column */}
        <motion.div 
          variants={leftVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          <SectionLabel className="mb-[24px]">About Me</SectionLabel>
          <h2 
            className="font-display font-light text-[var(--text-primary)] leading-[1.2]"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Building the web, one thoughtful line at a time.
          </h2>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          variants={rightVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col"
        >
          <p className="text-[15px] text-[var(--text-muted)] leading-[1.8] font-body">
            I&apos;m a full-stack web developer who believes that great software is as much about feel as it is about function. I specialise in building fast, accessible, and visually refined products.
          </p>
          <p className="text-[15px] text-[var(--text-muted)] leading-[1.8] font-body mt-[20px]">
            From early-stage startups to growing businesses, I help clients establish a strong digital presence &mdash; turning ideas into experiences that convert and endure.
          </p>

          <div className="flex gap-[40px] mt-[40px]">
            <div>
              <div className="font-display text-[42px] font-light text-[var(--accent)]">20+</div>
              <div className="text-[12px] text-[var(--text-muted)] tracking-[0.1em] font-body mt-[4px]">Projects Delivered</div>
            </div>
            <div>
              <div className="font-display text-[42px] font-light text-[var(--accent)]">3+</div>
              <div className="text-[12px] text-[var(--text-muted)] tracking-[0.1em] font-body mt-[4px]">Years Building</div>
            </div>
            <div>
              <div className="font-display text-[42px] font-light text-[var(--accent)]">100%</div>
              <div className="text-[12px] text-[var(--text-muted)] tracking-[0.1em] font-body mt-[4px]">Client Satisfaction</div>
            </div>
          </div>

          <div className="mt-[32px]">
            <Button variant="ghost">Download CV</Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
