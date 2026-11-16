import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlusIcon, InstagramIcon, MapPinIcon } from 'lucide-react';
import { CornerFlourish, Divider, StarMedallion } from './Ornaments';

const EASE = [0.23, 1, 0.32, 1] as const;

const MAP_URL = 'https://maps.app.goo.gl/4bJcLMSVh3ooAaPZ6?g_st=ic';
// 10:00 AM IST on 27 Dec 2026
const NIKAH_AT = new Date('2026-12-27T10:00:00+05:30').getTime();
const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('Nikah of Sithara Parveen & Hashim')}` +
  '&dates=20261227T043000Z/20261227T073000Z' +
  `&location=${encodeURIComponent('Prestige Palace Auditorium, Edakkara')}` +
  `&details=${encodeURIComponent(`Directions: ${MAP_URL}`)}`;

function Reveal({
  children,
  className = '',
  delay = 0



}: {children: React.ReactNode;className?: string;delay?: number;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}>
      {children}
    </motion.div>);

}

function SectionLabel({ children }: {children: React.ReactNode;}) {
  return (
    <p className="font-serif text-[0.7rem] uppercase tracking-[0.42em] text-gold">{children}</p>);

}

/** Pointed (ogee) arch frame drawn as an SVG cap over a bordered body. */
function ArchFrame({ children }: {children: React.ReactNode;}) {
  return (
    <div className="relative">
      <svg viewBox="0 0 300 120" aria-hidden="true" className="block w-full text-gold">
        <path
          d="M0.5 120 V95 C0.5 50 70 30 150 1 C230 30 299.5 50 299.5 95 V120"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.7"
          vectorEffect="non-scaling-stroke" />
        <path
          d="M9 120 V96 C9 56 74 37 150 11 C226 37 291 56 291 96 V120"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          vectorEffect="non-scaling-stroke" />
        <circle cx="150" cy="1" r="2.5" fill="currentColor" />
      </svg>
      <div className="relative -mt-px border-x border-b border-gold/70">
        <div className="pointer-events-none absolute bottom-3 left-[3%] right-[3%] top-0 border-x border-b border-gold/35" />
        <div className="relative -mt-[24%] px-6 pb-14 text-center sm:px-10">{children}</div>
      </div>
    </div>);

}

function Person({ name, lineage }: {name: string;lineage: string;}) {
  return (
    <div>
      <h2 className="inline-block px-3 pb-1 font-script text-[3.1rem] text-crimson leading-[1.3] sm:text-[3.8rem]">
        {name}
      </h2>
      <p className="font-serif text-[1rem] italic text-ink/70">{lineage}</p>
    </div>);

}

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    parts: [
    { label: 'Days', value: Math.floor(diff / 86400000) },
    { label: 'Hours', value: Math.floor(diff / 3600000) % 24 },
    { label: 'Minutes', value: Math.floor(diff / 60000) % 60 },
    { label: 'Seconds', value: Math.floor(diff / 1000) % 60 }]

  };
}

function Countdown() {
  const { done, parts } = useCountdown(NIKAH_AT);
  if (done) {
    return (
      <p className="mt-5 font-serif text-xl italic text-ink/85">Alhamdulillah, the blessed day is here.</p>);

  }
  return (
    <div className="mx-auto mt-6 grid max-w-[24rem] grid-cols-4 gap-2 sm:gap-3">
      {parts.map((p) =>
      <div key={p.label} className="border border-gold/30 bg-cream/80 px-1 py-4 backdrop-blur-sm">
          <p className="font-serif text-[1.7rem] font-medium text-crimson leading-none tabular-nums lining-nums sm:text-[2rem]">
            {String(p.value).padStart(2, '0')}
          </p>
          <p className="mt-2 font-serif text-[0.66rem] uppercase tracking-[0.25em] text-ink/60">{p.label}</p>
        </div>
      )}
    </div>);

}

export function Invitation() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] px-5 pb-28 pt-12 sm:pt-16">
      {/* Hero */}
      <Reveal className="mx-auto max-w-[460px]">
        <ArchFrame>
          <StarMedallion className="mx-auto h-14 w-14 text-gold" />
          <p lang="ar" dir="rtl" className="mt-4 font-arabic text-xl leading-relaxed text-gold sm:text-2xl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="mt-6 font-serif text-[0.7rem] uppercase tracking-[0.4em] text-ink/60">
            Together with their families
          </p>
          <p className="mx-auto mt-3 max-w-[19rem] font-serif text-[1.05rem] italic leading-relaxed text-ink/80">
            request the honour of your presence at the Nikah of
          </p>

          <div className="mt-7">
            <Person name="Sithara Parveen" lineage="D/o Suhaib Modieen & Raseena" />
            <div className="my-4 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 font-script text-2xl text-gold">
                &amp;
              </span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <Person name="Hashim" lineage="S/o Abdul Latheef & Rajeena" />
          </div>

          <Divider className="mt-9" />
          <p className="mt-5 font-serif text-[0.8rem] uppercase tracking-[0.32em] text-ink/85">
            Sunday · 27 December 2026
          </p>
        </ArchFrame>
      </Reveal>

      {/* Verse */}
      <Reveal className="mx-auto mt-16 max-w-[24rem] text-center">
        <p lang="ar" dir="rtl" className="font-arabic text-2xl leading-loose text-gold">
          وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>
        <p className="mt-3 font-serif text-[1.1rem] italic leading-relaxed text-ink/80">
          “…and He placed between you affection and mercy.”
        </p>
        <p className="mt-3 font-serif text-[0.66rem] uppercase tracking-[0.4em] text-ink/50">
          Surah Ar-Rum · 30:21
        </p>
      </Reveal>

      {/* Event card */}
      <Reveal className="mt-16">
        <div className="relative bg-cream p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          <div className="relative border border-gold/50 px-6 py-12 text-center text-ink sm:px-10">
            <CornerFlourish className="pointer-events-none absolute left-1 top-1 h-16 w-16 text-gold" />
            <CornerFlourish className="pointer-events-none absolute right-1 top-1 h-16 w-16 -scale-x-100 text-gold" />
            <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 h-16 w-16 -scale-y-100 text-gold" />
            <CornerFlourish className="pointer-events-none absolute bottom-1 right-1 h-16 w-16 -scale-100 text-gold" />

            <p className="font-serif text-[0.7rem] uppercase tracking-[0.45em] text-gold">The Nikah</p>

            <p className="mt-6 font-serif text-[0.72rem] uppercase tracking-[0.42em] text-crimson">December</p>
            <div className="mx-auto mt-2 grid max-w-[20rem] grid-cols-[1fr_auto_1fr] items-center">
              <p className="border-y border-gold/50 py-1.5 font-serif text-[0.7rem] uppercase tracking-[0.22em] text-ink/75">
                Sunday
              </p>
              <p className="px-4 font-serif text-[3.6rem] font-medium leading-none text-crimson">27</p>
              <p className="border-y border-gold/50 py-1.5 font-serif text-[0.7rem] uppercase tracking-[0.22em] text-ink/75">
                10:00 AM
              </p>
            </div>
            <p className="mt-2 font-serif text-[0.72rem] tracking-[0.42em] text-crimson">2026</p>

            <Divider className="mt-8" />

            <p className="mt-7 font-serif text-[0.68rem] uppercase tracking-[0.42em] text-ink/55">Venue</p>
            <p className="mt-2 font-serif text-[1.45rem] font-medium leading-snug text-crimson">
              Prestige Palace Auditorium
            </p>
            <p className="font-serif text-lg text-ink/70">Edakkara</p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-[14rem] items-center justify-center gap-2 bg-crimson px-5 py-3 font-serif text-[0.7rem] uppercase tracking-[0.25em] text-cream transition-colors duration-150 hover:bg-[#6f0e26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
                <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Directions
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full max-w-[14rem] items-center justify-center gap-2 border border-crimson/60 px-5 py-3 font-serif text-[0.7rem] uppercase tracking-[0.25em] text-crimson transition-colors duration-150 hover:bg-crimson hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
                <CalendarPlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Add to Calendar
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Countdown */}
      <Reveal className="mt-16 text-center">
        <SectionLabel>Counting down to the day</SectionLabel>
        <Countdown />
      </Reveal>

      {/* Closing */}
      <Reveal className="mt-16 text-center">
        <Divider />
        <p lang="ar" dir="rtl" className="mt-8 font-arabic text-2xl leading-loose text-gold">
          بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
        </p>
        <p className="mx-auto mt-3 max-w-[22rem] font-serif text-[1.05rem] italic leading-relaxed text-ink/75">
          Your presence and prayers are our greatest blessing
        </p>
        <p className="text-crimson mt-6 inline-block px-3 pb-1 font-script text-[2.4rem] leading-[1.3]">
          Sithara &amp; Hashim
        </p>
        <StarMedallion className="mx-auto mt-6 h-8 w-8 text-gold/70" />
      </Reveal>

      {/* Credit */}
      <footer className="mt-16 text-center">
        <a
          href="https://www.instagram.com/niaal._/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-serif text-[0.75rem] uppercase tracking-[0.28em] text-ink/60 transition-colors duration-150 hover:text-crimson">
          Crafted by
          <InstagramIcon className="ml-1 h-3.5 w-3.5 text-crimson/80" aria-hidden="true" />
          <span className="text-[0.85rem] font-semibold normal-case tracking-[0.1em] text-crimson/85">@niaal._</span>
        </a>
      </footer>
    </div>);

}
