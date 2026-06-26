import '../hero-media.css';

/* Floating utility panels in spatial arrangement.
   Communicates: bespoke tooling, modular systems, operational depth. */

const panels = [
  {
    id: 1,
    label: 'Booking Engine',
    tag: 'v3.4.1',
    left: '6%', top: '8%',
    width: 240, height: 150,
    anim: 'hm-drift-y',
    duration: '18s',
    delay: '0s',
    z: 4,
    content: 'bars',
    barData: [0.9, 0.6, 0.8, 0.45, 0.75, 0.55, 0.85],
  },
  {
    id: 2,
    label: 'Route Planner',
    tag: 'active',
    left: '42%', top: '5%',
    width: 210, height: 180,
    anim: 'hm-drift-arc',
    duration: '24s',
    delay: '-8s',
    z: 5,
    content: 'map',
  },
  {
    id: 3,
    label: 'Content API',
    tag: 'prod',
    left: '16%', top: '52%',
    width: 200, height: 140,
    anim: 'hm-drift-x',
    duration: '20s',
    delay: '-12s',
    z: 3,
    content: 'metrics',
    metrics: [
      { label: 'Req/s', value: '14.2k' },
      { label: 'p95', value: '38ms' },
      { label: 'Uptime', value: '99.98%' },
    ],
  },
  {
    id: 4,
    label: 'Asset Manager',
    tag: 'sync',
    left: '48%', top: '54%',
    width: 220, height: 160,
    anim: 'hm-drift-xy',
    duration: '22s',
    delay: '-4s',
    z: 4,
    content: 'grid',
  },
];

function PanelContent({ panel }) {
  if (panel.content === 'bars') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60, padding: '0 4px' }}>
        {panel.barData.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              background: i === 4
                ? 'rgba(66,151,255,0.55)'
                : 'rgba(255,255,255,0.12)',
              borderRadius: '2px 2px 0 0',
            }}
          />
        ))}
      </div>
    );
  }
  if (panel.content === 'map') {
    return (
      <div style={{ position: 'relative', height: 90 }}>
        <svg viewBox="0 0 180 80" style={{ width: '100%', height: '100%' }}>
          {/* Simplified route dots + lines */}
          {[
            [20, 40], [55, 18], [95, 55], [135, 25], [165, 50]
          ].map(([x, y], i, arr) => (
            <g key={i}>
              {i < arr.length - 1 && (
                <line
                  x1={x} y1={y}
                  x2={arr[i + 1][0]} y2={arr[i + 1][1]}
                  stroke="rgba(66,151,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}
              <circle
                cx={x} cy={y} r={i === 0 || i === arr.length - 1 ? 4 : 3}
                fill={i === 0 || i === arr.length - 1 ? 'rgba(66,151,255,0.7)' : 'rgba(255,255,255,0.35)'}
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }
  if (panel.content === 'metrics') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {panel.metrics.map((m) => (
          <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.12em',
              color: 'var(--hm-text-subtle)',
              textTransform: 'uppercase',
            }}>
              {m.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'rgba(127,169,142,0.80)',
              letterSpacing: '0.06em',
            }}>
              {m.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (panel.content === 'grid') {
    const cells = Array.from({ length: 20 });
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 4,
      }}>
        {cells.map((_, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 3,
              background: i % 5 === 1 || i % 7 === 0
                ? 'rgba(200,169,110,0.18)'
                : 'rgba(255,255,255,0.06)',
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}

export default function DigitalPanelSystem({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg)' }}
    >
      {/* Background atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 55% 45% at 60% 35%, rgba(66,151,255,0.04) 0%, transparent 65%),
          radial-gradient(ellipse 40% 55% at 20% 75%, rgba(127,169,142,0.04) 0%, transparent 60%)
        `,
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.25,
      }} />

      {/* Panels */}
      {panels.map((panel) => (
        <div
          key={panel.id}
          style={{
            position: 'absolute',
            left: panel.left,
            top: panel.top,
            width: panel.width,
            zIndex: panel.z,
            animation: animated
              ? `${panel.anim} ${panel.duration} ${panel.delay} infinite var(--hm-ease-drift)`
              : 'none',
          }}
        >
          {/* Panel chrome */}
          <div style={{
            background: 'rgba(18,18,18,0.85)',
            border: '1px solid var(--hm-border-mid)',
            borderRadius: 8,
            overflow: 'hidden',
            backdropFilter: 'blur(4px)',
          }}>
            {/* Title bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderBottom: '1px solid var(--hm-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Traffic lights */}
                {['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)'].map((c, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                ))}
                <span className="hm-label hm-label--bright" style={{ marginLeft: 4 }}>
                  {panel.label}
                </span>
              </div>
              <span className="hm-label" style={{
                background: 'rgba(127,169,142,0.12)',
                border: '1px solid rgba(127,169,142,0.20)',
                borderRadius: 3,
                padding: '2px 5px',
                color: 'rgba(127,169,142,0.7)',
              }}>
                {panel.tag}
              </span>
            </div>

            {/* Content area */}
            <div style={{ padding: '14px 14px 12px' }}>
              <PanelContent panel={panel} />
            </div>
          </div>
        </div>
      ))}

      {/* Corner label */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        right: 24,
        zIndex: 15,
        textAlign: 'right',
      }}>
        <div className="hm-label">Product Ecosystem</div>
        <div style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 10,
          color: 'var(--hm-text-subtle)',
          marginTop: 4,
        }}>
          4 active modules
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-fade-bottom" />
      <div className="hm-grain" />
    </div>
  );
}
