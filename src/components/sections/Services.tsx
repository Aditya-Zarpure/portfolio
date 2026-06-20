"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Code2, Zap, RefreshCw } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionLabel from '@/components/ui/SectionLabel';

const services = [
  {
    title: "Web Development",
    icon: <Code2 size={24} className="text-[var(--accent)] mb-[20px]" />,
    description: "Building fast, scalable websites using modern frameworks like React and Next.js."
  },
  {
    title: "Frontend Design",
    icon: <Layers size={24} className="text-[var(--accent)] mb-[20px]" />,
    description: "Designing clean, intuitive interfaces focused on usability and visual polish."
  },
  {
    title: "Bug Fixes",
    icon: <Zap size={24} className="text-[var(--accent)] mb-[20px]" />,
    description: "Diagnosing and resolving issues quickly to keep your site running smoothly."
  },
  {
    title: "Website Renovation",
    icon: <RefreshCw size={24} className="text-[var(--accent)] mb-[20px]" />,
    description: "Modernizing outdated websites with fresh design and improved performance."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="services">
      <div className="mb-[64px]">
        <SectionLabel className="mb-[16px]">What I Do</SectionLabel>
        <h2 
          className="font-display font-light text-[var(--text-primary)]"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          Services
        </h2>
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="group relative bg-[var(--surface)] border border-[var(--border)] p-[36px] rounded-[4px] hover:border-[rgba(201,169,110,0.4)] hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
          >
            <span className="absolute top-0 left-0 h-[1px] bg-[var(--accent)] w-0 group-hover:w-full transition-all duration-300 ease-out" />
            {service.icon}
            <h3 className="font-display text-[20px] font-normal text-[var(--text-primary)] mb-[12px]">
              {service.title}
            </h3>
            <p className="text-[14px] text-[var(--text-muted)] leading-[1.7] font-body">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Services;
