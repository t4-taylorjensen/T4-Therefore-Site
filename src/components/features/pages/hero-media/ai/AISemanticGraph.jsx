import '../hero-media.css';

/* Semantic knowledge graph — nodes of varying sizes represent content
   entities; edge weights encode relationship strength.
   Communicates: AI-readable structure, semantic relationships, indexing. */

const W = 740;
const H = 780;

const graphNodes = [
  { id: 'n0',  x: 370, y: 390, label: 'Travel',      r: 28, tier: 0 },
  { id: 'n1',  x: 240, y: 250, label: 'Destination',  r: 20, tier: 1 },
  { id: 'n2',  x: 490, y: 230, label: 'Experience',   r: 18, tier: 1 },
  { id: 'n3',  x: 200, y: 490, label: 'Itinerary',    r: 17, tier: 1 },
  { id: 'n4',  x: 540, y: 510, label: 'Provider',     r: 15, tier: 1 },
  { id: 'n5',  x: 370, y: 160, label: 'Region',       r: 13, tier: 2 },
  { id: 'n6',  x: 135, y: 370, label: 'Category',     r: 12, tier: 2 },
  { id: 'n7',  x: 580, y: 370, label: 'Taxonomy',     r: 12, tier: 2 },
  { id: 'n8',  x: 350, y: 580, label: 'Duration',     r: 11, tier: 2 },
  { id: 'n9',  x: 130, y: 240, label: 'Location',     r: 10, tier: 2 },
  { id: 'n10', x: 610, y: 290, label: 'Activity',     r: 10, tier: 2 },
  { id: 'n11', x: 170, y: 610, label: 'Pricing',      r: 9,  tier: 2 },
  { id: 'n12', x: 540, y: 640, label: 'Availability', r: 9,  tier: 2 },
  { id: 'n13', x: 440, y: 140, label: 'Season',       r: 8,  tier: 3 },
  { id: 'n14', x: 600, y: 150, label: 'Climate',      r: 8,  tier: 3 },
  { id: 'n15', x: 90,  y: 480, label: 'Tags',         r: 7,  tier: 3 },
];

const edges = [
  { a: 'n0', b: 'n1', w: 2.0, signal: true,  delay: '0s',    dur: '4s'  },
  { a: 'n0', b: 'n2', w: 1.8, signal: true,  delay: '-1.5s', dur: '3.5s' },
  { a: 'n0', b: 'n3', w: 1.5, signal: true,  delay: '-3s',   dur: '4.2s' },
  { a: 'n0', b: 'n4', w: 1.2, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n1', b: 'n5', w: 1.0, signal: true,  delay: '-2s',   dur: '3s'  },
  { a: 'n1', b: 'n6', w: 0.8, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n1', b: 'n9', w: 0.9, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n2', b: 'n7', w: 0.8, signal: true,  delay: '-0.8s', dur: '3.8s' },
  { a: 'n2', b: 'n10',w: 0.9, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n2', b: 'n13',w: 0.7, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n3', b: 'n8', w: 0.8, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n3', b: 'n11',w: 0.6, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n4', b: 'n12',w: 0.7, signal: true,  delay: '-4s',   dur: '3.5s' },
  { a: 'n5', b: 'n13',w: 0.5, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n5', b: 'n14',w: 0.5, signal: false, delay: '0s',    dur: '0s'  },
  { a: 'n6', b: 'n15',w: 0.4, signal: false, delay: '0s',    dur: '0s'  },
];

function getNode(id) {
  return graphNodes.find((n) => n.id === id);
}

function tierColor(tier) {
  return [
    { fill: 'rgba(59,191,176,0.15)', stroke: 'rgba(59,191,176,0.55)', text: 'rgba(59,191,176,0.90)', pulse: 'rgba(59,191,176,0.08)' },
    { fill: 'rgba(66,151,255,0.08)', stroke: 'rgba(66,151,255,0.38)', text: 'rgba(66,151,255,0.75)', pulse: null },
    { fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.20)', text: 'rgba(255,255,255,0.45)', pulse: null },
    { fill: 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.30)', pulse: null },
  ][tier];
}

export default function AISemanticGraph({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg-cool)' }}
    >
      {/* Teal atmospheric wash */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59,191,176,0.05) 0%, transparent 65%)',
      }} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const a = getNode(edge.a);
          const b = getNode(edge.b);
          if (!a || !b) return null;
          return (
            <g key={i}>
              <line
                x1={a.x} y1={a.y}
                x2={b.x} y2={b.y}
                stroke={`rgba(255,255,255,${edge.w * 0.055})`}
                strokeWidth={edge.w}
              />
              {edge.signal && animated && (
                <line
                  x1={a.x} y1={a.y}
                  x2={b.x} y2={b.y}
                  stroke="rgba(59,191,176,0.60)"
                  strokeWidth="1.5"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  pathLength="1"
                  style={{
                    animation: `hm-signal-travel ${edge.dur} ${edge.delay} infinite ease-in-out`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {graphNodes.map((node) => {
          const c = tierColor(node.tier);
          const pulseDelay = `${(graphNodes.indexOf(node) * 0.6) % 4}s`;
          return (
            <g key={node.id}>
              {node.tier === 0 && animated && (
                <>
                  <circle cx={node.x} cy={node.y} r={node.r + 18}
                    fill="none" stroke="rgba(59,191,176,0.08)"
                    strokeWidth="1"
                    style={{ animation: `hm-ping 5s 0s infinite ease-out` }}
                  />
                  <circle cx={node.x} cy={node.y} r={node.r + 34}
                    fill="none" stroke="rgba(59,191,176,0.04)"
                    strokeWidth="1"
                    style={{ animation: `hm-ping 5s -2s infinite ease-out` }}
                  />
                </>
              )}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={node.tier === 0 ? 1.5 : 1}
                style={animated && node.tier <= 1 ? {
                  animation: `hm-breathe ${4 + node.tier}s ${pulseDelay} infinite ease-in-out`,
                } : {}}
              />
              <text
                x={node.x} y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={c.text}
                fontSize={Math.max(6, node.r * 0.42)}
                fontFamily="'Roobert Mono', monospace"
                letterSpacing="0.09em"
              >
                {node.label.slice(0, 8).toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Top label */}
      <div style={{ position: 'absolute', top: 26, left: 26, zIndex: 10 }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Semantic Knowledge Graph</div>
        <div style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: 'var(--hm-text-subtle)' }}>
          {graphNodes.length} entities · {edges.length} relationships
        </div>
      </div>

      {/* Bottom-right type legend */}
      <div style={{
        position: 'absolute',
        bottom: 26,
        right: 26,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-end',
      }}>
        {[
          { label: 'Core entity',   color: 'rgba(59,191,176,0.65)' },
          { label: 'Primary node',  color: 'rgba(66,151,255,0.55)' },
          { label: 'Attribute',     color: 'rgba(255,255,255,0.35)' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="hm-label">{item.label}</span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
          </div>
        ))}
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
