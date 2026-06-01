import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 04 — AI Asset Generation
  Composition: floating image cards at different scales and asymmetric positions —
  materialising from the environment. Prompt bar pinned to the bottom.
  No centered card. Cards drift slowly and independently.
*/

const MONO  = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const w     = (a) => `rgba(255,255,255,${a})`;
const ink   = (a) => `rgba(18,18,18,${a})`;

// Muted generated-image palette — feel like travel photography
const CARDS = [
  { color: '#c2b49a', label: 'Bora Bora · Dawn',      status: 'Approved',   w: '44%', h: '44%', top: '10%', left: '5%',   anim: 'hm-float-a', dur: '22s', z: 3 },
  { color: '#8da8b2', label: 'Overwater · Editorial',  status: 'In Review',  w: '30%', h: '30%', top: '12%', left: '52%',  anim: 'hm-float-c', dur: '26s', z: 2 },
  { color: '#9aaa92', label: 'Lagoon · Cinematic',     status: 'Generating', w: '36%', h: '32%', top: '54%', left: '34%',  anim: 'hm-float-b', dur: '24s', z: 4 },
  { color: '#c49870', label: 'Resort · Aerial',        status: 'Approved',   w: '22%', h: '22%', top: '56%', left: '6%',   anim: 'hm-float-d', dur: '20s', z: 2 },
];

function StatusBadge({ status }) {
  const isApproved   = status === 'Approved';
  const isGenerating = status === 'Generating';
  return (
    <span style={{
      ...MONO, fontSize: 6.5, letterSpacing: '0.08em',
      padding: '3px 7px',
      background: isApproved ? 'rgba(52,199,89,0.15)' : isGenerating ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
      color: isApproved ? 'rgba(52,199,89,0.90)' : w(0.55),
    }}>{status}</span>
  );
}

export default function AIAssetGeneration({ animated = true }) {
  const [progress, setProgress] = useState(68);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setProgress(p => p >= 99 ? 40 : p + 1), 140);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setActiveCard(c => (c + 1) % CARDS.length), 1800);
    return () => clearInterval(id);
  }, [animated]);

  return (
    <div className="hm-root">
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* Floating header */}
      <div style={{ position: 'absolute', top: '7%', left: '5%', display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(52,199,89,0.9)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
        <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.16em', color: w(0.38) }}>Asset Generation · 4 Variants</span>
      </div>

      {/* Floating image cards */}
      {CARDS.map((card, i) => {
        const isActive = activeCard === i && animated;
        const isGen    = card.status === 'Generating';
        return (
          <div key={i} style={{
            position: 'absolute',
            top: card.top, left: card.left,
            width: card.w, height: card.h,
            zIndex: isActive ? card.z + 2 : card.z,
            animation: animated ? `${card.anim} ${card.dur} ease-in-out infinite` : 'none',
            outline: isActive ? `1.5px solid ${w(0.35)}` : '1.5px solid transparent',
            transition: 'outline 0.5s ease, z-index 0s',
            boxShadow: isActive
              ? '0 8px 40px rgba(0,0,0,0.35)'
              : '0 4px 20px rgba(0,0,0,0.22)',
            overflow: 'hidden',
          }}>
            {/* Image color block */}
            <div style={{ position: 'absolute', inset: 0, background: card.color }} />

            {/* Generation overlay on Generating card */}
            {isGen && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: 22, fontWeight: 300, color: w(0.85), letterSpacing: '-0.04em' }}>{progress}%</span>
                <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.14em', color: w(0.40) }}>Generating</span>
                <div style={{ width: '50%', height: 1.5, background: w(0.12), marginTop: 4 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: w(0.65), transition: 'width 0.14s linear' }} />
                </div>
              </div>
            )}

            {/* Card metadata strip */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(8,8,8,0.72)', padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ ...MONO, fontSize: 6, letterSpacing: '0.08em', color: w(0.50) }}>{card.label}</span>
              <StatusBadge status={card.status} />
            </div>
          </div>
        );
      })}

      {/* Prompt bar — pinned bottom */}
      <div style={{
        position: 'absolute', bottom: '7%', left: '4%', right: '4%',
        background: 'rgba(10,10,10,0.78)', border: '1px solid rgba(255,255,255,0.09)',
        padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 14, boxSizing: 'border-box',
      }}>
        <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.12em', color: w(0.28), flexShrink: 0 }}>Prompt</span>
        <span style={{ fontFamily: 'var(--font-primary)', fontSize: 11, color: w(0.60), letterSpacing: '-0.01em', flex: 1 }}>
          Luxury overwater bungalow at sunrise, Bora Bora, editorial photography style, warm diffused light
        </span>
        <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: w(0.28), flexShrink: 0 }}>Gen-3α</span>
      </div>
    </div>
  );
}
