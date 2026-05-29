import { useState, useEffect } from 'react';
import '../hero-media.css';
import img1 from '../assets/therefore-int-bg-08.jpg';
import vid2 from '../assets/apps-bg.mp4';
import vid3 from '../assets/trova-bg.mov';


const PRODUCTS = [
  { index: '01', label: 'Portals',   role: 'Operator Dashboards', img: img1,  vid: null },
  { index: '02', label: 'Apps',      role: 'Client Experiences',  img: null,  vid: vid2 },
  { index: '03', label: 'Workflows', role: 'Process Automation',  img: null,  vid: vid3 },
];

/*
  Slot 0 = left   → folded inward +rotateY, smaller scale
  Slot 1 = center → flat, full scale
  Slot 2 = right  → folded inward -rotateY, smaller scale

  Rotation: [l, c, r] → [c, r, l] each tick
*/
/* ─── Glass overlays ────────────────────────────────────────── */

const glass = {
  background: 'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(12px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
  border: '1px solid rgba(255,255,255,0.30)',
};

const hr = <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '10px 0' }} />;

/* Portals — DuVine guide portal, live tour activity */
function GlassPortals() {
  const rows = [
    { label: 'Tuscany',    status: 'On route' },
    { label: 'Dolomites',  status: 'Departed' },
    { label: 'Loire',      status: 'Rest day' },
  ];
  return (
    <div style={{
      ...glass, borderRadius: 10,
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -56%)',
      width: 162, padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--font-primary)', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
        }}>Guest Portal</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
        }}>Live</span>
      </div>
      {hr}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-primary)', fontSize: 9.5,
              color: 'rgba(255,255,255,0.70)', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>{r.label}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.06em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              color: `rgba(255,255,255,${i === 0 ? 0.60 : 0.28})`,
            }}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Apps — Scott Dunn trip tracker, day progress */
function GlassApps() {
  return (
    <div style={{
      ...glass, borderRadius: 10,
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -56%)',
      width: 162, padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--font-primary)', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em',
        }}>Scott Dunn</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
        }}>Rome · Day 2</span>
      </div>
      {hr}
      <div style={{
        fontFamily: 'var(--font-primary)', fontSize: 10,
        color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', marginBottom: 10,
      }}>St. Peter's Basilica — 9:00 AM</div>
      <div style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '20%', background: 'rgba(255,255,255,0.60)' }} />
      </div>
    </div>
  );
}

/* Workflows — G Adventures content pipeline */
function GlassWorkflows() {
  const steps = [
    { label: 'Draft',   done: true  },
    { label: 'Review',  done: true  },
    { label: 'Publish', done: false },
  ];
  return (
    <div style={{
      ...glass, borderRadius: 10,
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -56%)',
      width: 162, padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--font-primary)', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em',
        }}>Trova CMS</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
        }}>18 drafts</span>
      </div>
      {hr}
      {/* Step track */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <div style={{
          position: 'absolute', top: '50%', left: 6, right: 6,
          height: 1, background: 'rgba(255,255,255,0.14)', transform: 'translateY(-50%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: 6,
          height: 1, width: 'calc(50% - 6px)',
          background: 'rgba(255,255,255,0.55)', transform: 'translateY(-50%)',
        }} />
        {steps.map((s, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%', zIndex: 1,
            background: s.done ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.28)',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map((s, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: i === 0 ? 'rgba(255,255,255,1)' : `rgba(255,255,255,${s.done ? 0.55 : 0.25})`,
          }}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

const GLASS = { Portals: GlassPortals, Apps: GlassApps, Workflows: GlassWorkflows };

const SLOTS = [
  { x: -106, rotateY:  54, z: 1, scale: 0.70, brightness: 0.62 },
  { x:    0, rotateY:   0, z: 3, scale: 1.00, brightness: 1.00 },
  { x:  106, rotateY: -54, z: 2, scale: 0.70, brightness: 0.62 },
];

export default function DigitalProductCards({ animated = true }) {
  const [slots, setSlots]     = useState([2, 0, 1]);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => {
      setPressing(true);
      setTimeout(() => {
        setPressing(false);
        setSlots(([l, c, r]) => [c, r, l]);
      }, 120);
    }, 3400);
    return () => clearInterval(id);
  }, [animated]);

  const centerProduct = PRODUCTS[slots[1]];

  return (
    <div className="hm-root" style={{ background: '#eeeeec' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>

        {/* ── Card stack ── */}
        <div style={{
          perspective: '600px',
          perspectiveOrigin: '50% 50%',
          position: 'relative',
          width: 240, height: 320,
          marginBottom: 28,
        }}>
          {slots.map((productIdx, slotIdx) => {
            const product  = PRODUCTS[productIdx];
            const slot     = SLOTS[slotIdx];
            const isCenter = slotIdx === 1;

            return (
              <div
                key={productIdx}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 240, height: 320,
                  borderRadius: 0,
                  overflow: 'hidden',
                  boxShadow: isCenter
                    ? '0 28px 72px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)'
                    : '0 8px 32px rgba(0,0,0,0.14)',
                  filter: `brightness(${slot.brightness})`,
                  transform: `
                    translate(-50%, -50%)
                    translateX(${slot.x}px)
                    rotateY(${slot.rotateY}deg)
                    scale(${slot.scale * (pressing && isCenter ? 0.97 : 1)})
                  `,
                  zIndex: slot.z,
                  transformStyle: 'preserve-3d',
                  transition: pressing
                    ? 'transform 0.10s ease-in, filter 0.10s ease'
                    : [
                        'transform 0.58s cubic-bezier(0.16, 1, 0.3, 1)',
                        'filter 0.50s ease',
                        'box-shadow 0.50s ease',
                      ].join(', '),
                  willChange: 'transform',
                }}
              >
                {/* Full-bleed image or video */}
                {product.vid ? (
                  <video
                    src={product.vid}
                    autoPlay muted loop playsInline
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <img
                    src={product.img}
                    alt="" aria-hidden="true"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                )}

                {/* Scrim */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 55%)',
                }} />

                {/* Glass overlay */}
                {(() => { const G = GLASS[product.label]; return G ? <G /> : null; })()}

                {/* Label — bottom left */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '0 18px 20px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-primary)', fontSize: 24,
                    fontWeight: 500, color: 'rgba(255,255,255,0.92)',
                    letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4,
                  }}>{product.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-primary)', fontSize: 10,
                    color: 'rgba(255,255,255,0.50)', letterSpacing: '-0.01em',
                  }}>{product.role}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Button-style label ── */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          height: 34,
          padding: '0 10px',
          borderRadius: 'var(--radius-sm)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-mono-md)',
            fontWeight: 400,
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.28)',
            lineHeight: 1,
          }}>{centerProduct.index}</span>
          <div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.15)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-mono-md)',
            fontWeight: 400,
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.75)',
            lineHeight: 1,
          }}>{centerProduct.label}</span>
        </div>

      </div>
    </div>
  );
}
