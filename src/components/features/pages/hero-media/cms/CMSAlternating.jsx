import '../hero-media.css';
import imgDuvine from '../assets/therefore-cms-solutions-duvine-screen-01.jpg';
import imgNAP    from '../assets/therefore-cms-solutions-new-american-paintings-screen-01.jpg';
import vidCanyon from '../assets/therefore-int-canyon-spirit-custom-cms-website.mov';

const CARD_W = 260;
const CARD_H = 184;
const GAP    = 10;
const LINE   = '0.75px solid rgba(0,0,0,0.22)';

/* ── Outline-only wireframe layouts ── */

function WireframeDuVine() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 34, height: 6, border: LINE }} />
        <div style={{ flex: 1 }} />
        {[20,20,20,36].map((w,i) => <div key={i} style={{ width: w, height: 5, border: LINE }} />)}
      </div>
      {/* Step bar */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 3, background: i < 3 ? 'rgba(0,0,0,0.22)' : 'transparent', border: LINE }} />
        ))}
      </div>
      {/* Body */}
      <div style={{ flex: 1, display: 'flex', gap: 8, minHeight: 0 }}>
        <div style={{ width: '45%', border: LINE }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
          <div style={{ width: '62%', height: 8,  border: LINE }} />
          <div style={{ width: '88%', height: 5,  border: LINE }} />
          <div style={{ width: '78%', height: 5,  border: LINE }} />
          <div style={{ flex: 1, border: LINE, marginTop: 4 }} />
          <div style={{ width: '50%', height: 16, border: LINE }} />
        </div>
      </div>
    </div>
  );
}

function WireframeNAP() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ width: 30, height: 5, border: LINE }} />
      <div style={{ flex: 1, border: LINE, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 12, left: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {['80%','68%','52%'].map((w,i) => (
            <div key={i} style={{ width: w, height: 8, border: LINE }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WireframeCanyon() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: 14, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7 }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 28, height: 6, border: LINE }} />
        <div style={{ flex: 1 }} />
        {[18,18,32].map((w,i) => <div key={i} style={{ width: w, height: 5, border: LINE }} />)}
      </div>
      {/* Hero */}
      <div style={{ flex: 1.4, border: LINE, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 8, gap: 5 }}>
        <div style={{ width: '55%', height: 9,  border: LINE }} />
        <div style={{ width: '36%', height: 6,  border: LINE }} />
        <div style={{ width: '20%', height: 18, border: LINE, marginTop: 4 }} />
      </div>
      {/* Cards */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[1,1,1].map((_,i) => <div key={i} style={{ flex: 1, height: 28, border: LINE }} />)}
      </div>
    </div>
  );
}

/* ── Screen data ── */
const SCREENS = [
  { type: 'img', src: imgDuvine, Wireframe: WireframeDuVine },
  { type: 'vid', src: vidCanyon, Wireframe: WireframeCanyon },
  { type: 'img', src: imgNAP,   Wireframe: WireframeNAP    },
];

const ROW_A = [SCREENS[0], SCREENS[1], SCREENS[2]];
const ROW_B = [SCREENS[2], SCREENS[0], SCREENS[1]];

function PolishedCard({ card }) {
  return (
    <div style={{ position: 'relative', width: CARD_W, height: CARD_H, flexShrink: 0, overflow: 'hidden' }}>
      {card.type === 'vid' ? (
        <video src={card.src} autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top', display: 'block',
        }} />
      ) : (
        <img src={card.src} alt="" aria-hidden="true" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top', display: 'block',
        }} />
      )}
    </div>
  );
}

function WireframeCard({ card }) {
  const { Wireframe } = card;
  return (
    <div style={{ width: CARD_W, height: CARD_H, flexShrink: 0, overflow: 'hidden' }}>
      <Wireframe />
    </div>
  );
}

function LapRow({ pairs, direction = 'left', speed, paused }) {
  const interleaved = pairs.flatMap(card => [
    { kind: 'polished',  card },
    { kind: 'wireframe', card },
  ]);
  const doubled = [...interleaved, ...interleaved];
  const anim = direction === 'left' ? 'hm-scroll-left' : 'hm-scroll-right';

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{
        display: 'flex', gap: GAP, width: 'max-content',
        animation: `${anim} ${speed} linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {doubled.map((item, i) =>
          item.kind === 'polished'
            ? <PolishedCard  key={i} card={item.card} />
            : <WireframeCard key={i} card={item.card} />
        )}
      </div>
    </div>
  );
}

export default function CMSAlternating({ animated = true }) {
  return (
    <div className="hm-root" style={{ background: '#eeeeec' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: GAP,
      }}>
        <LapRow pairs={ROW_A} direction="left"  speed="52s" paused={!animated} />
        <LapRow pairs={ROW_B} direction="right" speed="44s" paused={!animated} />
      </div>
    </div>
  );
}
