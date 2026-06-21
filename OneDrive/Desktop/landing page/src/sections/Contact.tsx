'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Sparkles, Clock, ShieldCheck, Mail } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import useMousePosition from '@/hooks/useMousePosition';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { contactMessageSchema } from '@/utils/validators';
import { trackContactSuccess, trackContactValidationError } from '@/utils/analytics';

/**
 * Premium Contact Section - Conversional endpoint of the landing page,
 * featuring interactive input fields, client-side Zod validators, loading indicators,
 * and high-fidelity Framer Motion success panel overlays.
 */
export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const transitionEase = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  const contactCardRef = useMousePosition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setSuccess(null);

    // 1. Validate on the client using Zod contactMessageSchema
    const validation = contactMessageSchema.safeParse({ name, email, subject, message });
    
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(formattedErrors);
      trackContactValidationError(Object.keys(formattedErrors));
      return;
    }

    // 2. Submit payload to backend Open API route
    setIsLoading(true);
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setApiError(result.message || 'Inquiry submission failed. Please try again.');
      } else {
        setSuccess(result.message || 'Thank you! Your message has been received.');
        trackContactSuccess(subject);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      setApiError('A network error occurred. Please check your connection and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section spacing="md" id="contact" className="relative overflow-hidden border-t border-zinc-900/60 bg-zinc-950">
      
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
                05 // CONNECT
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight sm:text-4xl"
            >
              Let's Build Something Modern
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitionEase, delay: 0.15 }}
            className="text-zinc-400 text-sm leading-relaxed max-w-sm"
          >
            Have a product concept, microservices architecture, or complex systems pipeline 
            to engineer? Shoot us an inquiry.
          </motion.p>
        </div>

        {/* Widescreen Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Communication trust values */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-start">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md"
            >
              <Clock className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xxs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Direct response within 24 hours
              </span>
            </motion.div>

            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed max-w-md">
              <p>
                We do not deal in generic freelancing models or templates. We align with founders, 
                CTOs, and digital product agencies as an independent development partner.
              </p>
              <p>
                From structural database schema wireframes to optimized GPU motion triggers, 
                we execute systems built to scale.
              </p>
            </div>

            {/* Micro Trust Checklist */}
            <div className="space-y-4 pt-6 border-t border-zinc-900/60 w-full max-w-md font-mono text-[10px] text-zinc-500">
              <h4 className="font-bold text-zinc-400 uppercase tracking-widest mb-2">
                Operational Trust Layer
              </h4>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Product-first architectural scopes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Strict non-disclosure standards</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                <span>Zero transactional client pressure</span>
              </div>
            </div>

          </div>

          {/* Right Block: Slick Glassmorphic Form Card */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              ref={contactCardRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transitionEase, delay: 0.25 }}
              className="relative bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md overflow-hidden shadow-2xl z-0 group"
            >
              {/* Relative Mouse Glow Highlight backing layer */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.05), transparent 80%)'
                }}
              />
              
              {/* Background shine */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/10 via-transparent to-transparent -z-20" />

              <AnimatePresence mode="wait">
                {!success ? (
                  
                  /* Dynamic Inbound Inquiry Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    exit={{ opacity: 0, y: -20 }}
                    transition={transitionEase}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name field */}
                      <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errors.name}
                        disabled={isLoading}
                        className="bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-100 placeholder-zinc-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/60 rounded-lg p-3 text-xs sm:text-sm font-sans transition-all backdrop-blur-sm"
                        // Custom override for label style
                        labelClassName="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1.5 block font-semibold"
                      />

                      {/* Email field */}
                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        disabled={isLoading}
                        className="bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-100 placeholder-zinc-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/60 rounded-lg p-3 text-xs sm:text-sm font-sans transition-all backdrop-blur-sm"
                        labelClassName="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1.5 block font-semibold"
                      />

                    </div>

                    {/* Subject field */}
                    <Input
                      label="Subject"
                      id="subject"
                      type="text"
                      placeholder="SaaS Product Engineering Architecture"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      error={errors.subject}
                      disabled={isLoading}
                      className="bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-100 placeholder-zinc-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/60 rounded-lg p-3 text-xs sm:text-sm font-sans transition-all backdrop-blur-sm"
                      labelClassName="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1.5 block font-semibold"
                    />

                    {/* Message body field */}
                    <Textarea
                      label="Inquiry / Message"
                      id="message"
                      placeholder="Outline your systems roadmap, technical scope, or timelines..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      error={errors.message}
                      disabled={isLoading}
                      rows={5}
                      className="bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700/80 text-zinc-100 placeholder-zinc-600 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/60 rounded-lg p-3 text-xs sm:text-sm font-sans transition-all backdrop-blur-sm resize-none"
                      labelClassName="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-1.5 block font-semibold"
                    />

                    {/* API Submission errors */}
                    {apiError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2.5 font-mono"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{apiError}</span>
                      </motion.div>
                    )}

                    {/* Primary submit action trigger */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ translateY: -1.5, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full relative group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing Pipeline...
                        </>
                      ) : (
                        <>
                          Transmit Message
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                ) : (
                  
                  /* High-fidelity Success verification panel overlay */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                    transition={transitionEase}
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                    
                    <div className="space-y-2 max-w-md">
                      <h3 className="text-lg font-bold text-zinc-100 font-sans tracking-tight">
                        Pipeline Transmission Complete
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                        {success}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ translateY: -1.5, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSuccess(null)}
                      className="px-6 py-2.5 rounded-lg border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-900/50 hover:text-zinc-100 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Transmit Another
                    </motion.button>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>

      </Container>
    </Section>
  );
}
