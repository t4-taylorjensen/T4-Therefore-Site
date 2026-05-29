import { useState, useEffect, useRef } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 02 — AI Translation
  Stacked white cards cascading through languages.
  Cards sink into the stack on exit — physical, slick.
*/

const MONO  = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const INK   = '#121212';
const ink   = (a) => `rgba(18,18,18,${a})`;
const w     = (a) => `rgba(255,255,255,${a})`;

const CARD_W   = 370;
const CARD_H   = 280;
const REF_W    = 480;
const REF_H    = 400;
const SHOW_MS  = 5000;
const TRANS_MS = 900;
const EASE     = 'cubic-bezier(0.65,0,0.35,1)';

const JA_FULL = 'マウピティの手付かずの海岸へ — ボラボラ島を超えた聖なる島へ。古代の火山の峰が、澄んだラグーンと出会う場所。';

const LANGS = [
  { code: 'FR-CA', name: 'Québécois',
    text: 'Découvrez la côte préservée de Maupiti — une île sacrée au-delà de Bora Bora, où les pics volcaniques rejoignent les lagons cristallins et le temps suit le rythme de la marée.' },
  { code: 'JA',    name: 'Tokyo',      text: JA_FULL },
  { code: 'DE',    name: 'Deutsch',
    text: 'Entdecken Sie die unberührte Küste von Maupiti — eine heilige Insel jenseits von Bora Bora, wo alte Vulkangipfel auf kristallklare Lagunen treffen.' },
  { code: 'ES',    name: 'Castellano',
    text: 'Descubra la costa virgen de Maupiti — una isla sagrada más allá de Bora Bora, donde los picos volcánicos se encuentran con lagunas cristalinas.' },
];

const TRACK = [0, 1, 2, 3, 0];

function Sparkle({ size = 13, opacity = 1, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      style={{ flexShrink: 0, opacity, animation: animated ? 'hm-breathe 2s ease-in-out infinite' : 'none' }}>
      <path d="M8 0C8 0 8.6 4.8 10.8 6C13 7.2 16 8 16 8C16 8 13 8.8 10.8 10C8.6 11.2 8 16 8 16C8 16 7.4 11.2 5.2 10C3 8.8 0 8 0 8C0 8 3 7.2 5.2 6C7.4 4.8 8 0 8 0Z"
        fill={INK} />
    </svg>
  );
}

function Cursor({ animated }) {
  return (
    <span style={{
      display: 'inline-block', width: 1.5, height: '0.88em',
      background: ink(0.65), marginLeft: 2, verticalAlign: 'text-bottom',
      animation: animated ? 'hm-cursor 0.9s step-end infinite' : 'none',
    }} />
  );
}

export default function AITranslation({ animated = true }) {
  const [trackPos, setTrackPos] = useState(0);
  const [exiting,  setExiting]  = useState(false);
  const trackRef = useRef(0);

  const rootRef  = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setScale(Math.min(width / REF_W, height / REF_H) * 0.90);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [jaText,  setJaText]  = useState('');
  const [jaIdx,   setJaIdx]   = useState(0);
  const [jaPhase, setJaPhase] = useState('typing');

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        const next = trackRef.current + 1;
        trackRef.current = next;
        setTrackPos(next);
        setExiting(false);
        if (next === TRACK.length - 1) {
          setTimeout(() => { trackRef.current = 0; setTrackPos(0); }, TRANS_MS + 20);
        }
      }, TRANS_MS);
    }, SHOW_MS);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    if (jaPhase === 'typing') {
      if (jaIdx < JA_FULL.length) {
        const t = setTimeout(() => { setJaText(JA_FULL.slice(0, jaIdx + 1)); setJaIdx(i => i + 1); }, 52);
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

  const jaPct        = Math.round((jaIdx / JA_FULL.length) * 100);
  const activeLangIdx = TRACK[trackPos];

  return (
    <div className="hm-root" ref={rootRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* Scaled reference canvas */}
      <div style={{ position: 'relative', width: REF_W, height: REF_H, transform: `scale(${scale})`, transformOrigin: 'center center', zIndex: 10 }}>

      {/* Card stack */}
      <div style={{
        position: 'absolute',
        left: (REF_W - CARD_W) / 2,
        top: REF_H * 0.44 - CARD_H / 2,
        width: CARD_W, height: CARD_H,
      }}>
        {[3, 2, 1, 0].map((depth) => {
          const isTop   = depth === 0;
          const langIdx = (activeLangIdx + depth) % LANGS.length;
          const lang    = LANGS[langIdx];
          const isJA    = lang.code === 'JA';
          const isGenerating = isTop && isJA && jaPhase === 'typing' && animated;

          // Stack resting positions
          const restY   = depth * 10;
          const restX   = depth * 4;
          const scale   = 1 - depth * 0.028;
          const opacity = isTop ? 1 : Math.max(0, 1 - depth * 0.32);

          // Exit: top card shrinks and sinks back into the stack
          const exitY = restY + 8;
          const exitX = restX;
          const exitScale   = scale * 0.95;
          const exitOpacity = 0;

          const tx  = isTop && exiting ? exitX   : restX;
          const ty  = isTop && exiting ? exitY   : restY;
          const sc  = isTop && exiting ? exitScale : scale;
          const op  = isTop && exiting ? exitOpacity : opacity;

          return (
            <div key={`${depth}-${langIdx}`} style={{
              position: 'absolute', top: 0, left: 0,
              width: CARD_W, height: CARD_H,
              background: '#ffffff',
              borderRadius: 4,
              boxSizing: 'border-box',
              zIndex: 10 - depth,
              transform: `translateY(${ty}px) translateX(${tx}px) scale(${sc})`,
              opacity: op,
              transition: `transform ${TRANS_MS}ms ${EASE}, opacity ${TRANS_MS}ms ${EASE}`,
              boxShadow: isTop
                ? '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.14)'
                : '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>

              {/* Thin blue top accent — generating only */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: isGenerating ? 'rgba(66,151,255,0.70)' : 'transparent',
                transition: `background ${TRANS_MS}ms ease`,
              }} />

              {/* Header */}
              <div style={{ padding: '18px 22px 13px', borderBottom: `1px solid ${ink(0.07)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Sparkle size={isTop ? 12 : 10} opacity={isTop ? 0.80 : 0.22} animated={isGenerating} />
                  <span style={{ ...MONO, fontSize: 9, letterSpacing: '0.16em', color: isTop ? ink(0.72) : ink(0.25) }}>{lang.code}</span>
                  <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.22) }}>{lang.name}</span>
                </div>
                {isTop && isGenerating && (
                  <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: 'rgba(66,151,255,0.80)', background: 'rgba(66,151,255,0.08)', padding: '3px 8px' }}>
                    {jaPct}%
                  </span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '16px 22px 18px', flex: 1 }}>
                {isTop ? (
                  <>
                    <p style={{
                      fontFamily: 'var(--font-primary)', fontSize: 12.5,
                      color: ink(0.82), lineHeight: 1.80,
                      letterSpacing: isJA ? '0.01em' : '-0.015em',
                      margin: '0 0 10px',
                    }}>
                      {isJA ? jaText : lang.text}
                      {isJA && jaPhase === 'typing' && animated && <Cursor animated />}
                    </p>
                    {isGenerating && (
                      <div style={{ height: 1.5, background: 'rgba(66,151,255,0.12)', borderRadius: 1 }}>
                        <div style={{ height: '100%', width: `${jaPct}%`, background: 'rgba(66,151,255,0.50)', borderRadius: 1, transition: 'width 0.12s linear' }} />
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {[90, 100, 75, 88].map((pct, i) => (
                      <div key={i} style={{ height: 2, width: `${pct}%`, background: ink(0.07), borderRadius: 1 }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {isTop && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '11px 22px', borderTop: `1px solid ${ink(0.07)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Sparkle size={10} opacity={1} />
                    <span style={{ fontFamily: 'var(--font-primary)', fontSize: 11, color: INK, letterSpacing: '-0.01em' }}>AI Translation</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    {[{ l: 'Markets', v: '12' }, { l: 'Accuracy', v: '95.8%' }].map(s => (
                      <div key={s.l} style={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--font-primary)', fontSize: 12, fontWeight: 300, color: ink(0.50), letterSpacing: '-0.02em' }}>{s.v}</span>
                        <span style={{ ...MONO, fontSize: 6, letterSpacing: '0.08em', color: ink(0.22) }}>{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prompt bar */}
      <div style={{
        position: 'absolute',
        bottom: REF_H * 0.07,
        left: (REF_W - CARD_W) / 2,
        width: CARD_W,
        background: '#ffffff',
        borderRadius: 10,
        padding: '11px 12px 11px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <Sparkle size={12} opacity={0.9} animated={animated} />
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.12em', color: INK }}>Translate</span>
        </div>
        <div style={{ width: 1, height: 14, background: ink(0.12), flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-primary)', fontSize: 11, color: ink(0.55), letterSpacing: '-0.01em', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          Discover the untouched coast of Maupiti — a sacred island beyond Bora Bora…
        </span>
        <div style={{ width: 28, height: 28, background: INK, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M2 6l4-4 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </div>
      </div>

      </div>{/* end scaled canvas */}
    </div>
  );
}
