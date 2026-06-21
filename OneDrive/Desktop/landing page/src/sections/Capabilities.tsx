'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, LayoutDashboard, Brain, Link2, Workflow, Smartphone, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import useMousePosition from '@/hooks/useMousePosition';

interface CapabilityItem {
  id: string;
  code: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  specs: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'saas',
    code: 'CAP_01',
    icon: AppWindow,
    title: 'SaaS Platforms',
    description: 'Engineering multi-tenant software systems designed to manage scalable user accounts, transactional pipelines, and SaaS operations.',
    specs: [
      'Multi-tenant DB structures',
      'Dynamic cache pipelines',
      'Stripe billing API integrations',
    ],
  },
  {
    id: 'dashboards',
    code: 'CAP_02',
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    description: 'Constructing robust operational command centers allowing secure management of collections, reordering pipelines, and data charts.',
    specs: [
      'Secure MongoDB CRUD services',
      'Fast inline editing inputs',
      'High-performance batch reordering',
    ],
  },
  {
    id: 'ai',
    code: 'CAP_03',
    icon: Brain,
    title: 'AI-Integrated Systems',
    description: 'Orchestrating intelligent middleware layers to connect large language models, semantic vector databases, and async background workers.',
    specs: [
      'LLM orchestration middleware',
      'Semantic search query maps',
      'Robust async queue workers',
    ],
  },
  {
    id: 'apis',
    code: 'CAP_04',
    icon: Link2,
    title: 'Hardened API Gateways',
    description: 'Designing fast, secure, rate-limited REST endpoints providing clean JSON streams protected by strict validation boundaries.',
    specs: [
      'jose JWT token auth validation',
      'Strict CORS policy controls',
      'Zod input schema sanitization',
    ],
  },
  {
    id: 'automations',
    code: 'CAP_05',
    icon: Workflow,
    title: 'Business Automations',
    description: 'Building automated task runners that handle scheduled bulk synchronization pipelines, logging notifications, and routine cron cleanups.',
    specs: [
      'Scheduled cron timer tasks',
      'Bulk data processing scripts',
      'Automated SMTP mail triggers',
    ],
  },
  {
    id: 'interfaces',
    code: 'CAP_06',
    icon: Smartphone,
    title: 'Responsive Interfaces',
    description: 'Developing high-fidelity frontends featuring aspect-ratio lock boundaries, GPU-accelerated motion layers, and strict zero-CLS targets.',
    specs: [
      'Fluid responsive container grids',
      'GPU layout motion translations',
      'Strict zero Cumulative Layout Shift',
    ],
  },
];

interface CapabilityCardProps {
  cap: CapabilityItem;
  transitionEase: any;
}

function CapabilityCard({ cap, transitionEase }: CapabilityCardProps) {
  const containerRef = useMousePosition();
  const Icon = cap.icon;

  return (
    <motion.div
      ref={containerRef}
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: transitionEase },
      }}
      whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.25)', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(139, 92, 246, 0.05)' }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden z-0"
    >
      {/* Relative Mouse Glow Highlight backing layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.06), transparent 80%)'
        }}
      />
      
      {/* Background decorative shine overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent -z-20" />

      <div className="space-y-6">
        {/* Top Meta header */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold font-mono text-zinc-600 tracking-wider">
            {cap.code}
          </span>
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800/60 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h3 className="font-bold text-zinc-100 text-sm leading-snug group-hover:text-violet-400 transition-colors duration-300">
            {cap.title}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            {cap.description}
          </p>
        </div>
      </div>

      {/* monospaced checklist specs specs */}
      <div className="border-t border-zinc-800/50 pt-4 mt-6">
        <ul className="space-y-1.5">
          {cap.specs.map((spec, i) => (
            <li key={i} className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-violet-500/50 flex-shrink-0" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>

    </motion.div>
  );
}

/**
 * Capabilities Section - Modern grid showcasing specific engineering outputs 
 * and Mongoose/React specifications instead of generic percentage skill sliders.
 */
export default function Capabilities() {
  const transitionEase = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <Section spacing="md" id="capabilities" className="relative overflow-hidden border-t border-zinc-900/60 bg-zinc-950">
      
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
                02 // CAPABILITIES
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-4xl"
            >
              High-Fidelity Engineering Capabilities
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitionEase, delay: 0.15 }}
            className="text-zinc-400 text-sm leading-relaxed max-w-sm"
          >
            We do not build generic minimum viable templates. We craft mature software solutions 
            designed to endure production-grade system loads.
          </motion.p>
        </div>

        {/* Capabilities Staggered Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.id} cap={cap} transitionEase={transitionEase} />
          ))}
        </motion.div>

      </Container>
    </Section>
  );
}
