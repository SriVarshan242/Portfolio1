"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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

    // Global scroll progress listener for the top progress bar
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
    const lenis = new Lenis(); // Fallback, usually you get the lenis instance, but for simple scrollIntoView:
    element.scrollIntoView({ behavior: 'smooth' });
    // Or if Lenis is attached to window, window.lenis.scrollTo(element)
  }
}
