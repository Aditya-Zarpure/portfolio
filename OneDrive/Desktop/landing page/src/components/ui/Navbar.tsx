'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Container from './Container';

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
  { label: 'Workflow', href: '#workflow', id: 'workflow' },
  { label: 'Showcase', href: '#showcase', id: 'showcase' },
  { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

/**
 * Premium Floating Glassmorphic Navbar - Handles scroll-responsive layout scaling,
 * intersection-observer active section highlights, spring-loaded sliding backdrops,
 * tactile hover/click triggers, and a dynamic mobile menu drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Easing profile for premium transitions
  const transitionEase = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  useEffect(() => {
    // 1. Scroll-driven scaling and glassmorphism activation
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. High-performance IntersectionObserver for active link highlights
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Target focus on middle-upper viewport segment
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each target page section
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Also observe showcase parent container (main tag) as a fallback
    const showcaseContainer = document.getElementById('showcase');
    if (showcaseContainer) observer.observe(showcaseContainer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler with offset calibration
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Compensate for navbar floating height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 py-4">
      <Container
        size="lg"
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'max-w-4xl md:max-w-5xl rounded-full bg-zinc-950/45 border border-zinc-900/60 backdrop-blur-md py-3 px-6 shadow-xl shadow-zinc-950/20'
            : 'max-w-7xl py-5 px-4 bg-transparent border-transparent py-4'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* LOGO: Left side Brand Accent */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
            }}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 transition-colors duration-300">
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-zinc-100 group-hover:text-violet-400 transition-colors duration-300">
              Studio // Digital
            </span>
          </a>

          {/* DESKTOP NAV LIST: Sliding indicator tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-zinc-950/20 border border-zinc-900/40 rounded-full p-1 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              // Standardize showcase fallback selection
              const isSelected = activeSection === item.id || (item.id === 'showcase' && activeSection === 'showcase');
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`relative px-4 py-1.5 text-xxs font-semibold uppercase tracking-wider font-mono transition-colors focus:outline-none rounded-full cursor-pointer ${
                    isSelected ? 'text-zinc-100 font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeNavLinkBackdrop"
                      className="absolute inset-0 bg-zinc-900/80 border border-zinc-800/40 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION: Tactile CTA Trigger */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              whileHover={{ translateY: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-800 text-xxs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:bg-zinc-900/40 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Initiate Pipeline
              <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </motion.a>
          </div>

          {/* MOBILE TOGGLE TRIGGER */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 focus:outline-none hover:text-zinc-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </Container>

      {/* MOBILE DRAWER: Sliding Staggered Panels */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitionEase}
            className="absolute top-full left-4 right-4 mt-2 bg-zinc-950/95 border border-zinc-900/80 rounded-2xl p-6 backdrop-blur-lg shadow-2xl flex flex-col gap-6 md:hidden z-40 pointer-events-auto"
          >
            <div className="space-y-4">
              <span className="text-[9px] font-bold font-mono tracking-widest text-zinc-600 uppercase block border-b border-zinc-900/60 pb-2">
                Menu Pipeline
              </span>
              <nav className="flex flex-col gap-3.5">
                {NAV_ITEMS.map((item, i) => {
                  const isSelected = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleScrollTo(e, item.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between py-1 border-b border-zinc-900/20 ${
                        isSelected ? 'text-violet-400' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[9px] font-mono text-zinc-700">0{i + 1}</span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors hover:bg-zinc-200 text-center"
            >
              Initiate Pipeline
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
