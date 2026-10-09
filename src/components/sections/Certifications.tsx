"use client";

import { CERTIFICATIONS } from "@/lib/data";

export function Certifications() {
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section id="certifications" className="w-full bg-card border-y border-line py-24 md:py-32 relative">
      <div className="content-width flex flex-col lg:flex-row gap-16 lg:gap-8 items-start relative z-10">
        
        {/* Left Sticky Column */}
        <div className="w-full lg:w-1/3 shrink-0 lg:sticky lg:top-32">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-mute">04 — Certifications</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Always <span className="font-serif italic text-mute">learning.</span>
          </h2>
          <p className="font-mono text-sm text-ink-2">
            {CERTIFICATIONS.length} completed courses & certifications
          </p>
        </div>

        {/* Right List */}
        <div className="w-full lg:flex-1 border-t border-line">
          {CERTIFICATIONS.map((cert, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            
            return (
              <a 
                key={index} 
                href={cert.link || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 border-b border-line overflow-hidden focus-visible:outline-none"
              >
                {/* Ink Flood Background */}
                <div className="absolute inset-0 bg-ink origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] z-0" />
                
                {/* Content */}
                <div className="relative z-10 flex items-start md:items-center gap-6 mb-4 md:mb-0 transition-colors duration-300 group-hover:text-card group-focus-visible:text-card text-ink">
                  <span className="font-mono text-sm text-mute group-hover:text-card/70 group-focus-visible:text-card/70 transition-colors">
                    {num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {cert.title}
                  </h3>
                </div>
                
                <div className="relative z-10 flex items-center justify-between md:justify-end gap-8 w-full md:w-auto transition-colors duration-300 group-hover:text-card group-focus-visible:text-card">
                  <span className="font-mono text-sm text-ink-2 group-hover:text-card/80 group-focus-visible:text-card/80 transition-colors">
                    {cert.issuer}
                  </span>
                  
                  {/* Sliding Arrow */}
                  <div className="w-6 h-6 overflow-hidden relative opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 delay-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
