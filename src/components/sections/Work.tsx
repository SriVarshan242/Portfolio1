"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { TechLogo } from "@/components/ui/TechLogo";

export function Work() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true } as any);
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  return (
    <section id="work" className="section-pad bg-paper">
      <div className="content-width">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-mute">03 — Work</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Things I&apos;ve <span className="font-serif italic text-mute">built.</span>
          </h2>
        </div>

        <div ref={ref as any} className={`rv ${isInView ? 'is-in' : ''} flex flex-col md:flex-row h-auto md:h-[min(78svh,600px)] gap-2 min-w-0`}>
          {PROJECTS.map((project) => {
            const isActive = activeId === project.id;
            
            return (
              <div
                key={project.id}
                className={`relative overflow-hidden rounded-[24px] bg-card border border-line transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] flex flex-col md:flex-row cursor-pointer group min-w-0
                  ${isActive ? 'md:flex-[8] flex-[1_0_auto] min-h-[500px]' : 'md:flex-[1] flex-none h-16 md:h-auto hover:bg-soft'}
                `}
                onClick={() => setActiveId(project.id)}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveId(project.id); }}
              >
                
                {/* Closed Spine (Desktop) */}
                <div className={`hidden md:flex absolute inset-0 p-4 flex-col items-center justify-between transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <span className="font-mono text-xs text-mute mt-2">{project.index}</span>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="whitespace-nowrap -rotate-90 font-bold tracking-tight text-ink-2">
                      {project.title}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink-2 group-hover:rotate-90 group-hover:bg-ink group-hover:text-card group-hover:border-ink transition-all duration-300 mb-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1V11M1 6H11"/></svg>
                  </div>
                </div>

                {/* Closed Bar (Mobile) */}
                <div className={`md:hidden absolute inset-0 px-6 flex items-center justify-between transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-mute">{project.index}</span>
                    <span className="font-bold tracking-tight text-ink-2 truncate max-w-[200px]">{project.title}</span>
                  </div>
                  <div className="text-ink-2 group-hover:rotate-90 transition-transform">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 1V11M1 6H11"/></svg>
                  </div>
                </div>

                {/* Open Panel Content */}
                <div className={`w-full h-full flex flex-col md:flex-row transition-opacity duration-500 delay-200 min-w-0 ${isActive ? 'opacity-100' : 'opacity-0 absolute'}`}>
                  
                  {/* Left Side: Info */}
                  <div className="flex-1 p-6 md:p-12 flex flex-col overflow-y-auto min-w-0">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-mono text-sm text-ink px-2 py-1 bg-soft rounded-md">{project.index}</span>
                      <span className="font-mono text-sm text-mute uppercase tracking-widest">{project.kicker}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 break-words hyphens-auto">{project.title}</h3>
                    <p className="text-ink-2 leading-relaxed mb-8">{project.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                      {project.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-ink-2">
                          <span className="text-mute mt-0.5">•</span>
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-line flex flex-wrap items-center justify-between gap-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <div key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-paper text-xs font-medium">
                            <TechLogo name={t} size={14} />
                            {t}
                          </div>
                        ))}
                      </div>
                      
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary text-sm shrink-0 group/btn">
                          View on GitHub
                          <svg className="ml-2 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 11L11 1M11 1H4M11 1V8"/></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: UI */}
                  <div className="w-full md:w-[40%] bg-paper relative overflow-hidden flex flex-col border-t md:border-t-0 md:border-l border-line min-h-[300px]">
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm border border-line text-[10px] font-mono text-mute uppercase tracking-widest shadow-sm">
                      Illustrative UI
                    </div>
                    
                    {/* Abstract grayscale UI representing the app */}
                    <div className="absolute inset-0 p-8 flex items-center justify-center bg-gradient-to-br from-paper to-soft">
                      <div className={`w-full max-w-sm aspect-[3/4] bg-card rounded-xl shadow-lg border border-line flex flex-col overflow-hidden transition-all duration-1000 delay-300 ui-wipe ${isActive ? 'ui-wipe-active' : ''}`}>
                        <div className="h-10 border-b border-line flex items-center px-4 gap-2 bg-paper/50">
                          <div className="w-2.5 h-2.5 rounded-full bg-line" />
                          <div className="w-2.5 h-2.5 rounded-full bg-line" />
                          <div className="w-2.5 h-2.5 rounded-full bg-line" />
                        </div>
                        <div className="flex-1 p-6 flex flex-col gap-4 opacity-50 grayscale">
                          <div className="h-4 w-1/3 bg-line rounded-full" />
                          <div className="h-8 w-3/4 bg-line rounded-lg" />
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="h-20 bg-soft rounded-lg border border-line" />
                            <div className="h-20 bg-soft rounded-lg border border-line" />
                            <div className="h-20 bg-soft rounded-lg border border-line" />
                            <div className="h-20 bg-soft rounded-lg border border-line" />
                          </div>
                          <div className="mt-auto h-12 w-full bg-ink rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .ui-wipe { clip-path: inset(0 100% 0 0); }
        .ui-wipe-active { clip-path: inset(0 0 0 0); }
      `}</style>
    </section>
  );
}
