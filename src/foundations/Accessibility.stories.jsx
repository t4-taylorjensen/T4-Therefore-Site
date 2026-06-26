import '../styles/global.css';

export default {
  title: 'Foundations/Accessibility',
  parameters: { layout: 'padded' },
};

// Contrast ratios computed against the WCAG 2.1 relative-luminance formula
// for each token pairing as actually defined in tokens.css. AA normal text
// needs 4.5:1, AA large text / UI components need 3:1, AAA normal text needs 7:1.
const lightBgPairs = [
  { token: '--color-ink',         bg: '#ffffff', fg: '#121212',                ratio: 18.7, rating: 'AAA', use: 'Primary body text, headings' },
  { token: '--color-ink-faint',   bg: '#ffffff', fg: 'rgba(18,18,18,0.7)',     ratio: 7.0,  rating: 'AAA*', use: 'Secondary body text — passes AAA right at the edge' },
  { token: '--color-ink-muted',   bg: '#ffffff', fg: 'rgba(18,18,18,0.55)',    ratio: 4.1,  rating: 'FAIL (AA)', use: 'Below 4.5:1 — do not use for normal-size body text' },
  { token: '--color-ink-subtle',  bg: '#ffffff', fg: 'rgba(18,18,18,0.5)',     ratio: 3.5,  rating: 'Large text only', use: 'Eyebrows/captions at ≥19px bold or decorative use only' },
  { token: '--color-accent',      bg: '#ffffff', fg: '#4297FF',                ratio: 3.0,  rating: 'Large text / UI only', use: 'Icons, borders, large CTAs — never small body text' },
];

const darkBgPairs = [
  { token: '--color-text-on-dark',         bg: '#121212', fg: '#ffffff',                  ratio: 18.7, rating: 'AAA', use: 'Primary text on dark sections' },
  { token: '--color-text-on-dark-muted',   bg: '#121212', fg: 'rgba(255,255,255,0.8)',    ratio: 12.2, rating: 'AAA', use: 'Secondary text on dark sections' },
  { token: '--color-text-on-dark-subtle',  bg: '#121212', fg: 'rgba(255,255,255,0.6)',    ratio: 7.2,  rating: 'AAA', use: 'Tertiary text, metadata on dark sections' },
  { token: '--color-text-on-dark-faint',   bg: '#121212', fg: 'rgba(242,242,242,0.4)',    ratio: 3.6,  rating: 'Large text only', use: 'Decorative/ghost text only — fails normal-text AA' },
];

const checklist = [
  'Run the a11y panel (bottom toolbar) on every new story — @storybook/addon-a11y is installed but was previously unused. It surfaces live Axe violations per component.',
  'Never ship --color-ink-muted, --color-ink-subtle, --color-accent, or --color-text-on-dark-faint as a normal-size body text color — they fail WCAG AA below 19px.',
  'Interactive elements (buttons, links, form fields) need a visible focus state — verify with keyboard Tab navigation, not just mouse hover.',
  'Decorative motion (parallax, scramble-text, cursor-tracking reveals) must respect prefers-reduced-motion — confirm before shipping new scroll-driven patterns.',
  'Icon-only buttons (BtnArrow, BtnIconAccent) require an aria-label — verify when adding new icon button instances.',
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

function ratingColor(rating) {
  if (rating.startsWith('FAIL')) return '#b42828';
  if (rating.startsWith('AAA')) return '#1f8a4c';
  return '#b8860b';
}

function ContrastTable({ pairs }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {pairs.map(p => (
        <div key={p.token} style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr 90px 90px 1fr',
          gap: 16,
          alignItems: 'center',
          padding: '10px 12px',
          borderRadius: 6,
          background: p.bg === '#121212' ? '#121212' : '#f9f9f9',
          border: p.bg === '#121212' ? 'none' : '1px solid rgba(0,0,0,0.06)',
        }}>
          <div style={{
            width: 48, height: 32, borderRadius: 4,
            background: p.bg,
            border: p.bg === '#ffffff' ? '1px solid rgba(0,0,0,0.1)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 14, color: p.fg }}>Aa</span>
          </div>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: p.bg === '#121212' ? '#fff' : '#121212' }}>
            var({p.token})
          </span>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, color: p.bg === '#121212' ? '#fff' : '#121212' }}>
            {p.ratio.toFixed(1)}:1
          </span>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, letterSpacing: '0.5px', color: ratingColor(p.rating) }}>
            {p.rating}
          </span>
          <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: p.bg === '#121212' ? 'rgba(255,255,255,0.6)' : 'rgba(18,18,18,0.5)' }}>
            {p.use}
          </span>
        </div>
      ))}
    </div>
  );
}

export const Default = {
  name: 'Color Contrast & A11y Checklist',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 820 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>
        Contrast ratios below are computed from the WCAG 2.1 relative-luminance formula for every text-color token
        paired with the surface it's actually used against. <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>@storybook/addon-a11y</code>{' '}
        is installed in this project and checks live rendered components — use the panel below the canvas on any story to catch issues beyond color contrast (ARIA, focus order, alt text).
      </p>

      {/* Light backgrounds */}
      <span style={sectionLabel}>Text on Light Surfaces</span>
      <hr style={divider} />
      <div style={{ marginBottom: 40 }}>
        <ContrastTable pairs={lightBgPairs} />
      </div>

      {/* Dark backgrounds */}
      <span style={sectionLabel}>Text on Dark Surfaces</span>
      <hr style={divider} />
      <div style={{ marginBottom: 48 }}>
        <ContrastTable pairs={darkBgPairs} />
      </div>

      {/* Checklist */}
      <span style={sectionLabel}>Checklist For New Components</span>
      <hr style={divider} />
      <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {checklist.map((item, i) => (
          <li key={i} style={{ fontSize: 13, color: 'rgba(18,18,18,0.65)', lineHeight: 1.6 }}>{item}</li>
        ))}
      </ul>

    </div>
  ),
};
