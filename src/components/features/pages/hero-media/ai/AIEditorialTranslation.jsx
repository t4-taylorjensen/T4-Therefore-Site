import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 07 — Editorial + Translation
  Composition: AI tools panel on the LEFT (dark frosted, stacked),
  solid white editorial page anchored RIGHT.
  Weaves Hero 02 (translation) + Hero 03 (editorial) into one composition.
*/

const MONO  = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const w     = (a) => `rgba(255,255,255,${a})`;
const INK   = '#121212';
const ink   = (a) => `rgba(18,18,18,${a})`;
const PANEL = { background: 'rgba(10,10,10,0.70)', border: '1px solid rgba(255,255,255,0.08)', boxSizing: 'border-box' };

const JA_FULL = 'マウピティの手付かずの海岸へ — ボラボラ島を超えた聖なる島へ。古代の火山の峰が、澄んだラグーンと出会う場所。';

const PARAGRAPHS = [
  'The morning transfer winds through Bordeaux vineyards, the light still low across the Gironde. Your guide waits at the private cellar entrance — unhurried, no schedule visible.',
  'Lunch is taken at a single long table inside an 18th-century chai. Local producers, seasonal produce, no menu. The sommelier selects by conversation, not by chart.',
  'Late afternoon brings the river. The private launch moves slowly toward the Médoc — the kind of silence that feels chosen, not imposed.',
];

const CHIPS = [
  { label: 'Refine for luxury tone'     },
  { label: 'Adapt for APAC audience'    },
  { label: 'Generate itinerary summary' },
];

function Dot({ animated, delay = '0s' }) {
  return (
    <div style={{
      width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(52,199,89,0.9)',
      animation: animated ? `hm-breathe 2.4s ${delay} ease-in-out infinite` : 'none',
    }} />
  );
}

function Cursor({ animated }) {
  return (
    <span style={{
      display: 'inline-block', width: 1.5, height: '0.9em',
      background: w(0.60), marginLeft: 2, verticalAlign: 'text-bottom',
      animation: animated ? 'hm-cursor 0.9s step-end infinite' : 'none',
    }} />
  );
}

export default function AIEditorialTranslation({ animated = true }) {
  const [activePara, setActivePara] = useState(0);
  const [activeChip, setActiveChip] = useState(0);

  const [jaText,  setJaText]  = useState('');
  const [jaIdx,   setJaIdx]   = useState(0);
  const [jaPhase, setJaPhase] = useState('typing');

  // Editorial scan
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setActivePara(p => (p + 1) % PARAGRAPHS.length);
      setActiveChip(c => (c + 1) % CHIPS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [animated]);

  // JA typing loop
  useEffect(() => {
    if (!animated) return;
    if (jaPhase === 'typing') {
      if (jaIdx < JA_FULL.length) {
        const t = setTimeout(() => {
          setJaText(JA_FULL.slice(0, jaIdx + 1));
          setJaIdx(i => i + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setJaPhase('hold'), 2800);
        return () => clearTimeout(t);
      }
    }
    if (jaPhase === 'hold') {
      const t = setTimeout(() => { setJaPhase('typing'); setJaText(''); setJaIdx(0); }, 4000);
      return () => clearTimeout(t);
    }
  }, [animated, jaIdx, jaPhase]);

  const jaPct = Math.round((jaIdx / JA_FULL.length) * 100);

  return (
    <div className="hm-root">
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* ── LEFT: AI tools — two stacked dark panels ── */}
      <div style={{ position: 'absolute', top: '10%', left: '4%', width: '30%', height: '80%', display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Translation panel */}
        <div style={{ ...PANEL, padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.16em', color: w(0.28) }}>AI Localization</span>
            <Dot animated={animated} />
          </div>

          {/* FR-CA — done */}
          <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.12em', color: w(0.50) }}>FR-CA</span>
              <span style={{ ...MONO, fontSize: 7, color: 'rgba(52,199,89,0.85)', letterSpacing: '0.06em' }}>✓ 96.4%</span>
            </div>
            <p style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: w(0.45), lineHeight: 1.65, letterSpacing: '-0.01em', margin: 0 }}>
              Découvrez la côte préservée de Maupiti — une île sacrée au-delà de Bora Bora.
            </p>
          </div>

          {/* JA — typing */}
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '10px 11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.12em', color: w(0.55) }}>JA</span>
                {jaPhase === 'typing' && (
                  <span style={{ ...MONO, fontSize: 6, color: w(0.38), background: 'rgba(255,255,255,0.08)', padding: '1px 5px', letterSpacing: '0.08em' }}>Translating</span>
                )}
              </div>
              <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.06em', color: jaPhase === 'hold' ? 'rgba(52,199,89,0.85)' : w(0.28) }}>
                {jaPhase === 'hold' ? '✓ 94.1%' : `${jaPct}%`}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-primary)', fontSize: 10.5, color: w(0.78), lineHeight: 1.68, letterSpacing: '0.02em', margin: 0 }}>
              {jaText}
              {jaPhase === 'typing' && animated && <Cursor animated />}
            </p>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 16 }}>
            {[{ l: 'Languages', v: '12' }, { l: 'Accuracy', v: '95.8%' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-primary)', fontSize: 13, fontWeight: 300, color: w(0.45), letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
                <div style={{ ...MONO, fontSize: 6, letterSpacing: '0.10em', color: w(0.18) }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI action chips panel */}
        <div style={{ ...PANEL, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.16em', color: w(0.28) }}>AI Suggestions</span>
            <span style={{ ...MONO, fontSize: 7, color: w(0.20) }}>3 active</span>
          </div>
          {CHIPS.map((chip, i) => {
            const isActive = activeChip === i && animated;
            return (
              <div key={chip.label} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.05)'}`,
                transition: 'all 0.5s ease',
              }}>
                <span style={{ ...MONO, fontSize: 6, letterSpacing: '0.08em', color: w(0.50), background: 'rgba(255,255,255,0.12)', padding: '2px 5px', flexShrink: 0 }}>AI</span>
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: isActive ? w(0.85) : w(0.35), letterSpacing: '-0.01em', transition: 'color 0.5s ease' }}>{chip.label}</span>
                <span style={{ ...MONO, fontSize: 8, color: isActive ? w(0.45) : w(0.18), marginLeft: 'auto', transition: 'color 0.5s ease' }}>→</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Solid white editorial page ── */}
      <div style={{
        position: 'absolute', top: '10%', right: '4%',
        width: '56%', height: '80%',
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
            <div key={i} style={{ position: 'relative' }}>
              {activePara === i && animated && (
                <div style={{ position: 'absolute', left: -30, top: 0, bottom: 0, width: 2, background: ink(0.70) }} />
              )}
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
