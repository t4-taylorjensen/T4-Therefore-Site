import './Hero.css';
import { BtnPrimary, IconCornerDownRight } from '../../ui/Button/Button';

export default function Hero({ title, description, sub, ctaLabel }) {
  return (
    <section className="hero-section">

      {/* ── Left: content ── */}
      <div className="hero-content">
        <h1 className="hero-headline anim-fade-up anim-delay-1">
          {title}
        </h1>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-copy-main anim-fade-up anim-delay-2">
              {description}
            </p>
            {sub && (
              <p className="hero-copy-sub anim-fade-up anim-delay-3">
                {sub}
              </p>
            )}
          </div>

          <BtnPrimary icon={IconCornerDownRight} nudge="right" className="anim-fade-up anim-delay-4">
            {ctaLabel}
          </BtnPrimary>
        </div>
      </div>

      {/* ── Right: media ── */}
      <div className="hero-media anim-fade-in anim-delay-5" />

    </section>
  );
}
