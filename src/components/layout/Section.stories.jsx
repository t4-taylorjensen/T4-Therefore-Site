import '../../styles/global.css';

export default {
  title: 'Layout/Section',
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

function SectionViz({ label, bg, topPad, bottomPad, hPad, note, dark }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        background: bg,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        border: dark ? 'none' : '1px solid rgba(0,0,0,0.06)',
        marginBottom: 10,
      }}>
        {/* Top padding indicator */}
        <div style={{ height: topPad / 4, background: 'rgba(66,151,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 8, color: '#4297FF' }}>↕ {topPad}px top</span>
        </div>
        {/* Content area */}
        <div style={{ margin: `0 ${hPad / 4}px`, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ height: 6, background: dark ? 'rgba(255,255,255,0.2)' : 'rgba(18,18,18,0.12)', borderRadius: 2, width: '60%' }} />
          <div style={{ height: 4, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(18,18,18,0.07)', borderRadius: 2, width: '80%' }} />
          <div style={{ height: 4, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(18,18,18,0.07)', borderRadius: 2, width: '70%' }} />
        </div>
        {/* Bottom padding indicator */}
        <div style={{ height: bottomPad / 4, background: 'rgba(66,151,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 8, color: '#4297FF' }}>↕ {bottomPad}px bottom</span>
        </div>
        {/* H-pad label */}
        <div style={{ position: 'absolute', top: '50%', left: 4, transform: 'translateY(-50%)' }}>
          <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 7, color: '#4297FF', writingMode: 'vertical-rl' }}>{hPad}px</span>
        </div>
      </div>
      <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>{label}</p>
      <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{note}</p>
    </div>
  );
}

export const Default = {
  name: 'Section',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 820 }}>

      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        Sections are full-width page blocks. Each pattern component is a self-contained section.
        Consistent top/bottom padding creates a breathing rhythm when sections are stacked on a page.
        Most sections share the same base padding — exceptions are noted below.
      </p>

      <span style={sectionLabel}>Standard Section Padding</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 48 }}>
        <SectionViz
          label="Standard — Hero, Stats, HeroStack, FeatureStack, WhyTherefore"
          bg="#f9f9f9"
          topPad={160}
          bottomPad={120}
          hPad={90}
          note="160px top · 120px bottom · 90px horizontal — the default section rhythm"
        />
        <SectionViz
          label="FeatureStack Cards Block (second block within section)"
          bg="#f9f9f9"
          topPad={30}
          bottomPad={120}
          hPad={90}
          note="30px top · 120px bottom — sits immediately below the title block (no gap)"
        />
        <SectionViz
          label="LogoCarousel — no padding"
          bg="#f2f2f2"
          topPad={0}
          bottomPad={0}
          hPad={0}
          note="Full-width, no padding. Acts as a visual divider between major sections."
        />
        <SectionViz
          label="TestimonialsCarousel — dark section"
          bg="#121212"
          topPad={120}
          bottomPad={120}
          hPad={90}
          note="120px top · 120px bottom · 90px horizontal — dark bg creates natural break"
          dark
        />
      </div>

      <span style={sectionLabel}>Mobile Section Padding (≤ 768px)</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48, maxWidth: 620 }}>
        {[
          { section: 'Standard sections',      top: '90px (--space-9)',   bottom: '60px (--space-8)', h: '20px (--padding-x-sm)' },
          { section: 'WhyTherefore',            top: '80px',              bottom: '80px',              h: '20px' },
          { section: 'WhyTherefore (≤ 480px)', top: '60px',              bottom: '60px',              h: '20px' },
        ].map(({ section, top, bottom, h }) => (
          <div key={section} style={{ display: 'grid', gridTemplateColumns: '260px 100px 100px 1fr', gap: 12, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: '#121212' }}>{section}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF' }}>↑ {top}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.5)' }}>↓ {bottom}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.35)' }}>← {h}</span>
          </div>
        ))}
      </div>

      <span style={sectionLabel}>Light vs Dark Sections</span>
      <hr style={divider} />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { label: 'White / Light',  bg: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', token: '--color-bg-page',    patterns: 'Hero, HeroStack, FeatureStack, Stats' },
          { label: 'Off-White',      bg: '#f0f0ef', border: 'none',                        token: '--color-bg-section', patterns: 'TestimonialsCarousel (outer)' },
          { label: 'Dark',           bg: '#121212', border: 'none',                        token: '--color-bg-dark',    patterns: 'TestimonialsCarousel (inner), hover states' },
          { label: 'Blue (hover)',   bg: '#4297FF', border: 'none',                        token: '--color-accent',     patterns: 'WhyTherefore on-hover state' },
        ].map(({ label, bg, border, token, patterns }) => (
          <div key={label} style={{ width: 180 }}>
            <div style={{ height: 48, background: bg, border, borderRadius: 6, marginBottom: 8 }} />
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: '#121212', margin: '0 0 2px' }}>{label}</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#4297FF', margin: '0 0 3px' }}>var({token})</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 11, color: 'rgba(18,18,18,0.45)', margin: 0 }}>{patterns}</p>
          </div>
        ))}
      </div>

    </div>
  ),
};
