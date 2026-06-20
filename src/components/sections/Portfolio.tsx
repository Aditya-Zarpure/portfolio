"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import Link from 'next/link';

const projects = [
  {
    id: "01",
    name: "PDFShero",
    description: "A privacy-first document conversion tool that converts files to PDF, Word, and other formats \u2014 entirely on the user's device. No data is ever uploaded or stored, making it one of the fastest document tools on the web.",
    tags: ["Privacy-First", "Client-Side Processing", "Document Tools"],
    bgClass: "bg-[#1a1a1a]",
    url: "https://pdfshero.com/"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="work">
      <div className="flex items-end justify-between mb-[64px]">
        <div>
          <SectionLabel className="mb-[16px]">Selected Work</SectionLabel>
          <h2 
            className="font-display font-light text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Featured Work
          </h2>
        </div>
        <Link 
          href="#" 
          className="hidden md:inline-block text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body mb-2"
        >
          All projects &rarr;
        </Link>
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            variants={itemVariants}
            className={`group relative bg-[var(--surface)] border border-[var(--border)] rounded-[4px] overflow-hidden hover:border-[rgba(201,169,110,0.3)] transition-all duration-[400ms] ease-out flex flex-col ${
              index === 0 ? 'md:col-span-2' : 'col-span-1'
            }`}
          >
            {/* Image Area */}
            <div className={`relative w-full ${index === 0 ? 'h-[280px] md:h-[400px]' : 'h-[280px]'} ${project.bgClass}`}>
              <div className="absolute inset-0 bg-[rgba(201,169,110,0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out" />
            </div>
            
            {/* Content Area */}
            <div className="p-[28px] flex flex-col flex-grow">
              <div className="text-[11px] text-[var(--text-muted)] tracking-[0.2em] font-body mb-[12px]">
                {project.id}
              </div>
              <h3 className="font-display text-[24px] text-[var(--text-primary)] mb-[8px]">
                {project.name}
              </h3>
              <p className="text-[14px] text-[var(--text-muted)] font-body mb-[24px]">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-[8px] mb-[32px] mt-auto">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] font-body text-[11px] px-[10px] py-[4px] rounded-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--accent)] text-[13px] font-body relative w-max mt-auto">
                View Project &rarr;
                <span className="absolute left-0 bottom-[-4px] h-[1px] bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-[400ms] ease-out" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Mobile-only "All projects" link */}
      <div className="mt-[40px] flex justify-center md:hidden">
        <Link 
          href="#" 
          className="text-[13px] text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body"
        >
          All projects &rarr;
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;
