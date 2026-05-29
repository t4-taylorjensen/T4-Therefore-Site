import './Hero.css';
import { BtnPrimary, IconCornerDownRight } from '../../ui/Button/Button';

export default function Hero({
  headline = <><span>Headless CMS</span><br /><span>&amp; Ecommerce</span></>,
  bodyCopy = 'We design and implement AI-first composable content and commerce architectures that unify content, commerce, and experience. Built for enterprises ready to move beyond monolithic platforms.',
  bodySubCopy = 'Trusted by enterprise retailers, manufacturers, and B2B organizations.',
  ctaLabel = 'Start a Project',
  mediaSlot = null,
}) {
  return (
    <section className="hero-section">

      {/* ── Left: content ── */}
      <div className="hero-content">
        <h1 className="hero-headline anim-fade-up anim-delay-1">
          {headline}
        </h1>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-copy-main anim-fade-up anim-delay-2">
              {bodyCopy}
            </p>
            <p className="hero-copy-sub anim-fade-up anim-delay-3">
              {bodySubCopy}
            </p>
          </div>

          <BtnPrimary icon={IconCornerDownRight} nudge="right" className="anim-fade-up anim-delay-4">
            {ctaLabel}
          </BtnPrimary>
        </div>
      </div>

      {/* ── Right: media ── */}
      <div className="hero-media anim-fade-in anim-delay-5">
        {mediaSlot ?? <div className="hero-screen" />}
      </div>

    </section>
  );
}
