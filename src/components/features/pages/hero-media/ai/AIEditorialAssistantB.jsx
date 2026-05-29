import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 03b — AI Editorial Assistant (spotlight variant)
  Left: narrow dark strip — one AI suggestion at a time, large sparse type, cycling.
  Right: solid white editorial page, paragraph scan active.
*/

const MONO = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const ink  = (a) => `rgba(18,18,18,${a})`;
const w    = (a) => `rgba(255,255,255,${a})`;

const ACTIONS = [
  { label: 'Refine for\nluxury tone'     },
  { label: 'Adapt for\nAPAC audience'    },
  { label: 'Generate itinerary\nsummary' },
];

const PARAGRAPHS = [
  'The morning transfer winds through Bordeaux vineyards, the light still low across the Gironde. Your guide waits at the private cellar entrance — unhurried, no schedule visible.',
  'Lunch is taken at a single long table inside an 18th-century chai. Local producers, seasonal produce, no menu. The sommelier selects by conversation, not by chart.',
  'Late afternoon brings the river. The private launch moves slowly toward the Médoc — the kind of silence that feels chosen, not imposed.',
];

export default function AIEditorialAssistantB({ animated = true }) {
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [visible,    setVisible]    = useState(true);
  const [activePara, setActivePara] = useState(0);

  // Cycle action with crossfade
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIdx(i => (i + 1) % ACTIONS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, [animated]);

  // Paragraph scan
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setActivePara(p => (p + 1) % PARAGRAPHS.length), 2400);
    return () => clearInterval(id);
  }, [animated]);

  const action = ACTIONS[activeIdx];

  return (
    <div className="hm-root">
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* LEFT — dark spotlight strip */}
      <div style={{
        position: 'absolute', top: '10%', left: '4%',
        width: '26%', height: '80%',
        background: 'rgba(10,10,10,0.80)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Top label */}
        <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.16em', color: w(0.25) }}>AI Suggest</span>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(52,199,89,0.9)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
        </div>

        {/* Large sparse action text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px', opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <span style={{ ...MONO, fontSize: 6.5, letterSpacing: '0.14em', color: w(0.22), marginBottom: 16, display: 'block' }}>
            {String(activeIdx + 1).padStart(2, '0')} / {String(ACTIONS.length).padStart(2, '0')}
          </span>
          <div style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 28,
            fontWeight: 200,
            color: w(0.88),
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
          }}>
            {action.label}
          </div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: w(0.10) }}>
              <div style={{
                height: '100%',
                width: visible ? '100%' : '0%',
                background: w(0.40),
                transition: visible ? 'width 2.4s linear' : 'none',
              }} />
            </div>
            <span style={{ ...MONO, fontSize: 8, color: w(0.20) }}>→</span>
          </div>
        </div>

        {/* Dot pagination */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 6, flexShrink: 0 }}>
          {ACTIONS.map((_, i) => (
            <div key={i} style={{
              width: i === activeIdx ? 16 : 5, height: 5,
              background: i === activeIdx ? w(0.55) : w(0.15),
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>

      {/* RIGHT — solid white editorial page */}
      <div style={{
        position: 'absolute', top: '10%', right: '4%',
        width: '61%', height: '80%',
        background: '#ffffff',
        boxSizing: 'border-box',
        padding: '26px 30px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Document header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${ink(0.08)}` }}>
          <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.16em', color: ink(0.32) }}>Itinerary · Day 3 · Bordeaux</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.22) }}>184 words</span>
            <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.22) }}>Luxury · 9.2</span>
          </div>
        </div>

        {/* Editorial paragraphs */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, overflow: 'hidden' }}>
          {PARAGRAPHS.map((p, i) => (
            <div key={i} style={{
              paddingLeft: activePara === i && animated ? 14 : 0,
              borderLeft: activePara === i && animated ? `2px solid ${ink(0.70)}` : '2px solid transparent',
              transition: 'all 0.6s ease',
            }}>
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: activePara === i ? 12 : 11,
                color: activePara === i ? ink(0.85) : ink(0.35),
                lineHeight: 1.80, letterSpacing: '-0.01em',
                margin: 0, transition: 'all 0.6s ease',
              }}>{p}</p>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div style={{ paddingTop: 14, borderTop: `1px solid ${ink(0.08)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(52,199,89,0.85)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
            <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.12em', color: ink(0.30) }}>AI Assist Active</span>
          </div>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.22) }}>Therefore CMS · Editorial</span>
        </div>
      </div>
    </div>
  );
}
