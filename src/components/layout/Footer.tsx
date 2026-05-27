"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] pt-[48px] pb-[32px] w-full bg-[var(--bg)] mt-auto">
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[32px] md:gap-0">
          
          {/* LEFT */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="#" className="font-display text-[20px] text-[var(--text-primary)]">
              Your Name
            </Link>
            <div className="text-[12px] text-[var(--text-muted)] mt-[4px] font-body">
              Freelance Web Developer
            </div>
          </div>

          {/* CENTER */}
          <nav className="flex flex-wrap justify-center gap-[24px]">
            <Link href="#work" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body">
              Work
            </Link>
            <Link href="#about" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body">
              About
            </Link>
            <Link href="#services" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body">
              Services
            </Link>
            <Link href="#contact" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 font-body">
              Contact
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-[20px]">
            <a href="#" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="border-t border-[var(--border)] pt-[24px] mt-[32px] flex flex-col md:flex-row justify-between items-center gap-[16px] md:gap-0 text-[12px] text-[var(--text-muted)] font-body text-center md:text-left">
          <p>&copy; 2025 Your Name. All rights reserved.</p>
          <p>Designed &amp; Built with precision.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
