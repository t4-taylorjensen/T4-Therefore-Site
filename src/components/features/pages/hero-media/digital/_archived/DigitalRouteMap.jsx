import '../hero-media.css';

/* Abstract workflow route map with animated directional flow.
   Communicates: interconnected systems, orchestration, product flow. */

const W = 740;
const H = 780;

const nodes = [
  { id: 'in1',  x: 80,  y: 200, label: 'Inquiry',   type: 'input',    r: 18 },
  { id: 'in2',  x: 80,  y: 390, label: 'Booking',   type: 'input',    r: 18 },
  { id: 'in3',  x: 80,  y: 580, label: 'Support',   type: 'input',    r: 18 },
  { id: 'p1',   x: 260, y: 200, label: 'Qualify',   type: 'process',  r: 16 },
  { id: 'p2',   x: 260, y: 390, label: 'Route',     type: 'process',  r: 16 },
  { id: 'p3',   x: 260, y: 580, label: 'Resolve',   type: 'process',  r: 16 },
  { id: 'hub',  x: 430, y: 390, label: 'Orchestrate', type: 'hub',    r: 26 },
  { id: 'out1', x: 610, y: 220, label: 'Itinerary', type: 'output',   r: 16 },
  { id: 'out2', x: 610, y: 390, label: 'Confirm',   type: 'output',   r: 16 },
  { id: 'out3', x: 610, y: 560, label: 'Notify',    type: 'output',   r: 16 },
];

const edges = [
  { from: 'in1', to: 'p1',   delay: '0s',    dur: '3s' },
  { from: 'in2', to: 'p2',   delay: '-1.5s', dur: '3.5s' },
  { from: 'in3', to: 'p3',   delay: '-3s',   dur: '3s' },
  { from: 'p1',  to: 'hub',  delay: '-0.8s', dur: '4s' },
  { from: 'p2',  to: 'hub',  delay: '-2.2s', dur: '3.5s' },
  { from: 'p3',  to: 'hub',  delay: '-4.1s', dur: '4s' },
  { from: 'hub', to: 'out1', delay: '-1.0s', dur: '3.8s' },
  { from: 'hub', to: 'out2', delay: '-2.5s', dur: '3.2s' },
  { from: 'hub', to: 'out3', delay: '-3.8s', dur: '3.6s' },
];

function getNode(id) {
  return nodes.find((n) => n.id === id);
}

function nodeColor(type) {
  return {
    input:   { fill: 'rgba(200,169,110,0.08)',  stroke: 'rgba(200,169,110,0.30)', text: 'rgba(200,169,110,0.70)' },
    process: { fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.18)', text: 'rgba(255,255,255,0.50)' },
    hub:     { fill: 'rgba(66,151,255,0.10)',   stroke: 'rgba(66,151,255,0.40)',  text: 'rgba(66,151,255,0.80)' },
    output:  { fill: 'rgba(127,169,142,0.08)',  stroke: 'rgba(127,169,142,0.28)', text: 'rgba(127,169,142,0.65)' },
  }[type];
}

export default function DigitalRouteMap({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg-cool)' }}
    >
      {/* Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 50% 50% at 58% 50%, rgba(66,151,255,0.05) 0%, transparent 65%)',
      }} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const a = getNode(edge.from);
          const b = getNode(edge.to);
          if (!a || !b) return null;
          const midX = (a.x + b.x) / 2;
          const d = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
          return (
            <g key={i}>
              {/* Static rail */}
              <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              {/* Animated signal */}
              {animated && (
                <path
                  d={d}
                  fill="none"
                  stroke={edge.from === 'hub' ? 'rgba(127,169,142,0.50)' : 'rgba(66,151,255,0.45)'}
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
        {nodes.map((node) => {
          const c = nodeColor(node.type);
          return (
            <g key={node.id}>
              {/* Outer glow ring for hub */}
              {node.type === 'hub' && animated && (
                <circle
                  cx={node.x} cy={node.y}
                  r={node.r + 14}
                  fill="none"
                  stroke="rgba(66,151,255,0.12)"
                  strokeWidth="1"
                  style={{ animation: 'hm-ping 4s 0s infinite ease-out' }}
                />
              )}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={node.type === 'hub' ? 1.5 : 1}
              />
              <text
                x={node.x} y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={c.text}
                fontSize={node.type === 'hub' ? 8.5 : 7.5}
                fontFamily="'Roobert Mono', monospace"
                letterSpacing="0.10em"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Column labels */}
        {[
          { x: 80,  label: 'INPUT' },
          { x: 260, label: 'PROCESS' },
          { x: 430, label: 'ORCHESTRATE' },
          { x: 610, label: 'OUTPUT' },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x}
            y={740}
            textAnchor="middle"
            fill="rgba(255,255,255,0.15)"
            fontSize="7"
            fontFamily="'Roobert Mono', monospace"
            letterSpacing="0.16em"
          >
            {col.label}
          </text>
        ))}
      </svg>

      {/* Top label */}
      <div style={{ position: 'absolute', top: 26, left: 26, zIndex: 10 }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Workflow Orchestration</div>
        <div style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: 'var(--hm-text-subtle)' }}>
          End-to-end travel operations
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
