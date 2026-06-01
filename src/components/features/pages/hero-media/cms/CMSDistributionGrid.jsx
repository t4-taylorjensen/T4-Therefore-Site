import '../hero-media.css';

/* Content distribution network:
   one source node → multiple channel destinations
   connected by animated SVG paths */

const W = 740;
const H = 780;

const source = { id: 'src', x: 120, y: 390, label: 'Content\nSource', r: 22 };

const channels = [
  { id: 'ch1', x: 360, y: 140, label: 'Web', tag: 'headless', delay: '0s' },
  { id: 'ch2', x: 420, y: 240, label: 'Mobile', tag: 'native', delay: '-1.5s' },
  { id: 'ch3', x: 440, y: 370, label: 'Email', tag: 'automated', delay: '-3s' },
  { id: 'ch4', x: 400, y: 500, label: 'Social', tag: 'curated', delay: '-4.5s' },
  { id: 'ch5', x: 330, y: 610, label: 'Print', tag: 'editorial', delay: '-6s' },
];

const destinations = [
  { id: 'd1', x: 580, y: 110, label: 'Tokyo', parentId: 'ch1', delay: '-0.8s' },
  { id: 'd2', x: 620, y: 200, label: 'Bali', parentId: 'ch1', delay: '-2s' },
  { id: 'd3', x: 600, y: 310, label: 'Safari', parentId: 'ch3', delay: '-3.5s' },
  { id: 'd4', x: 610, y: 430, label: 'NYC', parentId: 'ch4', delay: '-5s' },
  { id: 'd5', x: 570, y: 540, label: 'Paris', parentId: 'ch5', delay: '-0.3s' },
  { id: 'd6', x: 590, y: 640, label: 'Mara', parentId: 'ch5', delay: '-2.5s' },
];

function cubicPath(x1, y1, x2, y2) {
  const cx = x1 + (x2 - x1) * 0.55;
  return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
}

export default function CMSDistributionGrid({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg)' }}
    >
      {/* Atmospheric radial */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 55% 45% at 45% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)',
      }} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Source → channel connections */}
        {channels.map((ch) => {
          const d = cubicPath(source.x + source.r, source.y, ch.x - 16, ch.y);
          return (
            <g key={ch.id}>
              {/* Static base line */}
              <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              {/* Animated signal */}
              {animated && (
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(200,169,110,0.55)"
                  strokeWidth="1.5"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  pathLength="1"
                  style={{
                    animation: `hm-signal-travel 4s ${ch.delay} infinite ease-in-out`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Channel → destination connections */}
        {destinations.map((dst) => {
          const parent = channels.find((c) => c.id === dst.parentId);
          if (!parent) return null;
          const d = cubicPath(parent.x + 16, parent.y, dst.x - 14, dst.y);
          return (
            <g key={dst.id}>
              <path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              {animated && (
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(127,169,142,0.45)"
                  strokeWidth="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  pathLength="1"
                  style={{
                    animation: `hm-signal-travel 5s ${dst.delay} infinite ease-in-out`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Source node */}
        <circle
          cx={source.x}
          cy={source.y}
          r={source.r}
          fill="rgba(200,169,110,0.10)"
          stroke="rgba(200,169,110,0.35)"
          strokeWidth="1.5"
        />
        {animated && (
          <circle
            cx={source.x}
            cy={source.y}
            r={source.r + 10}
            fill="none"
            stroke="rgba(200,169,110,0.15)"
            strokeWidth="1"
            style={{ animation: 'hm-ping 3s 0s infinite ease-out' }}
          />
        )}
        <text
          x={source.x}
          y={source.y - 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(200,169,110,0.75)"
          fontSize="8"
          fontFamily="'Roobert Mono', monospace"
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          CMS
        </text>

        {/* Channel nodes */}
        {channels.map((ch) => (
          <g key={ch.id}>
            <rect
              x={ch.x - 16}
              y={ch.y - 11}
              width={32}
              height={22}
              rx={4}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
            />
            <text
              x={ch.x}
              y={ch.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize="8"
              fontFamily="'Roobert Mono', monospace"
              letterSpacing="0.10em"
            >
              {ch.label.toUpperCase()}
            </text>
            {/* Tag below */}
            <text
              x={ch.x}
              y={ch.y + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.20)"
              fontSize="7"
              fontFamily="'Roobert Mono', monospace"
              letterSpacing="0.08em"
            >
              {ch.tag}
            </text>
          </g>
        ))}

        {/* Destination nodes */}
        {destinations.map((dst) => (
          <g key={dst.id}>
            <circle
              cx={dst.x}
              cy={dst.y}
              r={13}
              fill="rgba(127,169,142,0.07)"
              stroke="rgba(127,169,142,0.22)"
              strokeWidth="1"
            />
            <text
              x={dst.x}
              y={dst.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(127,169,142,0.65)"
              fontSize="7.5"
              fontFamily="'Roobert Mono', monospace"
              letterSpacing="0.10em"
            >
              {dst.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>

      {/* Top-left label */}
      <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        zIndex: 10,
      }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Content Distribution</div>
        <div style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 11,
          color: 'var(--hm-text-subtle)',
          lineHeight: 1.5,
        }}>
          Omnichannel delivery infrastructure
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
