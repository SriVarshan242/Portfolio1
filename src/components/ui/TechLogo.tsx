"use client";

// Fallback TechLogo component that creates a simple visual representation
// In a real app with standard devicons, we would render an `<img>` pointing to public/logos/...

export function isBrand(name: string) {
  const brands = ["html", "css", "javascript", "react", "spring boot", "node.js", "mysql", "mongodb", "git", "github", "aws cloud", "vs code", "figma"];
  return brands.includes(name.toLowerCase());
}

export function TechLogo({ name, size = 64 }: { name: string; size?: number }) {
  const isConcept = !isBrand(name);
  
  // Create a stylized text logo since we don't have SVGs downloaded
  const initials = name.substring(0, 2).toUpperCase();
  
  // A soft brand-tint glow for brands
  const colors: Record<string, string> = {
    "react": "#61DAFB",
    "javascript": "#F7DF1E",
    "html": "#E34F26",
    "css": "#1572B6",
    "node.js": "#339933",
    "mongodb": "#47A248",
    "mysql": "#4479A1",
    "github": "#181717",
    "git": "#F05032",
    "figma": "#F24E1E",
    "aws cloud": "#FF9900",
    "spring boot": "#6DB33F",
  };
  
  const baseColor = colors[name.toLowerCase()] || "#a9a6a0";
  
  if (isConcept) {
    return (
      <div 
        style={{ width: size, height: size }}
        className="rounded-xl border border-line flex items-center justify-center bg-paper shadow-sm"
      >
        <span className="font-mono text-mute" style={{ fontSize: size * 0.3 }}>{initials}</span>
      </div>
    );
  }

  return (
    <div 
      className="relative flex items-center justify-center rounded-2xl bg-card border border-line"
      style={{ width: size, height: size, boxShadow: `0 8px 32px -8px ${baseColor}30` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-2xl pointer-events-none" />
      <span className="font-bold tracking-tighter mix-blend-multiply" style={{ color: baseColor, fontSize: size * 0.4 }}>
        {initials}
      </span>
    </div>
  );
}
