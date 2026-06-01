import { useState, useRef, useEffect, useCallback } from 'react';
import MoreWork from './MoreWork';
import CaseStudy from '../case-study/CaseStudy';
import { BtnGhost, IconCornerDownRight } from '../../ui/Button/Button';

import img_cs1a  from '../../../features/pages/assets/proj-canyon-spirit-1.jpg';
import img_cs1b  from '../../../features/pages/assets/proj-canyon-spirit-2.jpg';
import img_nap1  from '../../../features/pages/assets/proj-nap-1.jpg';
import img_nap2  from '../../../features/pages/assets/proj-nap-2.jpg';
import img_trova from '../../../features/pages/assets/proj-trova-1.jpg';
import img_goway from '../../../features/pages/assets/proj-goway-1.jpg';
import img_duvine from '../../../features/pages/assets/proj-duvine-1.jpg';

export default {
  title: 'Patterns/MoreWork',
  component: MoreWork,
  parameters: { layout: 'fullscreen' },
};

const BG = '#121212';
const W  = (a) => `rgba(255,255,255,${a})`;

const PROJECTS = [
  { img: img_cs1a,  client: 'Canyon Spirit',         tag: 'CMS & Commerce',  year: '2024' },
  { img: img_nap1,  client: 'New American Paintings', tag: 'Digital Product', year: '2023' },
  { img: img_trova, client: 'Trova',                  tag: 'Travel App',      year: '2023' },
  { img: img_goway, client: 'G Adventures',           tag: 'CMS & Commerce',  year: '2022' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   OPTION B — Staggered Cards
───────────────────────────────────────────────────────────────────────────── */

function StaggeredCards() {
  const [hov, setHov] = useState(null);

  const OFFSETS = ['0px', '72px', '32px'];
  const HEIGHTS = ['460px', '520px', '488px'];

  return (
    <section style={{ background: BG, borderTop: `1px solid ${W(0.07)}`, paddingBottom: 'clamp(80px,10vw,140px)' }}>

      {/* header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `clamp(40px,5vw,64px) clamp(20px,6.25vw,90px) 0`,
      }}>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 400, color: W(0.88), letterSpacing: '-0.02em', margin: 0 }}>More Work</p>
        <BtnGhost as="a" href="#" icon={IconCornerDownRight}>All Case Studies</BtnGhost>
      </div>

      {/* grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 'clamp(12px,1.5vw,20px)',
        padding: `clamp(32px,4vw,52px) clamp(20px,6.25vw,90px) 0`,
        alignItems: 'start',
      }}>
        {PROJECTS.slice(0, 3).map((p, i) => (
          <a
            key={i}
            href="#"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              textDecoration: 'none', color: 'inherit',
              display: 'flex', flexDirection: 'column',
              marginTop: OFFSETS[i],
              transform: hov === i ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* image */}
            <div style={{ height: HEIGHTS[i], overflow: 'hidden', position: 'relative' }}>
              <img
                src={p.img}
                alt={p.client}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transform: hov === i ? 'scale(1.06)' : 'scale(1)',
                  filter: hov === i ? 'brightness(0.55) saturate(0.9)' : 'brightness(0.82) saturate(0.88)',
                  transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1), filter 0.55s ease',
                }}
              />

              {/* hover overlay: "View" label */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: hov === i ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: W(0.82),
                  transform: hov === i ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'transform 0.4s ease',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  View Project <IconCornerDownRight style={{ width: 11, height: 11 }} />
                </span>
              </div>
            </div>

            {/* name only */}
            <p style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(17px,1.9vw,25px)',
              fontWeight: 400,
              color: W(hov === i ? 0.92 : 0.6),
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '18px 0 0',
              transition: 'color 0.35s ease',
            }}>{p.client}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export const OptionB_StaggeredCards = {
  name: '01 — Staggered Cards',
  render: () => (
    <>
      <CaseStudy screenVariant="strip" />
      <StaggeredCards />
    </>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   OPTION C — Cursor Follow
───────────────────────────────────────────────────────────────────────────── */

function CursorFollow() {
  const [hov, setHov] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const sectionRef    = useRef(null);

  function onMove(e) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      style={{ background: BG, borderTop: `1px solid ${W(0.07)}`, position: 'relative', overflow: 'hidden' }}
    >
      {hov !== null && (
        <div style={{
          position: 'absolute',
          left: pos.x + 24, top: pos.y - 80,
          width: 260, height: 170,
          pointerEvents: 'none', zIndex: 10, overflow: 'hidden',
        }}>
          <img src={PROJECTS[hov].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `clamp(40px,5vw,64px) clamp(20px,6.25vw,90px) 0`,
      }}>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 400, color: W(0.88), letterSpacing: '-0.02em', margin: 0 }}>More Work</p>
        <BtnGhost as="a" href="#" icon={IconCornerDownRight}>All Case Studies</BtnGhost>
      </div>

      <div style={{ padding: `clamp(20px,2.5vw,36px) clamp(20px,6.25vw,90px) clamp(48px,6vw,80px)` }}>
        {PROJECTS.map((p, i) => (
          <a
            key={i}
            href="#"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              padding: 'clamp(18px,2.2vw,28px) 0',
              borderTop: `1px solid ${W(0.07)}`,
              textDecoration: 'none', color: 'inherit', gap: 24,
            }}
          >
            <p style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(28px,4vw,56px)',
              fontWeight: 400,
              color: W(hov === null ? 0.72 : hov === i ? 1 : 0.2),
              letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
              transition: 'color 0.25s ease',
            }}>{p.client}</p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: W(hov === i ? 0.38 : 0.2), whiteSpace: 'nowrap', transition: 'color 0.25s ease' }}>{p.tag}</span>
          </a>
        ))}
        <div style={{ borderTop: `1px solid ${W(0.07)}` }} />
      </div>
    </section>
  );
}

export const OptionC_CursorFollow = {
  name: '02 — Cursor Follow',
  render: () => (
    <>
      <CaseStudy screenVariant="strip" />
      <CursorFollow />
    </>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   OPTION D — Card Stack (scroll-driven, 2 cards)
   Card 1 slides up and off as the user scrolls. Card 2 comes forward
   cleanly beneath it. Each card fills 150vh of scroll for a slow reveal.
───────────────────────────────────────────────────────────────────────────── */

function lerp(a, b, t) { return a + (b - a) * Math.min(1, Math.max(0, t)); }
function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; } // ease-in-out quad

const PAIR = [PROJECTS[0], PROJECTS[1]];

function CardStack() {
  const [prog, setProg] = useState(0); // 0–1: card 1 exiting → card 2 fully revealed
  const [hov1, setHov1] = useState(false);
  const [hov2, setHov2] = useState(false);
  const outerRef        = useRef(null);

  useEffect(() => {
    function onScroll() {
      const el = outerRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled   = Math.max(0, -el.getBoundingClientRect().top);
      setProg(Math.min(1, scrolled / scrollable));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const p = ease(prog); // eased progress — smoother feel

  return (
    <div
      ref={outerRef}
      style={{ height: '350vh', background: BG, borderTop: `1px solid ${W(0.07)}` }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
          padding: `clamp(28px,3.5vw,48px) clamp(20px,6.25vw,90px) 0`,
        }}>
          <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 400, color: W(0.88), letterSpacing: '-0.02em', margin: 0 }}>More Work</p>
          <BtnGhost as="a" href="#" icon={IconCornerDownRight}>All Case Studies</BtnGhost>
        </div>

        {/* card area */}
        <div style={{ flex: 1, position: 'relative', margin: 'clamp(20px,2.5vw,32px) 0 clamp(24px,3vw,40px)' }}>

          {/* ── Card 2 — behind, comes forward as card 1 exits ── */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden',
            zIndex: 1,
            transform: `scale(${lerp(0.94, 1, p)}) translateY(${lerp(22, 0, p)}px)`,
            transformOrigin: 'center bottom',
          }}
            onMouseEnter={() => setHov2(true)}
            onMouseLeave={() => setHov2(false)}
          >
            <img src={PAIR[1].img} alt={PAIR[1].client} style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block',
              filter: `brightness(${lerp(0.45, hov2 ? 0.6 : 0.85, p)}) saturate(${lerp(0.65, 0.92, p)})`,
              transition: 'filter 0.5s ease',
            }} />
            {/* name — fades in as card 2 becomes active (p > 0.7) */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(24px,3.5vw,52px) clamp(20px,6.25vw,90px)',
              background: 'linear-gradient(to top, rgba(6,6,6,0.65) 0%, transparent 100%)',
              opacity: hov2 && p > 0.5 ? 1 : Math.max(0, (p - 0.6) / 0.4),
              transform: `translateY(${lerp(12, 0, Math.max(0, (p - 0.6) / 0.4))}px)`,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            }}>
              <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(28px,4vw,58px)', fontWeight: 400, color: W(0.96), letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                {PAIR[1].client}
              </p>
            </div>
          </div>

          {/* ── Card 1 — top, scrolls up and off ── */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden',
            zIndex: 2,
            transform: `translateY(${-p * 106}%)`,
            transformOrigin: 'center top',
            opacity: Math.max(0, 1 - p * 2.5),
          }}
            onMouseEnter={() => setHov1(true)}
            onMouseLeave={() => setHov1(false)}
          >
            <img src={PAIR[0].img} alt={PAIR[0].client} style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block',
              transform: hov1 ? 'scale(1.03)' : 'scale(1)',
              filter: hov1 ? 'brightness(0.58) saturate(1)' : 'brightness(0.84) saturate(0.92)',
              transition: 'transform 1s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease',
            }} />
            {/* name — hover only on card 1 */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(24px,3.5vw,52px) clamp(20px,6.25vw,90px)',
              background: 'linear-gradient(to top, rgba(6,6,6,0.65) 0%, transparent 100%)',
              opacity: hov1 ? 1 : 0,
              transform: hov1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.3s ease, transform 0.4s ease',
              pointerEvents: 'none',
            }}>
              <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(28px,4vw,58px)', fontWeight: 400, color: W(0.96), letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
                {PAIR[0].client}
              </p>
            </div>
          </div>

        </div>

        {/* scroll indicator — fades as user scrolls */}
        <div style={{
          position: 'absolute', bottom: 'clamp(18px,2.5vw,32px)', left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, 1 - prog * 4),
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}>
          <div style={{ width: 1, height: 32, background: W(0.2), transformOrigin: 'top', animation: 'scroll-line 1.6s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: W(0.22) }}>scroll</span>
        </div>

      </div>
      <style>{`@keyframes scroll-line { 0%,100%{transform:scaleY(0.2);opacity:0.3} 50%{transform:scaleY(1);opacity:1} }`}</style>
    </div>
  );
}

export const OptionD_CardStack = {
  name: '03 — Card Stack',
  render: () => (
    <>
      <CaseStudy screenVariant="strip" />
      <CardStack />
    </>
  ),
};

/* ─────────────────────────────────────────────────────────────────────────────
   HOVER VARIANTS — four cursor/hover treatments for staggered cards
   All use the same three projects + stagger layout.
───────────────────────────────────────────────────────────────────────────── */

const STAGGER_PROJECTS = [
  { img: img_cs1a,   client: 'Canyon Spirit',         tag: 'CMS & Commerce'  },
  { img: img_nap1,   client: 'New American Paintings', tag: 'Digital Product' },
  { img: img_duvine, client: 'DuVine Cycling',         tag: 'CMS & Commerce'  },
];
const OFFSETS = ['0px', '72px', '32px'];
const HEIGHTS = ['460px', '520px', '488px'];

function StaggerShell({ children, title }) {
  return (
    <section style={{ background: '#121212', borderTop: `1px solid ${W(0.07)}`, paddingBottom: 'clamp(80px,10vw,140px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `clamp(40px,5vw,64px) clamp(20px,6.25vw,90px) 0` }}>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 400, color: W(0.88), letterSpacing: '-0.02em', margin: 0 }}>More Work</p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: W(0.32) }}>{title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(12px,1.5vw,20px)', padding: `clamp(32px,4vw,52px) clamp(20px,6.25vw,90px) 0`, alignItems: 'start' }}>
        {children}
      </div>
    </section>
  );
}

/* ── Shared spring cursor hook ── */
function useSpringCursor(active) {
  const rafRef   = useRef(null);
  const posRef   = useRef({ x: 0, y: 0 });
  const rendRef  = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!rafRef.current) {
      const tick = () => {
        rendRef.current.x += (posRef.current.x - rendRef.current.x) * 0.12;
        rendRef.current.y += (posRef.current.y - rendRef.current.y) * 0.12;
        setPos({ x: rendRef.current.x, y: rendRef.current.y, visible: true });
        const dx = Math.abs(posRef.current.x - rendRef.current.x);
        const dy = Math.abs(posRef.current.y - rendRef.current.y);
        rafRef.current = (dx > 0.3 || dy > 0.3) ? requestAnimationFrame(tick) : null;
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const onMouseEnter = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    posRef.current = { x, y }; rendRef.current = { x, y };
    setPos({ x, y, visible: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setPos(p => ({ ...p, visible: false }));
  }, []);

  return { pos, onMouseMove, onMouseEnter, onMouseLeave };
}

/* ────────────────────────────────────────────────────────────────────────────
   HOVER A — Bubble Cursor (white circle, spring lag, scales in with bounce)
──────────────────────────────────────────────────────────────────────────── */
function HoverA_Card({ p, i, hov, setHov }) {
  const active = hov === i;
  const { pos, onMouseMove, onMouseEnter, onMouseLeave } = useSpringCursor(active);

  return (
    <a href="#"
      onMouseEnter={(e) => { setHov(i); onMouseEnter(e); }}
      onMouseLeave={() => { setHov(null); onMouseLeave(); }}
      onMouseMove={onMouseMove}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', marginTop: OFFSETS[i], transform: active ? 'translateY(-10px)' : 'translateY(0)', transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)', cursor: 'none' }}
    >
      <div style={{ height: HEIGHTS[i], overflow: 'hidden', position: 'relative' }}>
        <img src={p.img} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: active ? 'scale(1.06)' : 'scale(1)', filter: active ? 'brightness(0.6) saturate(0.85)' : 'brightness(0.82) saturate(0.88)', transition: 'transform 1.1s cubic-bezier(0.4,0,0.2,1), filter 0.6s ease' }} />
        {/* bubble */}
        <div style={{ position: 'absolute', left: pos.x, top: pos.y, width: 88, height: 88, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3, transform: `translate(-50%,-50%) scale(${pos.visible && active ? 1 : 0})`, transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)', pointerEvents: 'none', zIndex: 10 }}>
          <IconCornerDownRight style={{ width: 16, height: 16, color: '#121212' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#121212' }}>View</span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(17px,1.9vw,25px)', fontWeight: 400, color: W(active ? 0.92 : 0.6), letterSpacing: '-0.02em', lineHeight: 1.1, margin: '18px 0 0', transition: 'color 0.35s ease' }}>{p.client}</p>
    </a>
  );
}

export const HoverVariant_A = {
  name: 'Hover A — Bubble Cursor',
  render: () => {
    const [hov, setHov] = useState(null);
    return (
      <>
        <CaseStudy screenVariant="strip" />
        <StaggerShell title="Hover A — Bubble Cursor">
          {STAGGER_PROJECTS.map((p, i) => <HoverA_Card key={i} p={p} i={i} hov={hov} setHov={setHov} />)}
        </StaggerShell>
      </>
    );
  },
};

/* ────────────────────────────────────────────────────────────────────────────
   HOVER B — Crosshair  (thin white hairlines track cursor across the image)
──────────────────────────────────────────────────────────────────────────── */
function HoverB_Card({ p, i, hov, setHov }) {
  const active = hov === i;
  const { pos, onMouseMove, onMouseEnter, onMouseLeave } = useSpringCursor(active);

  return (
    <a href="#"
      onMouseEnter={(e) => { setHov(i); onMouseEnter(e); }}
      onMouseLeave={() => { setHov(null); onMouseLeave(); }}
      onMouseMove={onMouseMove}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', marginTop: OFFSETS[i], transform: active ? 'translateY(-8px)' : 'translateY(0)', transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)', cursor: 'none' }}
    >
      <div style={{ height: HEIGHTS[i], overflow: 'hidden', position: 'relative' }}>
        <img src={p.img} alt={p.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: active ? 'scale(1.04)' : 'scale(1)', filter: active ? 'brightness(0.55) saturate(0.8)' : 'brightness(0.82) saturate(0.88)', transition: 'transform 1.1s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease' }} />

        {/* horizontal line */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: pos.y, height: 1, background: W(active ? 0.28 : 0), transition: active ? 'none' : 'background 0.4s ease', pointerEvents: 'none' }} />
        {/* vertical line */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: pos.x, width: 1, background: W(active ? 0.28 : 0), transition: active ? 'none' : 'background 0.4s ease', pointerEvents: 'none' }} />

        {/* dot at intersection */}
        <div style={{ position: 'absolute', left: pos.x, top: pos.y, width: 5, height: 5, borderRadius: '50%', background: W(0.9), transform: 'translate(-50%,-50%)', opacity: active ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }} />

        {/* "View" label offset from crosshair */}
        <div style={{ position: 'absolute', left: pos.x + 12, top: pos.y - 28, pointerEvents: 'none', opacity: active && pos.visible ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity 0.3s ease, transform 0.4s ease' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: W(0.7), display: 'flex', alignItems: 'center', gap: 5 }}>
            View <IconCornerDownRight style={{ width: 9, height: 9 }} />
          </span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(17px,1.9vw,25px)', fontWeight: 400, color: W(active ? 0.92 : 0.6), letterSpacing: '-0.02em', lineHeight: 1.1, margin: '18px 0 0', transition: 'color 0.35s ease' }}>{p.client}</p>
    </a>
  );
}

export const HoverVariant_B = {
  name: 'Hover B — Crosshair',
  render: () => {
    const [hov, setHov] = useState(null);
    return (
      <>
        <CaseStudy screenVariant="strip" />
        <StaggerShell title="Hover B — Crosshair">
          {STAGGER_PROJECTS.map((p, i) => <HoverB_Card key={i} p={p} i={i} hov={hov} setHov={setHov} />)}
        </StaggerShell>
      </>
    );
  },
};
