"use client";

import { useState } from "react";
import { SKILL_GROUPS, PROJECTS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

type SkillInfo = { name: string; symbol: string; number: number; family: string; };

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true } as any);
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillInfo | null>(null);

  const allSkills = SKILL_GROUPS.flatMap(g => g.skills);
  
  // Create a grid of cells (e.g. 4 rows, 8 cols)
  // To keep it simple, we just map all skills linearly in an auto-fit grid
  // and handle the wave reveal with staggered CSS variables.

  const getRelatedProjects = (skillName: string) => {
    return PROJECTS.filter(p => p.tech.some(t => t.toLowerCase() === skillName.toLowerCase()));
  };

  return (
    <section id="skills" className="section-pad bg-card border-y border-line">
      <div className="content-width">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-mute">02 — Skills</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Periodic table of my <span className="font-serif italic text-mute">stack.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Grid Area */}
          <div className="flex-1 w-full" ref={ref as any}>
            
            {/* Filter chips */}
            <div className={`rv ${isInView ? 'is-in' : ''} flex flex-wrap gap-2 mb-8`} style={{ '--i': 1 } as any}>
              <button 
                onClick={() => setActiveFamily(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${activeFamily === null ? 'bg-ink text-card border-ink' : 'bg-transparent text-ink-2 border-line hover:border-mute'}`}
              >
                All
              </button>
              {SKILL_GROUPS.map((group, i) => (
                <button
                  key={group.family}
                  onClick={() => setActiveFamily(group.family)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${activeFamily === group.family ? 'bg-ink text-card border-ink' : 'bg-transparent text-ink-2 border-line hover:border-mute'}`}
                >
                  {group.family}
                </button>
              ))}
            </div>

            {/* Periodic Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3">
              {allSkills.map((skill, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const delay = (row + col) * 0.04; // 40ms stagger
                const isDimmed = activeFamily && activeFamily !== skill.family;

                return (
                  <div
                    key={skill.name}
                    className="relative"
                  >
                    <button
                      className={`w-full aspect-square p-2 border flex flex-col justify-between items-start text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        ${isDimmed ? 'opacity-30 border-line bg-transparent grayscale' : 'border-line bg-paper hover:bg-white hover:shadow-md hover:border-mute hover:scale-105 z-10'}
                      `}
                      style={{ transitionDelay: isInView ? `${delay}s` : '0s' }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onFocus={() => setHoveredSkill(skill)}
                    >
                      <span className="font-mono text-[10px] text-mute">{skill.number}</span>
                      <div className="flex flex-col w-full">
                        <span className="text-xl md:text-2xl font-bold tracking-tighter leading-none">{skill.symbol}</span>
                        <span className="text-[10px] md:text-xs text-mute mt-1 truncate w-full">{skill.name}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-[120px] shrink-0 border border-line rounded-3xl bg-paper p-8 min-h-[400px] flex flex-col justify-between transition-all">
            {hoveredSkill ? (
              <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col h-full">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-sm text-mute uppercase">{hoveredSkill.family}</span>
                    <span className="font-mono text-sm font-bold">{hoveredSkill.number}</span>
                  </div>
                  
                  <div className="flex justify-center mb-8 h-[150px] items-center">
                    <TechLogo name={hoveredSkill.name} size={120} />
                  </div>
                  
                  <h3 className="text-3xl font-bold tracking-tighter mb-2">{hoveredSkill.name}</h3>
                  
                  <div className="mt-8 space-y-4 border-t border-line pt-6">
                    <p className="font-mono text-xs text-mute uppercase mb-3">Used in</p>
                    {getRelatedProjects(hoveredSkill.name).map(p => (
                      <div key={p.id} className="text-sm">
                        • {p.title}
                      </div>
                    ))}
                    {getRelatedProjects(hoveredSkill.name).length === 0 && (
                      <div className="text-sm text-ink-2 italic">Foundation / General</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center items-center text-center opacity-50">
                <div className="w-16 h-16 border border-dashed border-mute rounded-full mb-4 flex items-center justify-center">
                  <span className="font-mono text-sm">?</span>
                </div>
                <p className="text-sm">Hover a skill to inspect</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <style>{`
        .animate-in { animation: enter 0.3s cubic-bezier(.16, 1, .3, 1); }
        @keyframes enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
