import './Hero.css';
import { BtnPrimary, IconCornerDownRight } from '../../ui/Button/Button';

export default function Hero() {
  return (
    <section className="hero-section">

      {/* ── Left: content ── */}
      <div className="hero-content">
        <h1 className="hero-headline anim-fade-up anim-delay-1">
          Headless CMS<br />
          &amp; Ecommerce
        </h1>

        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-copy-main anim-fade-up anim-delay-2">
              We design and implement AI-first composable content and commerce
              architectures that unify content, commerce, and experience. Built
              for enterprises ready to move beyond monolithic platforms.
            </p>
            <p className="hero-copy-sub anim-fade-up anim-delay-3">
              Trusted by enterprise retailers, manufacturers, and B2B organizations.
            </p>
          </div>

          <BtnPrimary icon={IconCornerDownRight} nudge="right" className="anim-fade-up anim-delay-4">
            Start a Project
          </BtnPrimary>
        </div>
      </div>

      {/* ── Right: media ── */}
      <div className="hero-media anim-fade-in anim-delay-5" />

    </section>
  );
}
