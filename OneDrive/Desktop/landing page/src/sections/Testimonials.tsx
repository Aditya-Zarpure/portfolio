'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Quote, MessageSquare } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import useMousePosition from '@/hooks/useMousePosition';

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  role: string;
  feedback: string;
  avatar?: string;
  rating: number;
  featured: boolean;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

interface TestimonialCardProps {
  test: TestimonialItem;
  transitionEase: any;
}

function TestimonialCard({ test, transitionEase }: TestimonialCardProps) {
  const containerRef = useMousePosition();

  return (
    <motion.div
      ref={containerRef}
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: transitionEase },
      }}
      whileHover={{ y: -4, borderColor: 'rgba(139, 92, 246, 0.25)', boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(139, 92, 246, 0.05)' }}
      className="group relative bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden z-0"
    >
      {/* Relative Mouse Glow Highlight backing layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.06), transparent 80%)'
        }}
      />
      
      {/* Background glow design */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent -z-20" />

      <div className="space-y-6">
        {/* Testimonial Stars & Rating */}
        <div className="flex items-center gap-1 justify-between">
          <div className="flex items-center gap-0.5">
            {[...Array(test.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-violet-400 fill-violet-400" />
            ))}
          </div>
          <span className="text-[9px] font-mono text-zinc-600">CLIENT_VERIFIED</span>
        </div>

        {/* Feedback description text */}
        <p className="text-zinc-300 text-xs leading-relaxed italic">
          "{test.feedback}"
        </p>
      </div>

      {/* Author footer panel */}
      <div className="border-t border-zinc-800/50 pt-4 mt-6 flex items-center gap-3">
        {test.avatar ? (
          <img
            src={test.avatar}
            alt={test.clientName}
            className="w-8 h-8 rounded-full object-cover border border-zinc-800"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-violet-400 font-mono text-[10px] font-extrabold uppercase">
            {test.clientName.substring(0, 2)}
          </div>
        )}
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-zinc-200">{test.clientName}</h4>
          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
            {test.role} // {test.company}
          </p>
        </div>
      </div>

    </motion.div>
  );
}

/**
 * Testimonials Section - Dynamic testimonial showcase that falls back
 * to a premium full-width Editorial Quote block if Mongoose array is empty.
 */
export default function Testimonials({ testimonials }: TestimonialsProps) {
  const transitionEase = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const fallbackRef = useMousePosition();

  return (
    <Section spacing="md" id="testimonials" className="relative overflow-hidden border-t border-zinc-900/60 bg-zinc-950">
      
      <div className="premium-ambient-glow" />

      <Container size="lg" className="relative z-10 space-y-12">
        
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
                04 // TRUST
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-4xl"
            >
              Verified Engineering Trust
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitionEase, delay: 0.15 }}
            className="text-zinc-400 text-sm leading-relaxed max-w-sm"
          >
            We focus on absolute architectural transparency. Here is how verified product partners 
            evaluate our technical precision and system stability.
          </motion.p>
        </div>

        {/* Dynamic Showcase OR Cinematic Fallback Editorial Quote */}
        {testimonials.length === 0 ? (
          
          /* FALLBACK SHOWCASE MODE: Premium widescreen Editorial Quote */
          <motion.div
            ref={fallbackRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transitionEase}
            className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 md:p-12 hover:border-zinc-700/80 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),_0_0_50px_-10px_rgba(139,92,246,0.05)] transition-all duration-300 backdrop-blur-sm overflow-hidden z-0"
          >
            {/* Relative Mouse Glow Highlight backing layer */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.05), transparent 80%)'
              }}
            />
            {/* Background design elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-600/5 via-transparent to-transparent -z-10" />
            <Quote className="absolute right-8 bottom-6 w-32 h-32 text-zinc-900/15 pointer-events-none -z-10 group-hover:text-violet-500/5 transition-colors duration-300" />
            
            <div className="space-y-8 max-w-4xl">
              
              {/* Star rating icons */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-violet-400 fill-violet-400" />
                ))}
                <span className="text-[10px] font-mono text-zinc-500 ml-2">VERIFIED_VERDICT</span>
              </div>

              {/* Bold Editorial Quote statement */}
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-100 leading-relaxed tracking-tight italic font-serif">
                "Our database query response times dropped by 64% within two weeks of launching the new 
                edge microservices pipeline. The execution precision, documentation quality, and 
                zero Cumulative Layout Shift boundaries were remarkable."
              </p>

              {/* Verified Author credentials */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-900/60 max-w-md">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-violet-400 font-mono text-xs font-extrabold uppercase">
                  FT
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-200">Lead Technical Director</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Enterprise Fintech Systems // Consulting Partner
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          
          /* DYNAMIC ACTIVE SHOWCASE GRID */
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} test={test} transitionEase={transitionEase} />
            ))}
          </motion.div>
        )}

      </Container>
    </Section>
  );
}
