import { useState, useMemo } from 'react';
import './LogoCarousel.css';

/* ─────────────────────────────────────────
   LOGO ITEM
───────────────────────────────────────── */

function LogoItem({ logo, hidden }) {
  const slug = logo.slug || logo.name.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="lc-item" aria-hidden={hidden || undefined}>
      <div className="lc-logo-wrap" data-logo={slug}>
        <img
          className="lc-logo"
          src={logo.src}
          alt={hidden ? '' : logo.name}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   LOGO CAROUSEL

   SEAMLESS LOOP
     Track = logos × 2. Column width = 350px.
     translateX(-50%) = exactly one full set → no jump at reset.

   DYNAMIC SPEED
     duration = max(28s, n × 5s)
     Scales naturally as logos are added/removed.
───────────────────────────────────────── */

export default function LogoCarousel({
  logos = [],
  ariaLabel = 'Partner and client logos',
}) {
  const [paused, setPaused] = useState(false);

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const duration = Math.max(28, logos.length * 5);

  return (
    <section className="lc-section" aria-label={ariaLabel}>
      <div
        className="lc-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="lc-track"
          style={{
            animation: prefersReducedMotion ? 'none' : `logo-scroll ${duration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {/* Primary set — read by screen readers */}
          {logos.map(logo => (
            <LogoItem key={logo.name} logo={logo} />
          ))}

          {/* Duplicate set — aria-hidden, anchors the seamless loop */}
          {logos.map(logo => (
            <LogoItem key={`dup__${logo.name}`} logo={logo} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
