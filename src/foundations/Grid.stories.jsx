import '../styles/global.css';

export default {
  title: 'Foundations/Layout & Grid',
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

/* ── Container diagram ── */
function ContainerDiagram({ maxWidth, paddingNote, label }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {/* Outer: full-width background */}
      <div style={{
        background: '#f0f0ef',
        borderRadius: 0,
        padding: '12px',
        position: 'relative',
        marginBottom: 8,
      }}>
        <div style={{
          fontFamily: 'Roobert Mono, monospace',
          fontSize: 9,
          color: 'rgba(18,18,18,0.4)',
          letterSpacing: '0.5px',
          marginBottom: 6,
        }}>
          VIEWPORT (100vw)
        </div>
        {/* Inner: constrained content */}
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          background: '#4297FF',
          borderRadius: 0,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            width: 24,
            height: '100%',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 7, color: '#fff', writingMode: 'vertical-rl' }}>PAD</span>
          </div>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 9, color: '#fff', letterSpacing: '0.5px' }}>
            CONTENT AREA
          </span>
          <div style={{
            width: 24,
            height: '100%',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 7, color: '#fff', writingMode: 'vertical-rl' }}>PAD</span>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>{label}</p>
        <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{paddingNote}</p>
      </div>
    </div>
  );
}

/* ── Column grid diagram ── */
function ColumnGrid({ cols, gapPx, label, note }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: gapPx, marginBottom: 8 }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 48,
            background: i === 0 ? '#4297FF' : '#f2f2f2',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 9, color: i === 0 ? '#fff' : 'rgba(18,18,18,0.35)' }}>
              {i + 1}/{cols}
            </span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>{label}</p>
      <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{note}</p>
    </div>
  );
}

export const Default = {
  name: 'Grid & Layout',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 820 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        The layout system uses constrained containers with responsive horizontal padding,
        not a traditional N-column grid. Patterns manage their own column structure using flexbox.
        Max-widths and padding tokens are defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
      </p>

      {/* Container widths */}
      <span style={sectionLabel}>Container Widths</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
        <ContainerDiagram
          label="var(--container-max) — 1440px"
          paddingNote="Max page width. No layout grows beyond this. Sections are full-width but content is internally constrained."
        />
        <ContainerDiagram
          label="var(--container-md) — 1280px"
          paddingNote="Tighter content container. Used for text-heavy or article-style content areas."
        />
      </div>

      {/* Horizontal padding */}
      <span style={sectionLabel}>Horizontal Padding</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48, maxWidth: 600 }}>
        {[
          { token: '--padding-x',    value: 'clamp(24px, 6.25vw, 90px)', note: 'Primary — responsive, scales from 24px (mobile) to 90px (desktop)' },
          { token: '--padding-x-sm', value: '20px',                       note: 'Mobile override — applied below 768px in component @media rules' },
          { token: '--space-10',     value: '90px',                        note: 'Fixed desktop padding — used directly in pattern CSS' },
        ].map(({ token, value, note }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 220px 1fr', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({token})</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF' }}>{value}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{note}</span>
          </div>
        ))}
      </div>

      {/* Column patterns */}
      <span style={sectionLabel}>Column Patterns Used in Patterns</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 48 }}>
        <ColumnGrid
          cols={1}
          gapPx={0}
          label="1 Column — full width"
          note="Hero, Stats, LogoCarousel, TestimonialsCarousel, WhyTherefore — full-width sections"
        />
        <ColumnGrid
          cols={2}
          gapPx={16}
          label="2 Columns — flex, equal or split"
          note="HeroStack — headline column (left) + guide card column (right)"
        />
        <ColumnGrid
          cols={3}
          gapPx={12}
          label="3 Columns — flex: 1 0 0, equal width, 30px gap"
          note="FeatureStack cards grid — three capability cards"
        />
        <ColumnGrid
          cols={4}
          gapPx={8}
          label="4 Columns — Stats — flex equal, horizontal scroll on mobile"
          note="Stats section — four stat blocks evenly distributed"
        />
      </div>

      {/* Layout class reference */}
      <span style={sectionLabel}>Global Layout Classes</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 620 }}>
        {[
          { cls: '.container',    note: 'max-width: 1440px, centered, padding: var(--padding-x)' },
          { cls: '.container-md', note: 'max-width: 1280px, centered, padding: var(--space-6) = 30px' },
        ].map(({ cls, note }) => (
          <div key={cls} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>{cls}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{note}</span>
          </div>
        ))}
      </div>

    </div>
  ),
};
