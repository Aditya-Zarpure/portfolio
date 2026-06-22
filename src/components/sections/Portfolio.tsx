"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import { ShieldCheck, Zap, Bot, FileText, Lock, FileType } from 'lucide-react';

const projects = [
  {
    id: "01",
    name: "PDFsHero \u2014 Privacy-First Document Suite",
    description: "A fully offline-first document toolkit that converts, merges, compresses, and edits PDFs entirely on the user's device. Powered by WebAssembly engines (QPDF, PDFium) and Mozilla's PDF.js for parsing \u2014 paired with Tesseract OCR and Gemini AI for document Q&A. No file ever touches a server.",
    tags: ["Next.js 16", "React 19", "TypeScript", "pdf-lib", "Tesseract OCR", "Gemini AI", "+6 more"],
    url: "https://pdfshero.com/",
    capabilities: [
      { icon: <ShieldCheck size={16} />, text: "100% Client-Side Processing" },
      { icon: <Zap size={16} />, text: "WebAssembly Powered" },
      { icon: <Bot size={16} />, text: "AI Document Q&A" }
    ]
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
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-6"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            variants={itemVariants}
            className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-[4px] overflow-hidden hover:border-[rgba(201,169,110,0.3)] transition-all duration-[400ms] ease-out flex flex-col"
          >
            {/* Custom CSS Poster Banner */}
            <div className="relative w-full h-[320px] md:h-[480px] bg-[var(--bg)] overflow-hidden flex flex-col items-center justify-center">
              {/* Scalable Container for hover effect */}
              <div className="absolute inset-0 w-full h-full scale-100 group-hover:scale-[1.03] transition-transform duration-[400ms] ease-out">
                {/* Layered Gradient Mesh */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 20% 20%, rgba(201,169,110,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(80,80,200,0.08) 0%, transparent 60%)'
                  }}
                />
                
                {/* Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(to right, var(--text-primary) 0, var(--text-primary) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(to bottom, var(--text-primary) 0, var(--text-primary) 1px, transparent 1px, transparent 40px)'
                  }}
                />

                {/* Floating Icons */}
                <Lock size={32} className="absolute top-[15%] left-[10%] text-[var(--text-primary)] opacity-8 -rotate-12" />
                <FileType size={40} className="absolute bottom-[20%] left-[15%] text-[var(--text-primary)] opacity-8 rotate-6" />
                <Zap size={36} className="absolute top-[25%] right-[12%] text-[var(--text-primary)] opacity-8 rotate-12" />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <FileText size={32} className="text-[var(--accent)] mb-[16px]" />
                  <h3 className="font-display italic text-[var(--text-primary)] leading-none m-0" style={{ fontSize: '56px' }}>
                    PDFsHero
                  </h3>
                  <div className="w-[60px] h-[1px] bg-[var(--accent)] my-[20px]" />
                  <div className="font-body text-[var(--text-muted)] uppercase tracking-[0.15em]" style={{ fontSize: '13px' }}>
                    CONVERT &middot; COMPRESS &middot; SECURE
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-[28px] md:p-[40px] flex flex-col flex-grow">
              <div className="text-[11px] text-[var(--text-muted)] tracking-[0.2em] font-body mb-[12px]">
                {project.id}
              </div>
              <h3 className="font-display text-[28px] text-[var(--text-primary)] mb-[16px]">
                {project.name}
              </h3>
              <p className="text-[15px] text-[var(--text-muted)] font-body leading-[1.8] mb-[24px] max-w-[800px]">
                {project.description}
              </p>
              
              {/* Key Capabilities */}
              <div className="flex flex-col md:flex-row gap-[12px] md:gap-[24px] mb-[32px]">
                {project.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-[8px] text-[13px] text-[var(--text-primary)] font-body">
                    <span className="text-[var(--accent)]">{cap.icon}</span>
                    <span>{cap.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-[8px] mb-[40px]">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] font-body text-[11px] px-[12px] py-[6px] rounded-[2px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--accent)] text-[14px] font-body relative w-max mt-auto group/link">
                View Live Site &rarr;
                <span className="absolute left-0 bottom-[-4px] h-[1px] bg-[var(--accent)] w-0 group-hover/link:w-full transition-all duration-[400ms] ease-out" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Portfolio;
