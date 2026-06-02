import '../styles/global.css';

import {
  BtnPrimary, BtnSecondary, BtnOutline, BtnArrow, BtnIconAccent, BtnLink,
  IconCornerDownRight, IconCornerRightArrow,
} from '../components/ui/Button/Button';

import playHoverSrc  from '../components/ui/brand assets/Play Hover.svg';
import pauseHoverSrc from '../components/ui/brand assets/Pause Hover.svg';

export default {
  title: 'UI/Button',
  parameters: { layout: 'padded' },
};

/* ─────────────────────────────────────────
   Icon reference data (for the icon table)
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   STORY LAYOUT HELPERS
───────────────────────────────────────── */
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
  margin: '8px 0 24px',
};

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
};

function Meta({ children }) {
  return (
    <p style={{
      fontFamily: 'Roobert Mono, monospace',
      fontSize: 10,
      color: 'rgba(18,18,18,0.35)',
      letterSpacing: '0.5px',
      marginTop: 4,
      marginBottom: 32,
      lineHeight: 1.8,
    }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   ICON REFERENCE TABLE
───────────────────────────────────────── */
const iconDefs = [
  {
    name:        'corner-down-right',
    file:        'corner-down-right.svg',
    desc:        'L-corner, turns right at bottom',
    usage:       'All CTAs · Nav prev/next',
    component:   <IconCornerDownRight />,
    hasFlip:     false,
  },
  {
    name:        'corner-right-arrow',
    file:        'corner-right-arrow.svg',
    desc:        'L-corner, turns down at right',
    usage:       'Alternate CTA / decorative',
    component:   <IconCornerRightArrow />,
    hasFlip:     false,
  },
];

/* ─────────────────────────────────────────
   MAIN STORY
───────────────────────────────────────── */
export const Default = {
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 860 }}>

      {/* ── CTA Buttons ── */}
      <span style={sectionLabel}>CTA Buttons — Primary</span>
      <hr style={divider} />
      <div style={row}>
        <BtnPrimary icon={IconCornerDownRight} nudge="right">Start a Project</BtnPrimary>
        <BtnPrimary icon={IconCornerDownRight} nudge="right">View Case Study</BtnPrimary>
        <BtnPrimary icon={IconCornerRightArrow} nudge="down">Learn More</BtnPrimary>
        <BtnPrimary>Start a Project</BtnPrimary>
      </div>
      <Meta>bg #121212 → hover #4297FF (black text) · height 34px · icon optional</Meta>

      <span style={sectionLabel}>CTA Buttons — Secondary</span>
      <hr style={divider} />
      <div style={row}>
        <BtnSecondary icon={IconCornerDownRight} nudge="right">Start a Project</BtnSecondary>
        <BtnSecondary icon={IconCornerDownRight} nudge="right">Full Case Study</BtnSecondary>
        <BtnSecondary icon={IconCornerRightArrow} nudge="down">Learn More</BtnSecondary>
        <BtnSecondary>Start a Project</BtnSecondary>
      </div>
      <Meta>bg #f2f2f2 → hover #4297FF (black text) · icon optional · used on dark section backgrounds + nav</Meta>

      <span style={sectionLabel}>CTA Buttons — Outline</span>
      <hr style={divider} />
      <div style={row}>
        <BtnOutline icon={IconCornerDownRight} nudge="right">Start a Project</BtnOutline>
        <BtnOutline icon={IconCornerDownRight} nudge="right">Full Case Study</BtnOutline>
        <BtnOutline icon={IconCornerRightArrow} nudge="down">Learn More</BtnOutline>
        <BtnOutline>Start a Project</BtnOutline>
      </div>
      <Meta>transparent + 1px black border → hover fills #121212 (white text) · icon optional</Meta>

      {/* ── Compound CTA ── */}
      <span style={sectionLabel}>Compound CTA — Text + Icon</span>
      <hr style={divider} />
      <div style={row}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <BtnPrimary nudge="right">Free Download</BtnPrimary>
          <BtnIconAccent icon={IconCornerRightArrow} label="Download" nudge="down" />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <BtnPrimary nudge="right">Start a Project</BtnPrimary>
          <BtnIconAccent icon={IconCornerDownRight} label="Go" nudge="right" />
        </div>
      </div>
      <Meta>Text btn (black) + icon btn (blue #4297FF, black icon) · used in Stack guide card · icon nudges on hover</Meta>

      {/* ── Arrow / Nav buttons ── */}
      <span style={sectionLabel}>Arrow Buttons — Navigation</span>
      <hr style={divider} />
      <div style={row}>
        <BtnArrow icon={IconCornerDownRight}  label="Previous"          nudge="left" />
        <BtnArrow icon={IconCornerDownRight} label="Next"              nudge="right" />
        <span style={{ width: 1, height: 32, background: 'rgba(0,0,0,0.1)', margin: '0 4px' }} />
        <BtnArrow icon={IconCornerDownRight}  label="Previous (disabled)" nudge="left"  disabled />
        <BtnArrow icon={IconCornerDownRight} label="Next (disabled)"     nudge="right" disabled />
      </div>
      <Meta>44×44px · bg #ffffff → hover #4297FF (icon stays black) · nudge-left/right · disabled: opacity 0.3</Meta>

      {/* ── Link Text Button ── */}
      <span style={sectionLabel}>Link Text Button — Dark</span>
      <hr style={divider} />
      <div style={{ ...row, background: '#121212', padding: 24, borderRadius: 8, marginBottom: 8 }}>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right">All Case Studies</BtnLink>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right">View Case Study</BtnLink>
        <BtnLink href="#" icon={IconCornerRightArrow} nudge="down">Learn More</BtnLink>
      </div>
      <Meta>No bg · no border · mono 11px uppercase · muted white → bright white on hover · used on dark backgrounds</Meta>

      <span style={sectionLabel}>Link Text Button — Light</span>
      <hr style={divider} />
      <div style={{ ...row, padding: '24px 0', marginBottom: 8 }}>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">All Case Studies</BtnLink>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">View Case Study</BtnLink>
        <BtnLink href="#" icon={IconCornerRightArrow} nudge="down" className="btn-link--light">Learn More</BtnLink>
      </div>
      <Meta>Same structure · muted ink → full ink on hover · use on light section backgrounds</Meta>

      {/* ── On dark ── */}
      <span style={sectionLabel}>On Dark Background</span>
      <hr style={divider} />
      <div style={{ ...row, background: '#121212', padding: 24, borderRadius: 8, marginBottom: 8 }}>
        <BtnSecondary icon={IconCornerDownRight}      nudge="right">Start a Project</BtnSecondary>
        <BtnSecondary icon={IconCornerDownRight} nudge="right">Full Case Study</BtnSecondary>
        <BtnArrow icon={IconCornerDownRight}  label="Previous" nudge="left" />
        <BtnArrow icon={IconCornerDownRight} label="Next"     nudge="right" />
      </div>
      <Meta>Secondary + arrow buttons as used inside dark sections (CaseStudy, TestimonialsCarousel)</Meta>

      {/* ── Icon reference ── */}
      <span style={sectionLabel}>Icon Reference</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32 }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 56px 56px 1fr 1fr', gap: '0 24px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {['File', 'Default', 'Flipped', 'Description', 'Usage'].map(h => (
            <span key={h} style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(18,18,18,0.35)' }}>{h}</span>
          ))}
        </div>
        {iconDefs.map(icon => (
          <div key={icon.name} style={{ display: 'grid', gridTemplateColumns: '180px 56px 56px 1fr 1fr', gap: '0 24px', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.06)', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: '#121212' }}>{icon.file}</span>
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon.component}</span>
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon.hasFlip ? icon.flipped : <span style={{ color: 'rgba(0,0,0,0.2)', fontSize: 11 }}>—</span>}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 13, color: '#121212' }}>{icon.desc}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.45)', letterSpacing: '0.3px' }}>{icon.usage}</span>
          </div>
        ))}
      </div>

      {/* ── Play / Pause ── */}
      <span style={sectionLabel}>Play / Pause — Cursor Icons</span>
      <hr style={divider} />
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 8 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={playHoverSrc} width="82" height="122" alt="Play cursor icon" draggable="false" />
          </div>
          <div>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: 0 }}>Play Hover.svg</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)', margin: '2px 0 0', letterSpacing: '0.5px' }}>165×245 · #4297FF rect + play triangle</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: '4px 0 0' }}>Follows cursor on active card</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ background: '#f2f2f2', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={pauseHoverSrc} width="58" height="64" alt="Pause cursor icon" draggable="false" />
          </div>
          <div>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: 0 }}>Pause Hover.svg</p>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)', margin: '2px 0 0', letterSpacing: '0.5px' }}>58×64 · #4297FF rect + pause bars</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: '4px 0 0' }}>Crossfades with Play on video play state</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#121212', borderRadius: 8, padding: 24, display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
            <img src={playHoverSrc}  width="82" height="122" alt="Play on dark" draggable="false" />
            <img src={pauseHoverSrc} width="58" height="64"  alt="Pause on dark" draggable="false" />
          </div>
          <div>
            <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: 0 }}>On dark (in-context)</p>
            <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: '4px 0 0' }}>As seen over the testimonial card video</p>
          </div>
        </div>

      </div>
      <Meta>opacity crossfade — both icons always in DOM, only opacity toggles on isPlaying state</Meta>

    </div>
  ),
};
