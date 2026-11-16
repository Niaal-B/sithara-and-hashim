import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FallingPetals } from './FallingPetals';
import { StarMedallion } from './Ornaments';

type GateProps = {
  onOpen: () => void;
  onOpened: () => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;
const DOOR_EASE = [0.65, 0, 0.35, 1] as const;

function Door({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const left = side === 'left';
  return (
    <motion.div
      className={`pattern-bg absolute inset-y-0 w-1/2 bg-cream ${left ? 'left-0 origin-left' : 'right-0 origin-right'}`}
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      animate={{ rotateY: open ? (left ? -105 : 105) : 0 }}
      transition={{ duration: 1.5, delay: 0.4, ease: DOOR_EASE }}>

      {/* Shading towards the seam gives the doors depth */}
      <div
        className={`absolute inset-0 from-transparent via-transparent to-[rgba(59,42,34,0.12)] ${left ? 'bg-gradient-to-r' : 'bg-gradient-to-l'}`} />

      {/* Arched door panel */}
      <div
        className={`absolute bottom-[4%] top-[4%] rounded-t-full border border-gold/45 ${left ? 'left-[9%] right-[7%]' : 'left-[7%] right-[9%]'}`}>
        <div className="absolute inset-2 rounded-t-full border border-gold/20" />
      </div>

      {/* Gold edge along the seam */}
      <div className={`absolute inset-y-0 w-px bg-gold/60 ${left ? 'right-0' : 'left-0'}`} />
    </motion.div>);

}

export function Gate({ onOpen, onOpened }: GateProps) {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    onOpen();
    if (reduce) {
      onOpened();
      return;
    }
    setOpening(true);
    window.setTimeout(onOpened, 1500);
  };

  return (
    <motion.section
      className="fixed inset-0 z-40 overflow-hidden"
      style={{ perspective: 1800 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      aria-label="Invitation entrance">

      {/* Light waiting behind the doors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#fff7df_0%,#e7c983_40%,#efe7df_100%)]" />

      <Door side="left" open={opening} />
      <Door side="right" open={opening} />

      {!reduce && <FallingPetals />}

      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.97 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[min(560px,130vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(247,241,232,0.95),rgba(247,241,232,0.75)_60%,rgba(247,241,232,0))]" />

        <div className="relative flex flex-col items-center">
          <StarMedallion className="h-12 w-12 text-gold sm:h-14 sm:w-14" />
          <p lang="ar" dir="rtl" className="mt-3 font-arabic text-lg leading-relaxed text-gold sm:text-xl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="mt-5 font-serif text-[0.7rem] uppercase tracking-[0.4em] text-ink/70">
            The Nikah of
          </p>
          <h1 className="text-crimson px-3 pb-2 pt-1 font-script text-[3.4rem] leading-[1.25] sm:text-7xl">
            Sithara &amp; Hashim
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="font-serif text-[0.8rem] tracking-[0.35em] text-ink/80">27 · 12 · 2026</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </div>

          {/* Gold seal: the tap target */}
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open the invitation"
            className="group relative mt-10 h-24 w-24 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">

            {!reduce &&
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-gold/70"
              animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
            }
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fbecc0_0%,#d4ac52_45%,#8f6a24_100%)] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95" />
            <span className="absolute inset-[7px] rounded-full border border-[#7a5719]/40" />
            <span className="absolute inset-[10px] rounded-full border border-[#fbecc0]/50" />
            <span className="relative font-script text-[1.9rem] leading-none text-[#5a3d0f]">S&amp;H</span>
          </button>

          <motion.p
            animate={reduce ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
            transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 font-serif text-[0.7rem] uppercase tracking-[0.4em] text-gold">
            Tap the seal to open
          </motion.p>
        </div>
      </motion.div>
    </motion.section>);

}
