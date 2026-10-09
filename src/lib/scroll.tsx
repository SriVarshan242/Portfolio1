"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Just track scroll progress, no smooth scroll
      const handleScroll = () => {
        const doc = document.documentElement;
        const progress = window.scrollY / (doc.scrollHeight - window.innerHeight);
        doc.style.setProperty('--scroll-progress', progress.toString());
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      document.documentElement.style.setProperty('--scroll-progress', e.progress);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function scrollToTarget(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }
}
