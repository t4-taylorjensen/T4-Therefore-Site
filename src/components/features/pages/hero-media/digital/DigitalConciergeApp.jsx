import { useState, useEffect, useRef } from 'react';
import '../hero-media.css';
import bgVid      from '../assets/venice-bg.mp4';
import profileImg from '../assets/therefore-int-profile.jpg';
import veniceImg  from '../assets/venice-card.jpg';

const ink  = (a) => `rgba(18,18,18,${a})`;
const SANS = { fontFamily: 'var(--font-primary)' };

const CARD_STYLE = {
  position: 'absolute',
  background: '#ffffff',
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.22)',
};

const REF_W = 540;
const REF_H = 360;

const ITEMS = [
  { time: '09:00', label: 'Caffè Florian',     done: true   },
  { time: '11:00', label: "Doge's Palace",     active: true },
  { time: '13:30', label: 'Cicchetti lunch'                 },
  { time: '16:00', label: 'Gondola on the Rio'              },
  { time: '20:00', label: 'Dinner — Quadri'                 },
];

const MSGS = [
  { from: 'concierge', text: "Buongiorno! Your gondolier meets you at Campo Santa Maria — 4pm sharp.", time: '10:14' },
  { from: 'guest',     text: "Wonderful, we can't wait!",                                               time: '10:31' },
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '7px 10px', background: 'rgba(255,255,255,0.18)', borderRadius: '2px 10px 10px 10px', border: '1px solid rgba(255,255,255,0.22)', alignSelf: 'flex-start' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.70)', animation: 'hm-breathe 1.2s ease-in-out infinite', animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  );
}

export default function DigitalConciergeApp({ animated = true }) {
  const [activeRow, setActiveRow] = useState(1);
  const [chatPhase, setChatPhase] = useState(0);

  const rootRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setScale(Math.min(width / REF_W, height / REF_H) * 0.90);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;
    const t1 = setInterval(() => setActiveRow(r => (r + 1) % ITEMS.length), 2800);
    let timers = [];
    const runSequence = () => {
      setChatPhase(0);
      timers.push(setTimeout(() => setChatPhase(1),  600));
      timers.push(setTimeout(() => setChatPhase(2), 2200));
      timers.push(setTimeout(() => setChatPhase(3), 4200));
      timers.push(setTimeout(() => setChatPhase(4), 5800));
      timers.push(setTimeout(() => runSequence(),  10000));
    };
    runSequence();
    return () => { clearInterval(t1); timers.forEach(clearTimeout); };
  }, [animated]);

  return (
    <div className="hm-root" ref={rootRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <video src={bgVid} autoPlay loop muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)' }} />

      <div style={{ position: 'relative', width: REF_W, height: REF_H, transform: `scale(${scale})`, transformOrigin: 'center center', zIndex: 10 }}>

        {/* ── Card 1: Itinerary ────────────────────────────── */}
        <div style={{ ...CARD_STYLE, top: 20, left: 50, width: 200, zIndex: 1 }}>

          <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
            <img src={veniceImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 14px 11px' }}>
              <div style={{ ...SANS, fontSize: 14, fontWeight: 400, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>My Concierge App</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(127,169,142,1)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
                <span style={{ ...SANS, fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>Venice · Day 3 of 7</span>
              </div>
            </div>
          </div>

          {ITEMS.map((s, i) => {
            const on = i === activeRow;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 14px',
                background: on ? ink(0.025) : 'transparent',
                borderLeft: `2px solid ${on ? ink(0.55) : 'transparent'}`,
                borderBottom: i < ITEMS.length - 1 ? `1px solid ${ink(0.05)}` : 'none',
                transition: 'all 0.45s ease',
              }}>
                <span style={{ ...SANS, fontSize: 9, color: on ? ink(0.55) : ink(0.25), flexShrink: 0, minWidth: 26, transition: 'color 0.45s' }}>{s.time}</span>
                <div style={{ width: 4, height: 4, borderRadius: '50%', flexShrink: 0, background: on ? ink(0.72) : s.done ? ink(0.15) : 'transparent', border: on || s.done ? 'none' : `1px solid ${ink(0.22)}`, transition: 'all 0.45s' }} />
                <span style={{ ...SANS, fontSize: 10.5, letterSpacing: '-0.01em', color: on ? ink(0.82) : ink(s.done ? 0.22 : 0.42), fontWeight: on ? 500 : 400, textDecoration: s.done ? 'line-through' : 'none', transition: 'color 0.45s' }}>{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* ── Card 2: Guest ────────────────────────────────── */}
        <div style={{ ...CARD_STYLE, top: 20, right: 22, width: 148, zIndex: 1 }}>
          <div style={{ padding: '13px 14px 11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ ...SANS, fontSize: 10, color: ink(0.75) }}>Guest</span>
              <span style={{ ...SANS, fontSize: 9, color: ink(0.75) }}>VIP</span>
            </div>
            <div style={{ ...SANS, fontSize: 13, fontWeight: 400, color: ink(0.88), letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 3 }}>Claire & James</div>
            <div style={{ ...SANS, fontSize: 9, color: ink(0.38), marginBottom: 12 }}>Suite 14 · Venice</div>
            <div style={{ height: 1, background: ink(0.05), marginBottom: 10 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ ...SANS, fontSize: 9, color: ink(0.40), marginBottom: 3 }}>Arrival</div>
                <div style={{ ...SANS, fontSize: 10.5, color: ink(0.70), letterSpacing: '-0.01em' }}>May 25</div>
              </div>
              <div style={{ width: 1, background: ink(0.05) }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...SANS, fontSize: 9, color: ink(0.40), marginBottom: 3 }}>Departure</div>
                <div style={{ ...SANS, fontSize: 10.5, color: ink(0.70), letterSpacing: '-0.01em' }}>Jun 1</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 3: Chat ─────────────────────────────────── */}
        <div style={{ position: 'absolute', top: 128, left: 214, width: 242, borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(28px) saturate(1.5)', WebkitBackdropFilter: 'blur(28px) saturate(1.5)', border: '1px solid rgba(255,255,255,0.28)', boxShadow: '0 2px 0 rgba(255,255,255,0.18) inset, 0 16px 48px rgba(0,0,0,0.28)', zIndex: 2 }}>

          <div style={{ padding: '11px 14px', borderBottom: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.22)' }}>
                <img src={profileImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 7, height: 7, borderRadius: '50%', background: '#4297FF', border: '1.5px solid rgba(255,255,255,0.5)', animation: animated ? 'hm-breathe 2.4s ease-in-out infinite' : 'none' }} />
            </div>
            <div>
              <div style={{ ...SANS, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.90)', letterSpacing: '-0.02em', lineHeight: 1 }}>Luca</div>
              <div style={{ ...SANS, fontSize: 9, color: 'rgba(255,255,255,0.50)', marginTop: 3 }}>Concierge · Online</div>
            </div>
          </div>

          <div style={{ padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 100 }}>

            {chatPhase === 1 && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.20)' }}>
                  <img src={profileImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
                <TypingIndicator />
              </div>
            )}

            {chatPhase >= 2 && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, animation: 'hm-fade-in 0.35s ease' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.20)' }}>
                  <img src={profileImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '80%' }}>
                  <div style={{ padding: '8px 11px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: '2px 10px 10px 10px' }}>
                    <span style={{ ...SANS, fontSize: 10.5, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, letterSpacing: '-0.01em' }}>{MSGS[0].text}</span>
                  </div>
                  <span style={{ ...SANS, fontSize: 8, color: 'rgba(255,255,255,0.30)' }}>{MSGS[0].time}</span>
                </div>
              </div>
            )}

            {chatPhase === 3 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TypingIndicator />
              </div>
            )}

            {chatPhase >= 4 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'hm-fade-in 0.35s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end', maxWidth: '72%' }}>
                  <div style={{ padding: '8px 11px', background: 'rgba(255,255,255,0.88)', borderRadius: '10px 2px 10px 10px' }}>
                    <span style={{ ...SANS, fontSize: 10.5, color: ink(0.82), lineHeight: 1.5, letterSpacing: '-0.01em' }}>{MSGS[1].text}</span>
                  </div>
                  <span style={{ ...SANS, fontSize: 8, color: 'rgba(255,255,255,0.30)' }}>{MSGS[1].time}</span>
                </div>
              </div>
            )}

          </div>

          <div style={{ margin: '0 13px 12px', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 7px 7px 13px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 99 }}>
            <span style={{ ...SANS, fontSize: 10, color: 'rgba(255,255,255,0.35)', flex: 1, letterSpacing: '-0.01em' }}>Reply to Luca…</span>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M8 2l6 6-6 6" stroke={ink(0.75)} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
