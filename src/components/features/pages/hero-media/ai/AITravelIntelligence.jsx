import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1 from '../assets/therefore-square-1.svg';
import square2 from '../assets/therefore-square-2.svg';

/*
  HERO 05 — AI Travel Intelligence
  Composition: purely atmospheric and spatial. Destination names printed large and sparse
  across the panel at varying opacities — like intelligence overlaid on the landscape.
  One anchored signal panel on the right. No centered card, no grid, no dashboard.
*/

const MONO = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const w    = (a) => `rgba(255,255,255,${a})`;

const DESTINATIONS = [
  { name: 'KYOTO',      delta: '+34%', top: '12%', left: '4%',  scale: 1.00, baseOp: 0.18, anim: 'hm-drift-y', dur: '18s' },
  { name: 'DOLOMITES',  delta: '+28%', top: '34%', left: '18%', scale: 0.72, baseOp: 0.14, anim: 'hm-drift-x', dur: '22s' },
  { name: 'PATAGONIA',  delta: '+22%', top: '58%', left: '6%',  scale: 0.85, baseOp: 0.12, anim: 'hm-drift-y', dur: '20s' },
  { name: 'RAJA AMPAT', delta: '+19%', top: '20%', left: '40%', scale: 0.55, baseOp: 0.10, anim: 'hm-drift-x', dur: '25s' },
];

const SIGNALS = [
  { action: 'Increase Kyoto content',    conf: '92%' },
  { action: 'Lead with sustainability',  conf: '87%' },
  { action: 'Target APAC · Summer',      conf: '81%' },
];

export default function AITravelIntelligence({ animated = true }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [signalIdx, setSignalIdx] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setActiveIdx(i => (i + 1) % DESTINATIONS.length), 2200);
    return () => clearInterval(id);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setSignalIdx(i => (i + 1) % SIGNALS.length), 1800);
    return () => clearInterval(id);
  }, [animated]);

  return (
    <div className="hm-root">
      <img src={bgImage} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '62%', aspectRatio: '1/1', overflow: 'visible', pointerEvents: 'none' }}>
        <img src={square1} style={{ width: '100%', height: '100%', display: 'block', mixBlendMode: 'hard-light' }} />
        <img src={square2} style={{ position: 'absolute', top: '100%', right: '100%', width: `${(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light' }} />
      </div>

      {/* Atmospheric destination typographic field */}
      {DESTINATIONS.map((d, i) => {
        const isActive = activeIdx === i && animated;
        const opacity  = isActive ? d.baseOp * 5.5 : d.baseOp;
        return (
          <div key={d.name} style={{
            position: 'absolute',
            top: d.top, left: d.left,
            animation: animated ? `${d.anim} ${d.dur} ease-in-out infinite` : 'none',
            transition: 'opacity 0.8s ease',
          }}>
            <div style={{
              fontFamily: 'var(--font-primary)',
              fontSize: `${Math.round(52 * d.scale)}px`,
              fontWeight: 200,
              color: w(opacity),
              letterSpacing: '-0.04em',
              lineHeight: 1,
              transition: 'color 0.8s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}>{d.name}</div>
            {/* Delta badge appears on active */}
            <div style={{
              marginTop: 6, opacity: isActive ? 1 : 0,
              transition: 'opacity 0.6s ease',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{ ...MONO, fontSize: 8, letterSpacing: '0.10em', color: 'rgba(52,199,89,0.90)' }}>{d.delta}</span>
              <div style={{ height: 1, width: 28, background: 'rgba(52,199,89,0.35)' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(52,199,89,0.80)', animation: animated && isActive ? 'hm-breathe 2s ease-in-out infinite' : 'none' }} />
            </div>
          </div>
        );
      })}

      {/* Intelligence panel — anchored right */}
      <div style={{
        position: 'absolute', top: '50%', right: '4%',
        transform: 'translateY(-50%)',
        width: '30%',
        background: 'rgba(8,8,8,0.72)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxSizing: 'border-box',
        padding: '18px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ ...MONO, fontSize: 7.5, letterSpacing: '0.16em', color: w(0.35) }}>Content Signals</span>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(52,199,89,0.9)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {SIGNALS.map((s, i) => {
            const isActive = signalIdx === i && animated;
            return (
              <div key={s.action} style={{
                padding: '11px 0',
                borderBottom: i < SIGNALS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                boxShadow: isActive ? 'inset 2px 0 0 rgba(255,255,255,0.40)' : 'inset 2px 0 0 transparent',
                paddingLeft: isActive ? 10 : 0,
                transition: 'all 0.5s ease',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{
                    fontFamily: 'var(--font-primary)', fontSize: 10.5,
                    color: isActive ? w(0.85) : w(0.38),
                    letterSpacing: '-0.01em', lineHeight: 1.4,
                    transition: 'color 0.5s ease',
                  }}>{s.action}</span>
                  <span style={{
                    ...MONO, fontSize: 7, letterSpacing: '0.08em',
                    color: 'rgba(52,199,89,0.85)',
                    opacity: isActive ? 1 : 0.40,
                    flexShrink: 0,
                    transition: 'opacity 0.5s ease',
                  }}>{s.conf}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 14 }}>
          {[{ l: 'Destinations', v: '248' }, { l: 'Accuracy', v: '91%' }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'var(--font-primary)', fontSize: 14, fontWeight: 300, color: w(0.55), letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 5 }}>{s.v}</div>
              <div style={{ ...MONO, fontSize: 6.5, letterSpacing: '0.12em', color: w(0.22) }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating header */}
      <div style={{ position: 'absolute', top: '7%', right: '4%' }}>
        <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.16em', color: w(0.22) }}>Trend Intelligence · Q3</span>
      </div>
    </div>
  );
}
