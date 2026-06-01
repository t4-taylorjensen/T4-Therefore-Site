import '../hero-media.css';

/* Abstract AI hero media — ambient gradient orbs, clean geometric core,
   minimal brand-aligned UI. No data visualization. Pure feeling. */

const orbs = [
  {
    width: 420,
    height: 380,
    color: 'rgba(66,151,255,0.26)',
    blur: 90,
    left: '4%',
    top: '12%',
    anim: 'hm-orb-a',
    duration: '24s',
    delay: '0s',
  },
  {
    width: 340,
    height: 340,
    color: 'rgba(59,191,176,0.16)',
    blur: 80,
    left: '48%',
    top: '38%',
    anim: 'hm-orb-b',
    duration: '32s',
    delay: '-11s',
  },
  {
    width: 300,
    height: 260,
    color: 'rgba(110,180,255,0.14)',
    blur: 100,
    left: '32%',
    top: '55%',
    anim: 'hm-orb-c',
    duration: '20s',
    delay: '-6s',
  },
  {
    width: 200,
    height: 200,
    color: 'rgba(66,151,255,0.12)',
    blur: 60,
    left: '60%',
    top: '6%',
    anim: 'hm-orb-a',
    duration: '28s',
    delay: '-16s',
  },
];

/* Floating minimal labels that communicate intent without being literal */
const floatingLabels = [
  { text: 'Semantic Layer',     left: '8%',  top: '14%', delay: '0s'   },
  { text: 'Intent Mapping',     left: '52%', top: '22%', delay: '-2s'  },
  { text: 'Context Engine',     left: '12%', top: '72%', delay: '-4s'  },
  { text: 'Inference',          left: '58%', top: '78%', delay: '-1s'  },
];

export default function AIAmbientIntelligence({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-gradient-blue)' }}
    >
      {/* ── Orb field ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {orbs.map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: orb.left,
              top: orb.top,
              width: orb.width,
              height: orb.height,
              borderRadius: '50%',
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              willChange: 'transform',
              animation: animated
                ? `${orb.anim} ${orb.duration} ${orb.delay} infinite ease-in-out`
                : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Subtle dot grid ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* ── Center geometric element ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg
          viewBox="0 0 160 160"
          width="160"
          height="160"
          style={{ overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer pulse ring */}
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* Rotating dashed ring */}
          <circle
            cx="80" cy="80" r="60"
            fill="none"
            stroke="rgba(66,151,255,0.30)"
            strokeWidth="1"
            strokeDasharray="8 14"
            style={animated ? {
              animation: 'hm-rotate-slow 20s linear infinite',
              transformOrigin: '80px 80px',
            } : {}}
          />

          {/* Counter-rotating sparse ring */}
          <circle
            cx="80" cy="80" r="46"
            fill="none"
            stroke="rgba(59,191,176,0.18)"
            strokeWidth="0.75"
            strokeDasharray="3 22"
            style={animated ? {
              animation: 'hm-rotate-reverse 28s linear infinite',
              transformOrigin: '80px 80px',
            } : {}}
          />

          {/* Inner ring */}
          <circle
            cx="80" cy="80" r="30"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.75"
          />

          {/* Core */}
          <circle
            cx="80" cy="80" r="8"
            fill="rgba(66,151,255,0.60)"
            style={animated ? {
              animation: 'hm-glow 4s 0s infinite ease-in-out',
            } : {}}
          />
          <circle
            cx="80" cy="80" r="4"
            fill="rgba(150,210,255,0.90)"
          />

          {/* Four axis tick marks */}
          {[[80,8,80,18],[80,142,80,152],[8,80,18,80],[142,80,152,80]].map(([x1,y1,x2,y2], i) => (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>

      {/* ── Floating minimal labels ── */}
      {floatingLabels.map((item, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: item.left,
            top: item.top,
            zIndex: 7,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            animation: animated
              ? `hm-breathe 6s ${item.delay} infinite ease-in-out`
              : 'none',
          }}
        >
          <div style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: 'rgba(66,151,255,0.70)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8.5,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            whiteSpace: 'nowrap',
          }}>
            {item.text}
          </span>
        </div>
      ))}

      {/* ── Bottom brand strip ── */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 28,
        right: 28,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.20)',
        }}>
          Therefore AI
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8.5,
          letterSpacing: '0.14em',
          color: 'rgba(66,151,255,0.45)',
        }}>
          Model ready
        </div>
      </div>

      {/* ── Top label ── */}
      <div style={{
        position: 'absolute',
        top: 26,
        left: 28,
        zIndex: 10,
      }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Artificial Intelligence</div>
        <div style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 10,
          color: 'var(--hm-text-subtle)',
        }}>
          Intelligent content infrastructure
        </div>
      </div>

      {/* ── Sweeping sheen ── */}
      {animated && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.022) 50%, transparent 70%)',
          backgroundSize: '300% 100%',
          animation: 'hm-shimmer 10s -3s linear infinite',
        }} />
      )}

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
