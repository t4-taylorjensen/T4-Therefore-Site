import '../styles/global.css';

import {
  BtnPrimary, BtnSecondary, BtnOutline, BtnDark, BtnLink,
  IconCornerDownRight, IconCornerRightArrow,
} from '../components/ui/Button/Button';

export default {
  title: 'UI/Button',
  parameters: { layout: 'padded' },
};

/* ── shared story chrome ── */
const row = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 };
const onDark = { ...row, background: '#121212', padding: 24, borderRadius: 8 };

function Note({ children }) {
  return (
    <p style={{
      fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)',
      letterSpacing: '0.5px', marginTop: 16, marginBottom: 0, lineHeight: 1.8,
    }}>{children}</p>
  );
}
const frame = (children) => <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 860 }}>{children}</div>;

/* ─────────────────────────────────────────
   CTA buttons — one story per type
───────────────────────────────────────── */
export const Primary = {
  render: () => frame(<>
    <div style={row}>
      <BtnPrimary icon={IconCornerDownRight} nudge="right">Start a Project</BtnPrimary>
      <BtnPrimary icon={IconCornerRightArrow} nudge="down">Learn More</BtnPrimary>
      <BtnPrimary>Start a Project</BtnPrimary>
    </div>
    <Note>bg #121212 → hover #4297FF (black text) · height 34px · icon optional</Note>
  </>),
};

export const Secondary = {
  render: () => frame(<>
    <div style={row}>
      <BtnSecondary icon={IconCornerDownRight} nudge="right">Start a Project</BtnSecondary>
      <BtnSecondary icon={IconCornerRightArrow} nudge="down">Learn More</BtnSecondary>
      <BtnSecondary>Start a Project</BtnSecondary>
    </div>
    <div style={{ ...onDark, marginTop: 12 }}>
      <BtnSecondary icon={IconCornerDownRight} nudge="right">Start a Project</BtnSecondary>
      <BtnSecondary>Full Case Study</BtnSecondary>
    </div>
    <Note>bg #f2f2f2 → hover #4297FF (black text) · used on dark section backgrounds + nav</Note>
  </>),
};

export const Outline = {
  render: () => frame(<>
    <div style={row}>
      <BtnOutline icon={IconCornerDownRight} nudge="right">Start a Project</BtnOutline>
      <BtnOutline icon={IconCornerRightArrow} nudge="down">Learn More</BtnOutline>
      <BtnOutline>Full Case Study</BtnOutline>
    </div>
    <Note>transparent + 1px black border → hover fills #121212 (white text)</Note>
  </>),
};

export const Dark = {
  render: () => frame(<>
    <div style={onDark}>
      <BtnDark icon={IconCornerDownRight} nudge="right">Get Started</BtnDark>
      <BtnDark icon={IconCornerRightArrow} nudge="down">Learn More</BtnDark>
      <BtnDark>Get Started</BtnDark>
    </div>
    <Note>bg #121212 + white border → hover #4297FF fill + black text · use inside dark panels and dropdowns</Note>
  </>),
};

/* ─────────────────────────────────────────
   Link text button + its variants
───────────────────────────────────────── */
export const Link = {
  render: () => frame(<>
    {/* default — dark + light */}
    <div style={onDark}>
      <BtnLink href="#" icon={IconCornerDownRight} nudge="right">All Case Studies</BtnLink>
      <BtnLink href="#" icon={IconCornerRightArrow} nudge="down">Learn More</BtnLink>
    </div>
    {/* the three variants on a light background */}
    <div style={{ ...row, padding: '24px 0', gap: 32 }}>
      <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">Default (11px mono)</BtnLink>
      <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light btn-link--compact">Compact (13px mono)</BtnLink>
      <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light btn-link--text">Text — sentence case</BtnLink>
    </div>
    <Note>no bg/border · default mono 11px uppercase, muted → bright on hover (dark bg; add `btn-link--light` on light). Variants — `--compact`: 13px mono (CaseStudiesGrid, AICallout) · `--text`: brand font, sentence case (Platforms CTA).</Note>
  </>),
};

/* ─────────────────────────────────────────
   Reference — CTA icons
───────────────────────────────────────── */
export const Reference = {
  name: 'Icons',
  render: () => frame(<>
    <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(18,18,18,0.4)' }}>CTA icons</span>
    <div style={{ ...row, marginTop: 16, gap: 40 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><IconCornerDownRight /><span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11 }}>corner-down-right</span></span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><IconCornerRightArrow /><span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11 }}>corner-right-arrow</span></span>
    </div>
  </>),
};
