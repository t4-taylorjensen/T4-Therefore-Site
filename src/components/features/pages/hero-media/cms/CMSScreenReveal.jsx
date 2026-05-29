import { useState, useEffect, useRef } from 'react';
import '../hero-media.css';
import heroImg from '../assets/cms-hero-canyon.png';
import bgPhoto from '../assets/cms-bg-pexels.jpg';

const MONO = { fontFamily: "'Roobert Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1 };
const SANS = { fontFamily: "'Roobert', sans-serif" };
const ink  = (o) => `rgba(18,18,18,${o})`;
const BLUE = '#4297FF';

// All CMS pixel values are authored at this reference width.
// A ResizeObserver scales the whole layer proportionally at runtime.
const REF_W = 680;

const HEADLINES = [
  'Roam Freely. Live Fully.',
  'Guided by the Canyon.',
  'Where Every Trail Leads Home.',
  'Adventure, Thoughtfully Crafted.',
];
const AI_SUGGESTIONS = ['Find Your Freedom Here.', 'Every Path, A Story.', 'Live the Canyon Life.'];

const VIEW_DURATIONS = [3000, 3200, 5500];
const COLS = 12;

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

/* ── Icons (authored at reference size — scale handles the rest) ── */
const IcoDesktop = () => <svg width="12" height="9"  viewBox="0 0 12 9"  fill="none"><rect x=".5" y=".5" width="11" height="7" rx="1" stroke={ink(0.3)} strokeWidth="1"/><path d="M4 8.5h4M6 7.5v1" stroke={ink(0.3)} strokeWidth="1" strokeLinecap="round"/></svg>;
const IcoTablet  = () => <svg width="8"  height="10" viewBox="0 0 8 10"  fill="none"><rect x=".5" y=".5" width="7" height="9" rx="1" stroke={ink(0.22)} strokeWidth="1"/><circle cx="4" cy="8.2" r=".6" fill={ink(0.22)}/></svg>;
const IcoMobile  = () => <svg width="6"  height="10" viewBox="0 0 6 10"  fill="none"><rect x=".5" y=".5" width="5" height="9" rx="1" stroke={ink(0.22)} strokeWidth="1"/><circle cx="3" cy="8.2" r=".5" fill={ink(0.22)}/></svg>;
const IcoChevron = () => <svg width="7"  height="4"  viewBox="0 0 7 4"   fill="none"><path d="M1 .5l2.5 3L6 .5" stroke={ink(0.35)} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IcoGear    = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="1.5" stroke={ink(0.3)} strokeWidth="1"/><path d="M5 .5V2M5 8v1.5M.5 5H2M8 5h1.5M1.5 1.5l1 1M7.5 7.5l1 1M7.5 1.5l-1 1M1.5 7.5l1-1" stroke={ink(0.3)} strokeWidth="1" strokeLinecap="round"/></svg>;
const IcoPlay    = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke={ink(0.3)} strokeWidth="1"/><path d="M3.8 3l3.2 2-3.2 2V3Z" fill={ink(0.35)}/></svg>;
const IcoSparkle = () => <svg width="8"  height="8"  viewBox="0 0 8 8"   fill="none"><path d="M4 0v1.8M4 6.2V8M0 4h1.8M6.2 4H8M1.2 1.2l1.2 1.2M5.6 5.6l1.2 1.2M5.6 1.2L4.4 2.4M1.2 5.6l1.2-1.2" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"/><circle cx="4" cy="4" r="1.1" fill="currentColor"/></svg>;
const IcoUpload  = () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 6.5V1M3 3L5 1l2 2" stroke={ink(0.35)} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 7.5v1a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1" stroke={ink(0.35)} strokeWidth="1" strokeLinecap="round"/></svg>;

const NAV_ITEMS = [
  { label: 'Hero',  active: true,  icon: <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><rect x=".5" y="3" width="11" height="6.5" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M2.5 3V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg> },
  { label: 'Nav',   active: false, icon: <svg width="12" height="8"  viewBox="0 0 12 8"  fill="none"><path d="M1 1h10M1 4h6M1 7h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg> },
  { label: 'Grid',  active: false, icon: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x=".5" y=".5" width="4" height="4" rx=".7" stroke="currentColor" strokeWidth="1"/><rect x="5.5" y=".5" width="4" height="4" rx=".7" stroke="currentColor" strokeWidth="1"/><rect x=".5" y="5.5" width="4" height="4" rx=".7" stroke="currentColor" strokeWidth="1"/><rect x="5.5" y="5.5" width="4" height="4" rx=".7" stroke="currentColor" strokeWidth="1"/></svg> },
  { label: 'Media', active: false, icon: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/><path d="M3.5 3l4 2-4 2V3Z" fill="currentColor"/></svg> },
  { label: 'CTA',   active: false, icon: <svg width="12" height="7"  viewBox="0 0 12 7"  fill="none"><rect x=".5" y=".5" width="11" height="6" rx="2.5" stroke="currentColor" strokeWidth="1"/><path d="M4 3.5h4M6.5 2l1.5 1.5L6.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

export default function CMSScreenReveal({ animated = true }) {
  const [phase, setPhase]   = useState(0);
  const [gridIn, setGridIn] = useState(false);
  const [cmsIn, setCmsIn]   = useState(false);
  const [hlIdx, setHlIdx]   = useState(0);
  const [fading, setFading] = useState(false);
  const [suggIn, setSuggIn] = useState(false);

  // Scale tracking
  const cardRef  = useRef(null);
  const [dims, setDims] = useState({ w: REF_W, h: 440 });
  const scale    = dims.w / REF_W;
  const refH     = dims.h / scale; // reference height = card height un-scaled

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => { setHlIdx(i => (i + 1) % HEADLINES.length); setFading(false); }, 280);
    }, 3200);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => {
      const next = (phase + 1) % 3;
      setPhase(next);
      if (next === 1) { setTimeout(() => setGridIn(true), 60); setCmsIn(false); setSuggIn(false); }
      else if (next === 2) { setCmsIn(true); setTimeout(() => setSuggIn(true), 900); }
      else { setGridIn(false); setCmsIn(false); setSuggIn(false); }
    }, VIEW_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [animated, phase]);

  return (
    <div className="hm-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <img src={bgPhoto} alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: NOISE, backgroundRepeat: 'repeat', backgroundSize: '200px 200px', mixBlendMode: 'overlay' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)', pointerEvents: 'none' }} />

      {/* Outer glass frame — no border line */}
      <div style={{
        position: 'relative',
        width: 'calc(100% - 120px)',
        maxWidth: 560,
        borderRadius: 12,
        padding: 6,
        background: 'rgba(255,255,255,0.14)',
        backdropFilter: 'blur(22px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
        boxShadow: '0 2px 0 rgba(255,255,255,0.16) inset, 0 40px 100px rgba(0,0,0,0.55)',
      }}>

        {/* Inner card — ref for ResizeObserver */}
        <div ref={cardRef} style={{ position: 'relative', width: '100%', borderRadius: 7, overflow: 'hidden' }}>

          {/* Hero image — drives card height */}
          <img src={heroImg} alt="" aria-hidden="true"
            style={{ width: '100%', height: 'auto', display: 'block' }} />

          {/* ── View 2: Grid columns draw down ── */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', padding: '0 12px', gap: '1.4%',
            pointerEvents: 'none',
            opacity: phase === 0 ? 0 : phase === 1 ? 1 : 0,
            transition: phase === 2 ? 'opacity 0.7s ease' : 'opacity 0.3s ease',
          }}>
            {Array.from({ length: COLS }, (_, i) => (
              <div key={i} style={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(66,151,255,0.70)',
                  clipPath: gridIn ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                  transition: gridIn ? `clip-path 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.035}s` : 'none',
                }} />
              </div>
            ))}
          </div>

          {/* ── View 3: CMS editor — clipping wrapper ── */}
          <div style={{
            position: 'absolute', inset: 0,
            overflow: 'hidden',
            opacity: cmsIn ? 1 : 0,
            transition: 'opacity 0.65s ease',
            pointerEvents: cmsIn ? 'auto' : 'none',
          }}>
            {/*
              Everything inside is authored at REF_W × refH pixels.
              transform: scale(scale) shrinks or grows it to fill the actual card.
            */}
            <div style={{
              width: REF_W,
              height: refH,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              background: '#F0F0EE',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}>

              {/* Toolbar */}
              <div style={{ flexShrink: 0, height: 30, background: '#fff', borderBottom: '1px solid rgba(18,18,18,0.07)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 7 }}>
                <div style={{ width: 20, height: 20, background: ink(0.06), borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 8.5L4.5 1 8 8.5" stroke={ink(0.55)} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.2 5.8h4.6" stroke={ink(0.55)} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', border: '1px solid rgba(18,18,18,0.10)', borderRadius: 99 }}>
                  <span style={{ ...SANS, fontSize: 7.5, color: ink(0.5) }}>+ Insert</span>
                </div>
                <div style={{ width: 1, height: 13, background: ink(0.07) }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IcoDesktop /><IcoTablet /><IcoMobile /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ ...MONO, fontSize: 5, color: ink(0.4) }}>1440</span>
                  <span style={{ ...MONO, fontSize: 4.5, color: ink(0.2) }}>PX</span>
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <span style={{ ...SANS, fontSize: 7.5, color: ink(0.45) }}>Pages</span>
                    <IcoChevron />
                  </div>
                  <IcoGear /><IcoPlay />
                  <div style={{ ...SANS, fontSize: 7.5, fontWeight: 500, color: '#fff', background: '#121212', padding: '3px 9px', borderRadius: 5 }}>Publish</div>
                </div>
              </div>

              {/* Body — canvas left, properties right */}
              <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

                {/* ── Left: canvas ── */}
                <div style={{ flex: 1, background: '#E8E8E6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 14, position: 'relative', gap: 0 }}>

                  {/* Breadcrumb bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 3 }}>
                    {['Canyon Spirit', 'Hero'].map((c, i, a) => (
                      <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ ...SANS, fontSize: 6.5, color: i === a.length - 1 ? ink(0.55) : ink(0.25) }}>{c}</span>
                        {i < a.length - 1 && <span style={{ fontSize: 6.5, color: ink(0.18) }}>›</span>}
                      </span>
                    ))}
                    <div style={{ flex: 1 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <div style={{ position: 'relative', width: 5, height: 5 }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: BLUE, animation: 'hm-ping 2s ease-out infinite' }} />
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: BLUE }} />
                      </div>
                      <span style={{ ...MONO, fontSize: 4.8, color: ink(0.5) }}>Live</span>
                    </div>
                  </div>

                  {/* Canvas card */}
                  <div style={{ position: 'relative', width: '100%', marginTop: 20 }}>

                    {/* Hero image */}
                    <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}>
                      <img src={heroImg} alt="" aria-hidden="true" style={{ width: '100%', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 55%)', pointerEvents: 'none' }} />

                      {/* Floating inline toolbar — above selection */}
                      <div style={{
                        position: 'absolute', bottom: 38, left: 10,
                        display: 'flex', alignItems: 'center', gap: 1,
                        background: '#1a1a1a',
                        borderRadius: 7,
                        padding: '4px 5px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                        opacity: suggIn ? 1 : 0,
                        transform: suggIn ? 'translateY(0)' : 'translateY(3px)',
                        transition: 'opacity 0.35s ease 0.2s, transform 0.35s ease 0.2s',
                      }}>
                        {[
                          { label: 'B', bold: true },
                          { label: 'I', italic: true },
                          { label: 'H1' },
                          { label: 'H2' },
                        ].map(({ label, bold, italic }) => (
                          <div key={label} style={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, cursor: 'pointer' }}>
                            <span style={{ ...SANS, fontSize: 8, fontWeight: bold ? 700 : 400, fontStyle: italic ? 'italic' : 'normal', color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                          </div>
                        ))}
                        <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.12)', margin: '0 3px' }} />
                        {/* AI button in toolbar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '2px 7px', background: BLUE, borderRadius: 4, cursor: 'pointer' }}>
                          <span style={{ color: '#fff' }}><IcoSparkle /></span>
                          <span style={{ ...SANS, fontSize: 7, color: '#fff', fontWeight: 600 }}>AI</span>
                        </div>
                      </div>

                      {/* Selected headline text block */}
                      <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                        <div style={{ background: 'rgba(66,151,255,0.15)', border: `1px solid ${BLUE}`, borderRadius: 3, padding: '5px 8px', display: 'inline-flex', alignItems: 'center', maxWidth: '100%' }}>
                          <span style={{ ...SANS, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.95)', opacity: fading ? 0 : 1, transition: 'opacity 0.22s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {HEADLINES[hlIdx]}
                          </span>
                          <span style={{ width: 1.5, height: 11, background: 'rgba(255,255,255,0.85)', marginLeft: 2, flexShrink: 0, animation: 'hm-cursor 1s step-end infinite' }} />
                        </div>
                      </div>
                    </div>

                    {/* Corner resize handles */}
                    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y], i) => (
                      <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: '#fff', border: `1.5px solid ${BLUE}`, borderRadius: 1.5, zIndex: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)', left: x < 0 ? -3 : undefined, right: x > 0 ? -3 : undefined, top: y < 0 ? -3 : undefined, bottom: y > 0 ? -3 : undefined }} />
                    ))}
                    {/* Selection border overlay */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 4, border: `1.5px solid ${BLUE}`, pointerEvents: 'none', boxShadow: `0 0 0 3px rgba(66,151,255,0.12)` }} />
                  </div>
                </div>

                {/* ── Right: properties panel ── */}
                <div style={{ width: 210, flexShrink: 0, background: '#fff', borderLeft: '1px solid rgba(18,18,18,0.07)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                  {/* Panel header */}
                  <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid rgba(18,18,18,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ ...SANS, fontSize: 9, fontWeight: 700, color: ink(0.75) }}>Headline</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        {/* Format tags */}
                        {['H1','Bold'].map(t => (
                          <div key={t} style={{ padding: '1.5px 5px', background: ink(0.05), borderRadius: 3, ...MONO, fontSize: 5.5, color: ink(0.4) }}>{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Headline input */}
                  <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid rgba(18,18,18,0.06)' }}>
                    <div style={{ padding: '7px 9px', background: '#F7F7F6', border: `1.5px solid ${BLUE}`, borderRadius: 6, display: 'flex', alignItems: 'flex-start', boxShadow: `0 0 0 3px rgba(66,151,255,0.09)` }}>
                      <span style={{ ...SANS, fontSize: 11.5, fontWeight: 500, color: ink(0.82), opacity: fading ? 0 : 1, transition: 'opacity 0.22s ease', lineHeight: 1.35, flex: 1 }}>
                        {HEADLINES[hlIdx]}
                      </span>
                      <span style={{ width: 1.5, height: 13, background: ink(0.65), marginLeft: 2, flexShrink: 0, marginTop: 1, animation: 'hm-cursor 1s step-end infinite' }} />
                    </div>
                  </div>

                  {/* AI suggestions */}
                  <div style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column',
                    borderBottom: '1px solid rgba(18,18,18,0.06)',
                    opacity: suggIn ? 1 : 0,
                    transform: suggIn ? 'translateY(0)' : 'translateY(5px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    overflow: 'hidden',
                  }}>
                    {/* AI header */}
                    <div style={{ padding: '7px 12px 6px', display: 'flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg, rgba(66,151,255,0.07) 0%, rgba(66,151,255,0.03) 100%)' }}>
                      <span style={{ color: BLUE, display: 'flex' }}><IcoSparkle /></span>
                      <span style={{ ...SANS, fontSize: 8.5, fontWeight: 700, color: BLUE }}>AI Writing</span>
                      <div style={{ flex: 1 }} />
                      <div style={{ ...MONO, fontSize: 5, color: 'rgba(66,151,255,0.5)', background: 'rgba(66,151,255,0.10)', padding: '2px 5px', borderRadius: 3 }}>3 ideas</div>
                    </div>

                    {/* Rows */}
                    {AI_SUGGESTIONS.map((s, i) => (
                      <div key={i} style={{
                        padding: '7px 12px',
                        display: 'flex', alignItems: 'center', gap: 8,
                        borderTop: i === 0 ? `1px solid rgba(66,151,255,0.10)` : '1px solid rgba(18,18,18,0.05)',
                        cursor: 'pointer',
                        background: i === 0 ? 'rgba(66,151,255,0.03)' : 'transparent',
                        opacity: suggIn ? 1 : 0,
                        transition: `opacity 0.3s ease ${0.12 + i * 0.09}s`,
                      }}>
                        <span style={{ ...SANS, fontSize: 9.5, color: ink(0.62), flex: 1, lineHeight: 1.3 }}>{s}</span>
                        <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: i === 0 ? BLUE : ink(0.06), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5h5M4 1.5l2 2-2 2" stroke={i === 0 ? '#fff' : ink(0.3)} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Other fields */}
                  <div style={{ padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {[
                      { label: 'Hero Image', value: 'canyon-hero.jpg', thumb: true, ai: 'Edit with AI' },
                      { label: 'CTA Label',  value: 'Book Your Journey', ai: null },
                    ].map(({ label, value, thumb, ai }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ ...SANS, fontSize: 7.5, color: ink(0.38) }}>{label}</span>
                          {ai && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
                              <span style={{ color: BLUE, display: 'flex' }}><IcoSparkle /></span>
                              <span style={{ ...SANS, fontSize: 6.5, color: BLUE, fontWeight: 500 }}>{ai}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 7px', background: '#F7F7F6', border: '1px solid rgba(18,18,18,0.08)', borderRadius: 5 }}>
                          {thumb && (
                            <div style={{ width: 24, height: 16, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                              <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                            </div>
                          )}
                          <span style={{ ...SANS, fontSize: 8, color: ink(0.45), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>{/* end scaled div */}
          </div>{/* end clipping wrapper */}

        </div>{/* end inner card */}
      </div>{/* end outer glass frame */}
    </div>
  );
}
