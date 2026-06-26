import './PillarHero.css';
import Eyebrow from '../../ui/Eyebrow';
import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';

/* ─────────────────────────────────────────
   PILLAR HERO
   Two-column hero used by CMS Page V2 — eyebrow +
   display headline + single body paragraph + CTA
   on the left, full-bleed media on the right,
   separated by a hairline border. Distinct from the
   generic Patterns/Hero (used by PillarPage v1 and
   the hero-media exploration galleries), which has a
   different visual design and other live consumers —
   kept separate rather than forced together.
───────────────────────────────────────── */
export default function PillarHero({
  eyebrow = 'Content Management Systems',
  headline = "We work with content that's going places.",
  bodyCopy = 'Your content can do more. Our CMS experts help you unlock its full potential to engage travellers across channels and continents.',
  ctaLabel = 'Speak to a CMS expert',
  mediaSlot = null,
}) {
  return (
    <section className="ph-hero">
      <div className="ph-hero-left">
        <Eyebrow className="anim-fade-up anim-delay-1">
          {eyebrow}
        </Eyebrow>
        <div className="ph-hero-main anim-fade-up anim-delay-2">
          <h1 className="ph-hero-headline">
            {headline}
          </h1>
          <p className="ph-hero-copy">
            {bodyCopy}
          </p>
          <BtnSecondary icon={IconCornerDownRight} nudge="right">
            {ctaLabel}
          </BtnSecondary>
        </div>
      </div>
      <div className="ph-hero-media anim-fade-in anim-delay-3">
        {mediaSlot}
      </div>
    </section>
  );
}
