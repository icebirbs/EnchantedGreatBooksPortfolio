import { useEffect, useState } from 'react';
import { profile, recentBooks, analyses, favorite, learning, reflections, references, type Analysis } from './data';
import { Reveal, Motes, Ornament, PageHeader, Corner, BookIcon, QuillIcon, Shelf } from './ui';

const NAV = [
  ['/profile', 'Reader Profile'],
  ['/analyses', 'Seven Analyses'],
  ['/masterpiece', 'Favorite Masterpiece'],
  ['/learning', 'Summary of Learning'],
  ['/reflection', 'Personal Reflection'],
] as const;

function useRoute() {
  const get = () => window.location.hash.replace(/^#/, '') || '/';
  const [r, setR] = useState(get);
  useEffect(() => {
    const f = () => { setR(get()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return r;
}

/* ---------------- Home: Grand Corridor ---------------- */
const DOORS = [
  { to: '/profile', n: 'I', name: 'The Archivist’s Study', sub: 'Student Profile', wood: 'linear-gradient(180deg,#5a2f1f,#3a1d12)', iron: 'linear-gradient(180deg,#4a4a4f,#1c1c20)', emblem: 'quill' },
  { to: '/analyses', n: 'II', name: 'The Seven Tomes Archive', sub: 'Seven Literary Analyses', wood: 'linear-gradient(180deg,#3a251c,#22130d)', iron: 'linear-gradient(180deg,#f1d77a,#8c6d1c)', emblem: 'books' },
  { to: '/masterpiece', n: 'III', name: 'The Crown Jewel Gallery', sub: 'Favorite Masterpiece', wood: 'linear-gradient(180deg,#4a2574,#2a1340)', iron: 'linear-gradient(180deg,#f1d77a,#8c6d1c)', emblem: 'crown' },
  { to: '/learning', n: 'IV', name: 'The Grimoire Chamber', sub: 'Summary of Learning', wood: 'linear-gradient(180deg,#2a2330,#120e16)', iron: 'linear-gradient(180deg,#5d5d66,#222228)', emblem: 'star' },
  { to: '/reflection', n: 'V', name: 'The Reflection Alcove', sub: 'Personal Reflection', wood: 'linear-gradient(180deg,#6a3a22,#43230f)', iron: 'linear-gradient(180deg,#4a4a4f,#1c1c20)', emblem: 'flame' },
];

function Emblem({ k }: { k: string }) {
  const p = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (k === 'quill') return <svg {...p}><path d="M20 2C10 4 6 10 5 17l-3 5M5 17c5 0 11-3 12-9M9 13h5" /></svg>;
  if (k === 'books') return <svg {...p}><path d="M4 21V5h4v16M8 21V3h4v18M12 21l5-17 4 1-5 16z" /></svg>;
  if (k === 'crown') return <svg {...p}><path d="M3 18l-1-11 6 5 4-8 4 8 6-5-1 11zM3 21h18" /></svg>;
  if (k === 'star') return <svg {...p}><path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5z" /></svg>;
  return <svg {...p}><path d="M12 22c-4 0-7-3-7-7 0-4 4-6 4-11 4 2 5 5 5 7 1-1 2-2 2-4 3 2 3 6 3 8 0 4-3 7-7 7z" /></svg>;
}

function Sconce() {
  return (
    <div className="sconce hidden lg:block" aria-hidden>
      <div className="sconce-glow" /><div className="flame" /><div className="candle" /><div className="bracket" />
    </div>
  );
}

function Home() {
  const [entering, setEntering] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ x: '50%', y: '60%' });

  const go = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (e.metaKey || e.ctrlKey || entering) return;
    e.preventDefault();
    const hall = e.currentTarget.closest('.hall')!.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: `${r.left - hall.left + r.width / 2}px`, y: `${r.top - hall.top + r.height * 0.6}px` });
    setEntering(to);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => { window.location.hash = to; }, reduce ? 0 : 1000);
  };

  return (
    <div className="hall" style={{ ['--fx' as string]: origin.x, ['--fy' as string]: origin.y }}>
      <div className={`hall-scene ${entering ? 'entering' : ''}`} style={{ transformOrigin: `${origin.x} ${origin.y}`, minHeight: 'calc(100vh - 3.5rem)' }}>
        <div className="hall-wall" /><div className="hall-ceiling" /><div className="hall-beams" />
        <div className="hall-rail" /><div className="hall-wainscot" /><div className="hall-floor" /><div className="hall-carpet" /><div className="hall-glow" />
        <Motes count={22} fixed={false} />

        <div className="relative z-10 flex flex-col items-center px-4 pt-24 pb-16 min-h-[inherit]">
          <div className="text-center">
            <p className="font-display text-gold tracking-[.4em] text-xs uppercase flicker">Great Books Literary Portfolio</p>
            <h1 className="font-deco text-3xl sm:text-5xl text-parchment mt-3 [text-shadow:0_0_30px_rgba(255,190,90,.5)]">The Grand Corridor of Tomes</h1>
            <p className="italic text-vellum mt-3 max-w-xl mx-auto">Five doors line the hall, each one humming with candlelight. Hover to coax one open, and step through.</p>
          </div>

          <div className="mt-auto pt-16 w-full max-w-7xl flex flex-wrap lg:flex-nowrap items-end justify-center gap-x-8 gap-y-14 lg:gap-x-4 pb-[8vh]">
            <Sconce />
            {DOORS.map((d, i) => (
              <div key={d.to} className="contents">
                <a href={`#${d.to}`} onClick={(e) => go(e, d.to)} aria-label={`${d.name}: ${d.sub}`} className={`doorway ${entering === d.to ? 'opening' : ''}`} style={{ ['--wood' as string]: d.wood, ['--iron' as string]: d.iron }}>
                  <div className="door-plaque plaque">
                    <span className="block text-[9px] opacity-70">Door {d.n}</span>
                    <span className="block text-[10px] leading-tight tracking-[.12em]">{d.name}</span>
                  </div>
                  <div className="door-arch">
                    <div className="door-inner">
                      <div className="door-light" />
                      <div className="door-leaf">
                        <div className="door-emblem"><Emblem k={d.emblem} /></div>
                        <div className="door-panel"><span className="font-deco text-2xl opacity-80">{d.n}</span></div>
                        <span className="hinge" style={{ top: '30%' }} /><span className="hinge" style={{ top: '62%' }} /><span className="hinge" style={{ top: '88%' }} />
                        <span className="handle" />
                      </div>
                    </div>
                  </div>
                  <span className="step block mt-3 font-display text-[10px] tracking-[.25em] text-gold uppercase">{d.sub} · Enter</span>
                </a>
                {i < DOORS.length - 1 && <Sconce />}
              </div>
            ))}
            <Sconce />
          </div>
        </div>
      </div>
      <div className={`hall-flash ${entering ? 'on' : ''}`} />
    </div>
  );
}

function Dock({ route }: { route: string }) {
  if (route === '/') return null;
  return (
    <div className="dock" role="navigation" aria-label="Corridor navigation">
      <a href="#/" className="compass" aria-label="Return to the Grand Corridor" title="Return to the Grand Corridor">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8l-2.5 5.5L8 16l2.5-5.5z" fill="currentColor" fillOpacity=".35" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>
      </a>
      <span className="hidden sm:block font-display text-[10px] tracking-[.2em] text-gold uppercase mr-1">Corridor</span>
      <div className="flex items-end gap-2">
        {DOORS.map((d) => <a key={d.to} href={`#${d.to}`} title={d.name} aria-label={d.name} className={`key ${route.startsWith(d.to) ? 'cur' : ''}`} />)}
      </div>
    </div>
  );
}

/* ---------------- Profile ---------------- */
function Profile() {
  const [selectedBook, setSelectedBook] = useState(0);
  const bookColors = ['forest', 'burgundy', 'navy', 'ochre'];
  const selected = recentBooks[selectedBook];

  return (
    <>
      <PageHeader kicker="Page I · Reader Profile" title="The Archivist’s Desk" sub="An open ledger, a lit candle, and the reader who keeps them." />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Reveal>
          <div className="archivist-bookcase">
            <div className="bookcase-crown">
              <span className="plaque px-5 py-1.5 rounded-sm text-[10px] sm:text-xs">The Archivist’s Index &amp; Curios</span>
            </div>

            <div className="bookcase-tier top-tier">
              <div className="wood-bookend bookend-left" aria-hidden><span /></div>

              <Reveal delay={80}>
                <div className="standing-portrait">
                  <div className="portrait-frame">
                    <div className="portrait-mat">
                      {profile.photo ? (
                        <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="w-full h-full object-cover object-top" />
                      ) : (
                        <span className="font-display text-[#6c5133] text-xs text-center">Portrait<br />Placeholder</span>
                      )}
                    </div>
                  </div>
                  <div className="frame-foot" aria-hidden />
                  <p className="portrait-caption">{profile.name}</p>
                </div>
              </Reveal>

              <Reveal delay={180} className="min-w-0">
                <article className="patron-card">
                  <div className="patron-card-header">
                    <div>
                      <p className="catalog-kicker">Great Books Library · Reader File</p>
                      <h2>Library Patron Card</h2>
                    </div>
                    <div className="catalog-stamp">ARCHIVES<br />ACTIVE</div>
                  </div>
                  <dl className="catalog-fields">
                    <div><dt>Name</dt><dd>{profile.name}</dd></div>
                    <div><dt>Course / Major</dt><dd>{profile.course}</dd></div>
                    <div><dt>Year Level</dt><dd>{profile.year}</dd></div>
                    <div><dt>Student ID / Section</dt><dd>{profile.section}</dd></div>
                  </dl>
                  <div className="catalog-bio">
                    <p className="catalog-label">Literary Bio</p>
                    {profile.intro.map((text, i) => <p key={i}>{text}</p>)}
                  </div>
                  <div className="catalog-note">
                    <span>Archivist’s Note</span>
                    <p>{profile.expectations}</p>
                  </div>
                  <div className="catalog-punch" aria-hidden />
                </article>
              </Reveal>

              <div className="wood-bookend bookend-right" aria-hidden><span /></div>
            </div>
            <div className="bookcase-ledge"><span className="plaque">Patron Records</span></div>

            <div className="bookcase-tier books-tier">
              <div className="shelf-heading">
                <div>
                  <p>The Reader’s Circulation Shelf</p>
                  <h2>Recent Books Read</h2>
                </div>
                <span>{recentBooks.length} volumes · Select a book</span>
              </div>

              <div className="compact-books" role="list" aria-label="Recent books read">
                {recentBooks.map((book, i) => (
                  <Reveal key={`${book.title}-${book.author}`} delay={i * 110}>
                    <button
                      type="button"
                      role="listitem"
                      onClick={() => setSelectedBook(i)}
                      onMouseEnter={() => setSelectedBook(i)}
                      onFocus={() => setSelectedBook(i)}
                      className={`compact-book cloth-${bookColors[i % bookColors.length]} ${selectedBook === i ? 'selected' : ''}`}
                      aria-label={`View reading note for ${book.title} by ${book.author}`}
                      aria-pressed={selectedBook === i}
                    >
                      <span className="compact-spine" aria-hidden>
                        <i /><i /><i />
                      </span>
                      {book.cover ? (
                        <span className="compact-cover-image">
                          <img src={book.cover} alt={`Cover of ${book.title}`} />
                        </span>
                      ) : (
                        <span className="default-cloth-cover">
                          <span className="cover-filigree corner-top" aria-hidden />
                          <span className="book-cover-crest"><BookIcon size={26} /></span>
                          <strong>{book.title}</strong>
                          <span className="cover-rule" />
                          <em>{book.author}</em>
                          <span className="cover-filigree corner-bottom" aria-hidden />
                        </span>
                      )}
                      <span className="book-hover-slip">Open reading note</span>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="bookcase-ledge lower-ledge"><span className="plaque">Recently Shelved</span></div>

            <div className="review-drawer">
              <div className="drawer-pull" aria-hidden />
              <div key={selectedBook} className="review-slip fade-in" aria-live="polite">
                <div className="review-slip-index">{String(selectedBook + 1).padStart(2, '0')}</div>
                <div>
                  <p className="review-label">Reader’s Takeaway</p>
                  <h3>{selected.title}</h3>
                  <p className="review-author">by {selected.author}</p>
                  <p className="review-copy">{selected.review}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ---------------- Analyses ---------------- */
function Book({ a }: { a: Analysis }) {
  const plum = a.id % 2 === 1;
  return (
    <a href={`#/analyses/${a.id}`} aria-label={`Read full analysis: ${a.title}`} className="book-wrap block group">
      <div className={`book ${plum ? 'leather-plum' : 'leather-espresso'} border border-black/50`}>
        <div className="spine">
          {[10, 17, 83, 90].map((t) => <i key={t} style={{ top: `${t}%` }} />)}
        </div>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
        <div className="absolute inset-y-3 left-[17%] right-3 border border-gold/40 rounded-sm pointer-events-none" />
        <div className="absolute inset-0 left-[15%] px-4 pt-9 pb-24 flex flex-col items-center text-center">
          <span className="font-deco text-3xl text-gold/90 opacity-80 [text-shadow:0_0_12px_rgba(212,175,55,.5)]">{a.glyph}</span>
          <h3 className="font-deco text-[#e8c75a] text-base sm:text-lg leading-snug mt-2 [text-shadow:0_1px_0_#000,0_-1px_0_rgba(255,240,170,.5),0_0_10px_rgba(212,175,55,.3)]">{a.title}</h3>
          <div className="w-12 h-px bg-gold/70 my-2" />
          <p className="italic text-parchment/90 text-xs sm:text-sm">{a.author}</p>
          <span className="mt-auto -rotate-2 bg-parchment text-[#3a251c] text-[10px] font-display font-bold tracking-wide px-2 py-1 border border-[#b8942b] shadow-md max-w-full leading-tight">
            <span className="block text-[8px] text-violet tracking-widest">LENS · No. {a.id}</span>{a.lens}
          </span>
        </div>
        <div className="absolute bottom-0 left-[15%] right-0 flex justify-center">
          <span className="seal-btn"><BookIcon size={14} />Read Full Analysis</span>
        </div>
      </div>
    </a>
  );
}

function Analyses() {
  const rows = [analyses.slice(0, 3), analyses.slice(3, 6), analyses.slice(6, 7)];
  const plaques = ['Tomes I – III', 'Tomes IV – VI', 'Tome VII'];
  return (
    <>
      <PageHeader kicker="Page II · Seven Analyses" title="The Seven Tomes" sub="Seven works, seven perspectives. Choose a book from the shelf to open its full analysis." />
      <section className="max-w-6xl mx-auto px-4 py-16">
        {rows.map((row, r) => (
          <Shelf key={r} plaque={plaques[r]}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-10 pb-5 lg:px-[8%]">
              {row.map((a, i) => <Reveal key={a.id} delay={i * 150}><Book a={a} /></Reveal>)}
            </div>
          </Shelf>
        ))}
      </section>
    </>
  );
}

function Reading({ id }: { id: number }) {
  const a = analyses[id - 1];
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && id < analyses.length) window.location.hash = `/analyses/${id + 1}`;
      if (e.key === 'ArrowLeft' && id > 1) window.location.hash = `/analyses/${id - 1}`;
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [id]);
  const nav = (n: number, label: string, dir: 'prev' | 'next') => (
    n >= 1 && n <= analyses.length ? (
      <a href={`#/analyses/${n}`} className="seal-btn !text-[.7rem]">{dir === 'prev' ? '← ' : ''}{label}: {analyses[n - 1].title.length > 22 ? `Tome ${n}` : analyses[n - 1].title}{dir === 'next' ? ' →' : ''}</a>
    ) : <span />
  );
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 min-h-screen">
      <a href="#/analyses" className="font-display text-xs tracking-widest text-gold uppercase hover:text-parchment">← Return to the Shelf</a>
      <div key={a.id} className="parchment gold-frame fade-in relative mt-5 rounded-md shadow-[0_0_70px_rgba(106,53,156,.55)]">
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-plum to-transparent rounded-l-md opacity-70" />
        <div className="px-6 md:px-16 pt-10 pb-6 text-center border-b border-[#c9b48a]">
          <p className="font-display text-xs tracking-[.25em] text-violet uppercase">Tome {a.id} of {analyses.length}</p>
          <h1 className="font-deco text-3xl md:text-4xl text-plum mt-2">{a.title}</h1>
          <p className="italic text-[#6b5640] mt-1">by {a.author}</p>
          <span className="inline-block mt-3 text-xs font-display font-bold px-3 py-1 rounded-full bg-plum text-gold border border-gold">{a.lens} Lens</span>
        </div>
        <article className="px-6 md:px-16 py-8 text-[1.08rem] leading-8">
          {a.sections.map((s, i) => (
            <Reveal key={s.heading}><section className="mb-8">
              <h2 className="font-display font-bold text-plum text-xl mb-3"><span className="text-gold mr-2">{['I', 'II', 'III', 'IV'][i]}.</span>{s.heading}</h2>
              {s.body.map((t, j) => <p key={j} className={`mb-3 ${i === 0 && j === 0 ? 'first-letter:font-deco first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:text-violet first-letter:leading-none' : ''}`}>{t}</p>)}
            </section></Reveal>
          ))}
        </article>
        <footer className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-16 py-6 border-t border-[#c9b48a]">
          {nav(id - 1, 'Previous', 'prev')}
          <span className="font-display text-sm text-[#6b5640]">{id} / {analyses.length}</span>
          {nav(id + 1, 'Next', 'next')}
        </footer>
      </div>
    </div>
  );
}

/* ---------------- Masterpiece ---------------- */
function Masterpiece() {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState<'next' | 'prev' | null>(null);
  const total = favorite.tabs.length;

  const flip = (direction: 'next' | 'prev') => {
    if (turning) return;
    setTurning(direction);
    window.setTimeout(() => {
      setPage((current) => direction === 'next' ? (current + 1) % total : (current - 1 + total) % total);
    }, 330);
    window.setTimeout(() => setTurning(null), 720);
  };

  return (
    <>
      <PageHeader kicker="Page III · Favorite Masterpiece" title="The Crown Jewel" sub="The one book that stayed with me when the lamp went out." />
      <section className="max-w-6xl mx-auto px-3 sm:px-4 py-16">
        <Reveal>
          <div
            className="flip-book-shell"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') flip('next');
              if (e.key === 'ArrowLeft') flip('prev');
            }}
            aria-label={`${favorite.title} interactive flip-book. Use the left and right pages or arrow keys to turn pages.`}
          >
            <div className="flip-book">
              <div className="book-spread">
                <button className="book-page book-page-left" onClick={() => flip('prev')} aria-label="Turn to the previous page">
                  <span className="page-edge-cue page-edge-left" aria-hidden>‹</span>
                  <div className="manuscript-rule" />
                  <p className="font-display text-[9px] sm:text-xs tracking-[.22em] uppercase text-[#7b2638]">The Crown Jewel</p>
                  <h2 className="font-deco text-xl sm:text-3xl lg:text-4xl text-plum mt-2 leading-tight">{favorite.title}</h2>
                  <p className="italic text-[#765b3c] text-xs sm:text-sm mt-1">by {favorite.author}</p>
                  <p className="font-display text-[8px] sm:text-[10px] tracking-[.18em] uppercase text-[#8a6a3b] mt-1">{favorite.era}</p>

                  <div className="masterpiece-art mt-4 sm:mt-6">
                    <RolandArtwork page={page} />
                    <span className="art-caption">{favorite.tabs[page].key}</span>
                  </div>
                  <p className="folio folio-left">{String(page * 2 + 1).padStart(2, '0')}</p>
                </button>

                <button className="book-page book-page-right" onClick={() => flip('next')} aria-label="Turn to the next page">
                  <span className="page-edge-cue page-edge-right" aria-hidden>›</span>
                  <div className="manuscript-rule" />
                  <p className="font-display text-[9px] sm:text-xs tracking-[.25em] uppercase text-[#8a6a3b]">Chapter {String(page + 1).padStart(2, '0')}</p>
                  <h3 className="font-display font-bold text-plum text-lg sm:text-2xl mt-2 sm:mt-4">{favorite.tabs[page].key}</h3>
                  <Ornament />
                  <p key={page} className="fade-in book-copy">{favorite.tabs[page].body}</p>
                  <span className="turn-hint">Click to turn forward</span>
                  <p className="folio folio-right">{String(page * 2 + 2).padStart(2, '0')} / {String(total * 2).padStart(2, '0')}</p>
                </button>

                {turning && (
                  <div className={`turning-sheet turning-${turning}`} aria-hidden>
                    <div className="turning-sheet-face">
                      <span className="font-deco text-4xl text-plum/20">R</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="book-spine-shadow" aria-hidden />
            </div>

            <div className="mt-7 flex items-center justify-center gap-2" aria-label={`Page ${page + 1} of ${total}`}>
              {favorite.tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (i === page || turning) return;
                    setTurning(i > page ? 'next' : 'prev');
                    window.setTimeout(() => setPage(i), 330);
                    window.setTimeout(() => setTurning(null), 720);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${i === page ? 'w-8 bg-gold shadow-[0_0_10px_#d4af37]' : 'w-2 bg-gold/30 hover:bg-gold/70'}`}
                  aria-label={`Open ${tab.key}`}
                  aria-current={i === page ? 'page' : undefined}
                />
              ))}
            </div>
            <p className="text-center mt-3 font-display text-[10px] tracking-[.2em] uppercase text-gold/70">Turn with the page edges or arrow keys · Final page loops to the beginning</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function RolandArtwork({ page }: { page: number }) {
  const accents = ['#7b2638', '#6a359c', '#9b6b2d', '#3b6a9c', '#2f7a5a'];
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label={`Illuminated manuscript artwork for ${favorite.tabs[page].key}`} className="w-full h-full">
      <defs>
        <linearGradient id={`sky-${page}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead8aa" />
          <stop offset="1" stopColor="#c7a66a" />
        </linearGradient>
        <pattern id={`stars-${page}`} width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M17 10l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#d4af37" opacity=".35" />
        </pattern>
      </defs>
      <rect width="360" height="240" fill={`url(#sky-${page})`} />
      <rect width="360" height="240" fill={`url(#stars-${page})`} />
      <path d="M0 190Q70 145 130 180t120-10q55-25 110 20v50H0z" fill={accents[page]} opacity=".72" />
      <path d="M35 190V100h64v90M45 100V78l12 12 10-20 10 20 12-12v22M261 190v-70h64v70M271 120V96l12 12 10-20 10 20 12-12v24" fill="#4b2b20" stroke="#8b5e32" strokeWidth="4" />
      <circle cx="180" cy="94" r="47" fill="#f5efe6" stroke="#d4af37" strokeWidth="5" />
      {page === 0 && <g stroke="#7b2638" strokeWidth="7" fill="none" strokeLinecap="round"><path d="M155 115q17-35 50-42M196 70l17 13-8 17M167 108l29 22" /><circle cx="160" cy="112" r="8" fill="#d4af37" /></g>}
      {page === 1 && <g fill="none" stroke="#6a359c" strokeWidth="7" strokeLinejoin="round"><path d="M150 100l30-37 30 37-30 28zM180 63v65M150 100h60" /></g>}
      {page === 2 && <g fill="none" stroke="#9b6b2d" strokeWidth="7" strokeLinecap="round"><path d="M150 116l60-50M156 62l49 61M143 119l18 7 4-19M197 63l18 7-4 18" /></g>}
      {page === 3 && <g fill="none" stroke="#3b6a9c" strokeWidth="6"><path d="M145 116l10-44 25 20 25-20 10 44zM145 116h70" /><circle cx="155" cy="72" r="5" fill="#d4af37" /><circle cx="180" cy="92" r="5" fill="#d4af37" /><circle cx="205" cy="72" r="5" fill="#d4af37" /></g>}
      {page === 4 && <g fill="none" stroke="#2f7a5a" strokeWidth="6" strokeLinecap="round"><path d="M180 126V65M180 88q-27-23-34 0 23 17 34 0M180 105q27-23 34 0-23 17-34 0" /></g>}
      <path d="M12 12h336v216H12zM20 20h320v200H20z" fill="none" stroke="#8b5e32" strokeWidth="3" />
      <path d="M12 40h28V12M348 40h-28V12M12 200h28v28M348 200h-28v28" fill="none" stroke="#d4af37" strokeWidth="5" />
    </svg>
  );
}

/* ---------------- Learning ---------------- */
function Icon({ name }: { name: string }) {
  const p = { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'hourglass') return <svg {...p}><path d="M6 2h12M6 22h12M7 2c0 6 5 7 5 10s-5 4-5 10M17 2c0 6-5 7-5 10s5 4 5 10" /></svg>;
  if (name === 'lens') return <svg {...p}><circle cx="10" cy="10" r="7" /><path d="M15 15l7 7M7 10a3 3 0 013-3" /></svg>;
  if (name === 'heart') return <svg {...p}><path d="M12 21C5 15 2 12 2 8a5 5 0 0110-1 5 5 0 0110 1c0 4-3 7-10 13z" /></svg>;
  return <QuillIcon size={34} />;
}
function Learning() {
  return (
    <>
      <PageHeader kicker="Page IV · Summary of Learning" title="Grimoire of Knowledge" sub="Four lessons, bound and shelved." />
      <section className="learning-archive py-20">
        <div className="archive-silhouettes" aria-hidden>
          <span className="shadow-shelf shadow-shelf-left" />
          <span className="shadow-arch shadow-arch-one" />
          <span className="shadow-arch shadow-arch-two" />
          <span className="shadow-shelf shadow-shelf-right" />
        </div>
        <Motes count={18} fixed={false} />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="curio-case">
              <span className="case-filigree case-filigree-tl" aria-hidden />
              <span className="case-filigree case-filigree-tr" aria-hidden />
              <span className="case-filigree case-filigree-bl" aria-hidden />
              <span className="case-filigree case-filigree-br" aria-hidden />
              <div className="curio-lamp" aria-hidden><span /></div>

              <div className="curio-interior">
                <div className="curio-light" aria-hidden />
                <div className="curio-artifacts">
                  {learning.map((l, i) => (
                    <Reveal key={l.title} delay={i * 140}>
                      <article className={`artifact-card artifact-${i + 1}`}>
                        <span className="artifact-pin" aria-hidden />
                        <div className="wax-seal">
                          <span className="seal-rim" aria-hidden />
                          <Icon name={l.icon} />
                        </div>
                        <p className="artifact-index">Archive Note · {String(i + 1).padStart(2, '0')}</p>
                        <h2>{l.title}</h2>
                        <div className="artifact-rule" aria-hidden />
                        <p>{l.body}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
                <div className="curio-glass" aria-hidden />
              </div>

              <div className="curio-nameplate">
                <span className="nameplate-screw" aria-hidden />
                <strong>Core Takeaways</strong>
                <span className="nameplate-screw" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------------- Reflection ---------------- */
function Reflection() {
  const [chapter, setChapter] = useState(0);
  const [candleFocus, setCandleFocus] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollSnapType;
    root.style.scrollSnapType = 'y proximity';
    return () => { root.style.scrollSnapType = previous; };
  }, []);

  const current = reflections[chapter];

  return (
    <section className="reflection-snap">
      <PageHeader kicker="Page V · Personal Reflection" title="Reflections by Candlelight" sub="Five journal chapters, written after the last page." />
      <div className="reflection-stage">
        <Reveal>
          <div className={`writer-desk ${candleFocus ? 'candle-focus' : ''}`}>
            <div className="desk-vignette" aria-hidden />
            <div className="desk-candle" aria-hidden>
              <span className="desk-candle-halo" />
              <span className="desk-flame" />
              <span className="desk-wick" />
              <span className="desk-candle-wax"><i /></span>
              <span className="desk-candle-cup" />
              <span className="desk-candle-handle" />
            </div>

            <div className="manuscript-wrap">
              <nav className="chapter-tabs" aria-label="Reflection chapters">
                {reflections.map((reflection, i) => (
                  <button
                    key={reflection.title}
                    type="button"
                    onClick={() => setChapter(i)}
                    className={`chapter-tab chapter-tab-${i + 1} ${chapter === i ? 'active' : ''}`}
                    aria-current={chapter === i ? 'page' : undefined}
                    title={reflection.title}
                  >
                    <span>{['I', 'II', 'III', 'IV', 'V'][i]}</span>
                    <i aria-hidden />
                  </button>
                ))}
              </nav>

              <article
                className="reflection-manuscript"
                onMouseEnter={() => setCandleFocus(true)}
                onMouseLeave={() => setCandleFocus(false)}
                onFocus={() => setCandleFocus(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setCandleFocus(false);
                }}
                tabIndex={0}
              >
                <div className="manuscript-corner manuscript-corner-tl" aria-hidden />
                <div className="manuscript-corner manuscript-corner-tr" aria-hidden />
                <p className="manuscript-kicker">Personal Reflection · Chapter {String(chapter + 1).padStart(2, '0')}</p>
                <h2 key={`title-${chapter}`} className="fade-in">{current.title}</h2>
                <div className="ink-flourish" aria-hidden>
                  <span />
                  <svg viewBox="0 0 220 30" fill="none">
                    <path d="M2 16c25-19 39 15 67-2 19-12 29 7 41 4 13-3 16-21 34-14 11 4 8 17 21 18 16 1 22-14 53-7" />
                    <path d="M81 17c8 9 20 10 29 1M143 5c-2 10 4 17 15 18" />
                  </svg>
                  <span />
                </div>
                <p key={`body-${chapter}`} className="manuscript-copy fade-in whitespace-pre-wrap">{current.body}</p>
                <footer className="manuscript-folio">
                  <span>R.F.M.</span>
                  <span>{String(chapter + 1).padStart(2, '0')} / {String(reflections.length).padStart(2, '0')}</span>
                </footer>
              </article>
            </div>

            <div className="writing-tools" aria-hidden>
              <svg className="desk-quill" viewBox="0 0 120 330" fill="none">
                <path d="M29 316C46 236 66 155 99 27" stroke="#d7c7a3" strokeWidth="5" strokeLinecap="round" />
                <path d="M98 27C66 42 35 78 33 120c19-10 34-23 46-39-17 31-32 57-49 81 23-8 41-22 53-41-16 27-33 52-53 74 21-6 38-17 49-32-13 23-29 44-46 61 4-54 15-108 32-157C75 42 85 31 98 27z" fill="#d8c9aa" stroke="#7c6546" strokeWidth="2" />
                <path d="M64 68L40 99M76 47L48 71M53 107L34 140M48 149L30 177M45 189L31 210" stroke="#8e7655" strokeWidth="2" />
              </svg>
              <div className="inkwell">
                <span className="inkwell-neck" />
                <span className="inkwell-glass" />
                <span className="inkwell-label">INK</span>
              </div>
            </div>

            <p className="desk-instruction">Select a chapter tab · Hover over the manuscript to draw the candlelight closer</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Shell ---------------- */
export default function App() {
  const route = useRoute();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [route]);

  const m = route.match(/^\/analyses\/(\d)$/);
  let page = <Home />;
  if (m && +m[1] >= 1 && +m[1] <= analyses.length) page = <Reading id={+m[1]} />;
  else if (route === '/profile') page = <Profile />;
  else if (route === '/analyses') page = <Analyses />;
  else if (route === '/masterpiece') page = <Masterpiece />;
  else if (route === '/learning') page = <Learning />;
  else if (route === '/reflection') page = <Reflection />;

  const isActive = (to: string) => route === to || (to === '/analyses' && route.startsWith('/analyses'));

  return (
    <div className="relative min-h-screen">
      <Motes />
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#4a3322] to-walnut border-b-2 border-gold shadow-[0_4px_20px_rgba(0,0,0,.6)]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#/" className="font-deco text-gold text-sm md:text-base">Great Books Index</a>
          <button className="md:hidden text-gold font-display text-sm border border-gold/60 px-3 py-1 rounded cursor-pointer" onClick={() => setMenu(!menu)} aria-expanded={menu}>Menu</button>
          <ul className="hidden md:flex h-full">
            {NAV.map(([to, label], i) => (
              <li key={to} className="h-full"><a href={`#${to}`} aria-current={isActive(to) ? 'page' : undefined} className={`relative h-full flex items-center font-display text-xs lg:text-sm px-3 transition ${isActive(to) ? 'nav-active text-gold' : 'text-vellum hover:text-gold'}`}><span className="text-gold/70 mr-1">{i + 1}.</span>{label}</a></li>
            ))}
          </ul>
        </div>
        {menu && <ul className="md:hidden px-4 pb-3 grid gap-1">{NAV.map(([to, label], i) => <li key={to}><a href={`#${to}`} className={`block font-display text-sm py-2 px-3 rounded ${isActive(to) ? 'bg-violet text-gold border-b-2 border-gold' : 'bg-plum/60 text-vellum'}`}>{i + 1}. {label}</a></li>)}</ul>}
      </nav>

      <main key={route.startsWith('/analyses/') ? route : route} className="relative z-10 arrive">{page}</main>
      <Dock route={route} />

      <footer className="relative z-10 bg-[#170e0a] border-t-2 border-gold mt-12">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-deco text-gold text-lg">Colophon</h3>
            <p className="mt-3 text-sm leading-6 text-vellum/80">{profile.course}<br />{profile.name} · {profile.year} · {profile.section}<br />Set in Cinzel and Lora, by candlelight.</p>
          </div>
          <div>
            <h3 className="font-deco text-gold text-lg">Quick Links</h3>
            <ul className="mt-3 grid gap-1 text-sm"><li><a href="#/" className="text-vellum hover:text-gold">Home</a></li>{NAV.map(([to, l]) => <li key={to}><a href={`#${to}`} className="text-vellum hover:text-gold">{l}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="font-deco text-gold text-lg">References &amp; Acknowledgments</h3>
            <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-vellum/80 list-disc pl-4">{references.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
        <p className="text-center text-xs text-vellum/50 pb-6 font-display tracking-widest">FINIS</p>
      </footer>
    </div>
  );
}
