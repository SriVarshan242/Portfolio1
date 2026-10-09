"use client";

import { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();
  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock scroll when menu is open and handle Escape key
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    if (activeId && navRef.current) {
      const activeEl = navRef.current.querySelector(`[data-id="${activeId}"]`) as HTMLElement;
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      }
    } else {
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeId, scrolled]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    // Let lenis handle smooth scroll by giving it a moment if menu was open
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-[2px] bg-line z-50 origin-left"
        style={{ transform: `scaleX(${progress})`, backgroundColor: "var(--ink)" }}
      />
      <header className="fixed top-0 left-0 w-full z-40 px-[var(--gutter)] py-6 pointer-events-none flex items-center justify-between">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className={`w-10 h-10 rounded-full border border-ink flex items-center justify-center transition-all duration-500 hover:rotate-360 ${scrolled ? 'bg-ink text-card' : 'bg-transparent text-ink'}`}>
            <span className="font-mono text-sm tracking-tighter">
              {PROFILE.name.split(' ').map(n => n[0]).join('').substring(0,2)}
            </span>
          </div>
          <span className={`font-medium transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
            {PROFILE.name}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className={`hidden md:flex relative pointer-events-auto items-center p-1 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm border border-line' : ''}`}>
          {NAV.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative px-5 py-2 text-sm font-medium z-10 transition-colors ${activeId === item.id ? 'text-white' : 'text-ink-2 hover:text-ink'}`}
            >
              {item.label}
            </button>
          ))}
          <div 
            className="absolute top-1 bottom-1 bg-ink rounded-full transition-all duration-300 ease-out z-0"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity
            }}
          />
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden pointer-events-auto px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-line font-medium text-sm"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-paper z-50 flex flex-col justify-center px-[var(--gutter)] transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ clipPath: menuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
      >
        <button 
          className="absolute top-6 right-[var(--gutter)] px-5 py-2 rounded-full border border-line font-medium text-sm hover:bg-soft transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Close
        </button>
        <div className="flex flex-col gap-6">
          {NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-4xl font-medium tracking-tight text-left flex items-center gap-4 hover:opacity-70 transition-opacity"
              style={{
                transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s cubic-bezier(.16, 1, .3, 1) ${i * 0.05 + 0.2}s, opacity 0.4s ease ${i * 0.05 + 0.2}s`
              }}
            >
              <span className="font-mono text-base text-mute">0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .hover\\:rotate-360:hover { transform: rotate(360deg); }
      `}</style>
    </>
  );
}
