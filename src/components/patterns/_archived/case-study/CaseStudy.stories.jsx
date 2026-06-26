import CaseStudy from './CaseStudy';

export default {
  title: 'Archived/Patterns/CaseStudy',
  component: CaseStudy,
  parameters: { layout: 'fullscreen' },
};

export const FadeUp       = { name: '01 — Fade Up',       args: { screenVariant: 'fade'  } };
export const FilmStrip    = { name: '02 — Film Strip',     args: { screenVariant: 'strip' } };
export const BlurDissolve = { name: '03 — Blur Dissolve',  args: { screenVariant: 'push'  } };
export const VerticalTape = { name: '04 — Vertical Tape',  args: { screenVariant: 'tape'  } };
export const ClipWipe     = { name: '05 — Clip Wipe',      args: { screenVariant: 'wipe'  } };
