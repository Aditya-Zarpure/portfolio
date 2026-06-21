'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, FileText, Layout, Code2, Rocket, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

interface StepItem {
  number: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

const STEPS: StepItem[] = [
  {
    number: '01',
    icon: Target,
    title: 'Discovery & Audit',
    subtitle: 'Auditing bottlenecks & mapping functional scope.',
    description: 'We align on your long-term product objectives, audit any active performance bottlenecks, analyze database load capacities, and define strict success metrics before a single line of code is written.',
    deliverable: 'System Requirements Document',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Technical Planning',
    subtitle: 'Structuring schema indexes & rate limits.',
    description: 'We construct full database schema blueprints, map dependency trees, define rate-limiting policies, establish secure JWT cookie strategies, and choose the optimal hosting frameworks.',
    deliverable: 'Technical Architecture Blueprint',
  },
  {
    number: '03',
    icon: Layout,
    title: 'Design & Architecture',
    subtitle: 'Structuring relational schemas & responsive layers.',
    description: 'We draft optimized Mongoose database schemas and construct responsive layout boundaries. This step guarantees perfect visual assets framing and a strict zero Cumulative Layout Shift target.',
    deliverable: 'Database Schema & Wireframe Blueprint',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Precision Development',
    subtitle: 'Engineering clean APIs & secure dashboard layers.',
    description: 'We develop modular backend REST endpoints, implement secure middleware filters, build responsive UI sections using Framer Motion, and hook real-time Cloudinary asset streams.',
    deliverable: 'Production-Grade Repository',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Optimization & Edge Deploy',
    subtitle: 'Tuning query latencies & automated pipelines.',
    description: 'We set up database caching, configure Next.js static rendering parameters, optimize image assets sizes, and launch the platform using dynamic CI/CD deployment pipelines on edge nodes.',
    deliverable: 'Edge-Cloud Live Deployment',
  },
];

/**
 * Process / Workflow Section - Widescreen editorial timeline progression
 * mapping concrete engineering phases and monospaced deliverables.
 */
export default function Workflow() {
  const transitionEase = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <Section spacing="md" id="workflow" className="relative overflow-hidden border-t border-zinc-900/60 bg-zinc-950">
      
      <div className="premium-ambient-glow" />

      <Container size="lg" className="relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900/60 pb-8">
          <div className="space-y-4 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transitionEase}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-violet-400 uppercase">
                03 // WORKFLOW
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-4xl"
            >
              Strategic Product Lifecycle
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitionEase, delay: 0.15 }}
            className="text-zinc-400 text-sm leading-relaxed max-w-sm"
          >
            We maintain strict software transparency from the initial system architecture audit 
            down to the automated edge nodes distribution.
          </motion.p>
        </div>

        {/* Cinematic Step Progression Timeline */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12 space-y-12">
          
          {/* Vertical timeline connector pipe */}
          <div className="absolute left-[9px] sm:left-4 lg:left-5 top-2 bottom-2 w-[1px] bg-gradient-to-b from-zinc-800 via-zinc-800/40 to-transparent" />

          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ ...transitionEase, delay: idx * 0.04 }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group"
              >
                
                {/* Timeline connector circle node */}
                <div className="absolute -left-[23px] sm:-left-[29px] lg:-left-[32px] w-[11px] h-[11px] rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center group-hover:border-violet-400 transition-colors duration-300">
                  <div className="w-[3px] h-[3px] rounded-full bg-zinc-700 group-hover:bg-violet-400 transition-colors" />
                </div>

                {/* Left Offset: Number & Deliverable tag */}
                <div className="lg:col-span-4 flex lg:flex-col items-baseline justify-between lg:justify-start lg:gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-700 group-hover:text-violet-500/80 transition-colors duration-300">
                      {step.number}
                    </span>
                    <span className="h-[1px] w-8 bg-zinc-800 hidden lg:inline-block" />
                    <h3 className="text-sm font-bold text-zinc-200 group-hover:text-violet-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Monospaced Deliverable badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                    <span>DELIVERABLE:</span>
                    <span className="text-zinc-300 font-semibold">{step.deliverable}</span>
                  </div>
                </div>

                {/* Right Description content */}
                <div className="lg:col-span-8 space-y-1.5 pt-1 lg:pl-4">
                  <h4 className="text-xs font-semibold text-zinc-300 leading-snug">
                    {step.subtitle}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed max-w-3xl">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            );
          })}

        </div>

      </Container>
    </Section>
  );
}
