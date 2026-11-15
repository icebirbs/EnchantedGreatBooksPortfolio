import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Motes({ count = 28, fixed = true }: { count?: number; fixed?: boolean }) {
  const [m] = useState(() => Array.from({ length: count }, () => ({
    left: Math.random() * 100, size: 2 + Math.random() * 5, dur: 10 + Math.random() * 16,
    delay: -Math.random() * 25, dx: (Math.random() - 0.5) * 160,
  })));
  return <>{m.map((p, i) => (
    <span key={i} className="mote" style={{ position: fixed ? 'fixed' : 'absolute', left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, ['--dx' as string]: `${p.dx}px`, ...(fixed ? {} : { bottom: 0, animationName: 'floatLocal' }) } as CSSProperties} />
  ))}</>;
}

export const Ornament = () => (
  <div className="flex items-center justify-center gap-3 text-gold my-3" aria-hidden>
    <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" /></svg>
    <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
  </div>
);

export function PageHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <header className="relative overflow-hidden text-center px-4 py-16 md:py-24 border-b border-gold/40" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(106,53,156,.4), transparent 70%)' }}>
      <Motes count={14} fixed={false} />
      <div className="relative reveal in">
        <p className="font-display text-gold tracking-[.3em] text-xs uppercase">{kicker}</p>
        <h1 className="font-deco text-3xl md:text-5xl text-parchment mt-3 [text-shadow:0_0_24px_rgba(212,175,55,.35)]">{title}</h1>
        <Ornament />
        {sub && <p className="italic text-vellum/90 max-w-xl mx-auto">{sub}</p>}
      </div>
    </header>
  );
}

export const Corner = ({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place = { tl: 'top-2 left-[18%]', tr: 'top-2 right-2', br: 'bottom-2 right-2', bl: 'bottom-2 left-[18%]' }[pos];
  return (
    <svg className={`corner ${place}`} style={{ transform: `rotate(${rot}deg)` }} viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M1 25V1h24M5 25V5h20M1 9c5 0 8-3 8-8M9 13c3 0 4-1 4-4" />
      <circle cx="5" cy="5" r="1.6" fill="currentColor" />
    </svg>
  );
};

export const QuillIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 2C10 4 6 10 5 17l-3 5M5 17c5 0 11-3 12-9M9 13h5" /></svg>
);
export const BookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 5c4-2 8-1 10 1 2-2 6-3 10-1v14c-4-2-8-1-10 1-2-2-6-3-10-1z M12 6v14" /></svg>
);

export function Shelf({ plaque, children }: { plaque: string; children: ReactNode }) {
  return (
    <div className="mb-16">
      <div className="shelf-back rounded-t-md px-4 sm:px-8 pt-10 pb-0 border-x border-t border-black/50">{children}</div>
      <div className="shelf-ledge flex items-center justify-center">
        <span className="plaque text-[10px] px-4 py-0.5 rounded-sm -mb-1">{plaque}</span>
      </div>
    </div>
  );
}
