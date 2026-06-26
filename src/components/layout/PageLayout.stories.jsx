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
  { label: 'PillarHero',            bg: '#f9f9f9', dark: false, note: 'First section — above the fold' },
  { label: 'PillarIntro',           bg: '#ffffff', dark: false, note: 'Sticky statement + scroll-tracked problem list' },
  { label: 'WhatWeDo',              bg: '#f9f9f9', dark: false, note: 'Capability grid' },
  { label: 'AICallout',             bg: '#ffffff', dark: false, note: 'Media + copy callout' },
  { label: 'CaseStudiesGrid',       bg: '#f9f9f9', dark: false, note: 'Flush tile grid, cursor-tracking info' },
  { label: 'PlatformTabs',     bg: '#ffffff', dark: false, note: 'Sticky media + scroll-driven write-ups' },
  { label: 'LogoWall',              bg: '#f9f9f9', dark: false, note: 'Static partner/vendor grid' },
  { label: 'TrustedByStickyImage',  bg: '#ffffff', dark: false, note: 'Parallax sticky image band' },
  { label: 'ContactCTA',           bg: '#121212', dark: true,  note: 'Full-bleed contact CTA — dark anchor' },
  { label: 'FAQ (variant="inline")', bg: '#ffffff', dark: false, note: 'Scroll-reveal accordion' },
  { label: 'RelatedContent',        bg: '#f9f9f9', dark: false, note: 'Closing image-card grid' },
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
            borderRadius: 0,
            padding: '14px 20px',
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
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 24 }}>
        Pages are composed by stacking pattern sections inside{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>{'<PageLayout>'}</code>,
        which wraps every page in <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>Nav</code> + <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>Footer</code>.
        Each pattern is self-contained — it manages its own background, padding, and typography. No extra wrapper or container class is needed.
      </p>
      <p style={{ fontSize: 13, color: 'rgba(18,18,18,0.5)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40, fontStyle: 'italic' }}>
        This diagram documents <strong>CMS Page V2's actual composition</strong> — the only page fully built from the Pattern library and the design system's source of truth. There's no separate "Content Page" or "Landing Page" layout to document yet — Digital Products and AI Capabilities are still on the pre-V2 template (Archived/Pages/Pillar Pages (v1)) until they're rebuilt the same way.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48, alignItems: 'start' }}>
        {/* Diagram */}
        <div>
          <span style={sectionLabel}>CMS Pillar Page (V2)</span>
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
                rule: 'PillarHero is always first',
                detail: 'Sets the h1 and overall narrative context for the page.',
              },
              {
                rule: 'ContactCTA as the dark anchor',
                detail: 'The one full-bleed dark section, placed after the proof/platform content and before the closing FAQ + related content.',
              },
              {
                rule: 'FAQ stays near the end',
                detail: 'Use variant="inline" + reveal to match CMS V2 — addresses objections right before the page closes out.',
              },
              {
                rule: 'RelatedContent closes the page',
                detail: 'Hands the visitor off to the next thing to read, after PageLayout\'s Footer.',
              },
              {
                rule: 'Data stays in the page file',
                detail: 'Every pattern here takes its content as props — copy, images, and arrays live in CMSPillarV2.jsx, not inside the components.',
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
      <div style={{ background: '#f2f2f2', borderRadius: 0, padding: 24, fontFamily: 'Roobert Mono, monospace', fontSize: 12, lineHeight: 2, color: '#121212', maxWidth: 620 }}>
        {'<PageLayout activePage="CMS">'}<br />
        &nbsp;&nbsp;<span style={{ color: 'rgba(18,18,18,0.4)' }}>{'{/* PillarHero is always first */}'}</span><br />
        &nbsp;&nbsp;{'<PillarHero ... />'}<br />
        &nbsp;&nbsp;{'<PillarIntro ... />'}<br />
        &nbsp;&nbsp;{'<WhatWeDo ... />'}<br />
        &nbsp;&nbsp;{'<AICallout ... />'}<br />
        &nbsp;&nbsp;{'<CaseStudiesGrid ... />'}<br />
        &nbsp;&nbsp;{'<PlatformTabs ... />'}<br />
        &nbsp;&nbsp;{'<LogoWall ... />'}<br />
        &nbsp;&nbsp;{'<TrustedByStickyImage />'}<br />
        &nbsp;&nbsp;<span style={{ color: 'rgba(18,18,18,0.4)' }}>{'{/* One full-bleed dark section */}'}</span><br />
        &nbsp;&nbsp;{'<ContactCTA ... />'}<br />
        &nbsp;&nbsp;{'<FAQ variant="inline" reveal ... />'}<br />
        &nbsp;&nbsp;{'<RelatedContent ... />'}<br />
        {'</PageLayout>'}
      </div>

    </div>
  ),
};
