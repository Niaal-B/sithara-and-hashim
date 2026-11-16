import React from 'react';

/** Eight-point star (two overlapping squares), a classic Islamic geometric motif. */
export function StarMedallion({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeLinejoin="round">
        <circle r="46" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle r="42" strokeWidth="0.5" strokeOpacity="0.35" />
        <rect x="-28" y="-28" width="56" height="56" strokeWidth="1.4" />
        <rect x="-28" y="-28" width="56" height="56" strokeWidth="1.4" transform="rotate(45)" />
        <rect x="-17" y="-17" width="34" height="34" strokeWidth="0.8" strokeOpacity="0.6" />
        <rect x="-17" y="-17" width="34" height="34" strokeWidth="0.8" strokeOpacity="0.6" transform="rotate(45)" />
      </g>
      <circle r="5" fill="currentColor" fillOpacity="0.85" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
        return <circle key={i} cx={Math.cos(a) * 46} cy={Math.sin(a) * 46} r="1.6" fill="currentColor" />;
      })}
    </svg>);

}

/** Vine flourish for a card corner; rotate/flip it for the other corners. */
export function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M6 6 H96" strokeWidth="1" />
        <path d="M6 6 V96" strokeWidth="1" />
        <path d="M12 12 H62 M12 12 V62" strokeWidth="0.6" strokeOpacity="0.6" />
        <path d="M14 14 C40 16 56 30 50 46 C46 56 32 54 32 44 C32 37 41 35 43 41" strokeWidth="1.1" />
        <path d="M50 46 C62 50 76 46 86 36" strokeWidth="0.8" />
        <path d="M50 46 C46 58 46 72 36 84" strokeWidth="0.8" />
      </g>
      <g fill="currentColor">
        <ellipse cx="72" cy="40" rx="6" ry="2.4" transform="rotate(-30 72 40)" fillOpacity="0.75" />
        <ellipse cx="44" cy="70" rx="6" ry="2.4" transform="rotate(-60 44 70)" fillOpacity="0.75" />
        <ellipse cx="62" cy="30" rx="4.5" ry="1.8" transform="rotate(20 62 30)" fillOpacity="0.55" />
        <ellipse cx="30" cy="62" rx="4.5" ry="1.8" transform="rotate(70 30 62)" fillOpacity="0.55" />
        <circle cx="96" cy="6" r="2.2" />
        <circle cx="6" cy="96" r="2.2" />
        <circle cx="86" cy="36" r="1.8" />
        <circle cx="36" cy="84" r="1.8" />
        <path d="M6 1 L11 6 L6 11 L1 6 Z" />
      </g>
    </svg>);

}

/** Thin gold rule with a centred diamond cluster. */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60" />
      <svg viewBox="0 0 40 12" className="h-3 w-10">
        <path d="M20 0 L26 6 L20 12 L14 6 Z" fill="currentColor" />
        <path d="M8 3 L11 6 L8 9 L5 6 Z M32 3 L35 6 L32 9 L29 6 Z" fill="currentColor" fillOpacity="0.55" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60" />
    </div>);

}
