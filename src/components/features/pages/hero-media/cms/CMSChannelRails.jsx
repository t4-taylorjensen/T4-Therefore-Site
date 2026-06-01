import '../hero-media.css';

/* Horizontal content rails scrolling at different speeds.
   Communicates content volume, velocity, and channel distribution. */

const rails = [
  {
    id: 1,
    speed: '28s',
    opacity: 0.4,
    items: ['Tokyo', 'Kyoto', 'Cultural', 'Japan Guide', 'Ryokan', 'Itinerary', 'Seasonal', 'Temples', 'Tokyo', 'Kyoto', 'Cultural', 'Japan Guide', 'Ryokan', 'Itinerary', 'Seasonal', 'Temples'],
    accentColor: 'var(--hm-amber)',
    accentOpacity: 0.5,
  },
  {
    id: 2,
    speed: '20s',
    opacity: 0.65,
    items: ['Safari', 'Mara', 'Wildlife', 'Kenya', 'Serengeti', 'Migration', 'Tented Camp', 'Bush', 'Safari', 'Mara', 'Wildlife', 'Kenya', 'Serengeti', 'Migration', 'Tented Camp', 'Bush'],
    accentColor: 'var(--hm-sage)',
    accentOpacity: 0.6,
    hasAccent: true,
  },
  {
    id: 3,
    speed: '36s',
    opacity: 0.35,
    items: ['Wellness', 'Bali', 'Retreat', 'Ubud', 'Yoga', 'Immersive', 'Spa', 'Island', 'Wellness', 'Bali', 'Retreat', 'Ubud', 'Yoga', 'Immersive', 'Spa', 'Island'],
    accentColor: 'var(--hm-teal)',
    accentOpacity: 0.4,
  },
  {
    id: 4,
    speed: '24s',
    opacity: 0.75,
    items: ['New York', 'City Guide', 'Urban', 'Culture', 'Brooklyn', 'Manhattan', 'Food', 'Art', 'New York', 'City Guide', 'Urban', 'Culture', 'Brooklyn', 'Manhattan', 'Food', 'Art'],
    accentColor: 'var(--hm-blue)',
    accentOpacity: 0.55,
    hasAccent: true,
  },
  {
    id: 5,
    speed: '32s',
    opacity: 0.30,
    items: ['Marrakech', 'Morocco', 'Medina', 'Desert', 'Souk', 'Atlas', 'Riad', 'Artisan', 'Marrakech', 'Morocco', 'Medina', 'Desert', 'Souk', 'Atlas', 'Riad', 'Artisan'],
    accentColor: 'var(--hm-amber)',
    accentOpacity: 0.35,
  },
  {
    id: 6,
    speed: '18s',
    opacity: 0.55,
    items: ['Paris', 'Europe', 'Gastronomy', 'Fashion', 'Seine', 'Art District', 'Hotel', 'Arrondissement', 'Paris', 'Europe', 'Gastronomy', 'Fashion', 'Seine', 'Art District', 'Hotel', 'Arrondissement'],
    accentColor: 'var(--hm-sage)',
    accentOpacity: 0.45,
  },
];

function Chip({ label, isAccent, accentColor, accentOpacity }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 26,
      padding: '0 10px',
      border: `1px solid ${isAccent ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 4,
      flexShrink: 0,
      gap: 6,
    }}>
      {isAccent && (
        <div style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: accentColor,
          opacity: accentOpacity,
          flexShrink: 0,
        }} />
      )}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

export default function CMSChannelRails({ animated = true }) {
  const railGap = 780 / (rails.length + 1);

  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-gradient-blue)' }}
    >
      {/* Blue glow + warm accent wash */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          var(--hm-blue-glow),
          radial-gradient(ellipse 60% 40% at 50% 80%, rgba(200,169,110,0.05) 0%, transparent 60%)
        `,
      }} />

      {/* Top label */}
      <div style={{
        position: 'absolute',
        top: 28,
        left: 28,
        zIndex: 15,
      }}>
        <div className="hm-label" style={{ marginBottom: 4 }}>Content Channels</div>
        <div style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 10,
          color: 'var(--hm-text-subtle)',
        }}>
          {rails.length} active rails · 340+ destinations
        </div>
      </div>

      {/* Horizontal rails */}
      {rails.map((rail, idx) => {
        const topPct = 12 + (idx / (rails.length - 1)) * 76;
        return (
          <div
            key={rail.id}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${topPct}%`,
              height: 30,
              overflow: 'hidden',
              opacity: rail.opacity,
            }}
          >
            {/* The scrolling strip — doubled for seamless loop */}
            <div style={{
              display: 'flex',
              gap: 6,
              width: 'max-content',
              animation: animated
                ? `hm-scroll-left ${rail.speed} linear infinite`
                : 'none',
            }}>
              {/* Render items twice for seamless loop */}
              {[...rail.items, ...rail.items].map((label, i) => (
                <Chip
                  key={i}
                  label={label}
                  isAccent={rail.hasAccent && i % 4 === 0}
                  accentColor={rail.accentColor}
                  accentOpacity={rail.accentOpacity}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Left + right edge masks */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0,
        width: 80,
        background: 'linear-gradient(to right, var(--hm-bg-blue), transparent)',
        zIndex: 8,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, right: 0,
        width: 80,
        background: 'linear-gradient(to left, var(--hm-bg-blue), transparent)',
        zIndex: 8,
        pointerEvents: 'none',
      }} />

      {/* Active rail indicator — center rail gets a brighter left edge marker */}
      <div style={{
        position: 'absolute',
        left: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        opacity: 0.5,
      }}>
        {rails.map((r) => (
          <div
            key={r.id}
            style={{
              width: 16,
              height: 1,
              background: r.hasAccent ? r.accentColor : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
