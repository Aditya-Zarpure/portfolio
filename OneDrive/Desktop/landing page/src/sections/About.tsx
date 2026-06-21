'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

/**
 * About / Positioning Section - Professional, product-centric text layout 
 * that establishes mature software engineering credibility and system quality standards.
 */
export default function About() {
  const transitionEase = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <Section spacing="md" id="about" className="relative overflow-hidden border-t border-zinc-900/60 bg-zinc-950">
      
      <div className="premium-ambient-glow" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Core Editorial Positioning Headline */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transitionEase}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-violet-400 uppercase">
                01 // POSITIONING
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight leading-[1.15]"
            >
              Engineering scalable digital products with absolute architectural precision.
            </motion.h2>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-[1px] w-24 bg-gradient-to-r from-violet-500/40 to-transparent origin-left"
            />
          </div>

          {/* RIGHT SIDE: Deep Architectural Text + Trust Standards */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Curated Copy Block */}
            <div className="space-y-6 text-zinc-400 text-sm leading-relaxed max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transitionEase, delay: 0.15 }}
              >
                We build digital products that scale, optimized from database indexes to frontend render loops. 
                By combining strict backend standards with responsive, fluid user interfaces, we help modern 
                businesses transform complex technical requirements into stable, high-performance systems.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transitionEase, delay: 0.2 }}
              >
                Every product is engineered with production-grade architecture at its core. 
                We rely on clean code patterns, defensive database structures, hardened authentication barriers, 
                and seamless API integrations to secure longevity and flawless operational metrics.
              </motion.p>
            </div>

            {/* Core Trust Quality Standards Checklist */}
            <div className="space-y-6 pt-4 border-t border-zinc-900/60 max-w-2xl">
              <h3 className="text-xxs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                Our Engineering Standards
              </h3>

              <div className="grid grid-cols-1 gap-6">
                
                {/* 1. Scalability & Load Bounds */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transitionEase, delay: 0.25 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-zinc-200">Scalability & Load Bounds</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Engineered with decoupled routing pipelines and optimized data collections to absorb sudden traffic surges.
                    </p>
                  </div>
                </motion.div>

                {/* 2. System Resilience */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transitionEase, delay: 0.3 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-zinc-200">System Resilience</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Defensive schemas, complete validation safeguards, and strict JWT authentication secure integrity at every node.
                    </p>
                  </div>
                </motion.div>

                {/* 3. UX & Performance Precision */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transitionEase, delay: 0.35 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-zinc-200">UX & Performance Precision</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Zero layout shifts (CLS), GPU-accelerated motion offsets, and responsive fluid grids assure premium client presentation.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
