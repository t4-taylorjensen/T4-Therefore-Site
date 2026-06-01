import { useState, useEffect } from 'react';
import '../hero-media.css';

const bookings = [
  { initials: 'SM', client: 'S. Martin',  tour: 'Tuscany Cycling',  departs: 'Jun 12', status: 'Confirmed', value: '$8,400'  },
  { initials: 'JR', client: 'J. Rhodes',  tour: 'Dolomites Trek',   departs: 'Jul 3',  status: 'Pending',   value: '$16,200' },
  { initials: 'WC', client: 'Wei Chen',   tour: 'Loire Valley',     departs: 'Jul 18', status: 'Confirmed', value: '$7,800'  },
  { initials: 'ET', client: 'E. Thomas',  tour: 'Amalfi Coast',     departs: 'Aug 2',  status: 'Quoted',    value: '$11,100' },
  { initials: 'LP', client: 'L. Park',    tour: 'Maldives Escape',  departs: 'Aug 15', status: 'Confirmed', value: '$12,600' },
];

const STATUS = {
  Confirmed: { bg: 'rgba(127,169,142,0.10)', border: 'rgba(127,169,142,0.24)', text: 'rgba(127,169,142,0.88)' },
  Pending:   { bg: 'rgba(200,169,110,0.10)', border: 'rgba(200,169,110,0.24)', text: 'rgba(200,169,110,0.88)' },
  Quoted:    { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', text: 'rgba(255,255,255,0.38)' },
};

export default function DigitalAgentPortal({ animated = true }) {
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setActive(r => (r + 1) % bookings.length), 2600);
    return () => clearInterval(id);
  }, [animated]);

  return (
    <div className="hm-root" style={{ background: 'var(--hm-bg)' }}>

      {/* Atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 65% 50% at 25% 40%, rgba(66,151,255,0.05) 0%, transparent 65%)',
      }} />

      {/* UI */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '26px 26px 22px',
        zIndex: 10,
      }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'rgba(127,169,142,0.85)',
              animation: animated ? 'hm-breathe 2.4s infinite ease-in-out' : 'none',
            }} />
            <span style={{
              fontFamily: 'var(--font-primary)', fontSize: 13, fontWeight: 500,
              color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em',
            }}>Agent Portal</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ label: 'Active', value: '3' }, { label: 'Pipeline', value: '$56.1k' }].map(m => (
              <div key={m.label} style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                  color: 'rgba(66,151,255,0.75)', letterSpacing: '-0.02em', lineHeight: 1,
                }}>{m.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 7.5,
                  color: 'var(--hm-text-subtle)', letterSpacing: '0.10em',
                  textTransform: 'uppercase', marginTop: 3,
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Table header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '26px 1fr 1fr 56px 74px',
          gap: '0 14px',
          padding: '0 10px 8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['', 'Client', 'Tour', 'Departs', 'Status'].map(h => (
            <span key={h} style={{
              fontFamily: 'var(--font-mono)', fontSize: 7.5,
              color: 'var(--hm-text-subtle)', letterSpacing: '0.10em',
              textTransform: 'uppercase',
            }}>{h}</span>
          ))}
        </div>

        {/* ── Rows ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5 }}>
          {bookings.map((b, i) => {
            const on = i === active;
            const sc = STATUS[b.status];
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '26px 1fr 1fr 56px 74px',
                  gap: '0 14px',
                  alignItems: 'center',
                  padding: '9px 10px',
                  borderRadius: 6,
                  background: on ? 'rgba(66,151,255,0.055)' : 'transparent',
                  border: `1px solid ${on ? 'rgba(66,151,255,0.13)' : 'transparent'}`,
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: on ? 'rgba(66,151,255,0.16)' : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.5s ease',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 6.5,
                    color: on ? 'rgba(66,151,255,0.80)' : 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.03em',
                    transition: 'color 0.5s ease',
                  }}>{b.initials}</span>
                </div>

                <span style={{
                  fontFamily: 'var(--font-primary)', fontSize: 11.5, fontWeight: 400,
                  color: on ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.48)',
                  letterSpacing: '-0.01em', transition: 'color 0.5s ease',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{b.client}</span>

                <span style={{
                  fontFamily: 'var(--font-primary)', fontSize: 11.5,
                  color: on ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.24)',
                  letterSpacing: '-0.01em', transition: 'color 0.5s ease',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{b.tour}</span>

                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: on ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)',
                  letterSpacing: '0.06em', transition: 'color 0.5s ease',
                  whiteSpace: 'nowrap',
                }}>{b.departs}</span>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  height: 18, padding: '0 7px', borderRadius: 3,
                  background: sc.bg, border: `1px solid ${sc.border}`,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 7,
                    color: sc.text, letterSpacing: '0.08em',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                  }}>{b.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 18,
          paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: 6,
        }}>
          {[
            { label: '3 Confirmed', color: 'rgba(127,169,142,0.65)' },
            { label: '1 Pending',   color: 'rgba(200,169,110,0.65)' },
            { label: '1 Quoted',    color: 'rgba(255,255,255,0.22)' },
          ].map(s => (
            <span key={s.label} style={{
              fontFamily: 'var(--font-mono)', fontSize: 7.5,
              color: s.color, letterSpacing: '0.10em', textTransform: 'uppercase',
            }}>{s.label}</span>
          ))}
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)', fontSize: 7.5,
            color: 'rgba(66,151,255,0.50)', letterSpacing: '0.10em', textTransform: 'uppercase',
          }}>Total $56,100</span>
        </div>

      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
