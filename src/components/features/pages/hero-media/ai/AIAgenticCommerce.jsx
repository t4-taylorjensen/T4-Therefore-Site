import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';

const MONO = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const ink  = (a) => `rgba(18,18,18,${a})`;

const RECS = [
  { name: 'Bordeaux Wine Country', region: 'France · 8 days',   match: '98' },
  { name: 'Tuscany Hill Towns',    region: 'Italy · 7 days',    match: '94' },
  { name: 'Provence & the Coast',  region: 'France · 6 days',   match: '89' },
];

export default function AIAgenticCommerce({ animated = true, bgOverride = null }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!animated) return;
    if (shown >= RECS.length) {
      const t = setTimeout(() => setShown(0), 2000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown(s => s + 1), 500);
    return () => clearTimeout(t);
  }, [animated, shown]);

  return (
    <div className="hm-root">
      <img
        src={bgOverride ?? bgImage} alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.20)' }} />

      {/* Card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '76%',
        background: '#ffffff',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.22)',
      }}>

        {/* Header */}
        <div style={{ padding: '13px 18px', borderBottom: `1px solid ${ink(0.06)}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.14em', color: ink(0.30) }}>Recommended</span>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.10em', color: ink(0.20) }}>Match</span>
        </div>

        {/* Rows */}
        {RECS.map((rec, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 18px',
            borderBottom: i < RECS.length - 1 ? `1px solid ${ink(0.05)}` : 'none',
            opacity: i < shown ? 1 : 0,
            transform: i < shown ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 0.40s ease, transform 0.40s ease',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: 12, color: ink(0.82), letterSpacing: '-0.01em' }}>
                {rec.name}
              </span>
              <span style={{ ...MONO, fontSize: 6.5, letterSpacing: '0.08em', color: ink(0.30) }}>
                {rec.region}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontSize: 13, color: ink(0.55), letterSpacing: '-0.02em', flexShrink: 0 }}>
              {rec.match}<span style={{ fontSize: 9, color: ink(0.30) }}>%</span>
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
