import '../../styles/global.css';

export default {
  title: 'Layout/Container',
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

function ContainerViz({ label, token, maxW, padding, note }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {/* Full viewport rail */}
      <div style={{ background: '#f0f0ef', borderRadius: 8, padding: 8, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, position: 'relative', height: 72 }}>
          {/* Left padding zone */}
          <div style={{ flex: '0 0 48px', height: '100%', background: 'rgba(66,151,255,0.15)', borderRadius: '4px 0 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 8, color: '#4297FF', writingMode: 'vertical-rl' }}>PAD</span>
          </div>
          {/* Content zone */}
          <div style={{ flex: 1, height: '100%', background: '#4297FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#fff', letterSpacing: '0.5px' }}>CONTENT — {maxW}</span>
          </div>
          {/* Right padding zone */}
          <div style={{ flex: '0 0 48px', height: '100%', background: 'rgba(66,151,255,0.15)', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 8, color: '#4297FF', writingMode: 'vertical-rl' }}>PAD</span>
          </div>
        </div>
      </div>
      <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>{label}</p>
      <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF', margin: '0 0 4px' }}>max-width: {maxW} · padding: {padding}</p>
      <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{note}</p>
    </div>
  );
}

export const Default = {
  name: 'Container',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 820 }}>

      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        Containers constrain content width and provide consistent horizontal padding.
        Two global container classes are defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>global.css</code>.
        Most pattern sections apply their own padding directly rather than wrapping in a container class — these classes are available for custom layout needs.
      </p>

      <span style={sectionLabel}>Container Types</span>
      <hr style={divider} />
      <ContainerViz
        label=".container"
        maxW="1440px"
        padding="var(--padding-x) = clamp(24px, 6.25vw, 90px)"
        note="Primary container — used for full-width sections. Padding is responsive and scales with viewport."
      />
      <ContainerViz
        label=".container-md"
        maxW="1280px"
        padding="var(--space-6) = 30px (fixed)"
        note="Tighter content container — suitable for text-heavy or article-style areas."
      />

      <span style={sectionLabel}>Usage in Components</span>
      <hr style={divider} />
      <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, marginBottom: 32, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2.2, color: '#121212' }}>
        <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* Most pattern sections use direct padding: */</span><br />
        .s2-cards-section {'{'}<br />
        &nbsp;&nbsp;padding: 30px 90px 120px;<br />
        {'}'}<br /><br />
        <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* For custom layouts, use global classes: */</span><br />
        {'<div className="container">'}...{'</div>'}<br />
        {'<div className="container-md">'}...{'</div>'}
      </div>

      <span style={sectionLabel}>Responsive Padding Behavior</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 600 }}>
        {[
          { viewport: '≤ 480px',  padding: '20px',  note: 'var(--padding-x-sm) — components override to 20px' },
          { viewport: '≤ 768px',  padding: '20px',  note: 'Component @media rule overrides to var(--padding-x-sm)' },
          { viewport: '769–1440px', padding: 'clamp(24px → 90px)', note: 'var(--padding-x) scales linearly with viewport' },
          { viewport: '≥ 1440px', padding: '90px',  note: 'Clamp maximum — padding stops growing' },
        ].map(({ viewport, padding, note }) => (
          <div key={viewport} style={{ display: 'grid', gridTemplateColumns: '140px 180px 1fr', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>{viewport}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF' }}>{padding}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{note}</span>
          </div>
        ))}
      </div>

    </div>
  ),
};
