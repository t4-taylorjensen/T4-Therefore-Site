import '../styles/global.css';

export default {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
};

const groups = [
  {
    label: 'Brand',
    swatches: [
      { name: 'Ink',          var: '--color-ink',          hex: '#121212' },
      { name: 'Accent',       var: '--color-accent',        hex: '#4297FF' },
      { name: 'White',        var: '--color-white',         hex: '#ffffff', outlined: true },
    ],
  },
  {
    label: 'Surfaces',
    swatches: [
      { name: 'Surface 1',    var: '--color-surface-1',     hex: '#f2f2f2' },
      { name: 'Surface 2',    var: '--color-surface-2',     hex: '#f0f0ef' },
      { name: 'Surface Dark', var: '--color-surface-dark',  hex: '#121212' },
    ],
  },
  {
    label: 'Text',
    swatches: [
      { name: 'Ink',          var: '--color-ink',           hex: '#121212' },
      { name: 'Ink Faint',    var: '--color-ink-faint',     hex: 'rgba(18,18,18,0.7)' },
      { name: 'Ink Muted',    var: '--color-ink-muted',     hex: 'rgba(18,18,18,0.55)' },
      { name: 'Ink Subtle',   var: '--color-ink-subtle',    hex: 'rgba(18,18,18,0.5)' },
    ],
  },
  {
    label: 'Text on Dark',
    dark: true,
    swatches: [
      { name: 'On Dark',        var: '--color-text-on-dark',        hex: '#ffffff' },
      { name: 'On Dark Muted',  var: '--color-text-on-dark-muted',  hex: 'rgba(255,255,255,0.8)' },
      { name: 'On Dark Subtle', var: '--color-text-on-dark-subtle', hex: 'rgba(255,255,255,0.6)' },
      { name: 'On Dark Faint',  var: '--color-text-on-dark-faint',  hex: 'rgba(242,242,242,0.4)' },
    ],
  },
  {
    label: 'Borders',
    swatches: [
      { name: 'Border', var: '--color-border', hex: 'rgba(0,0,0,0.1)' },
    ],
  },
];

const s = {
  page: {
    fontFamily: 'Roobert, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 48,
  },
  groupLabel: {
    fontFamily: 'Roobert Mono, monospace',
    fontSize: 10,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'rgba(18,18,18,0.4)',
    marginBottom: 16,
    display: 'block',
  },
  divider: {
    borderTop: '1px solid rgba(0,0,0,0.08)',
    margin: '8px 0 24px',
  },
  row: { display: 'flex', flexWrap: 'wrap', gap: 12 },
  swatch: (hex, outlined, dark) => ({
    width: 160,
    borderRadius: 8,
    overflow: 'hidden',
    border: outlined ? '1px solid #e8e8e8' : 'none',
    background: dark ? '#121212' : '#f9f9f9',
  }),
  chip: (hex) => ({ width: '100%', height: 80, background: hex }),
  swatchBody: { padding: '10px 12px 12px' },
  swatchName: { fontSize: 13, fontWeight: 400, color: '#121212', marginBottom: 2 },
  swatchMeta: {
    fontFamily: 'Roobert Mono, monospace',
    fontSize: 10,
    color: 'rgba(18,18,18,0.45)',
    lineHeight: 1.6,
  },
};

const dosDonts = [
  {
    do:   { label: 'color: var(--color-ink)',       note: 'Always reference tokens with var()' },
    dont: { label: 'color: #121212',                note: 'Never hardcode hex values in components' },
  },
  {
    do:   { label: '--color-accent on hover states', note: 'Accent blue is for interactive feedback only' },
    dont: { label: '--color-accent as a large fill',  note: 'Accent should accent — not fill large surfaces' },
  },
  {
    do:   { label: '--color-ink-faint for secondary text',  note: 'Use the ink opacity scale for text hierarchy' },
    dont: { label: '--color-text-on-dark on light bg',      note: 'On-dark tokens are exclusively for dark sections' },
  },
];

function DoDont({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ borderLeft: '2px solid #4297FF', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 4px' }}>
              ✓ DO
            </p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF', margin: '0 0 6px' }}>
              {item.do.label}
            </p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>
              {item.do.note}
            </p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(180,40,40,0.5)', paddingLeft: 14 }}>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 4px' }}>
              ✗ DON'T
            </p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: 'rgba(180,40,40,0.8)', margin: '0 0 6px' }}>
              {item.dont.label}
            </p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>
              {item.dont.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Default = {
  name: 'Color Tokens',
  render: () => (
    <div style={s.page}>

      {/* Overview */}
      <div>
        <span style={s.groupLabel}>Overview</span>
        <hr style={s.divider} />
        <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
          All colors are defined as CSS custom properties on <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>:root</code> in{' '}
          <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
          Reference them exclusively by token name — never use hardcoded hex values in components or patterns.
        </p>
      </div>

      {/* Swatches */}
      {groups.map(group => (
        <div key={group.label}>
          <span style={s.groupLabel}>{group.label}</span>
          <div style={s.row}>
            {group.swatches.map(sw => (
              <div key={sw.name} style={s.swatch(sw.hex, sw.outlined, group.dark)}>
                <div style={s.chip(sw.hex)} />
                <div style={s.swatchBody}>
                  <p style={{ ...s.swatchName, color: group.dark ? '#fff' : '#121212' }}>{sw.name}</p>
                  <p style={{ ...s.swatchMeta, color: group.dark ? 'rgba(255,255,255,0.45)' : 'rgba(18,18,18,0.45)' }}>
                    {sw.var}<br />{sw.hex}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Usage */}
      <div>
        <span style={s.groupLabel}>Usage Examples</span>
        <hr style={s.divider} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}>
          {[
            { token: '--color-ink',        use: 'Primary headings, body text, icon strokes' },
            { token: '--color-ink-faint',  use: 'Card descriptions, secondary body text' },
            { token: '--color-ink-subtle', use: 'Eyebrow labels, captions, metadata' },
            { token: '--color-accent',     use: 'Button hover bg, interactive highlights, beam animations' },
            { token: '--color-surface-1',  use: 'Card backgrounds, tags, pill buttons' },
            { token: '--color-surface-2',  use: 'Testimonials section background' },
            { token: '--color-bg-dark',    use: 'Dark sections: TestimonialsCarousel, CaseStudy' },
          ].map(({ token, use }) => (
            <div key={token} style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({token})</span>
              <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: 'rgba(18,18,18,0.55)' }}>{use}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Do / Don't */}
      <div>
        <span style={s.groupLabel}>Do / Don't</span>
        <hr style={s.divider} />
        <DoDont items={dosDonts} />
      </div>

    </div>
  ),
};
