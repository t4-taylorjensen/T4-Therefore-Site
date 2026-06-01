import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';

const MONO = { fontFamily: 'var(--font-mono)', textTransform: 'uppercase' };
const ink  = (a) => `rgba(18,18,18,${a})`;

const CHIPS = [
  { label: 'Refine for luxury tone',     top: '8%',  left: '6%',  anim: 'hm-drift-subtle 5s ease-in-out infinite'         },
  { label: 'Expand to new markets',      top: '72%', right: '5%', anim: 'hm-drift-subtle 6.5s ease-in-out infinite 1.2s'  },
  { label: 'Generate itinerary summary', top: '52%', left: '4%',  anim: 'hm-drift-subtle 4.5s ease-in-out infinite 2.5s'  },
];

const TASKS = [
  { label: 'Translate to 12 markets' },
  { label: 'Generate SEO metadata'   },
  { label: 'Schedule distribution'   },
];

function Spinner() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ animation: 'hm-spin 1s linear infinite', flexShrink: 0 }}>
      <circle cx="5" cy="5" r="4" stroke={ink(0.12)} strokeWidth="1.5" />
      <path d="M5 1a4 4 0 0 1 4 4" stroke={ink(0.55)} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 5l2.5 2.5L8 3" stroke={ink(0.45)} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <div style={{ width: 5, height: 5, borderRadius: '50%', border: `1px solid ${ink(0.20)}`, flexShrink: 0 }} />;
}

export default function AIEditorialAssistant({ animated = true, bgOverride = null }) {
  const [activeTask, setActiveTask] = useState(0);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setActiveTask(t => (t + 1) % TASKS.length);
      setActiveChip(c => (c + 1) % CHIPS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [animated]);

  return (
    <div className="hm-root">
      <img
        src={bgOverride ?? bgImage} alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* White card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '72%',
        background: '#ffffff',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.16)',
      }}>

        {/* Header */}
        <div style={{ padding: '13px 18px', borderBottom: `1px solid ${ink(0.07)}` }}>
          <span style={{ ...MONO, fontSize: 7, letterSpacing: '0.14em', color: ink(0.35) }}>Content Automation</span>
        </div>

        {/* Task rows */}
        <div style={{ padding: '6px 0' }}>
          {TASKS.map((task, i) => {
            const isDone   = i < activeTask;
            const isActive = i === activeTask;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 18px',
                background: isActive ? ink(0.025) : 'transparent',
                transition: 'background 0.4s ease',
              }}>
                <div style={{ width: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDone ? <Check /> : isActive ? <Spinner /> : <Dot />}
                </div>
                <span style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 11.5, letterSpacing: '-0.01em',
                  color: isDone ? ink(0.35) : isActive ? ink(0.82) : ink(0.40),
                  transition: 'color 0.4s ease',
                  textDecoration: isDone ? 'line-through' : 'none',
                }}>{task.label}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Chips */}
      {CHIPS.map((chip, i) => {
        const isActive = activeChip === i && animated;
        return (
          <div key={i} style={{
            position: 'absolute',
            top: chip.top,
            ...(chip.left  ? { left:  chip.left  } : {}),
            ...(chip.right ? { right: chip.right } : {}),
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 12px',
            background: 'rgba(10,10,10,0.88)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 6,
            boxShadow: '0 4px 20px rgba(0,0,0,0.28)',
            animation: chip.anim,
            zIndex: 10,
          }}>
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.90 }}>
              <path d="M8 0C8 0 8.6 4.8 10.8 6C13 7.2 16 8 16 8C16 8 13 8.8 10.8 10C8.6 11.2 8 16 8 16C8 16 7.4 11.2 5.2 10C3 8.8 0 8 0 8C0 8 3 7.2 5.2 6C7.4 4.8 8 0 8 0Z" fill="white" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-primary)', fontSize: 10,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.01em', whiteSpace: 'nowrap',
            }}>{chip.label}</span>
          </div>
        );
      })}
    </div>
  );
}
