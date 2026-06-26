import '../styles/global.css';

export default {
  title: 'Foundations/Elevation/Shadows',
  parameters: { layout: 'padded' },
};

const shadows = [
  {
    token: '--shadow-card',
    value: '0px 8px 18px rgba(0,0,0,0.10), 0px 33px 33px rgba(0,0,0,0.09), 0px 74px 45px rgba(0,0,0,0.05), 0px 132px 53px rgba(0,0,0,0.01)',
    note: 'Default resting elevation for cards and surfaces',
  },
  {
    token: '--shadow-hover',
    value: '0 12px 32px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
    note: 'Hover/lift state for interactive cards',
  },
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

const dosDonts = [
  {
    do:   { label: 'box-shadow: var(--shadow-card)',  note: 'Reference the shared token for default card elevation' },
    dont: { label: 'box-shadow: 0 40px 80px rgba(0,0,0,0.07)', note: 'One-off shadow values fragment the elevation system' },
  },
  {
    do:   { label: 'box-shadow: var(--shadow-hover)', note: 'Use the hover token consistently for lift states' },
    dont: { label: 'box-shadow: var(--shadow-card), var(--shadow-hover)', note: "Don't stack shadow tokens — pick the one matching the element's state" },
  },
];

function DoDont({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ borderLeft: '2px solid #4297FF', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 4px' }}>✓ DO</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF', margin: '0 0 6px' }}>{item.do.label}</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{item.do.note}</p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(180,40,40,0.5)', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 4px' }}>✗ DON'T</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: 'rgba(180,40,40,0.8)', margin: '0 0 6px' }}>{item.dont.label}</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{item.dont.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Default = {
  name: 'Shadow Tokens',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 720 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
        Two elevation tokens defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
        Each is a multi-layer shadow tuned for this system's soft, diffuse elevation style — use them instead of one-off <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>box-shadow</code> declarations.
      </p>

      {/* Swatches */}
      <span style={sectionLabel}>Elevation Scale</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginBottom: 48 }}>
        {shadows.map(sh => (
          <div key={sh.token} style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              width: 140,
              height: 90,
              background: '#ffffff',
              borderRadius: 8,
              boxShadow: sh.value,
              flexShrink: 0,
            }} />
            <div style={{ maxWidth: 420 }}>
              <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: '#121212', margin: '0 0 4px' }}>
                var({sh.token})
              </p>
              <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: '0 0 8px' }}>
                {sh.note}
              </p>
              <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)', lineHeight: 1.6, margin: 0, wordBreak: 'break-word' }}>
                {sh.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Do / Don't */}
      <span style={sectionLabel}>Do / Don't</span>
      <hr style={divider} />
      <DoDont items={dosDonts} />

    </div>
  ),
};
