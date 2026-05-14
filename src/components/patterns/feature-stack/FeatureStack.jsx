import { useState } from 'react';
import './FeatureStack.css';

import { IconCornerDownRight } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

/* ─────────────────────────────────────────
   FEATURE STACK
───────────────────────────────────────── */

export default function FeatureStack({
  eyebrow,
  title,
  titleSize = 'default',   // 'default' (30px) | 'large' (55px)
  ctaLabel,
  ctaHref   = '#',
  cards     = [],
}) {
  const [iconNudge, setIconNudge] = useState(false);

  return (
    <section className="s2-section">

      <div className="s2-cards-section">

        {/* Title row: eyebrow + title (30px gap) on the left, optional CTA pill on the right. */}
        <div className="s2-cards-header anim-fade-up anim-delay-2">
          <div className="s2-title-group">
            {eyebrow && (
              <Eyebrow className="anim-fade-up anim-delay-1">{eyebrow}</Eyebrow>
            )}
            {title && (
              <h2 className={`s2-title s2-title--${titleSize}`}>{title}</h2>
            )}
          </div>
          {ctaLabel && (
            <a
              href={ctaHref}
              className="s2-btn-sm"
              onMouseEnter={() => setIconNudge(true)}
            >
              <span className="s2-btn-sm-label">{ctaLabel}</span>
              <span
                className="s2-btn-sm-icon"
                style={{ animation: iconNudge ? 'nudge-right 0.55s ease-in-out 1' : 'none' }}
                onAnimationEnd={() => setIconNudge(false)}
              >
                <IconCornerDownRight />
              </span>
            </a>
          )}
        </div>

        {/* Cards grid — each card may optionally include a media JSX block. */}
        <div className="s2-cards-grid">
          {cards.map((card, i) => {
            const delay = Math.min(i + 2, 4);
            return (
              <a
                href={card.href || '#'}
                key={i}
                className={`s2-card anim-fade-up anim-delay-${delay}`}
              >
                {card.media}
                <div className="s2-card-text">
                  <p className="s2-card-title">{card.title}</p>
                  <p className="s2-card-desc">{card.description}</p>
                </div>
              </a>
            );
          })}
        </div>

      </div>

    </section>
  );
}
