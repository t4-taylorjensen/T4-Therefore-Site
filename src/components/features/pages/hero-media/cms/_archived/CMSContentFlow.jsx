import '../hero-media.css';

const cards = [
  {
    id: 1,
    category: 'Destination',
    title: 'Kyoto, Japan',
    tag: 'Cultural Immersion',
    imageHue: '220deg 15% 18%',
    angle: -2.5,
    left: '6%',
    top: '8%',
    anim: 'hm-drift-xy',
    duration: '16s',
    delay: '0s',
    width: 188,
  },
  {
    id: 2,
    category: 'Experience',
    title: 'Maasai Mara',
    tag: 'Safari & Wildlife',
    imageHue: '32deg 18% 18%',
    angle: 1.8,
    left: '38%',
    top: '22%',
    anim: 'hm-drift-y',
    duration: '20s',
    delay: '-6s',
    width: 200,
  },
  {
    id: 3,
    category: 'Wellness',
    title: 'Ubud, Bali',
    tag: 'Retreat',
    imageHue: '160deg 14% 16%',
    angle: -1.2,
    left: '14%',
    top: '54%',
    anim: 'hm-drift-arc',
    duration: '24s',
    delay: '-14s',
    width: 172,
  },
  {
    id: 4,
    category: 'City Guide',
    title: 'Marrakech',
    tag: 'Urban Culture',
    imageHue: '25deg 20% 20%',
    angle: 2.2,
    left: '50%',
    top: '58%',
    anim: 'hm-drift-x',
    duration: '18s',
    delay: '-9s',
    width: 192,
  },
];

export default function CMSContentFlow({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-gradient-blue)' }}
    >
      {/* Brand blue glow + amber accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          var(--hm-blue-glow),
          radial-gradient(ellipse 45% 40% at 78% 18%, rgba(200,169,110,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 15% 82%, rgba(66,151,255,0.06) 0%, transparent 60%)
        `,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.6,
      }} />

      {/* Floating editorial cards */}
      {cards.map((card) => (
        <div
          key={card.id}
          style={{
            position: 'absolute',
            left: card.left,
            top: card.top,
            width: card.width,
            transform: `rotate(${card.angle}deg)`,
            animation: animated
              ? `${card.anim} ${card.duration} ${card.delay} infinite var(--hm-ease-drift)`
              : 'none',
            zIndex: card.id === 2 ? 5 : 3,
          }}
        >
          <div style={{
            background: 'var(--hm-surface-2)',
            border: '1px solid var(--hm-border-mid)',
            borderRadius: 10,
            padding: '14px 14px 12px',
            backdropFilter: 'blur(2px)',
          }}>
            {/* Category eyebrow */}
            <div className="hm-label" style={{ marginBottom: 8 }}>
              {card.category}
            </div>

            {/* Image placeholder */}
            <div style={{
              width: '100%',
              height: 52,
              borderRadius: 6,
              background: `hsl(${card.imageHue})`,
              marginBottom: 10,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
              }} />
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--hm-text)',
              lineHeight: 1.3,
              marginBottom: 7,
            }}>
              {card.title}
            </div>

            {/* Tag */}
            <div style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--hm-text-subtle)',
              background: 'var(--hm-surface-1)',
              border: '1px solid var(--hm-border)',
              borderRadius: 3,
              padding: '3px 6px',
            }}>
              {card.tag}
            </div>
          </div>
        </div>
      ))}

      {/* Ambient connection dots */}
      {[
        { x: '28%', y: '42%', size: 3, delay: '0s' },
        { x: '55%', y: '15%', size: 2, delay: '-3s' },
        { x: '72%', y: '75%', size: 3, delay: '-7s' },
        { x: '8%', y: '78%', size: 2, delay: '-1s' },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: 'var(--hm-amber)',
            opacity: 0.5,
            animation: animated
              ? `hm-breathe var(--hm-dur-ambient) ${dot.delay} infinite var(--hm-ease-ambient)`
              : 'none',
          }}
        />
      ))}

      <div className="hm-vignette" />
      <div className="hm-fade-bottom" />
      <div className="hm-grain" />
    </div>
  );
}
