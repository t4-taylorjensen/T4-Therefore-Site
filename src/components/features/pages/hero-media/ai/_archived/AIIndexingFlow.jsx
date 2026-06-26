import '../hero-media.css';

/* Structured data indexing visualization — three vertical columns
   of machine-readable metadata flowing upward continuously.
   Communicates: AI-ready infrastructure, semantic indexing, structured content. */

const col1 = [
  'content-type: destination',
  'schema: TravelPlace',
  'lang: en-US',
  'locale: jp',
  'content-type: itinerary',
  'schema: TripPlan',
  'lang: en-US',
  'locale: ke',
  'content-type: guide',
  'schema: HowTo',
  'lang: fr-FR',
  'locale: fr',
  'content-type: review',
  'schema: Review',
  'lang: en-GB',
  'locale: gb',
  'content-type: event',
  'schema: Event',
  'lang: es-ES',
  'locale: mx',
];

const col2 = [
  'title: String',
  'geo: GeoCoord',
  'rating: Float',
  'duration: Integer',
  'images: [Asset]',
  'tags: [String]',
  'price: PriceRange',
  'availability: Date',
  'climate: Enum',
  'category: Enum',
  'region: String',
  'highlights: [String]',
  'provider: Entity',
  'season: [Enum]',
  'accessibility: Bool',
  'groupSize: Range',
  'bookingUrl: URL',
  'lastUpdated: Date',
  'canonical: URL',
  'seoTitle: String',
];

const col3 = [
  'score: 0.94',
  'relevance: high',
  'embedding: vec[1536]',
  'clusters: [3,7,12]',
  'pagerank: 0.78',
  'freshness: 0.91',
  'score: 0.87',
  'relevance: high',
  'embedding: vec[1536]',
  'clusters: [1,4,9]',
  'pagerank: 0.65',
  'freshness: 0.82',
  'score: 0.72',
  'relevance: med',
  'embedding: vec[1536]',
  'clusters: [2,6]',
  'pagerank: 0.59',
  'freshness: 0.96',
  'score: 0.88',
  'relevance: high',
];

function Column({ items, duration, delay, accentEvery, accentColor, label }) {
  const doubled = [...items, ...items];
  return (
    <div style={{
      flex: 1,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Column header */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 5,
        background: 'linear-gradient(to bottom, var(--hm-bg-blue), rgba(7,13,28,0))',
        height: 48,
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 4,
        paddingLeft: 2,
      }}>
        <div className="hm-label">{label}</div>
      </div>

      {/* Flowing content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        animation: `hm-flow-up ${duration} ${delay} linear infinite`,
        paddingTop: 46,
      }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              letterSpacing: '0.06em',
              lineHeight: '2.2',
              color: i % accentEvery === 0 ? accentColor : 'var(--hm-text-subtle)',
              whiteSpace: 'nowrap',
              paddingLeft: 2,
              borderLeft: i % accentEvery === 0
                ? `1px solid ${accentColor.replace('0.70', '0.35')}`
                : '1px solid transparent',
              paddingLeft: 6,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Top fade */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 80,
        background: `linear-gradient(to bottom, var(--hm-bg-blue), transparent)`,
        zIndex: 4,
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 120,
        background: `linear-gradient(to top, var(--hm-bg-blue), transparent)`,
        zIndex: 4,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function AIIndexingFlow({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-gradient-blue)' }}
    >
      {/* Brand blue glow + teal accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          var(--hm-blue-glow),
          radial-gradient(ellipse 50% 45% at 50% 38%, rgba(59,191,176,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* Header bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 48,
        borderBottom: '1px solid var(--hm-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        zIndex: 20,
        background: 'rgba(7,13,28,0.92)',
      }}>
        <div style={{ display: 'flex', gap: 24, flex: 1 }}>
          <div className="hm-label">Indexing Pipeline</div>
          <div className="hm-label" style={{ color: 'rgba(59,191,176,0.55)' }}>LIVE</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { v: '1,247/s', l: 'Throughput' },
            { v: '99.4%', l: 'Structured' },
          ].map((item) => (
            <div key={item.l} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(59,191,176,0.75)', letterSpacing: '0.06em' }}>
                {item.v}
              </div>
              <div className="hm-label">{item.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Three column grid */}
      <div style={{
        position: 'absolute',
        top: 48,
        left: 0, right: 0, bottom: 0,
        display: 'flex',
        gap: 0,
      }}>
        {/* Column dividers */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '33.33%',
          width: '1px',
          background: 'var(--hm-border)',
        }} />
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '66.66%',
          width: '1px',
          background: 'var(--hm-border)',
        }} />

        <div style={{ flex: 1, padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
          <Column
            items={col1}
            duration="30s"
            delay="0s"
            accentEvery={5}
            accentColor="rgba(200,169,110,0.70)"
            label="Schema"
            animated={animated}
          />
        </div>
        <div style={{ flex: 1, padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
          <Column
            items={col2}
            duration="26s"
            delay="-9s"
            accentEvery={4}
            accentColor="rgba(66,151,255,0.70)"
            label="Fields"
            animated={animated}
          />
        </div>
        <div style={{ flex: 1, padding: '0 20px', position: 'relative', overflow: 'hidden' }}>
          <Column
            items={col3}
            duration="22s"
            delay="-14s"
            accentEvery={3}
            accentColor="rgba(59,191,176,0.70)"
            label="AI Score"
            animated={animated}
          />
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-grain" />
    </div>
  );
}
