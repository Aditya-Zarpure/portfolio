'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Database, Activity, Terminal, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { trackCtaClick } from '@/utils/analytics';

/**
 * Premium Hero Section - Landing page hero built with clean grid structures,
 * high-fidelity Framer Motion animations, and a mature glassmorphism dashboard mockup.
 */
export default function Hero() {
  // Cubic-bezier transitions for butter-smooth animation timing
  const transitionEase = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <Section spacing="lg" className="relative overflow-hidden min-h-[90vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="premium-ambient-glow" />

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Messaging & Action Triggers */}
          <div className="lg:col-span-7 space-y-8 flex flex-col items-start text-left">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xxs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Open for engineering roles & contracts
              </span>
            </motion.div>

            {/* Headline Block */}
            <div className="space-y-4 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-zinc-100 leading-[1.02]"
              >
                Architecting high-performance{' '}
                <span className="bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  digital systems
                </span>{' '}
                for modern products.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl"
              >
                Engineering robust backend pipelines, secure APIs, and responsive frontends. 
                Translating complex system requirements into scalable, interactive user experiences.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <motion.a
                href="#showcase"
                onClick={() => trackCtaClick('Hero - View Showcase')}
                whileHover={{ translateY: -1.5, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-200 transition-all text-sm shadow-lg shadow-zinc-950/20 cursor-pointer"
              >
                View Showcase
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={() => trackCtaClick('Hero - Contact Me')}
                whileHover={{ translateY: -1.5, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-900/50 hover:text-zinc-100 transition-all text-sm backdrop-blur-sm cursor-pointer"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Trust Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-zinc-500 font-mono pt-6 border-t border-zinc-900/60 w-full"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Performance First</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                <span>Scalable Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-zinc-600" />
                <span>Product Mindset</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Layered System Dashboard Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end min-h-[420px] lg:min-h-0">
            {/* Soft Radial Ambient Glow backing the layered dashboard */}
            <div className="absolute top-1/2 left-1/2 lg:left-3/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-600/10 blur-[80px] -z-10 rounded-full" />

            <div className="relative w-full max-w-[420px] aspect-[10/9]">
              
              {/* Layer 1: Core System Monitor Card (Top Left Offset) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="absolute top-[8%] left-[2%] w-[80%] rounded-xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md p-5 shadow-2xl premium-glow"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800/60 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-mono font-semibold text-zinc-300">SYSTEM_METRICS</span>
                  </div>
                  <span className="text-xxs px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 font-mono">LIVE_200</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Latency</span>
                    <p className="text-xl font-bold text-zinc-100 font-mono">24ms</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">DB Queries</span>
                    <p className="text-xl font-bold text-zinc-100 font-mono">4.2ms</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Uptime</span>
                    <p className="text-xl font-bold text-emerald-400 font-mono">99.99%</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Cache Hit</span>
                    <p className="text-xl font-bold text-zinc-100 font-mono">98.4%</p>
                  </div>
                </div>

                {/* SVG Performance Line graph */}
                <div className="mt-4 pt-3 border-t border-zinc-800/40">
                  <svg className="w-full h-10 text-zinc-700" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0,15 Q10,12 20,8 T40,11 T60,5 T80,12 T100,2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0,15 Q10,12 20,8 T40,11 T60,5 T80,12 T100,2"
                      fill="none"
                      stroke="url(#grad)"
                      strokeWidth="1.5"
                      className="text-violet-500"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              {/* Layer 2: Floating Schema / Code Editor Card (Bottom Right Offset) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="absolute bottom-[8%] right-[2%] w-[82%] rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md p-4 shadow-2xl premium-glow"
              >
                <div className="flex items-center gap-1.5 pb-3 border-b border-zinc-800/60 mb-3">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-[10px] font-mono text-zinc-400">api/showcase/route.ts</span>
                </div>
                
                {/* Mock Code block with subtle syntax colors */}
                <div className="font-mono text-[10px] sm:text-xs leading-relaxed space-y-1 text-zinc-400">
                  <div>
                    <span className="text-zinc-600">01</span>{' '}
                    <span className="text-violet-400">export async function</span>{' '}
                    <span className="text-zinc-100">GET</span>() &#123;
                  </div>
                  <div>
                    <span className="text-zinc-600">02</span>{' '}
                    &nbsp;&nbsp;<span className="text-violet-400">await</span>{' '}
                    <span className="text-zinc-100">dbConnect</span>();
                  </div>
                  <div>
                    <span className="text-zinc-600">03</span>{' '}
                    &nbsp;&nbsp;<span className="text-violet-400">const</span>{' '}
                    <span className="text-zinc-300">projects</span> ={' '}
                    <span className="text-violet-400">await</span>{' '}
                    <span className="text-zinc-100">Project</span>.find();
                  </div>
                  <div>
                    <span className="text-zinc-600">04</span>{' '}
                    &nbsp;&nbsp;<span className="text-violet-400">return</span>{' '}
                    <span className="text-zinc-100">Response</span>.json(&#123;
                  </div>
                  <div>
                    <span className="text-zinc-600">05</span>{' '}
                    &nbsp;&nbsp;&nbsp;&nbsp;success:{' '}
                    <span className="text-emerald-400">true</span>, projects
                  </div>
                  <div>
                    <span className="text-zinc-600">06</span>{' '}
                    &nbsp;&nbsp;&#125;);
                  </div>
                  <div>
                    <span className="text-zinc-600">07</span> &#125;
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Mini Cluster Node Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[52%] left-[10%] rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 shadow-xl flex items-center gap-2 font-mono"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </div>
                <div className="text-[10px] text-zinc-300 font-semibold leading-none">NODE_US_EAST</div>
              </motion.div>
              
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
