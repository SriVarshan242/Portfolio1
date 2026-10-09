"use client";

import { useRef, useEffect, useState } from "react";
import { PROFILE, EDUCATION, EXPERIENCE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true } as any);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [rotation, setRotation] = useState({ rz: 0, rx: 0, ry: 0 });
  
  // Damped pendulum logic
  useEffect(() => {
    let mouseX = 0;
    let targetAngle = 0;
    let currentAngle = 0;
    let velocity = 0;
    let raf: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      targetAngle = normalizedX * -15; // Swing up to 15 degrees based on mouse pos
    };

    const update = () => {
      // Spring physics
      const spring = 0.05;
      const damping = 0.9;
      
      const acceleration = (targetAngle - currentAngle) * spring;
      velocity += acceleration;
      velocity *= damping;
      currentAngle += velocity;

      // Add a tiny idle sway if idle
      const sway = Math.sin(Date.now() / 1000) * 1.5;

      setRotation(prev => ({
        ...prev,
        rz: currentAngle + sway,
        rx: flipped ? 180 : 0
      }));

      raf = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [flipped]);

  const handleFlip = () => setFlipped(!flipped);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  const basePath = process.env.NODE_ENV === "production" ? "/Portfolio1" : "";
  
  return (
    <section id="about" className="section-pad relative z-10 bg-paper">
      <div className="content-width">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-mute">01 — About</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            More about <span className="font-serif italic text-mute">me.</span>
          </h2>
        </div>

        <div ref={ref as any} className={`rv ${isInView ? 'is-in' : ''} grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-12 md:gap-8 items-stretch`}>
          
          {/* Left Column */}
          <div className="flex flex-col justify-center gap-6 md:pr-8">
            <h3 className="text-3xl font-bold tracking-tighter">Hi, I&apos;m {PROFILE.name.split(' ')[0]}.</h3>
            <p className="text-lg text-ink-2 leading-relaxed">
              {PROFILE.resumeSummary}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={PROFILE.resumePath} download className="btn-secondary text-sm py-2 px-4">Résumé</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-secondary text-sm py-2 px-4">GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-secondary text-sm py-2 px-4">LinkedIn</a>
            </div>
          </div>

          {/* Centre: ID Card */}
          <div 
            ref={containerRef}
            className="relative h-[500px] flex justify-center perspective-[1000px] cursor-pointer"
            onClick={handleFlip}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Toggle ID card back"
          >
            {/* Lanyard Top (fixed) */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[30px] h-[100px] bg-ink z-0 overflow-hidden rounded-t-sm" />
            
            {/* Swinging Card System */}
            <div 
              ref={cardRef}
              className="relative w-[300px] h-full origin-top transition-transform ease-out duration-100 transform-style-3d"
              style={{
                transform: `rotateZ(${rotation.rz}deg) rotateY(${rotation.rx}deg)`
              }}
            >
              {/* Strap continuation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-[56px] bg-ink z-20 flex flex-col items-center justify-start overflow-hidden pt-2 text-[10px] text-card font-mono tracking-widest uppercase">
                <span className="-rotate-90 whitespace-nowrap mt-4">{PROFILE.name}</span>
              </div>
              
              {/* Metal clip */}
              <div className="absolute top-[52px] left-1/2 -translate-x-1/2 w-[40px] h-[20px] bg-faint rounded-md shadow-sm z-10" />

              {/* The Card */}
              <div className="absolute top-[72px] inset-x-0 h-[404px] bg-card rounded-[24px] shadow-lg border border-line overflow-hidden backface-hidden">
                <div className="h-12 bg-ink flex items-center justify-center">
                  <span className="text-card font-mono text-sm tracking-widest">DEVELOPER ID</span>
                </div>
                <div className="p-6 flex flex-col items-center">
                  <div className="w-[128px] h-[156px] rounded-lg border-4 border-paper overflow-hidden bg-soft shadow-inner relative group">
                    <img src={`${basePath}/portrait-bust.webp`} alt="Portrait" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
                  </div>
                  <h4 className="mt-4 text-2xl font-bold tracking-tighter">{PROFILE.name}</h4>
                  <p className="text-mute font-mono text-sm uppercase">{PROFILE.role}</p>
                  
                  <div className="w-full mt-6 space-y-2 border-t border-line pt-4">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-mute">ID No.</span>
                      <span className="font-bold">242</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-mute">Dept.</span>
                      <span className="font-bold">ENGINEERING</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-mute">Valid till</span>
                      <span className="font-bold">{EDUCATION[0]?.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div className="absolute top-[72px] inset-x-0 h-[404px] bg-card rounded-[24px] shadow-lg border border-line overflow-hidden backface-hidden rotate-y-180 flex flex-col p-8">
                <h4 className="font-mono text-sm text-mute mb-4 uppercase">What I am</h4>
                <div className="flex-1 text-sm text-ink-2 space-y-3 leading-relaxed">
                  <p>• {PROFILE.role}</p>
                  <p>• {EDUCATION[0]?.title}, CGPA {EDUCATION[0]?.detail.split(': ')[1]}</p>
                  <p>• {EXPERIENCE[0]?.title} at {EXPERIENCE[0]?.place.split(' ')[0]}</p>
                  <p>• Built {PROFILE.name}&apos;s Skill Gap Analysis & Healthcare Systems</p>
                </div>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-xs text-mute font-mono mb-2">Signature</p>
                  <div className="font-serif italic text-2xl text-ink/80">{PROFILE.name}</div>
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-mute font-mono">
                  If found, say hello · {PROFILE.email}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center gap-8 md:pl-8">
            <div>
              <h4 className="font-mono text-sm text-mute mb-4">Quick facts</h4>
              <ul className="space-y-4">
                <li className="flex gap-4 border-b border-line pb-3">
                  <span className="text-mute w-24">Location</span>
                  <span className="font-medium text-ink-2">{PROFILE.location}</span>
                </li>
                <li className="flex gap-4 border-b border-line pb-3">
                  <span className="text-mute w-24">Education</span>
                  <span className="font-medium text-ink-2">B.E. CSE</span>
                </li>
                <li className="flex gap-4 border-b border-line pb-3">
                  <span className="text-mute w-24">Current</span>
                  <span className="font-medium text-ink-2">Student & Developer</span>
                </li>
                <li className="flex gap-4 border-b border-line pb-3">
                  <span className="text-mute w-24">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="font-medium text-ink-2 hover:text-ink underline decoration-line underline-offset-4">{PROFILE.email}</a>
                </li>
              </ul>
            </div>
            
            <blockquote className="border-l-2 border-ink pl-4 py-1">
              <p className="font-serif italic text-xl text-ink-2">
                &quot;Applying user-centered design principles and creativity to build efficient, scalable solutions.&quot;
              </p>
            </blockquote>
          </div>

        </div>
      </div>
      <style>{`
        .perspective-\\[1000px\\] { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}
