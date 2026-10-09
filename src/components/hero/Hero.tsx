"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const basePath =
    process.env.NODE_ENV === "production" ? "/Portfolio1" : "";
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().then(() => {
        setIsPlaying(true);
        setIsMuted(video.muted);
      }).catch(() => {
        video.muted = true;
        video.play().then(() => {
          setIsPlaying(true);
          setIsMuted(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      });
    };

    attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
            setIsPlaying(false);
          } else {
            video.play().then(() => setIsPlaying(true)).catch(console.error);
          }
        });
      },
      { threshold: [0.35] }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.play().then(() => {
        setIsMuted(false);
        setIsPlaying(true);
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section id="hero" className="relative w-full h-[min(96svh,1040px)] flex items-center justify-center overflow-hidden">
      {/* Background First Name */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <h1 className="text-[20vw] font-bold tracking-tighter text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '1px var(--line)' }}>
          {PROFILE.firstName}
        </h1>
      </div>

      {/* Video Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-[var(--gutter)]">
        <div className="relative w-full h-full max-h-[1040px] flex items-center justify-center">
          <video
            ref={videoRef}
            className="h-full max-w-full aspect-[768/960] object-cover mix-blend-multiply"
            loop
            playsInline
            preload="auto"
            muted={isMuted}
            poster={`${basePath}/portrait-bust.webp`}
          >
            <source src={`${basePath}/hero/hero.webm`} type="video/webm" />
            <source src={`${basePath}/hero/hero.mp4`} type="video/mp4" />
          </video>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-8 right-8 w-[46px] h-[46px] rounded-full bg-ink text-card flex items-center justify-center transition-transform hover:scale-105 z-20"
          >
            {isMuted ? (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L12 8L1 14.5V1.5Z" />
              </svg>
            ) : (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H5V14H2V2ZM9 2H12V14H9V2Z" />
              </svg>
            )}
            {isMuted && (
              <span className="absolute inset-0 rounded-full border border-ink animate-ping opacity-50" />
            )}
          </button>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-x-0 bottom-12 px-[var(--gutter)] z-20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          {PROFILE.role.replace(".", "")}<span className="text-mute">.</span>
        </h2>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
          <button className="btn-primary shrink-0" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore work
          </button>
          <button className="btn-secondary shrink-0" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Let&apos;s talk
          </button>
          <a href={PROFILE.resumePath} download className="btn-secondary shrink-0">
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
