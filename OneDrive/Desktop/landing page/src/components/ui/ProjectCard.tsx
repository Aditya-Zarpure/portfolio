'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import useMousePosition from '@/hooks/useMousePosition';
import { trackProjectClick } from '@/utils/analytics';

interface ProjectCardProps {
  project: {
    title: string;
    slug: string;
    shortDescription: string;
    thumbnail: string;
    techStack: string[];
    category: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

/**
 * Reusable project showcase card display module.
 * Provides micro-animations on hover and lists stacks/links.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useMousePosition();

  return (
    <motion.div
      ref={containerRef}
      whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.25)', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(139, 92, 246, 0.05)' }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full group backdrop-blur-md cursor-pointer relative z-0"
    >
      {/* Relative Mouse Glow Highlight backing layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.06), transparent 80%)'
        }}
      />
      {/* Thumbnail */}
      {project.title === 'PDFsHero' ? (
        <div className="relative aspect-video w-full overflow-hidden bg-[#0C0C0C] rounded-t-xl">
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0 L0 0 0 40" stroke="#F0EBE1" strokeOpacity="0.04" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#grid)" />
            {/* Soft circles */}
            <circle cx="80" cy="60" r="70" fill="#C9A96E" fillOpacity="0.05" />
            <circle cx="320" cy="140" r="70" fill="#C9A96E" fillOpacity="0.04" />
          </svg>
          {/* Center content */}
          <div className="relative flex flex-col items-center justify-center h-full text-center text-[#F0EBE1]">
            {/* Small document icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="#C9A96E" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3h8v4" />
              <rect x="6" y="7" width="12" height="14" rx="2" stroke="#C9A96E" />
            </svg>
            <h2 className="font-serif italic text-[56px]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>PDFsHero</h2>
            <hr className="border-t border-[#C9A96E] w-15 my-2" />
            <p className="uppercase tracking-wider text-[12px] text-[#6B6560]" style={{ letterSpacing: '3px' }}>CONVERT · COMPRESS · SECURE</p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/60">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
        <span className="absolute top-3 left-3 bg-zinc-950/90 text-zinc-300 text-xxs font-bold uppercase tracking-wider rounded px-2.5 py-1 backdrop-blur-sm border border-zinc-800/80">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-zinc-100 text-base group-hover:text-violet-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">{project.shortDescription}</p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-zinc-900/80 text-zinc-300 text-[10px] font-medium font-mono border border-zinc-800/80 rounded px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs font-semibold border-t border-zinc-800/60 pt-3">
            {project.liveUrl && (
              <a
                onClick={() => trackProjectClick(`${project.slug} - Grid - Live`)}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-100 hover:text-violet-400 flex items-center gap-1 transition-colors font-mono uppercase tracking-wider text-[10px] group/link"
              >
                Live Demo
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-violet-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-200" />
              </a>
            )}
            {project.githubUrl && (
              <a
                onClick={() => trackProjectClick(`${project.slug} - Grid - Code`)}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors font-mono uppercase tracking-wider text-[10px] group/code"
              >
                Code
                <span className="group-hover/code:translate-x-0.5 transition-transform duration-200 text-[10px]">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
