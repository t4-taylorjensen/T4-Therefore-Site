import { useState, useEffect } from 'react';
import './MoreWork.css';
import { BtnGhost, BtnLink, IconCornerDownRight } from '../../ui/Button/Button';
import CrosshairHover from '../../ui/CrosshairHover/CrosshairHover';

/* ─────────────────────────────────────
   MORE WORK — Stat Cards
   Dark-toned. Sits directly below
   the CaseStudy hero as one unified band.
   columns: 2 | 3 (default 3)
   layout: 'grid' | 'staggered' (default 'grid')
───────────────────────────────────── */

const W = (a) => `rgba(255,255,255,${a})`;
const OFFSETS = ['0px', '72px', '32px'];
const HEIGHTS = ['460px', '520px', '488px'];

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    const ro = new ResizeObserver(() => setWidth(window.innerWidth));
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);
  return width;
}

function CursorCard({ p, i, hov, setHov }) {
  const active = hov === i;

  const label = (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: W(0.7), display: 'flex', alignItems: 'center', gap: 5 }}>
      View <IconCornerDownRight style={{ width: 9, height: 9 }} />
    </span>
  );

  return (
    <a
      href="#"
      onMouseEnter={() => setHov(i)}
      onMouseLeave={() => setHov(null)}
      style={{
        textDecoration: 'none', color: 'inherit',
        display: 'flex', flexDirection: 'column',
        marginTop: OFFSETS[i],
        transform: active ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <CrosshairHover label={label} style={{ height: HEIGHTS[i] }}>
        <img
          src={p.img}
          alt={p.client}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: active ? 'scale(1.04)' : 'scale(1)',
            filter: active ? 'brightness(0.55) saturate(0.8)' : 'brightness(0.82) saturate(0.88)',
            transition: 'transform 1.1s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease',
          }}
        />
      </CrosshairHover>

      <p style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'clamp(17px,1.9vw,25px)',
        fontWeight: 400,
        color: W(active ? 0.92 : 0.6),
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        margin: '18px 0 0',
        transition: 'color 0.35s ease',
      }}>{p.client}</p>
    </a>
  );
}

function MobileCard({ p }) {
  const [active, setActive] = useState(false);

  return (
    <a
      href="#"
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        <img
          src={p.img}
          alt={p.client}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: active ? 'scale(1.03)' : 'scale(1)',
            filter: 'brightness(0.82) saturate(0.88)',
            transition: 'transform 0.4s ease',
          }}
        />
      </div>
      <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(14px,4vw,18px)', fontWeight: 400, color: W(0.75), letterSpacing: '-0.02em', lineHeight: 1.2, margin: '10px 0 0' }}>{p.client}</p>
    </a>
  );
}

function TabletCard({ p, i, hov, setHov, tabletOffsets, tabletHeights }) {
  const active = hov === i;

  return (
    <a
      href="#"
      onMouseEnter={() => setHov(i)}
      onMouseLeave={() => setHov(null)}
      style={{
        textDecoration: 'none', color: 'inherit',
        display: 'flex', flexDirection: 'column',
        marginTop: tabletOffsets[i] ?? 0,
        transform: active ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ height: tabletHeights[i], overflow: 'hidden', position: 'relative' }}>
        <img
          src={p.img}
          alt={p.client}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: active ? 'scale(1.04)' : 'scale(1)',
            filter: active ? 'brightness(0.65) saturate(0.85)' : 'brightness(0.82) saturate(0.88)',
            transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease',
          }}
        />
        {/* simple "View →" on hover, no cursor tracking needed at tablet */}
        <div style={{
          position: 'absolute', bottom: 16, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.4s ease',
          pointerEvents: 'none',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: W(0.75), display: 'flex', alignItems: 'center', gap: 5 }}>
            View <IconCornerDownRight style={{ width: 9, height: 9 }} />
          </span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(16px,2.2vw,22px)', fontWeight: 400, color: W(active ? 0.92 : 0.6), letterSpacing: '-0.02em', lineHeight: 1.1, margin: '14px 0 0', transition: 'color 0.3s ease' }}>{p.client}</p>
    </a>
  );
}

function StaggeredCards({ projects }) {
  const [hov, setHov] = useState(null);
  const width = useWindowWidth();
  const items = projects.slice(0, 3);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 960;

  /* tablet: 2-col, first card full-width on its own row */
  const tabletOffsets = ['0px', '0px', '36px'];
  const tabletHeights = ['320px', '280px', '300px'];

  const pad = 'clamp(20px,5vw,90px)';

  return (
    <section style={{ background: '#121212', borderTop: `1px solid ${W(0.07)}`, paddingBottom: isMobile ? 60 : 'clamp(80px,10vw,140px)' }}>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `clamp(32px,5vw,64px) ${pad} 0` }}>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 400, color: W(0.88), letterSpacing: '-0.02em', margin: 0 }}>More Work</p>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right">All Case Studies</BtnLink>
      </div>

      {/* mobile — 2-col split, first two cards only */}
      {isMobile && (
        <div style={{ padding: `24px ${pad} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {items.slice(0, 2).map((p, i) => <MobileCard key={i} p={p} i={i} />)}
        </div>
      )}

      {/* tablet — 2-col, card 1 spans full width, cards 2+3 in a row below */}
      {isTablet && (
        <div style={{ padding: `clamp(28px,4vw,48px) ${pad} 0` }}>
          {/* first card — full width */}
          <a href="#"
            onMouseEnter={() => setHov(0)}
            onMouseLeave={() => setHov(null)}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', marginBottom: 20 }}
          >
            <div style={{ width: '100%', height: 340, overflow: 'hidden', position: 'relative' }}>
              <img src={items[0].img} alt={items[0].client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov === 0 ? 'scale(1.03)' : 'scale(1)', filter: hov === 0 ? 'brightness(0.65) saturate(0.85)' : 'brightness(0.82) saturate(0.88)', transition: 'transform 0.9s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: hov === 0 ? 1 : 0, transform: hov === 0 ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.3s ease, transform 0.4s ease', pointerEvents: 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: W(0.75), display: 'flex', alignItems: 'center', gap: 5 }}>View <IconCornerDownRight style={{ width: 9, height: 9 }} /></span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px,3vw,26px)', fontWeight: 400, color: W(hov === 0 ? 0.92 : 0.6), letterSpacing: '-0.02em', lineHeight: 1.1, margin: '14px 0 0', transition: 'color 0.3s ease' }}>{items[0].client}</p>
          </a>
          {/* cards 2 + 3 — side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
            {items.slice(1).map((p, j) => {
              const i = j + 1;
              return <TabletCard key={i} p={p} i={i} hov={hov} setHov={setHov} tabletOffsets={tabletOffsets} tabletHeights={tabletHeights} />;
            })}
          </div>
        </div>
      )}

      {/* desktop — 3-col staggered with crosshair cursor */}
      {!isMobile && !isTablet && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(12px,1.5vw,20px)', padding: `clamp(32px,4vw,52px) ${pad} 0`, alignItems: 'start' }}>
          {items.map((p, i) => (
            <CursorCard key={i} p={p} i={i} hov={hov} setHov={setHov} />
          ))}
        </div>
      )}

    </section>
  );
}

export default function MoreWork({ projects = [], columns = 3, layout = 'grid' }) {
  if (layout === 'staggered') return <StaggeredCards projects={projects} />;

  const cols = columns === 2 ? 2 : 3;

  return (
    <section className="mw-section">

      <div className="mw-header">
        <p className="mw-header-title">More Work</p>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right">All Case Studies</BtnLink>
      </div>

      <div className={`mw-grid mw-grid--${cols}`}>
        {projects.slice(0, cols).map((p, i) => (
          <a key={i} href="#" className="mw-card">

            <div className="mw-card-img-wrap">
              <img className="mw-card-img" src={p.img} alt={p.client} />
            </div>

            <span className="mw-card-tag">{p.tag}</span>
            <p className="mw-card-client">{p.client}</p>

            {cols === 2 && p.desc && (
              <p className="mw-card-desc">{p.desc}</p>
            )}

            <div className="mw-card-stat">
              <span className="mw-stat-number">{p.stat}</span>
              <span className="mw-stat-label">{p.statLabel}</span>
            </div>

            {cols === 2 && (
              <BtnLink href="#" icon={IconCornerDownRight} nudge="right">View Case Study</BtnLink>
            )}

          </a>
        ))}
      </div>

    </section>
  );
}
