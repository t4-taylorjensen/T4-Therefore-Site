import '../styles/global.css';

export default {
  title: 'Foundations/Elevation/Z-Index',
  parameters: { layout: 'padded' },
};

const scale = [
  { token: '--z-base',     value: '0',    note: 'Default stacking — most page content' },
  { token: '--z-dropdown', value: '100',  note: 'Nav dropdown menus, field panels' },
  { token: '--z-sticky',   value: '200',  note: 'Sticky nav bar, sticky media columns' },
  { token: '--z-overlay',  value: '500',  note: 'Full-screen overlays (Nav overlay menu)' },
  { token: '--z-modal',    value: '1000', note: 'Modals, contact dialogs, fixed video widget' },
  { token: '--z-toast',    value: '1100', note: 'Toasts and notifications — always above modals' },
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
    do:   { label: 'z-index: var(--z-modal)', note: 'Use the scale for any cross-component stacking decision' },
    dont: { label: 'z-index: 9999',           note: 'Arbitrary high values make future layering unpredictable' },
  },
  {
    do:   { label: 'z-index: 18 (component-local effect)', note: "Layers inside one component's own stacking context (e.g. grain/vignette overlays) can stay unscaled" },
    dont: { label: 'Reusing the same raw number across unrelated components', note: 'Coincidental matches between components are not a stacking guarantee' },
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
  name: 'Z-Index Scale',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 720 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
        A 6-step stacking scale defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
        It governs stacking <em>between</em> components — nav, modals, overlays, toasts.
        Effects layered entirely within a single component's own stacking context (grain, vignette, fade masks) don't need to participate in this scale.
      </p>

      {/* Scale */}
      <span style={sectionLabel}>Stacking Scale</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
        {scale.map((z, i) => (
          <div key={z.token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              height: 32,
              width: 32 + i * 14,
              background: '#4297FF',
              opacity: 0.35 + i * 0.13,
              borderRadius: 3,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: '#121212', minWidth: 40 }}>
                {z.value}
              </span>
              <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)', letterSpacing: '0.5px' }}>
                var({z.token})
              </span>
              <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)' }}>
                — {z.note}
              </span>
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
