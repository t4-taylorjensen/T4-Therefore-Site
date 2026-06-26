import '../styles/global.css';

export default {
  title: 'Foundations/Borders & Radius',
  parameters: { layout: 'padded' },
};

const radii = [
  { token: '--radius-sm',   value: '5px',   note: 'Buttons, tags, profile photos' },
  { token: '--radius-md',   value: '16px',  note: 'Case Study section inset, nav dropdown panels' },
  { token: '--radius-full', value: '999px', note: 'Pill shapes — search bars, buttons' },
];

const borders = [
  { token: '--color-border', value: 'rgba(0,0,0,0.1)', note: 'The single hairline — section dividers, accordion rows, input outlines' },
];

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

export const Default = {
  name: 'Borders & Radius',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 720 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
        Corner radius and border tokens defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
        The system favours hairline 1px borders for structure and a small radius set — sharp 5px on controls,
        16/20px on panels, and a full pill for search bars and badges.
      </p>

      {/* Border Radius */}
      <span style={sectionLabel}>Border Radius</span>
      <hr style={divider} />
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 48 }}>
        {radii.map(r => (
          <div key={r.token} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 80, height: 80,
              background: '#f2f2f2',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: r.value,
            }} />
            <div>
              <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: '#121212', margin: 0 }}>{r.value}</p>
              <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)', letterSpacing: '0.5px', margin: '2px 0 0' }}>
                var({r.token})
              </p>
              <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)', margin: '2px 0 0', maxWidth: 150 }}>
                {r.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Border Colors */}
      <span style={sectionLabel}>Border Colors</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
        {borders.map(b => (
          <div key={b.token} style={{ display: 'grid', gridTemplateColumns: '64px 200px 1fr', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ width: 56, height: 40, background: '#fff', border: `1px solid ${b.value}`, borderRadius: 4 }} />
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({b.token})</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{b.note}</span>
          </div>
        ))}
      </div>

      {/* Usage */}
      <span style={sectionLabel}>Usage</span>
      <hr style={divider} />
      <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2, color: '#121212' }}>
        border: 1px solid var(--color-border);<br />
        border-radius: var(--radius-md);
      </div>

    </div>
  ),
};
