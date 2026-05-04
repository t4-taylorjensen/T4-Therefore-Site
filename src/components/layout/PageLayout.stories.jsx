import '../../styles/global.css';

export default {
  title: 'Layout/PageLayout',
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

const sectionBlocks = [
  { label: 'Hero',                 bg: '#f9f9f9', dark: false, note: 'First section — above the fold' },
  { label: 'LogoCarousel',         bg: '#f2f2f2', dark: false, note: 'Social proof divider — no padding' },
  { label: 'Stats',                bg: '#ffffff', dark: false, note: 'Impact numbers — credibility anchor' },
  { label: 'HeroStack',            bg: '#f9f9f9', dark: false, note: 'Capability overview + guide card' },
  { label: 'FeatureStack',         bg: '#ffffff', dark: false, note: 'Three-card service breakdown' },
  { label: 'WhyTherefore',         bg: '#f9f9f9', dark: false, note: 'Differentiator carousel — blue hover' },
  { label: 'TestimonialsCarousel', bg: '#121212', dark: true,  note: 'Social proof — dark section' },
];

function PageDiagram({ sections }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
      {sections.map((s, i) => (
        <div
          key={s.label}
          style={{
            background: s.bg,
            border: s.dark ? 'none' : '1px solid rgba(0,0,0,0.06)',
            borderRadius: i === 0 ? '8px 8px 0 0' : i === sections.length - 1 ? '0 0 8px 8px' : 0,
            padding: s.label === 'LogoCarousel' ? '8px 20px' : '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{
            fontFamily: 'Roobert Mono, monospace',
            fontSize: 11,
            color: s.dark ? 'rgba(255,255,255,0.7)' : '#121212',
          }}>
            {s.label}
          </span>
          <span style={{
            fontFamily: 'Roobert, sans-serif',
            fontSize: 11,
            color: s.dark ? 'rgba(255,255,255,0.35)' : 'rgba(18,18,18,0.35)',
          }}>
            {s.note}
          </span>
        </div>
      ))}
    </div>
  );
}

export const Default = {
  name: 'Page Layout',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 860 }}>

      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        Pages are composed by stacking pattern sections in a{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>{'<main>'}</code> element.
        Each pattern is self-contained — it manages its own background, padding, and typography.
        No wrapper or container class is needed unless you are building a custom section outside the pattern library.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48, alignItems: 'start' }}>
        {/* Diagram */}
        <div>
          <span style={sectionLabel}>Marketing Landing Page</span>
          <hr style={divider} />
          <PageDiagram sections={sectionBlocks} />
        </div>

        {/* Composition rules */}
        <div>
          <span style={sectionLabel}>Composition Rules</span>
          <hr style={divider} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                rule: 'Start with Hero',
                detail: 'Hero is always the first section. It sets the h1 and overall narrative context.',
              },
              {
                rule: 'LogoCarousel as a divider',
                detail: 'Use LogoCarousel between high-density sections to give the eye a rest. No padding — it acts as a visual separator.',
              },
              {
                rule: 'Dark sections as anchors',
                detail: 'TestimonialsCarousel (#121212) works best near the bottom to create a visual anchor before a final CTA or footer.',
              },
              {
                rule: 'WhyTherefore before conversion',
                detail: 'Place the differentiator carousel just before the final CTA zone or TestimonialsCarousel.',
              },
              {
                rule: 'One Hero, one WhyTherefore',
                detail: 'These patterns should appear once per page. Repetition dilutes their impact.',
              },
            ].map(({ rule, detail }) => (
              <div key={rule} style={{ paddingLeft: 14, borderLeft: '2px solid #f2f2f2' }}>
                <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: '#121212', margin: '0 0 3px', fontWeight: 500 }}>{rule}</p>
                <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0, lineHeight: 1.6 }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span style={sectionLabel}>JSX Structure</span>
      <hr style={divider} />
      <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2, color: '#121212', maxWidth: 560 }}>
        {'<main>'}<br />
        &nbsp;&nbsp;<span style={{ color: 'rgba(18,18,18,0.4)' }}>{'{/* Hero is always first */}'}</span><br />
        &nbsp;&nbsp;{'<Hero />'}<br />
        &nbsp;&nbsp;{'<LogoCarousel />'}<br />
        &nbsp;&nbsp;{'<Stats />'}<br />
        &nbsp;&nbsp;{'<HeroStack />'}<br />
        &nbsp;&nbsp;{'<FeatureStack />'}<br />
        &nbsp;&nbsp;{'<WhyTherefore />'}<br />
        &nbsp;&nbsp;<span style={{ color: 'rgba(18,18,18,0.4)' }}>{'{/* Dark section near the bottom */}'}</span><br />
        &nbsp;&nbsp;{'<TestimonialsCarousel />'}<br />
        {'</main>'}
      </div>

    </div>
  ),
};
