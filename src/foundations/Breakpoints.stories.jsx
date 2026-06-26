import '../styles/global.css';

export default {
  title: 'Foundations/Breakpoints',
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

const breakpoints = [
  {
    name: 'Mobile SM',
    width: 480,
    token: 'max-width: 480px',
    color: '#e8f0ff',
    stroke: '#4297FF',
    changes: [
      'Tightest single-column layout',
      'Section vertical padding reduces further',
      'Card hover transforms disabled (translateY: none)',
    ],
  },
  {
    name: 'Mobile',
    width: 768,
    token: 'max-width: 768px',
    color: '#f0f0ef',
    stroke: '#121212',
    changes: [
      'Multi-column patterns stack to 1 column',
      'Horizontal padding reduces to 20px',
      'Section top/bottom padding scales down',
      'Scrollers/grids collapse to single-column or h-scroll',
    ],
  },
  {
    name: 'Tablet',
    width: 1165,
    token: 'max-width: 1165px',
    color: '#f4f6f8',
    stroke: '#121212',
    changes: [
      'Intermediate layout — column padding tightens (e.g. FAQ → 40px)',
      'Two-column sections may reflow before full mobile stacking',
      'Last breakpoint before single-column mobile rules engage',
    ],
  },
  {
    name: 'Desktop',
    width: 1440,
    token: 'min-width: 769px',
    color: '#f9f9f9',
    stroke: '#4297FF',
    changes: [
      'Full multi-column layouts active',
      'Horizontal padding: clamp(24px, 6.25vw, 90px) → resolves to 90px at 1440px',
      'Scroll-reveal headline animation fully active',
      'Card hover transforms enabled',
    ],
  },
  {
    name: 'Desktop LG',
    width: 1920,
    token: 'min-width: 1441px',
    color: '#eef2f6',
    stroke: '#4297FF',
    changes: [
      'Large-display target — content held to max-width containers',
      'Horizontal padding stays clamped at 90px; gutters widen',
      'No new column counts — layouts match Desktop, more breathing room',
    ],
  },
];

/* Visual device frame */
function DeviceFrame({ bp }) {
  const scale = Math.max(0.18, Math.min(0.28, bp.width / 1440 * 0.28 + 0.08));
  const displayW = Math.max(60, Math.min(160, bp.width * 0.11));
  const displayH = bp.width <= 480 ? displayW * 1.8 : bp.width <= 768 ? displayW * 1.4 : displayW * 0.65;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    }}>
      {/* Frame */}
      <div style={{
        width: displayW,
        height: displayH,
        border: `2px solid ${bp.stroke}`,
        borderRadius: 0,
        background: bp.color,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Simulated content lines */}
        <div style={{ padding: bp.width <= 480 ? '6px 4px' : '8px 6px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ height: 4, background: bp.stroke, borderRadius: 0, opacity: 0.6, width: '70%' }} />
          <div style={{ height: 3, background: bp.stroke, borderRadius: 0, opacity: 0.3, width: '90%' }} />
          <div style={{ height: 3, background: bp.stroke, borderRadius: 0, opacity: 0.3, width: '80%' }} />
          {bp.width > 480 && (
            <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              <div style={{ flex: 1, height: 20, background: bp.stroke, opacity: 0.15, borderRadius: 0 }} />
              {bp.width > 768 && <div style={{ flex: 1, height: 20, background: bp.stroke, opacity: 0.15, borderRadius: 0 }} />}
              {bp.width > 768 && <div style={{ flex: 1, height: 20, background: bp.stroke, opacity: 0.15, borderRadius: 0 }} />}
            </div>
          )}
        </div>
        {/* Width label */}
        <div style={{
          position: 'absolute',
          bottom: 4,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Roobert Mono, monospace',
          fontSize: 8,
          color: bp.stroke,
          opacity: 0.7,
        }}>
          {bp.width}px
        </div>
      </div>

      {/* Labels */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: '#121212', margin: '0 0 2px', fontWeight: 500 }}>
          {bp.name}
        </p>
        <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF', margin: 0 }}>
          {bp.token}
        </p>
      </div>
    </div>
  );
}

export const Default = {
  name: 'Breakpoints',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 860 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        The design system defines five breakpoints applied consistently across all pattern components.
        Breakpoints are written as <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>@media (max-width: …)</code> rules
        inside each component's CSS file. There are no shared breakpoint tokens — viewport queries live in the component.
        Each pattern story exposes these same five sizes (Mobile SM, Mobile, Tablet, Desktop, Desktop LG) both as sidebar entries and in the viewport toolbar.
      </p>

      {/* Visual frames */}
      <span style={sectionLabel}>Viewport Overview</span>
      <hr style={divider} />
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap' }}>
        {breakpoints.map(bp => <DeviceFrame key={bp.name} bp={bp} />)}
      </div>

      {/* Breakpoint detail table */}
      <span style={sectionLabel}>Breakpoint Reference</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 200px 1fr', gap: 16, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {['Name', 'Query', 'What Changes'].map(h => (
            <span key={h} style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(18,18,18,0.35)' }}>{h}</span>
          ))}
        </div>
        {breakpoints.map(bp => (
          <div key={bp.name} style={{ display: 'grid', gridTemplateColumns: '120px 200px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'start' }}>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: '#121212' }}>{bp.name}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF', letterSpacing: '0.3px', paddingTop: 1 }}>{bp.token}</span>
            <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {bp.changes.map((c, i) => (
                <li key={i} style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.55)', lineHeight: 1.5 }}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pattern coverage */}
      <span style={sectionLabel}>Responsive Coverage by Pattern</span>
      <hr style={divider} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 680 }}>
        {[
          { pattern: 'PillarHero',         mobile: '1-col, media below headline',  desktop: '2-col, content + media' },
          { pattern: 'Opportunity',        mobile: '1-col stacked rows',            desktop: '2-col with sticky header' },
          { pattern: 'WhatWeDo',           mobile: '1-col capability list',         desktop: 'multi-col capability grid' },
          { pattern: 'CaseStudiesGrid',    mobile: '1-col tiles',                   desktop: 'multi-col editorial grid' },
          { pattern: 'PlatformTabs',  mobile: 'h-scroll, narrower cards',      desktop: 'full-width horizontal scroller' },
          { pattern: 'LogoWall',           mobile: 'fewer columns, tighter gaps',   desktop: 'full logo grid' },
          { pattern: 'FAQ (inline)',       mobile: '1-col, eyebrow inline',         desktop: '2-col, eyebrow column + accordion' },
          { pattern: 'TestimonialHero',    mobile: 'image stacks above copy',       desktop: 'sticky image + scrolling copy' },
        ].map(({ pattern, mobile, desktop }) => (
          <div key={pattern} style={{ padding: '12px 16px', background: '#f9f9f9', borderRadius: 0 }}>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, fontWeight: 500, color: '#121212', margin: '0 0 6px' }}>{pattern}</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF', margin: '0 0 2px' }}>≤768px: {mobile}</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)', margin: 0 }}>&gt;768px: {desktop}</p>
          </div>
        ))}
      </div>

    </div>
  ),
};
