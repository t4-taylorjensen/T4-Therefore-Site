import '../hero-media.css';
import { useState, useEffect, useRef } from 'react';

/* Sparse neural network with animated signal propagation.
   Communicates: invisible intelligence, AI inference, structured reasoning. */

const W = 740;
const H = 780;

/* 3 layers: input (4), hidden (5), output (3) */
const layers = [
  {
    id: 'input',
    x: 160,
    nodes: [
      { id: 'i0', y: 220, label: 'Context' },
      { id: 'i1', y: 340, label: 'Intent' },
      { id: 'i2', y: 460, label: 'Filters' },
      { id: 'i3', y: 580, label: 'History' },
    ],
  },
  {
    id: 'hidden',
    x: 370,
    nodes: [
      { id: 'h0', y: 175 },
      { id: 'h1', y: 295 },
      { id: 'h2', y: 390 },
      { id: 'h3', y: 490 },
      { id: 'h4', y: 605 },
    ],
  },
  {
    id: 'output',
    x: 580,
    nodes: [
      { id: 'o0', y: 270, label: 'Recommend' },
      { id: 'o1', y: 400, label: 'Personalize' },
      { id: 'o2', y: 530, label: 'Optimize' },
    ],
  },
];

/* Weighted edges: [fromId, toId, weight (0-1)] */
const connections = [
  ['i0','h0',0.9], ['i0','h1',0.6], ['i0','h2',0.3],
  ['i1','h1',0.8], ['i1','h2',0.9], ['i1','h3',0.4],
  ['i2','h2',0.5], ['i2','h3',0.8], ['i2','h4',0.6],
  ['i3','h0',0.4], ['i3','h3',0.5], ['i3','h4',0.9],
  ['h0','o0',0.8], ['h0','o1',0.3],
  ['h1','o0',0.9], ['h1','o1',0.5],
  ['h2','o0',0.4], ['h2','o1',0.9], ['h2','o2',0.5],
  ['h3','o1',0.6], ['h3','o2',0.9],
  ['h4','o1',0.3], ['h4','o2',0.8],
];

function findNode(id) {
  for (const layer of layers) {
    const n = layer.nodes.find((n) => n.id === id);
    if (n) return { ...n, x: layer.x };
  }
  return null;
}

/* Signal pulses with staggered delays */
const signals = connections.map(([from, to, w], i) => ({
  from, to, w,
  delay: `${(i * 0.55) % 8}s`,
  dur: `${3.5 + (i % 4) * 0.5}s`,
})).filter((s) => s.w > 0.6); /* only strong connections get animated signals */

export default function AIIntelligenceNetwork({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg)' }}
    >
      {/* Sparse atmospheric glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(59,191,176,0.04) 0%, transparent 65%)',
      }} />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* All connections — static weight-based opacity */}
        {connections.map(([from, to, w], i) => {
          const a = findNode(from);
          const b = findNode(to);
          if (!a || !b) return null;
          const midX = (a.x + b.x) / 2;
          const d = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
          return (
            <path
              key={`c-${i}`}
              d={d}
              fill="none"
              stroke={`rgba(255,255,255,${w * 0.10})`}
              strokeWidth={w * 1.5}
            />
          );
        })}

        {/* Animated signal pulses */}
        {animated && signals.map((sig, i) => {
          const a = findNode(sig.from);
          const b = findNode(sig.to);
          if (!a || !b) return null;
          const midX = (a.x + b.x) / 2;
          const d = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
          return (
            <path
              key={`s-${i}`}
              d={d}
              fill="none"
              stroke="rgba(59,191,176,0.65)"
              strokeWidth="2"
              strokeDasharray="1"
              strokeDashoffset="1"
              pathLength="1"
              style={{
                animation: `hm-signal-travel ${sig.dur} ${sig.delay} infinite ease-in-out`,
              }}
            />
          );
        })}

        {/* Layer: input */}
        {layers[0].nodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={layers[0].x} cy={node.y} r={14}
              fill="rgba(200,169,110,0.08)"
              stroke="rgba(200,169,110,0.30)"
              strokeWidth="1"
            />
            <text
              x={layers[0].x - 24} y={node.y + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fill="rgba(200,169,110,0.55)"
              fontSize="7.5"
              fontFamily="'Roobert Mono', monospace"
              letterSpacing="0.10em"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Layer: hidden */}
        {layers[1].nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={layers[1].x} cy={node.y} r={10}
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              style={animated ? {
                animation: `hm-breathe 4s ${parseInt(node.id[1]) * 0.7}s infinite ease-in-out`,
              } : {}}
            />
          </g>
        ))}

        {/* Layer: output */}
        {layers[2].nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={layers[2].x} cy={node.y} r={16}
              fill="rgba(66,151,255,0.08)"
              stroke="rgba(66,151,255,0.35)"
              strokeWidth="1.5"
            />
            {animated && (
              <circle
                cx={layers[2].x} cy={node.y} r={26}
                fill="none"
                stroke="rgba(66,151,255,0.07)"
                strokeWidth="1"
                style={{
                  animation: `hm-ping 4s ${parseInt(node.id[1]) * 1.2}s infinite ease-out`,
                }}
              />
            )}
            <text
              x={layers[2].x + 26} y={node.y + 1}
              textAnchor="start"
              dominantBaseline="middle"
              fill="rgba(66,151,255,0.65)"
              fontSize="7.5"
              fontFamily="'Roobert Mono', monospace"
              letterSpacing="0.10em"
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Layer labels */}
        {[
          { x: layers[0].x, label: 'INPUT' },
          { x: layers[1].x, label: 'HIDDEN' },
          { x: layers[2].x, label: 'OUTPUT' },
        ].map((col) => (
          <text
            key={col.label}
            x={col.x} y={730}
            textAnchor="middle"
            fill="rgba(255,255,255,0.12)"
            fontSize="7"
            fontFamily="'Roobert Mono', monospace"
            letterSpacing="0.18em"
          >
            {col.label}
          </text>
        ))}
      </svg>

      {/* Top label */}
      <div style={{ position: 'absolute', top: 26, left: 26, zIndex: 10 }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Inference Engine</div>
        <div style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: 'var(--hm-text-subtle)' }}>
          3-layer network · {connections.length} weighted connections
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
