"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";

function HoppingText({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i} className="w-4" />;
        return (
          <span 
            key={i} 
            className="inline-block transition-transform duration-300 hover:-translate-y-4 hover:text-ink-2"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = PROFILE.email;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section id="contact" className="bg-card pt-24 md:pt-32 pb-8 px-[var(--gutter)] flex flex-col min-h-svh w-full overflow-hidden">
      
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative min-w-0">
        
        {/* Spinning Badge */}
        <div className="absolute -top-12 md:top-0 right-0 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-50 hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className="font-mono text-[11px] uppercase tracking-widest fill-ink">
              <textPath href="#circlePath">Say Hello • Say Hello • Say Hello • </textPath>
            </text>
          </svg>
        </div>

        <h2 className="text-[clamp(28px,8vw,100px)] font-bold tracking-tighter leading-[0.9] mb-10 md:mb-16 select-none cursor-default">
          <HoppingText text="Let's build" />
          <br />
          <span className="font-serif italic text-mute"><HoppingText text="something together." /></span>
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12 border-b border-line pb-8 md:pb-12 mb-8 md:mb-12 min-w-0">
          
          <div className="flex flex-col items-start gap-3 min-w-0 w-full md:w-auto">
            <span className="font-mono text-sm text-mute uppercase tracking-widest">Get in touch</span>
            {/* Mobile: email on its own line, copy below */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full md:w-auto min-w-0">
              <a 
                href={`mailto:${PROFILE.email}`} 
                className="text-xl sm:text-2xl md:text-5xl font-bold tracking-tight underline decoration-2 underline-offset-8 decoration-line hover:decoration-ink transition-colors break-all min-w-0"
              >
                {PROFILE.email}
              </a>
              <button 
                onClick={handleCopy}
                className={`self-start md:self-auto px-3 py-1.5 rounded-full text-xs font-mono border transition-all shrink-0 ${copied ? 'bg-ink text-card border-ink' : 'bg-paper text-ink border-line hover:border-ink'}`}
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a href={PROFILE.phoneHref} className="hover:text-mute transition-colors flex items-center gap-2">
              <span className="w-20 text-mute">Phone</span> {PROFILE.phone}
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-mute transition-colors flex items-center gap-2">
              <span className="w-20 text-mute">LinkedIn</span> /SriVarshan
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-mute transition-colors flex items-center gap-2">
              <span className="w-20 text-mute">GitHub</span> /SriVarshan242
            </a>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-mute mt-auto pt-8">
        <p>© 2026 {PROFILE.name}</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-ink transition-colors uppercase tracking-widest border border-line px-4 py-2 rounded-full hover:bg-paper"
        >
          Back to top ↑
        </button>
        <p>Built with Next.js</p>
      </footer>

    </section>
  );
}
