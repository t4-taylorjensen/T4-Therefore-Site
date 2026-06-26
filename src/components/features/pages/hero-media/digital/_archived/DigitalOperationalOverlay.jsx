import '../hero-media.css';

/* Technical operational overlay — measurement lines, data readouts,
   coordinate annotations. Mission-control aesthetic. */

const metrics = [
  { label: 'ACTIVE SESSIONS',   value: '2,847',  unit: '',    trend: '+12%',  positive: true  },
  { label: 'CONVERSION',        value: '4.28',   unit: '%',   trend: '+0.3',  positive: true  },
  { label: 'RESPONSE TIME',     value: '38',     unit: 'ms',  trend: '-4ms',  positive: true  },
  { label: 'QUEUE DEPTH',       value: '0',      unit: '',    trend: 'CLEAR', positive: true  },
  { label: 'CACHE HIT RATE',    value: '94.7',   unit: '%',   trend: '+1.2',  positive: true  },
  { label: 'ERROR RATE',        value: '0.002',  unit: '%',   trend: 'LOW',   positive: true  },
];

const readouts = [
  { id: 'r1', label: 'NODE_01', x: '12%', y: '18%', value: 'HEALTHY' },
  { id: 'r2', label: 'NODE_04', x: '58%', y: '14%', value: 'HEALTHY' },
  { id: 'r3', label: 'EDGE_SW',  x: '72%', y: '62%', value: 'ACTIVE' },
  { id: 'r4', label: 'CDN_EU',   x: '20%', y: '70%', value: '99.9%' },
];

export default function DigitalOperationalOverlay({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-gradient-blue)' }}
    >
      {/* Brand blue glow + teal accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          var(--hm-blue-glow),
          radial-gradient(ellipse 35% 35% at 82% 78%, rgba(59,191,176,0.06) 0%, transparent 55%)
        `,
      }} />

      {/* Fine scan lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 4px)',
        pointerEvents: 'none',
      }} />

      {/* Moving scan sweep */}
      {animated && (
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(to right, transparent, rgba(66,151,255,0.35), transparent)',
          animation: `hm-scan-sweep 8s -2s infinite linear`,
          zIndex: 8,
          top: 0,
        }} />
      )}

      {/* Main metrics grid */}
      <div style={{
        position: 'absolute',
        top: 28,
        left: 28,
        right: 28,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1px',
        border: '1px solid rgba(66,151,255,0.12)',
        borderRadius: 6,
        overflow: 'hidden',
        zIndex: 10,
      }}>
        {metrics.map((m, i) => (
          <div
            key={m.label}
            style={{
              background: i % 2 === 0 ? 'rgba(66,151,255,0.04)' : 'rgba(255,255,255,0.02)',
              padding: '12px 14px',
              borderRight: i % 3 !== 2 ? '1px solid rgba(66,151,255,0.08)' : 'none',
              borderBottom: i < 3 ? '1px solid rgba(66,151,255,0.08)' : 'none',
            }}
          >
            <div className="hm-label" style={{ marginBottom: 6 }}>{m.label}</div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
              marginBottom: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 18,
                fontWeight: 400,
                color: 'rgba(66,151,255,0.85)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                {m.value}
              </span>
              {m.unit && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: 'var(--hm-text-subtle)',
                  letterSpacing: '0.08em',
                }}>
                  {m.unit}
                </span>
              )}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              color: m.positive ? 'rgba(127,169,142,0.70)' : 'rgba(255,100,100,0.70)',
              letterSpacing: '0.10em',
            }}>
              {m.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Infrastructure diagram */}
      <div style={{
        position: 'absolute',
        top: '46%',
        left: 28,
        right: 28,
        bottom: 70,
        zIndex: 10,
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(66,151,255,0.08)',
          borderRadius: 6,
          background: 'rgba(66,151,255,0.02)',
        }} />

        {/* Crosshair center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 48,
          height: 48,
        }}>
          <svg viewBox="0 0 48 48" style={{ width: '100%', height: '100%' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(66,151,255,0.20)" strokeWidth="1" />
            <circle cx="24" cy="24" r="10" fill="none" stroke="rgba(66,151,255,0.30)" strokeWidth="1" />
            <circle cx="24" cy="24" r="3" fill="rgba(66,151,255,0.60)" />
            <line x1="0" y1="24" x2="48" y2="24" stroke="rgba(66,151,255,0.15)" strokeWidth="0.5" />
            <line x1="24" y1="0" x2="24" y2="48" stroke="rgba(66,151,255,0.15)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Node readouts */}
        {readouts.map((r) => (
          <div
            key={r.id}
            style={{
              position: 'absolute',
              left: r.x,
              top: r.y,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'rgba(127,169,142,0.75)',
              animation: animated ? `hm-breathe 3s ${r.id} infinite ease-in-out` : 'none',
            }} />
            <div>
              <div className="hm-label">{r.label}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'rgba(127,169,142,0.60)',
                letterSpacing: '0.10em',
              }}>
                {r.value}
              </div>
            </div>
          </div>
        ))}

        {/* Corner coordinates */}
        {[
          { pos: { top: 8, left: 8 },    text: '0°  0\'N' },
          { pos: { top: 8, right: 8 },   text: '180° 0\'E' },
          { pos: { bottom: 8, left: 8 }, text: '90° 0\'S' },
        ].map((c, i) => (
          <div key={i} style={{ position: 'absolute', ...c.pos }}>
            <span className="hm-label">{c.text}</span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 28,
        right: 28,
        zIndex: 15,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'rgba(127,169,142,0.8)',
            animation: animated ? 'hm-breathe 2s 0s infinite ease-in-out' : 'none',
          }} />
          <span className="hm-label hm-label--bright">ALL SYSTEMS OPERATIONAL</span>
        </div>
        <span className="hm-label">UPTIME 99.98%</span>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
