import { useEffect, useRef } from 'react';
import './TechStack.css';
import Eyebrow from '../../ui/Eyebrow';

/* ─────────────────────────────────────────
   TECH STACK — two-column card grid
───────────────────────────────────────── */

export default function TechStack({
  eyebrow,
  headline,
  cards = [],
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    /* Scroll-driven expansion — maps section entry (top at viewport bottom →
       top at 50% of viewport) to a 0→1 progress that drives margin / border-
       radius / scale on the section. Mirrors the CaseStudy effect. */
    let rafId = null;

    const updateExpansion = () => {
      rafId = null;
      const el = sectionRef.current;
      if (!el) return;

      const rect    = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(1, Math.max(0,
        (windowH - rect.top) / (windowH * 0.5)
      ));

      el.style.margin       = `${30 * (1 - progress)}px`;
      el.style.borderRadius = `${16 * (1 - progress)}px`;
      el.style.transform    = `scale(${0.98 + 0.02 * progress})`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateExpansion);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateExpansion();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ts-section">
      {eyebrow && <Eyebrow className="ts-eyebrow">{eyebrow}</Eyebrow>}
      {headline && <h2 className="ts-headline">{headline}</h2>}
      <div className="ts-cards">
        {cards.map((card, i) => (
          <a href={card.href || '#'} key={i} className="ts-card">
            <span className="ts-card-inner">
              <img
                src={card.image}
                alt={card.imageAlt || ''}
                className="ts-card-image"
                draggable="false"
              />
              <img
                src={card.logo}
                alt={card.logoAlt || ''}
                className="ts-card-logo"
                draggable="false"
              />
              <p className="ts-card-desc">{card.description}</p>
              <span className="ts-card-cta">{card.ctaLabel}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
