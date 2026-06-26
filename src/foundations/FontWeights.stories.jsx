import '../styles/global.css';

export default {
  title: 'Foundations/Typography/Font Weights',
  parameters: { layout: 'padded' },
};

const weights = [
  { token: '--fw-light',    value: '300', note: 'Display headlines (ABC Gravity) — rarely used at body sizes' },
  { token: '--fw-regular',  value: '400', note: 'Body copy, default weight for all running text' },
  { token: '--fw-medium',   value: '500', note: 'Card titles, nav links, emphasized labels' },
  { token: '--fw-semibold', value: '600', note: 'Headings, stat numerals — the heaviest weight in the system (bold maps here)' },
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
    do:   { label: 'font-weight: var(--fw-medium)', note: 'Reference the named scale for any weight decision' },
    dont: { label: 'font-weight: 450',              note: "Weights outside the scale aren't guaranteed to exist in the loaded font files" },
  },
  {
    do:   { label: 'font-weight: var(--fw-semibold)', note: 'Use semibold (600) for emphasis within body-weight text' },
    dont: { label: 'font-weight: bold',                note: '"bold" resolves to 700 inconsistently across browsers — use the explicit token' },
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
  name: 'Font Weight Scale',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 720 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600, marginBottom: 40 }}>
        A 5-step weight scale defined in{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>tokens.css</code>,
        matching the weights actually shipped in the Roobert font files. Reference these instead of raw numeric weights so type never falls back to a synthetic-bold render.
      </p>

      {/* Scale */}
      <span style={sectionLabel}>Weight Scale</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 48 }}>
        {weights.map(w => (
          <div key={w.token} style={{ display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontWeight: Number(w.value), fontSize: 28, color: '#121212', minWidth: 160 }}>
              Aa Roobert
            </span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: '#121212', minWidth: 30 }}>
              {w.value}
            </span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)', letterSpacing: '0.5px', minWidth: 130 }}>
              var({w.token})
            </span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.45)' }}>
              {w.note}
            </span>
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
