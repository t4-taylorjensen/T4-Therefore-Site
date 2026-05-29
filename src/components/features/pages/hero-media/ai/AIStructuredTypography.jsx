import '../hero-media.css';

/* Pure typographic composition — schema definitions, field hierarchies,
   and semantic labels layered at multiple depths.
   Communicates: structured intelligence, machine-readable content, AI-ready data. */

export default function AIStructuredTypography({ animated = true }) {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg)' }}
    >
      {/* Atmospheric tint */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,191,176,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 30% 40% at 80% 20%, rgba(66,151,255,0.03) 0%, transparent 50%)
        `,
      }} />

      {/* Layer 1 — Deep background: massive faint type */}
      <div style={{
        position: 'absolute',
        top: '-4%',
        left: '-8%',
        right: '-8%',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 16vw, 160px)',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.024)',
        lineHeight: 0.88,
        letterSpacing: '-0.02em',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        Structured<br />Content<br />Schema
      </div>

      {/* Layer 2 — Mid: schema definition block */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '8%',
        right: '8%',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'rgba(255,255,255,0.18)',
        lineHeight: 1.9,
        letterSpacing: '0.04em',
      }}>
        <div style={{ color: 'rgba(59,191,176,0.35)', marginBottom: 6 }}>// TravelPlace.schema</div>
        <div><span style={{ color: 'rgba(66,151,255,0.35)' }}>type</span> TravelPlace <span style={{ color: 'rgba(255,255,255,0.12)' }}>{'{'}</span></div>
        <div style={{ paddingLeft: 20 }}>
          <div>id:          <span style={{ color: 'rgba(200,169,110,0.45)' }}>ID!</span></div>
          <div>title:       <span style={{ color: 'rgba(200,169,110,0.45)' }}>String!</span></div>
          <div>description: <span style={{ color: 'rgba(200,169,110,0.45)' }}>RichText</span></div>
          <div>geo:         <span style={{ color: 'rgba(200,169,110,0.45)' }}>GeoCoordinate</span></div>
          <div>region:      <span style={{ color: 'rgba(200,169,110,0.45)' }}>Region!</span></div>
          <div>category:    <span style={{ color: 'rgba(200,169,110,0.45)' }}>[PlaceCategory]</span></div>
          <div>images:      <span style={{ color: 'rgba(200,169,110,0.45)' }}>[Asset]</span></div>
          <div>climate:     <span style={{ color: 'rgba(200,169,110,0.45)' }}>ClimateZone</span></div>
          <div>tags:        <span style={{ color: 'rgba(200,169,110,0.45)' }}>[String]</span></div>
          <div>_score:      <span style={{ color: 'rgba(59,191,176,0.45)' }}>Float</span>   <span style={{ color: 'rgba(255,255,255,0.12)' }}># AI relevance</span></div>
          <div>_embedding:  <span style={{ color: 'rgba(59,191,176,0.45)' }}>Vector</span>  <span style={{ color: 'rgba(255,255,255,0.12)' }}># 1536-dim</span></div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.12)' }}>{'}'}</div>
      </div>

      {/* Layer 3 — Foreground: semantic label annotations */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: '8%',
        right: '8%',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {/* Horizontal rule */}
        <div style={{
          height: '1px',
          background: 'var(--hm-border)',
          marginBottom: 4,
        }} />

        {/* Semantic relationship labels */}
        {[
          { rel: 'hasPart',        a: 'Itinerary',    b: 'TravelPlace',   score: '0.94', active: true },
          { rel: 'isLocatedIn',    a: 'TravelPlace',  b: 'Region',        score: '1.00', active: false },
          { rel: 'offers',         a: 'Provider',     b: 'Experience',    score: '0.87', active: false },
          { rel: 'hasAvailability',a: 'Booking',      b: 'Availability',  score: '0.91', active: true },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              opacity: item.active ? 0.9 : 0.4,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'rgba(66,151,255,0.70)',
              letterSpacing: '0.08em',
              minWidth: 100,
            }}>
              {item.a}
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flex: 1,
            }}>
              <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.10)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 8,
                color: item.active ? 'rgba(59,191,176,0.70)' : 'rgba(255,255,255,0.22)',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                padding: '2px 6px',
                border: `1px solid ${item.active ? 'rgba(59,191,176,0.20)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 3,
              }}>
                {item.rel}
              </span>
              <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.10)' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              color: 'rgba(200,169,110,0.65)',
              letterSpacing: '0.08em',
              minWidth: 100,
              textAlign: 'right',
            }}>
              {item.b}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 8,
              color: 'rgba(255,255,255,0.20)',
              letterSpacing: '0.06em',
              minWidth: 32,
              textAlign: 'right',
            }}>
              {item.score}
            </span>
          </div>
        ))}

        <div style={{ height: '1px', background: 'var(--hm-border)' }} />

        {/* Bottom label */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="hm-label">Ontology v2.4.1</div>
          <div className="hm-label">4 relationships · 11 entity types</div>
        </div>
      </div>

      <div className="hm-vignette" />
      <div className="hm-fade-bottom" />
      <div className="hm-grain" />
    </div>
  );
}
