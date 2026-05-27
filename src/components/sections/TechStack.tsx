"use client";

const techList = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", 
  "Tailwind CSS", "Prisma", "Figma", "Git", "Vercel", 
  "REST APIs", "Framer Motion"
];

// Duplicate the array so it can loop seamlessly
const marqueeItems = [...techList, ...techList];

const TechStack = () => {
  return (
    <section className="py-[60px] border-y border-[var(--border)] overflow-hidden relative bg-[var(--bg)]">
      {/* Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none z-10" />

      <div className="text-[11px] tracking-[0.2em] text-[var(--text-muted)] text-center uppercase font-body mb-[40px]">
        Technologies I Work With
      </div>

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((tech, index) => (
          <div key={index} className="flex items-center">
            <span className="text-[14px] text-[var(--text-muted)] whitespace-nowrap px-[32px] font-body">
              {tech}
            </span>
            <span className="text-[var(--accent)] font-bold">&middot;</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
