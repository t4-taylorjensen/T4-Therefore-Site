import '../hero-media.css';

/* Product ecosystem as a constellation of labeled nodes.
   Slow orbital drift communicates a living, interconnected system. */

const W = 740;
const H = 780;

const nodes = [
  /* Core platform */
  { id: 'core',  x: 370, y: 390, label: 'Platform',   type: 'core',    r: 30 },

  /* Inner ring — primary products */
  { id: 'p1',  x: 370, y: 230, label: 'CMS',         type: 'primary', r: 18, orbitR: 160, angle: 270 },
  { id: 'p2',  x: 510, y: 310, label: 'Commerce',    type: 'primary', r: 18, orbitR: 160, angle: 330 },
  { id: 'p3',  x: 510, y: 470, label: 'Search',      type: 'primary', r: 18, orbitR: 160, angle: 30  },
  { id: 'p4',  x: 370, y: 550, label: 'Analytics',   type: 'primary', r: 18, orbitR: 160, angle: 90  },
  { id: 'p5',  x: 230, y: 470, label: 'Auth',        type: 'primary', r: 18, orbitR: 160, angle: 150 },
  { id: 'p6',  x: 230, y: 310, label: 'Media',       type: 'primary', r: 18, orbitR: 160, angle: 210 },

  /* Outer ring — integrations */
  { id: 'i1',  x: 370, y: 110, label: 'Vercel',      type: 'integration', r: 12, orbitR: 280, angle: 270 },
  { id: 'i2',  x: 550, y: 190, label: 'Stripe',      type: 'integration', r: 12, orbitR: 280, angle: 310 },
  { id: 'i3',  x: 635, y: 390, label: 'Algolia',     type: 'integration', r: 12, orbitR: 280, angle: 0   },
  { id: 'i4',  x: 550, y: 590, label: 'Segment',     type: 'integration', r: 12, orbitR: 280, angle: 50  },
  { id: 'i5',  x: 370, y: 670, label: 'Klaviyo',     type: 'integration', r: 12, orbitR: 280, angle: 90  },
  { id: 'i6',  x: 190, y: 590, label: 'Cloudinary',  type: 'integration', r: 12, orbitR: 280, angle: 130 },
  { id: 'i7',  x: 105, y: 390, label: 'Fauna',       type: 'integration', r: 12, orbitR: 280, angle: 180 },
  { id: 'i8',  x: 190, y: 190, label: 'Sanity',      type: 'integration', r: 12, orbitR: 280, angle: 230 },
];

const primaryIds = ['p1','p2','p3','p4','p5','p6'];
const integrationIds = ['i1','i2','i3','i4','i5','i6','i7','i8'];

function nodeStyle(type) {
  return {
    core:        { fill: 'rgba(66,151,255,0.12)', stroke: 'rgba(66,151,255,0.50)', text: 'rgba(66,151,255,0.90)' },
    primary:     { fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.22)', text: 'rgba(255,255,255,0.60)' },
    integration: { fill: 'rgba(200,169,110,0.06)', stroke: 'rgba(200,169,110,0.22)', text: 'rgba(200,169,110,0.55)' },
  }[type];
}

export default function DigitalProductNodes({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg)' }}
    >
      {/* Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(66,151,255,0.06) 0%, transparent 65%)',
      }} />

      {/* Orbit ring guides */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Inner orbit ring */}
        <circle cx={370} cy={390} r={160}
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
        {/* Outer orbit ring */}
        <circle cx={370} cy={390} r={280}
          fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 10" />

        {/* Core → primary edges */}
        {primaryIds.map((pid) => {
          const n = nodes.find((n) => n.id === pid);
          return (
            <line
              key={pid}
              x1={370} y1={390}
              x2={n.x} y2={n.y}
              stroke="rgba(66,151,255,0.10)"
              strokeWidth="1"
            />
          );
        })}

        {/* Primary → nearest integration edges (sparse) */}
        {[
          ['p1', 'i1'], ['p1', 'i8'],
          ['p2', 'i2'], ['p2', 'i3'],
          ['p3', 'i3'],
          ['p4', 'i4'], ['p4', 'i5'],
          ['p5', 'i7'],
          ['p6', 'i6'], ['p6', 'i8'],
        ].map(([pid, iid], idx) => {
          const a = nodes.find((n) => n.id === pid);
          const b = nodes.find((n) => n.id === iid);
          return (
            <line
              key={idx}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="rgba(200,169,110,0.07)"
              strokeWidth="1"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const s = nodeStyle(node.type);
          const fontSize = node.type === 'core' ? 9 : node.type === 'primary' ? 7.5 : 6.5;
          return (
            <g key={node.id}>
              {node.type === 'core' && animated && (
                <>
                  <circle cx={node.x} cy={node.y} r={node.r + 16}
                    fill="none" stroke="rgba(66,151,255,0.08)" strokeWidth="1"
                    style={{ animation: 'hm-ping 5s 0s infinite ease-out' }} />
                  <circle cx={node.x} cy={node.y} r={node.r + 30}
                    fill="none" stroke="rgba(66,151,255,0.04)" strokeWidth="1"
                    style={{ animation: 'hm-ping 5s -2s infinite ease-out' }} />
                </>
              )}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth={node.type === 'core' ? 1.5 : 1}
              />
              <text
                x={node.x} y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={s.text}
                fontSize={fontSize}
                fontFamily="'Roobert Mono', monospace"
                letterSpacing="0.09em"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Label */}
      <div style={{ position: 'absolute', top: 26, left: 26, zIndex: 10 }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Product Ecosystem</div>
        <div style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: 'var(--hm-text-subtle)' }}>
          {nodes.length} modules · fully integrated
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
