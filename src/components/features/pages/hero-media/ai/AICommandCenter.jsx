import { useState, useEffect, useRef } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 06 — AI Command Center
  White card carousel rotating through 4 AI feature themes:
  0 — AI Localization   (typing JA translation)
  1 — Editorial AI      (paragraph scan + action chips)
  2 — Asset Generation  (2×2 image grid with live progress)
  3 — Content Signals   (destination intelligence + confidence bars)
*/

const CARD_W  = 320;
const CARD_H  = 370;
const SHOW_MS = 4400;
const TRANS_MS = 820;
const TRACK   = [0, 1, 2, 3, 0];

const INK  = '#121212';
const ink  = (a) => `rgba(18,18,18,${a})`;
const MONO = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };

function LiveDot({ animated, delay = '0s' }) {
  return (
    <div style={{
      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(52,199,89,0.85)',
      animation: animated ? `hm-breathe 2.4s ${delay} infinite ease-in-out` : 'none',
    }} />
  );
}

/* ══════════════════════════════════════
   CARD 0 — AI Localization
══════════════════════════════════════ */
const JA_FULL = 'マウピティの手付かずの海岸へ — ボラボラ島を超えた聖なる島へ。古代の火山の峰が、澄んだラグーンと出会う場所。';

function TranslationCard({ animated, jaText, jaPhase, jaPct }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, boxSizing: 'border-box', padding: '22px 24px 20px', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${ink(0.07)}` }}>
        <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.16em', color: ink(0.38) }}>AI Localization</span>
        <LiveDot animated={animated} />
      </div>

      {/* Source EN */}
      <div style={{ marginBottom: 13, paddingBottom: 13, borderBottom: `1px solid ${ink(0.06)}` }}>
        <div style={{ ...MONO, fontSize: 7, letterSpacing: '0.12em', color: ink(0.25), marginBottom: 7 }}>Source · EN</div>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 10.5, color: ink(0.60), lineHeight: 1.70, letterSpacing: '-0.01em', margin: 0 }}>
          Discover the untouched coast of Maupiti — a sacred island beyond Bora Bora, where ancient volcanic peaks meet crystalline lagoons.
        </p>
      </div>

      {/* FR-CA — done */}
      <div style={{ marginBottom: 11, paddingBottom: 11, borderBottom: `1px solid ${ink(0.06)}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.12em', color: ink(0.45) }}>FR-CA</span>
          <span style={{ ...MONO, fontSize: 7, color: 'rgba(52,199,89,0.85)', letterSpacing: '0.06em' }}>✓ 96.4%</span>
        </div>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 10.5, color: ink(0.42), lineHeight: 1.65, letterSpacing: '-0.01em', margin: 0 }}>
          Découvrez la côte préservée de Maupiti — une île sacrée au-delà de Bora Bora.
        </p>
      </div>

      {/* JA — typing */}
      <div style={{ flex: 1, background: ink(0.03), padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.12em', color: ink(0.55) }}>JA</span>
            {jaPhase === 'typing' && (
              <span style={{ ...MONO, fontSize: 6.5, color: ink(0.35), background: ink(0.06), padding: '1px 5px', letterSpacing: '0.08em' }}>Translating</span>
            )}
          </div>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.06em', color: jaPhase === 'hold' ? 'rgba(52,199,89,0.85)' : ink(0.28) }}>
            {jaPhase === 'hold' ? '✓ 94.1%' : `${jaPct}%`}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 11, color: INK, lineHeight: 1.70, letterSpacing: '0.02em', margin: 0 }}>
          {jaText}
          {jaPhase === 'typing' && animated && (
            <span style={{ display: 'inline-block', width: 1.5, height: '0.9em', background: ink(0.65), marginLeft: 2, verticalAlign: 'text-bottom', animation: 'hm-cursor 0.9s step-end infinite' }} />
          )}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CARD 1 — Editorial Assistant
══════════════════════════════════════ */
const ED_PARAS = [
  'The morning transfer winds through Bordeaux vineyards, the light still low across the Gironde. Your guide waits at the private cellar entrance — unhurried, no schedule visible.',
  'Lunch is taken at a single long table inside an 18th-century chai. Local producers, seasonal produce, no menu. The sommelier selects by conversation, not by chart.',
];
const ED_CHIPS = ['Refine for luxury tone', 'Adapt for APAC audience', 'Generate itinerary summary'];

function EditorialCard({ animated, activePara, activeChip }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, boxSizing: 'border-box', padding: '22px 24px 20px', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 13, borderBottom: `1px solid ${ink(0.07)}` }}>
        <div>
          <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.16em', color: ink(0.38) }}>Editorial AI</span>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.20), marginLeft: 10 }}>Day 3 · Bordeaux</span>
        </div>
        <LiveDot animated={animated} delay="-0.3s" />
      </div>

      {/* Paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16, flex: 1 }}>
        {ED_PARAS.map((p, i) => (
          <div key={i} style={{ position: 'relative', paddingLeft: activePara === i && animated ? 12 : 0, transition: 'padding 0.5s ease' }}>
            {activePara === i && animated && (
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: ink(0.70) }} />
            )}
            <p style={{
              fontFamily: 'var(--font-primary)', fontSize: 10.5,
              color: activePara === i && animated ? ink(0.85) : ink(0.35),
              lineHeight: 1.72, letterSpacing: '-0.01em', margin: 0,
              transition: 'color 0.5s ease',
            }}>{p}</p>
          </div>
        ))}
      </div>

      {/* AI chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingTop: 12, borderTop: `1px solid ${ink(0.07)}` }}>
        {ED_CHIPS.map((c, i) => {
          const isActive = activeChip === i && animated;
          return (
            <div key={c} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px',
              background: isActive ? ink(0.05) : 'transparent',
              border: `1px solid ${isActive ? ink(0.12) : ink(0.06)}`,
              transition: 'all 0.5s ease',
            }}>
              <span style={{ ...MONO, fontSize: 6, letterSpacing: '0.08em', color: ink(0.45), background: ink(0.07), padding: '1px 5px' }}>AI</span>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: isActive ? ink(0.80) : ink(0.35), letterSpacing: '-0.01em', transition: 'color 0.5s ease' }}>{c}</span>
              <span style={{ ...MONO, fontSize: 8, color: ink(0.22), marginLeft: 'auto' }}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CARD 2 — Asset Generation
══════════════════════════════════════ */
const ASSET_CARDS = [
  { color: '#c2b49a', label: 'Bora Bora · Dawn',     status: 'Approved'   },
  { color: '#8da8b2', label: 'Overwater · Editorial', status: 'In Review'  },
  { color: '#9aaa92', label: 'Lagoon · Cinematic',    status: 'Generating' },
  { color: '#c49870', label: 'Resort · Aerial',       status: 'Approved'   },
];

function AssetCard({ animated, progress, activeAsset }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, boxSizing: 'border-box', padding: '22px 24px 20px', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 13, borderBottom: `1px solid ${ink(0.07)}` }}>
        <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.16em', color: ink(0.38) }}>Asset Generation</span>
        <LiveDot animated={animated} delay="-0.6s" />
      </div>

      {/* 2×2 grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
        {ASSET_CARDS.map((card, i) => {
          const isActive = activeAsset === i && animated;
          const isGen    = card.status === 'Generating';
          return (
            <div key={i} style={{
              position: 'relative', overflow: 'hidden',
              outline: isActive ? `1.5px solid ${ink(0.35)}` : `1.5px solid ${ink(0.08)}`,
              transition: 'outline 0.4s ease',
              boxShadow: isActive ? '0 4px 18px rgba(0,0,0,0.14)' : '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ height: '100%', minHeight: 90, background: card.color, opacity: isActive ? 1 : 0.60, transition: 'opacity 0.4s ease' }} />
              {isGen && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <span style={{ fontFamily: 'var(--font-primary)', fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.04em' }}>{progress}%</span>
                  <div style={{ width: '55%', height: 1.5, background: 'rgba(255,255,255,0.15)' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'rgba(255,255,255,0.65)', transition: 'width 0.15s linear' }} />
                  </div>
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(10,10,10,0.70)', padding: '4px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                <span style={{ ...MONO, fontSize: 5.5, color: 'rgba(255,255,255,0.50)', letterSpacing: '0.06em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.label}</span>
                <span style={{ ...MONO, fontSize: 5.5, color: card.status === 'Approved' ? 'rgba(52,199,89,0.85)' : 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', flexShrink: 0 }}>{card.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prompt strip */}
      <div style={{ paddingTop: 11, borderTop: `1px solid ${ink(0.07)}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.25) }}>Prompt</span>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.08em', color: ink(0.22) }}>Gen-3α</span>
        </div>
        <p style={{ fontFamily: 'var(--font-primary)', fontSize: 10.5, color: ink(0.50), letterSpacing: '-0.01em', margin: 0, lineHeight: 1.5 }}>
          Luxury overwater bungalow at sunrise, Bora Bora, editorial photography style
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CARD 3 — Content Signals
══════════════════════════════════════ */
const SIGNALS = [
  { action: 'Increase Kyoto content',    conf: '92%', dest: 'KYOTO'     },
  { action: 'Lead with sustainability',  conf: '87%', dest: 'DOLOMITES' },
  { action: 'Target APAC · Summer',      conf: '81%', dest: 'PATAGONIA' },
];

function SignalsCard({ animated, signalIdx }) {
  return (
    <div style={{ width: CARD_W, height: CARD_H, boxSizing: 'border-box', padding: '22px 24px 20px', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 13, borderBottom: `1px solid ${ink(0.07)}` }}>
        <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.16em', color: ink(0.38) }}>Content Signals</span>
        <LiveDot animated={animated} delay="-0.9s" />
      </div>

      {/* Signal rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
        {SIGNALS.map((s, i) => {
          const isActive = signalIdx === i && animated;
          return (
            <div key={s.action} style={{
              padding: '12px 0',
              borderBottom: i < SIGNALS.length - 1 ? `1px solid ${ink(0.06)}` : 'none',
              paddingLeft: isActive ? 10 : 0,
              boxShadow: isActive ? `inset 2px 0 0 ${ink(0.70)}` : `inset 2px 0 0 transparent`,
              transition: 'all 0.5s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: 11.5, color: isActive ? ink(0.85) : ink(0.40), letterSpacing: '-0.01em', lineHeight: 1.35, transition: 'color 0.5s ease' }}>
                  {s.action}
                </span>
                <span style={{ ...MONO, fontSize: 8.5, letterSpacing: '0.06em', color: 'rgba(52,199,89,0.90)', flexShrink: 0, opacity: isActive ? 1 : 0.35, transition: 'opacity 0.5s ease' }}>
                  {s.conf}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...MONO, fontSize: 6.5, letterSpacing: '0.10em', color: ink(0.22) }}>{s.dest}</span>
                <div style={{ flex: 1, height: 1.5, background: ink(0.07) }}>
                  <div style={{ height: '100%', width: isActive ? `${parseInt(s.conf)}%` : '25%', background: isActive ? ink(0.35) : ink(0.12), transition: 'all 0.8s ease' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div style={{ paddingTop: 14, borderTop: `1px solid ${ink(0.07)}`, display: 'flex', justifyContent: 'space-between' }}>
        {[{ l: 'Destinations', v: '248' }, { l: 'Accuracy', v: '91%' }, { l: 'Markets', v: '28' }].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-primary)', fontSize: 17, fontWeight: 300, color: INK, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 5 }}>{s.v}</div>
            <div style={{ ...MONO, fontSize: 7, letterSpacing: '0.13em', color: ink(0.30) }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function AICommandCenter({ animated = true }) {
  const [trackPos,   setTrackPos]   = useState(0);
  const [transition, setTransition] = useState(true);
  const trackRef = useRef(0);

  // Translation state
  const [jaText,  setJaText]  = useState('');
  const [jaIdx,   setJaIdx]   = useState(0);
  const [jaPhase, setJaPhase] = useState('typing');

  // Editorial state
  const [activePara, setActivePara] = useState(0);
  const [activeChip, setActiveChip] = useState(0);

  // Asset generation state
  const [progress,    setProgress]    = useState(68);
  const [activeAsset, setActiveAsset] = useState(0);

  // Signals state
  const [signalIdx, setSignalIdx] = useState(0);

  // Carousel advance
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

  // JA typing loop
  useEffect(() => {
    if (!animated) return;
    if (jaPhase === 'typing') {
      if (jaIdx < JA_FULL.length) {
        const t = setTimeout(() => { setJaText(JA_FULL.slice(0, jaIdx + 1)); setJaIdx(i => i + 1); }, 55);
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

  // Editorial cycling
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => { setActivePara(p => (p + 1) % 2); setActiveChip(c => (c + 1) % ED_CHIPS.length); }, 1600);
    return () => clearInterval(id);
  }, [animated]);

  // Asset progress + cycling
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setProgress(p => p >= 99 ? 40 : p + 1), 140);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setActiveAsset(a => (a + 1) % ASSET_CARDS.length), 1700);
    return () => clearInterval(id);
  }, [animated]);

  // Signals cycling
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setSignalIdx(s => (s + 1) % SIGNALS.length), 1900);
    return () => clearInterval(id);
  }, [animated]);

  const jaPct = Math.round((jaIdx / JA_FULL.length) * 100);

  const cards = [
    <TranslationCard animated={animated} jaText={jaText} jaPhase={jaPhase} jaPct={jaPct} />,
    <EditorialCard   animated={animated} activePara={activePara} activeChip={activeChip} />,
    <AssetCard       animated={animated} progress={progress} activeAsset={activeAsset} />,
    <SignalsCard     animated={animated} signalIdx={signalIdx} />,
  ];

  return (
    <div className="hm-root">
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* White carousel card — centered */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: CARD_W, height: CARD_H,
        overflow: 'hidden',
        background: '#ffffff',
        zIndex: 4,
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
