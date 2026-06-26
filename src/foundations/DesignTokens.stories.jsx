import '../styles/global.css';

export default {
  title: 'Foundations/Design Tokens',
  parameters: { layout: 'padded' },
};

const sectionLabel = {
  fontFamily: 'Roobert Mono, monospace',
  fontSize: 10,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'rgba(18,18,18,0.4)',
  marginBottom: 16,
  display: 'block',
};

const divider = {
  borderTop: '1px solid rgba(0,0,0,0.08)',
  margin: '8px 0 28px',
};

/* Each group maps to a Foundations story + its token prefix in tokens.css */
const groups = [
  { name: 'Colors',          prefix: '--color-*',                        story: 'Foundations/Colors',           note: 'Ink, surface, accent, border colors' },
  { name: 'Typography',      prefix: '--font-*, --fs-*, --lh-*, --ls-*', story: 'Foundations/Typography',       note: 'Families, sizes, line-heights, tracking' },
  { name: 'Font Weights',    prefix: '--fw-*',                           story: 'Foundations/Typography/Font Weights', note: 'light → black weight scale' },
  { name: 'Spacing',         prefix: '--space-*',                        story: 'Foundations/Spacing',          note: '12-step spacing scale (4 → 160px)' },
  { name: 'Layout',          prefix: '--container-*, --padding-x*',      story: 'Foundations/Layout & Grid',    note: 'Container widths, responsive padding' },
  { name: 'Borders & Radius',prefix: '--radius-*, --color-border*',      story: 'Foundations/Borders & Radius', note: 'Corner radii + hairline border colors' },
  { name: 'Elevation',       prefix: '--shadow-*',                       story: 'Foundations/Elevation/Shadows', note: 'Multi-layer card + hover shadows' },
  { name: 'Z-Index',         prefix: '--z-*',                            story: 'Foundations/Elevation/Z-Index', note: '6-step cross-component stacking' },
  { name: 'Motion',          prefix: '--dur-*, --ease-*',                story: 'Foundations/Motion',           note: 'Durations + easing curves' },
];

export const Default = {
  name: 'Design Tokens',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 760 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 24 }}>
        Every visual value in the system comes from a single source of truth:{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>src/styles/tokens.css</code>.
        It is imported globally via <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>global.css</code> and
        loaded into every story. Components reference tokens with <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>var(--token)</code> —
        never raw hex, px, or shadow literals. Each group below has a dedicated Foundations page.
      </p>

      {/* Token map */}
      <span style={sectionLabel}>Token Groups</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 16, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {['Group', 'Token Prefix', 'Covers'].map(h => (
            <span key={h} style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(18,18,18,0.35)' }}>{h}</span>
          ))}
        </div>
        {groups.map(g => (
          <div key={g.name} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: '#121212' }}>{g.name}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF', letterSpacing: '0.3px' }}>{g.prefix}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{g.note}</span>
          </div>
        ))}
      </div>

      {/* Principle */}
      <span style={{ ...sectionLabel, marginTop: 48 }}>Principle</span>
      <hr style={divider} />
      <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2, color: '#121212' }}>
        color: var(--color-accent);        <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* ✓ token */</span><br />
        color: #4297FF;                    <span style={{ color: 'rgba(180,40,40,0.8)' }}>/* ✗ raw value */</span>
      </div>

    </div>
  ),
};
