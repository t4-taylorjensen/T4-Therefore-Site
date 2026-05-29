import { useState, useEffect, useRef } from 'react';
import '../hero-media.css';
import bgImage   from '../assets/therefore-int-bg-base.jpg';
import square1   from '../assets/therefore-square-1.svg';
import square2   from '../assets/therefore-square-2.svg';
import profileImage from '../assets/therefore-int-profile.jpg';

/* ── Carousel ── */
const CARD_W   = 320;
const CARD_H   = 350;
const SHOW_MS  = 4200;
const TRANS_MS = 820;
const TRACK    = [0, 1, 2, 0];

/* ── Ring ── */
const TICKS       = 64;
const RING_R      = 82;
const RING_R2     = 70;
const SZ          = 210;
const C           = SZ / 2;
const TH          = 8.5;
const TH2         = 5.5;
const PROGRESS    = 0.47;
const activeCount = Math.round(TICKS * PROGRESS);

const ticks = Array.from({ length: TICKS }, (_, i) => {
  const a  = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
  const co = Math.cos(a), si = Math.sin(a);
  const ia = i < activeCount;
  const ta = ia ? 0.15 + (i / activeCount) * 0.75 : 1;
  return {
    x1: C+(RING_R -TH *0.5)*co, y1: C+(RING_R -TH *0.5)*si,
    x2: C+(RING_R +TH *0.5)*co, y2: C+(RING_R +TH *0.5)*si,
    ix1:C+(RING_R2-TH2*0.5)*co, iy1:C+(RING_R2-TH2*0.5)*si,
    ix2:C+(RING_R2+TH2*0.5)*co, iy2:C+(RING_R2+TH2*0.5)*si,
    active: ia, ta,
  };
});
const endAngle = PROGRESS * Math.PI * 2 - Math.PI / 2;
const endX = C + RING_R * Math.cos(endAngle);
const endY = C + RING_R * Math.sin(endAngle);

/* ── Data ── */
const INIT_SEGS = [
  { label: 'Adventure & Expedition',  count: 142 },
  { label: 'Cultural City Explorers', count: 381 },
  { label: 'Wellness & Retreat',      count: 267 },
  { label: 'Luxury Safari',           count: 198 },
];
const MAX_SEG = 381;

const FIELDS = [
  { k: 'Region', v: 'APAC'      },
  { k: 'Style',  v: 'Adventure' },
  { k: 'Budget', v: '$8K+'      },
  { k: 'Trips',  v: '14 / yr'   },
];

/* Ink token */
const INK       = '#121212';
const ink = (a) => `rgba(18,18,18,${a})`;

const MONO = {
  fontFamily: 'var(--font-mono)',
  textTransform: 'uppercase',
  color: INK,
};

function LiveDot({ animated, delay = '0s' }) {
  return (
    <div style={{
      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(52,199,89,0.85)',
      animation: animated ? `hm-breathe 2.4s ${delay} infinite ease-in-out` : 'none',
    }} />
  );
}

/* ═══════════════════════════════════════
   CARD 0 — Traveller Intelligence
══════════════════════════════════════ */
function RingCard({ animated }) {
  return (
    <div style={{
      width: CARD_W, height: CARD_H, boxSizing: 'border-box',
      padding: '22px 24px 20px',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
        <span style={{ ...MONO, fontSize: 8.5, letterSpacing: '0.18em', opacity: 0.45 }}>
          Traveller Intelligence
        </span>
        <LiveDot animated={animated} />
      </div>

      {/* Ring */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${SZ} ${SZ}`} width={198} height={198} xmlns="http://www.w3.org/2000/svg">
          {ticks.map((t, i) => (
            <line key={`o${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.active ? `rgba(18,18,18,${t.ta.toFixed(2)})` : ink(0.09)}
              strokeWidth={t.active ? 1.8 : 1.0} strokeLinecap="square" />
          ))}
          {ticks.filter((_,i)=>i%2===0).map((t,i)=>(
            <line key={`in${i}`} x1={t.ix1} y1={t.iy1} x2={t.ix2} y2={t.iy2}
              stroke={t.active ? `rgba(18,18,18,${(t.ta*0.22).toFixed(2)})` : ink(0.04)}
              strokeWidth="1" strokeLinecap="square" />
          ))}
          {animated && (
            <g style={{ animation: 'hm-rotate-slow 9s linear infinite', transformOrigin: `${C}px ${C}px` }}>
              <line x1={C} y1={C-RING_R-TH*0.5} x2={C} y2={C-RING_R+TH*0.5}
                stroke={ink(0.55)} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
          <circle cx={endX} cy={endY} r="4" fill={INK}
            style={animated ? { animation: 'hm-breathe 2s 0s infinite ease-in-out' } : {}} />

          <text x={C} y={C-10} textAnchor="middle" dominantBaseline="middle"
            fill={INK} fontSize="34" fontFamily="var(--font-primary)"
            fontWeight="300" letterSpacing="-0.04em">
            {Math.round(PROGRESS * 304)}
          </text>
          <text x={C} y={C+15} textAnchor="middle"
            fill={ink(0.28)} fontSize="10"
            fontFamily="var(--font-mono)" letterSpacing="0.08em">
            / 304 PROFILES
          </text>
        </svg>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        paddingTop: 14, borderTop: `1px solid ${ink(0.08)}`,
      }}>
        {[
          { l: 'Indexed',  v: '47%'   },
          { l: 'Segments', v: '12'    },
          { l: 'Accuracy', v: '94.2%' },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-primary)', fontSize: 17,
              fontWeight: 300, letterSpacing: '-0.03em',
              color: INK, lineHeight: 1, marginBottom: 6,
            }}>{s.v}</div>
            <div style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.14em', opacity: 0.35 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CARD 1 — AI Segments
══════════════════════════════════════ */
function SegmentsCard({ animated, segments, flashSeg, plusKeys }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{
        padding: '20px 22px 15px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${ink(0.07)}`, flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-primary)', fontSize: 13,
          fontWeight: 500, color: INK, letterSpacing: '-0.02em',
        }}>AI Segments</span>
        <LiveDot animated={animated} delay="-0.5s" />
      </div>

      {/* Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '4px 0' }}>
        {segments.map((seg, i) => {
          const pct = (seg.count / MAX_SEG) * 100;
          const isF = flashSeg === i;
          return (
            <div key={seg.label} style={{
              padding: '2px 22px',
              boxShadow: isF ? `inset 2px 0 0 ${INK}` : 'inset 2px 0 0 transparent',
              transition: 'box-shadow 0.3s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{
                  fontFamily: 'var(--font-primary)', fontSize: 11,
                  color: isF ? INK : ink(0.55),
                  transition: 'color 0.4s ease', letterSpacing: '-0.01em', lineHeight: 1.3,
                }}>{seg.label}</span>
                <div style={{ position: 'relative', flexShrink: 0, marginLeft: 12 }}>
                  <span style={{
                    fontFamily: 'var(--font-primary)', fontSize: 22,
                    fontWeight: 300, letterSpacing: '-0.04em',
                    color: isF ? INK : ink(0.38),
                    transition: 'color 0.4s ease', display: 'block', lineHeight: 1,
                  }}>{seg.count}</span>
                  {animated && (
                    <span key={plusKeys[i]} style={{
                      position: 'absolute', top: -2, right: -10,
                      fontFamily: 'var(--font-mono)', fontSize: 8,
                      color: INK, fontWeight: 600, textTransform: 'uppercase',
                      pointerEvents: 'none', opacity: 0,
                      animation: plusKeys[i] > 0 ? 'hm-float-up 0.75s ease-out forwards' : 'none',
                    }}>+1</span>
                  )}
                </div>
              </div>
              <div style={{ height: 2, background: ink(0.07) }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: isF ? INK : ink(0.20),
                  transition: 'width 0.7s ease, background 0.4s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CARD 2 — Kenji Mori
══════════════════════════════════════ */
function ProfileCard({ animated, scanField }) {
  return (
    <div style={{
      width: CARD_W, height: CARD_H, boxSizing: 'border-box',
      padding: '22px 22px 20px',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 18, borderBottom: `1px solid ${ink(0.08)}`, marginBottom: 4 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          border: `1.5px solid ${ink(0.12)}`,
        }}>
          <img src={profileImage} alt="Kenji Mori" style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 18%',
          }} />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-primary)', fontSize: 15,
            fontWeight: 500, color: INK,
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6,
          }}>Kenji Mori</div>
          <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.14em', opacity: 0.35 }}>
            AI Profile · APAC
          </span>
        </div>
      </div>

      {/* Fields */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
        {FIELDS.map((r, i) => (
          <div key={r.k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 12px',
            boxShadow: scanField === i && animated ? `inset 2px 0 0 ${INK}` : 'inset 2px 0 0 transparent',
            background: scanField === i && animated ? ink(0.04) : 'transparent',
            transition: 'background 0.5s ease, box-shadow 0.5s ease',
          }}>
            <span style={{
              ...MONO, fontSize: 8.5, letterSpacing: '0.10em',
              opacity: scanField === i && animated ? 0.65 : 0.32,
              transition: 'opacity 0.5s ease',
            }}>{r.k}</span>
            <span style={{
              fontFamily: 'var(--font-primary)', fontSize: 13,
              color: scanField === i && animated ? INK : ink(0.55),
              fontWeight: scanField === i && animated ? 500 : 400,
              letterSpacing: '-0.01em',
              transition: 'all 0.5s ease',
            }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function AITravelProfiles({ animated = true }) {
  const [trackPos,   setTrackPos]   = useState(0);
  const [transition, setTransition] = useState(true);
  const [segments,   setSegments]   = useState(INIT_SEGS);
  const [flashSeg,   setFlashSeg]   = useState(null);
  const [plusKeys,   setPlusKeys]   = useState([0, 0, 0, 0]);
  const [scanField,  setScanField]  = useState(0);
  const trackRef = useRef(0);
  const segTimer = useRef(null);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      const next = trackRef.current + 1;
      trackRef.current = next;
      setTrackPos(next);
      if (next === TRACK.length - 1) {
        setTimeout(() => {
          setTransition(false);
          trackRef.current = 0;
          setTrackPos(0);
          setTimeout(() => setTransition(true), 40);
        }, TRANS_MS + 20);
      }
    }, SHOW_MS);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      const row = Math.floor(Math.random() * INIT_SEGS.length);
      setSegments(p => p.map((s, i) => i === row ? { ...s, count: s.count + 1 } : s));
      setFlashSeg(row);
      setPlusKeys(p => p.map((k, i) => i === row ? k + 1 : k));
      clearTimeout(segTimer.current);
      segTimer.current = setTimeout(() => setFlashSeg(null), 750);
    }, 1800);
    return () => { clearInterval(id); clearTimeout(segTimer.current); };
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setScanField(f => (f + 1) % 4), 1600);
    return () => clearInterval(id);
  }, [animated]);

  const cards = [
    <RingCard animated={animated} />,
    <SegmentsCard animated={animated} segments={segments} flashSeg={flashSeg} plusKeys={plusKeys} />,
    <ProfileCard animated={animated} scanField={scanField} />,
  ];

  return (
    <div className="hm-root">
      {/* Layer 1 — base photography */}
      <img src={bgImage} alt="" aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center center',
      }} />

      {/* Layer 2 — geometric squares
           Wrapper is a perfect square (aspectRatio 1/1) anchored top-right.
           square-1 fills the wrapper exactly.
           square-2: top:'100%' = wrapper height = wrapper width (because 1/1 ratio),
                     right:'100%' = wrapper width → top-right corner touches
                     square-1's bottom-left corner at every browser size.
           mix-blend-mode on each <img> directly so they blend against
           the photo, not against each other. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '62%',
          aspectRatio: '1 / 1',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        {/* Square 1 — top-right corner of container */}
        <img src={square1} style={{
          width: '100%',
          height: '100%',
          display: 'block',
          mixBlendMode: 'hard-light',
        }} />

        {/* Square 2 — top-right corner touches square-1's bottom-left */}
        <img src={square2} style={{
          position: 'absolute',
          top: '100%',
          right: '100%',
          width: `${(227 / 485) * 100}%`,
          height: 'auto',
          display: 'block',
          mixBlendMode: 'hard-light',
        }} />
      </div>

      {/* Carousel viewport — zero radius */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: CARD_W, height: CARD_H,
        overflow: 'hidden',
        borderRadius: 0,
        zIndex: 4,
        background: '#ffffff',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          transform: `translateY(${-trackPos * CARD_H}px)`,
          transition: transition ? `transform ${TRANS_MS}ms cubic-bezier(0.76, 0, 0.24, 1)` : 'none',
          willChange: 'transform',
        }}>
          {TRACK.map((cardIdx, i) => (
            <div key={i} style={{ width: CARD_W, height: CARD_H, flexShrink: 0, overflow: 'hidden' }}>
              {cards[cardIdx]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
