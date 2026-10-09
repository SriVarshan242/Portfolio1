"use client";

import { useRef, useEffect, useState } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Combine and sort entries (assuming descending order)
  const allEntries = [
    ...EDUCATION.map(e => ({ ...e, type: 'education' })),
    ...EXPERIENCE.map(e => ({ ...e, type: 'experience' }))
  ];
  
  // Custom sort to handle string years simply
  allEntries.sort((a, b) => {
    const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA; // Descending
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the section
      // Start when top hits middle of screen (0%)
      // End when bottom hits middle of screen (100%)
      const start = rect.top - windowHeight / 2;
      const end = rect.bottom - windowHeight / 2;
      const total = end - start;
      
      let p = -start / total;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="section-pad bg-card border-y border-line" ref={sectionRef}>
      <div className="content-width max-w-4xl">
        <div className="flex items-baseline gap-4 mb-12 md:mb-24 flex-wrap">
          <span className="font-mono text-mute">05 — Experience</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Where I&apos;ve <span className="font-serif italic text-mute">been.</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Spine Track */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-line" />
          
          {/* Active Spine */}
          <div 
            className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] -ml-[1px] bg-ink origin-top"
            style={{ height: '100%', transform: `scaleY(${progress})` }}
          />

          <div className="flex flex-col gap-12 md:gap-24 relative">
            {allEntries.map((entry, i) => {
              // Calculate roughly when this item should light up based on its position in the list
              const threshold = i / (allEntries.length + 1); // +1 for the "Next" card
              const isLit = progress >= threshold;

              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between group ${isLit ? 'opacity-100' : 'opacity-40'} transition-opacity duration-500`}>
                  
                  {/* Node */}
                  <div className={`absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10 ${isLit ? 'bg-ink border-ink' : 'bg-card border-line'}`} />

                  {/* Left Side (Year on Desktop, or Top on Mobile) */}
                  <div className="md:w-[45%] text-left md:text-right md:pr-12 mb-2 md:mb-0">
                    <span className={`font-mono text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-300 ${isLit ? 'text-ink' : 'text-mute'}`}>
                      {entry.year}
                    </span>
                  </div>

                  {/* Right Side (Content) */}
                  <div className="md:w-[45%] md:pl-12">
                    <h3 className="text-2xl font-bold tracking-tighter mb-2">{entry.title}</h3>
                    <h4 className="text-ink-2 font-medium mb-3">{entry.place}</h4>
                    <p className="text-mute text-sm leading-relaxed">{entry.detail}</p>
                    
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 rounded-full border border-line text-[10px] font-mono text-mute uppercase tracking-widest">
                        {entry.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Next Card */}
            <div className={`relative flex flex-col md:flex-row items-start justify-center mt-12 md:mt-24 transition-opacity duration-500 ${progress >= 0.95 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
              <div className="w-full max-w-sm rounded-[24px] border-2 border-dashed border-mute p-8 text-center bg-paper relative z-10">
                <span className="font-mono text-sm text-mute uppercase tracking-widest mb-4 block">Next</span>
                <h3 className="text-3xl font-bold tracking-tighter text-ink-2">Your team?</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
