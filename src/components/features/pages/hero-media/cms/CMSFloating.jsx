import '../hero-media.css';
import imgDuvine from '../assets/therefore-cms-solutions-duvine-screen-01.jpg';
import imgNAP    from '../assets/therefore-cms-solutions-new-american-paintings-screen-01.jpg';
import vidCanyon from '../assets/therefore-int-canyon-spirit-custom-cms-website.mov';

const LINE = '0.75px solid rgba(0,0,0,0.22)';

function WireframeDuVine() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: '8% 9%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4%' }}>
        <div style={{ width: '18%', height: 6, border: LINE }} />
        <div style={{ flex: 1 }} />
        {['9%','9%','9%','15%'].map((w,i) => <div key={i} style={{ width: w, height: 4, border: LINE }} />)}
      </div>
      <div style={{ display: 'flex', gap: '1.5%' }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 3, background: i < 3 ? 'rgba(0,0,0,0.20)' : 'transparent', border: LINE }} />
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', gap: '6%', minHeight: 0 }}>
        <div style={{ width: '44%', border: LINE }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8%', paddingTop: '2%' }}>
          <div style={{ width: '60%', height: '9%',  border: LINE }} />
          <div style={{ width: '88%', height: '5%',  border: LINE }} />
          <div style={{ width: '75%', height: '5%',  border: LINE }} />
          <div style={{ flex: 1, border: LINE, marginTop: '6%' }} />
          <div style={{ width: '48%', height: '12%', border: LINE }} />
        </div>
      </div>
    </div>
  );
}

function WireframeNAP() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: '8% 9%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6%' }}>
      <div style={{ width: '14%', height: 5, border: LINE }} />
      <div style={{ flex: 1, border: LINE, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '10%', left: '8%', right: '8%', display: 'flex', flexDirection: 'column', gap: '5%' }}>
          {['78%','65%','50%'].map((w,i) => (
            <div key={i} style={{ width: w, height: 9, border: LINE }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WireframeCanyon() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f7f7f5', padding: '8% 9%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4%' }}>
        <div style={{ width: '14%', height: 6, border: LINE }} />
        <div style={{ flex: 1 }} />
        {['9%','9%','14%'].map((w,i) => <div key={i} style={{ width: w, height: 4, border: LINE }} />)}
      </div>
      <div style={{ flex: 1.4, border: LINE, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7%', gap: '5%' }}>
        <div style={{ width: '52%', height: '9%',  border: LINE }} />
        <div style={{ width: '34%', height: '5%',  border: LINE }} />
        <div style={{ width: '18%', height: '13%', border: LINE, marginTop: '4%' }} />
      </div>
      <div style={{ display: 'flex', gap: '5%' }}>
        {[1,1,1].map((_,i) => <div key={i} style={{ flex: 1, height: 28, border: LINE }} />)}
      </div>
    </div>
  );
}

function Media({ card }) {
  return card.type === 'vid' ? (
    <video src={card.src} autoPlay muted loop playsInline style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top', display: 'block',
    }} />
  ) : (
    <img src={card.src} alt="" aria-hidden="true" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top', display: 'block',
    }} />
  );
}

/*
  Each card: { kind, card, top, left, width, rotate, float, duration, delay, z }
  top/left as % strings, width in px, rotate in deg
*/
const SCREENS = [
  { type: 'img', src: imgDuvine, Wireframe: WireframeDuVine },
  { type: 'img', src: imgNAP,   Wireframe: WireframeNAP    },
  { type: 'vid', src: vidCanyon, Wireframe: WireframeCanyon },
];

const CARDS = [
  { kind: 'polished',  screen: 0, top: '16%', left: '2%',  width: 210, aspect: 0.68, float: 'hm-slide-b', dur: '28s', delay: '0s',    z: 3 },
  { kind: 'wireframe', screen: 1, top: '12%', left: '42%', width: 195, aspect: 0.70, float: 'hm-slide-e', dur: '32s', delay: '-8s',   z: 4 },
  { kind: 'polished',  screen: 2, top: '30%', left: '22%', width: 230, aspect: 0.66, float: 'hm-slide-a', dur: '30s', delay: '-4s',   z: 2 },
  { kind: 'wireframe', screen: 0, top: '46%', left: '4%',  width: 175, aspect: 0.72, float: 'hm-slide-d', dur: '26s', delay: '-14s',  z: 5 },
  { kind: 'polished',  screen: 1, top: '44%', left: '46%', width: 200, aspect: 0.68, float: 'hm-slide-c', dur: '34s', delay: '-18s',  z: 3 },
  { kind: 'wireframe', screen: 2, top: '22%', left: '-1%', width: 165, aspect: 0.74, float: 'hm-slide-a', dur: '29s', delay: '-6s',   z: 1 },
  { kind: 'polished',  screen: 0, top: '58%', left: '28%', width: 185, aspect: 0.70, float: 'hm-slide-b', dur: '31s', delay: '-11s',  z: 2 },
];

function FloatingCard({ config, paused }) {
  const { kind, screen, top, left, width, aspect, float: floatAnim, dur, delay, z } = config;
  const height = Math.round(width * aspect);
  const s = SCREENS[screen];

  return (
    <div style={{
      position: 'absolute',
      top, left,
      width, height,
      zIndex: z,
      animation: `${floatAnim} ${dur} cubic-bezier(0.45, 0, 0.55, 1) ${delay} infinite`,
      animationPlayState: paused ? 'paused' : 'running',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.10)',
    }}>
      {kind === 'polished' ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Media card={s} />
        </div>
      ) : (
        <s.Wireframe />
      )}
    </div>
  );
}

export default function CMSFloating({ animated = true }) {
  return (
    <div className="hm-root" style={{ background: '#eeeeec', overflow: 'hidden' }}>
      {CARDS.map((config, i) => (
        <FloatingCard key={i} config={config} paused={!animated} />
      ))}
    </div>
  );
}
