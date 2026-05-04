import '../styles/global.css';

export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
};

const divider = {
  borderTop: '1px solid rgba(0,0,0,0.08)',
  margin: '8px 0 32px',
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

const meta = (detail) => (
  <span style={{
    display: 'block',
    fontFamily: 'Roobert Mono, monospace',
    fontSize: 10,
    color: 'rgba(18,18,18,0.35)',
    letterSpacing: '0.5px',
    marginTop: 8,
  }}>
    {detail}
  </span>
);

const dosDonts = [
  {
    do:   { label: 'heading-display for primary hero headlines',    note: 'Use sparingly — one per page maximum' },
    dont: { label: 'heading-display below h1 level',               note: 'This style is reserved exclusively for the hero moment' },
  },
  {
    do:   { label: 'text-eyebrow for section labels and captions',  note: 'Roobert Mono, 11px, 1px tracking, uppercase — the system eyebrow style' },
    dont: { label: 'uppercase tracking on body text',              note: 'Only mono classes carry tracking — body Roobert should never have letter-spacing' },
  },
  {
    do:   { label: 'body-lg (20px) for card descriptions',          note: 'Maintains readability at card scale' },
    dont: { label: 'mixing ABC Gravity and Roobert in one block',   note: 'ABC Gravity is display-only — Roobert handles all body and UI text' },
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
  name: 'Type Scale',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        Three type families: <strong>ABC Gravity X Compressed</strong> for display moments,{' '}
        <strong>Roobert</strong> for all headings and body, and <strong>Roobert Mono</strong> for labels, eyebrows, and UI metadata.
        Classes are defined in <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>typography.css</code>.
      </p>

      {/* Display */}
      <span style={sectionLabel}>Display — ABC Gravity X Compressed</span>
      <hr style={divider} />
      <div style={{ marginBottom: 40, overflow: 'hidden' }}>
        <p className="heading-display" style={{ fontSize: 80 }}>Headless CMS</p>
        {meta('heading-display · ABC Gravity X Compressed · 700 · uppercase · line-height 0.85')}
      </div>

      {/* Headings */}
      <span style={sectionLabel}>Headings — Roobert</span>
      <hr style={divider} />

      <div style={{ marginBottom: 32 }}>
        <p className="heading-xl">Headless is a systems decision.</p>
        {meta('heading-xl · Roobert · 400 · clamp(40px, 5vw, 55px) · tracking −0.02em')}
      </div>

      <div style={{ marginBottom: 32 }}>
        <p className="heading-lg">42+ Implementations</p>
        {meta('heading-lg · Roobert · 400 · 42px · line-height 1.4')}
      </div>

      <div style={{ marginBottom: 40 }}>
        <p className="heading-md">Architecture</p>
        {meta('heading-md · Roobert · 400 · 30px · line-height 1.4')}
      </div>

      {/* Body */}
      <span style={sectionLabel}>Body — Roobert</span>
      <hr style={divider} />

      <div style={{ marginBottom: 24 }}>
        <p className="body-lg">We design and implement AI-first composable content and commerce architectures that unify content, commerce, and experience.</p>
        {meta('body-lg · Roobert · 400 · 20px · line-height 1.6')}
      </div>

      <div style={{ marginBottom: 24 }}>
        <p className="body-md">Decoupled frontends deliver sub-second experiences regardless of backend complexity.</p>
        {meta('body-md · Roobert · 400 · 16px · line-height 1.8')}
      </div>

      <div style={{ marginBottom: 40 }}>
        <p className="body-sm">Trusted by enterprise retailers, manufacturers, and B2B organizations.</p>
        {meta('body-sm · Roobert · 400 · 15px · line-height 1.6 · tracking 0.5px')}
      </div>

      {/* Mono */}
      <span style={sectionLabel}>Mono — Roobert Mono</span>
      <hr style={divider} />

      <div style={{ marginBottom: 24 }}>
        <p className="text-eyebrow">Why Therefore?</p>
        {meta('text-eyebrow · Roobert Mono · 400 · 11px · tracking 1px · uppercase')}
      </div>

      <div style={{ marginBottom: 40 }}>
        <p className="text-mono-md">Start a Project</p>
        {meta('text-mono-md · Roobert Mono · 400 · 14px · tracking 0.5px · uppercase')}
      </div>

      {/* Token Reference */}
      <span style={sectionLabel}>Token Reference</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 40, maxWidth: 640 }}>
        {[
          { token: '--text-display',  value: '112px',             cls: 'heading-display' },
          { token: '--text-xl',       value: 'clamp(40px–55px)',  cls: 'heading-xl' },
          { token: '--text-lg',       value: '42px',              cls: 'heading-lg' },
          { token: '--text-md',       value: '30px',              cls: 'heading-md' },
          { token: '--text-body-lg',  value: '20px',              cls: 'body-lg' },
          { token: '--text-body-md',  value: '16px',              cls: 'body-md' },
          { token: '--text-body-sm',  value: '15px',              cls: 'body-sm' },
          { token: '--text-mono',     value: '11px',              cls: 'text-eyebrow' },
          { token: '--text-mono-md',  value: '14px',              cls: 'text-mono-md' },
        ].map(({ token, value, cls }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 120px 1fr', gap: 16, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({token})</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: 'rgba(18,18,18,0.45)' }}>{value}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.3)', letterSpacing: '0.5px' }}>.{cls}</span>
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
