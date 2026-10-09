"use client";

import { useRef, useEffect, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";

function Counter({ end, isVisible }: { end: string, isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const target = parseInt(end.replace(/\D/g, '')) || 0;
  const suffix = end.replace(/\d/g, '');

  useEffect(() => {
    if (!isVisible || target === 0) return;
    
    let startTimestamp: number;
    const duration = 1400; // 1.4s easeOutQuart
    
    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(easeOutQuart(progress) * target));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isVisible, target]);

  if (target === 0) return <span>{end}</span>;
  return <span>{count}{suffix}</span>;
}

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress through the pinned section
      // 0 when top hits top of viewport, 1 when bottom hits bottom of viewport
      let p = -rect.top / (rect.height - windowHeight);
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);

      // Determine which cards are visible to trigger animations
      if (trackRef.current) {
        const cards = trackRef.current.children;
        const newVisible = new Set(visibleIndices);
        
        for (let i = 0; i < cards.length; i++) {
          const cardRect = cards[i].getBoundingClientRect();
          // If card is somewhat in the middle of the screen
          if (cardRect.left < window.innerWidth * 0.8 && cardRect.right > window.innerWidth * 0.2) {
            newVisible.add(i);
          }
        }
        
        if (newVisible.size > visibleIndices.size) {
          setVisibleIndices(newVisible);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleIndices]);

  // Total width needed to scroll = (number of cards) * card width + padding - viewport width
  // But we handle this via CSS translation: transform: translateX(-progress * maxScroll)

  return (
    // Make section height 300vh to allow for enough scroll distance
    <section id="achievements" ref={containerRef} className="relative h-[300vh] bg-paper">
      
      <div className="sticky top-0 h-svh w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="pt-24 px-[var(--gutter)] flex-shrink-0 relative z-10">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-mute">06 — Achievements</span>
            <h2 className="text-5xl font-bold tracking-tighter">
              Always <span className="font-serif italic text-mute">learning.</span>
            </h2>
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-sm h-1 bg-line rounded-full overflow-hidden">
            <div 
              className="h-full bg-ink origin-left"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        {/* Track */}
        <div className="flex-1 flex items-center relative z-0">
          <div 
            ref={trackRef}
            className="flex gap-8 px-[var(--gutter)] will-change-transform"
            style={{
              // Translate horizontally based on progress
              // max scroll distance roughly calculated to show all cards
              transform: `translateX(calc(-${progress * 100}% + ${progress * 50}vw))` 
            }}
          >
            {ACHIEVEMENTS.map((item, i) => {
              const isVisible = visibleIndices.has(i);
              
              // Calculate distance to center to apply lift and shadow
              let isActive = false;
              if (trackRef.current) {
                const card = trackRef.current.children[i] as HTMLElement;
                if (card) {
                  const rect = card.getBoundingClientRect();
                  const center = window.innerWidth / 2;
                  isActive = Math.abs(rect.left + rect.width / 2 - center) < window.innerWidth * 0.3;
                }
              }

              return (
                <div 
                  key={i} 
                  className={`shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] bg-card rounded-[28px] p-8 flex flex-col justify-between transition-all duration-500
                    ${isActive ? '-translate-y-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]' : 'shadow-sm border border-line'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    {/* Logo Tile */}
                    <div className="w-[72px] h-[72px] rounded-2xl bg-paper border border-line flex items-center justify-center shadow-inner relative overflow-hidden group">
                      <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-bold tracking-tighter text-xl">{item.logo.substring(0,2)}</span>
                    </div>
                    <span className="font-mono text-sm text-mute">0{i+1} / 0{ACHIEVEMENTS.length}</span>
                  </div>

                  <div className="flex justify-between items-end gap-4">
                    <div className="flex-1">
                      <h4 className="font-mono text-xs text-mute uppercase tracking-widest mb-2">{item.title}</h4>
                      <p className="text-xl font-bold tracking-tight leading-tight">{item.detail}</p>
                    </div>
                    <div className="text-6xl md:text-8xl font-bold tracking-tighter text-ink leading-none">
                      <Counter end={item.number} isVisible={isVisible} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Card */}
            <div className="shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] flex items-center justify-center">
              <span className="text-4xl font-serif italic text-mute">and counting →</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
