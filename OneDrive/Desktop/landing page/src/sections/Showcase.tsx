'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Folder, Layers, Terminal } from 'lucide-react';
import Container from '@/components/ui/Container';
import ProjectCard from '@/components/ui/ProjectCard';
import useMousePosition from '@/hooks/useMousePosition';
import { trackCtaClick, trackProjectClick } from '@/utils/analytics';

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnail: string;
  techStack: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

interface ShowcaseProps {
  projects: ProjectItem[];
}

const CATEGORIES = ['All', 'Frontend', 'Fullstack', 'Mobile', 'DevOps', 'Open Source', 'Other'] as const;

/**
 * Curated Showcase Section - Features client-side animated categorization filters,
 * a cinematic widescreen featured project visual spotlight, and a responsive grid
 * of secondary projects wrapping our glassmorphism ProjectCards.
 */
export default function Showcase({ projects }: ShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Filter projects matching selected category pill
  const filteredProjects = projects.filter(
    (proj) => activeFilter === 'All' || proj.category === activeFilter
  );

  // Isolate the primary featured project within the filtered collection
  // If none explicitly marked featured, pick the first sorted item to sustain asymmetric rhythm
  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  
  // The rest are rendered in the standard staggered gallery grid below
  const gridProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  // Framer Motion timing variables
  const transitionEase = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const spotlightRef = useMousePosition();

  return (
    <section className="relative overflow-hidden w-full">
      <div className="premium-ambient-glow" />
      <Container size="lg" className="relative z-10 py-20 md:py-28 space-y-16">
      
      {/* Section Header + Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-900/60 pb-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 font-mono">
              Curated Showcase
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight sm:text-4xl">
            Selected Engineering Creations
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            A dynamic catalog of high-performance backend microservices, robust APIs, 
            and interactive frontends built to solve architectural bottlenecks.
          </p>
        </div>

        {/* Categories Filter pill navigation */}
        <div className="flex flex-wrap gap-2 items-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  trackCtaClick(`Showcase Filter - ${cat}`);
                }}
                className={`relative px-4 py-2 text-xs font-medium font-mono rounded-lg transition-colors cursor-pointer focus:outline-none ${
                  isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBackdrop"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800/80 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamic Collections Area */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={transitionEase}
            className="text-center py-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10 text-zinc-500 text-sm font-mono max-w-md mx-auto"
          >
            <Folder className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
            <span>No active projects found under "{activeFilter}".</span>
          </motion.div>
        ) : (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            
            {/* SPOTLIGHT: Cinematic Asymmetrical Featured Project Area */}
            {featuredProject && (
              <div 
                ref={spotlightRef}
                className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-6 md:p-8 hover:border-zinc-700/80 transition-all duration-300 backdrop-blur-sm overflow-hidden z-0"
              >
                {/* Relative Mouse Glow Highlight backing layer */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.05), transparent 80%)'
                  }}
                />
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/5 via-transparent to-transparent -z-20" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left: Interactive visual dashboard mockup */}
                  <div className="lg:col-span-7 relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/60 shadow-2xl">
                    <img
                      src={featuredProject.thumbnail}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                    />
                    
                    {/* Visual Overlay Status tag */}
                    <div className="absolute top-4 left-4 bg-zinc-950/80 text-zinc-300 text-xxs font-mono font-bold uppercase tracking-wider rounded-lg px-3 py-1.5 backdrop-blur-md border border-zinc-800 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                      <span>Featured Showcase</span>
                    </div>

                    {/* Bottom Console Pipeline Info Overlay */}
                    <div className="absolute bottom-4 right-4 bg-zinc-950/90 text-zinc-400 text-[10px] font-mono rounded px-2.5 py-1.5 backdrop-blur-sm border border-zinc-800/60 hidden sm:flex items-center gap-2">
                      <Terminal className="w-3 h-3 text-violet-400" />
                      <span>deploy_node: active_ok</span>
                    </div>
                  </div>

                  {/* Right: Rich Descriptive Copy */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xxs font-semibold uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" />
                      {featuredProject.category}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 group-hover:text-violet-400 transition-colors duration-300 font-sans tracking-tight">
                        {featuredProject.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {featuredProject.shortDescription}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {featuredProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-medium font-mono rounded px-2.5 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 w-full">
                      {featuredProject.liveUrl && (
                        <motion.a
                          whileHover={{ translateY: -1.5, scale: 1.01 }}
                          whileTap={{ scale: 0.985 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => trackProjectClick(`Featured - ${featuredProject.slug} - Live`)}
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-200 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
                        >
                          Explore Live
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                      
                      {featuredProject.githubUrl && (
                        <motion.a
                          whileHover={{ translateY: -1.5, scale: 1.01 }}
                          whileTap={{ scale: 0.985 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => trackProjectClick(`Featured - ${featuredProject.slug} - Code`)}
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-900/50 hover:text-zinc-100 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                            />
                          </svg>
                          Repository
                        </motion.a>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* SECONDARY GALLERY: Dynamic Staggered Base Grid */}
            {gridProjects.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xxs font-mono font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900/60 pb-3">
                  Gallery Pipeline ({gridProjects.length})
                </h3>
                
                <motion.div
                  initial="hidden"
                  animate="show"
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
                  {gridProjects.map((proj) => (
                    <motion.div
                      key={proj.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        show: { opacity: 1, y: 0, transition: transitionEase },
                      }}
                    >
                      <ProjectCard
                        project={{
                          title: proj.title,
                          slug: proj.slug,
                          shortDescription: proj.shortDescription,
                          thumbnail: proj.thumbnail,
                          techStack: proj.techStack,
                          category: proj.category,
                          liveUrl: proj.liveUrl,
                          githubUrl: proj.githubUrl,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      </Container>
    </section>
  );
}
