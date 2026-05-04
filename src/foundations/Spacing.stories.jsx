import '../styles/global.css';

export default {
  title: 'Foundations/Spacing',
  parameters: { layout: 'padded' },
};

const scale = [
  { token: '--space-1',  value: '4px',   label: 'space-1' },
  { token: '--space-2',  value: '8px',   label: 'space-2',  note: 'Arrow gap, icon gap' },
  { token: '--space-3',  value: '12px',  label: 'space-3',  note: 'Button inner padding' },
  { token: '--space-4',  value: '15px',  label: 'space-4',  note: 'Carousel track gap' },
  { token: '--space-5',  value: '20px',  label: 'space-5',  note: 'Base padding, card inner right' },
  { token: '--space-6',  value: '30px',  label: 'space-6',  note: 'Container padding, standard gap' },
  { token: '--space-7',  value: '40px',  label: 'space-7',  note: 'Medium gap' },
  { token: '--space-8',  value: '60px',  label: 'space-8',  note: 'Section inner gaps' },
  { token: '--space-9',  value: '80px',  label: 'space-9',  note: 'Mobile section padding' },
  { token: '--space-10', value: '90px',  label: 'space-10', note: 'Container horizontal padding' },
  { token: '--space-11', value: '120px', label: 'space-11', note: 'Section bottom padding' },
  { token: '--space-12', value: '160px', label: 'space-12', note: 'Section top padding, large gaps' },
];

const radii = [
  { token: '--radius-sm', value: '5px',  note: 'Buttons, tags, profile photos' },
  { token: '--radius-md', value: '16px', note: 'Case Study section inset' },
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
    do:   { label: 'gap: var(--space-6)',        note: 'Use tokens for all spacing — gaps, padding, margins' },
    dont: { label: 'gap: 30px',                 note: 'Never use raw pixel values — tokens ensure global consistency' },
  },
  {
    do:   { label: 'padding: var(--space-12) var(--space-10)', note: '160px top, 90px horizontal — the standard section rhythm' },
    dont: { label: 'padding: 160px 90px',                      note: 'Hardcoded values break when tokens are updated' },
  },
  {
    do:   { label: 'padding-left: var(--padding-x)',  note: 'Use --padding-x for responsive horizontal container padding' },
    dont: { label: 'padding-left: 90px (fixed)',      note: '--padding-x is clamp(24px, 6.25vw, 90px) — it scales with viewport' },
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
  name: 'Spacing Scale',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 720 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
        A 12-step spacing scale defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>.
        All padding, margin, and gap values in components reference these tokens.
        The scale runs from <strong>4px</strong> (micro spacing) to <strong>160px</strong> (section-level breathing room).
      </p>

      {/* Spacing Scale */}
      <span style={sectionLabel}>Spacing Scale</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
        {scale.map(s => (
          <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              height: 20,
              width: parseInt(s.value),
              background: '#4297FF',
              borderRadius: 3,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: '#121212', minWidth: 36 }}>
                {s.value}
              </span>
              <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)', letterSpacing: '0.5px' }}>
                var({s.token})
              </span>
              {s.note && (
                <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)' }}>
                  — {s.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

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
              <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)', margin: '2px 0 0' }}>
                {r.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Layout Tokens */}
      <span style={sectionLabel}>Layout Tokens</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
        {[
          { token: '--container-max', value: '1440px',                   note: 'Max page width — no layout grows beyond this' },
          { token: '--container-md',  value: '1280px',                   note: 'Content container for text-heavy sections' },
          { token: '--padding-x',     value: 'clamp(24px, 6.25vw, 90px)', note: 'Responsive horizontal padding — scales with viewport' },
          { token: '--padding-x-sm',  value: '20px',                     note: 'Mobile horizontal padding override' },
        ].map(l => (
          <div key={l.token} style={{ display: 'grid', gridTemplateColumns: '200px 200px 1fr', gap: 16, alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({l.token})</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: 'rgba(18,18,18,0.45)' }}>{l.value}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)' }}>{l.note}</span>
          </div>
        ))}
      </div>

      {/* Section Rhythm */}
      <span style={sectionLabel}>Section Rhythm</span>
      <hr style={divider} />
      <p style={{ fontSize: 13, color: 'rgba(18,18,18,0.5)', marginBottom: 16 }}>
        Most full-width sections follow this padding convention:
      </p>
      <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, marginBottom: 40, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2, color: '#121212' }}>
        padding-top: var(--space-12);    <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* 160px */</span><br />
        padding-bottom: var(--space-11); <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* 120px */</span><br />
        padding-left: var(--space-10);   <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* 90px — or var(--padding-x) */</span><br />
        padding-right: var(--space-10);  <span style={{ color: 'rgba(18,18,18,0.4)' }}>/* 90px */</span>
      </div>

      {/* Do / Don't */}
      <span style={sectionLabel}>Do / Don't</span>
      <hr style={divider} />
      <DoDont items={dosDonts} />

    </div>
  ),
};
