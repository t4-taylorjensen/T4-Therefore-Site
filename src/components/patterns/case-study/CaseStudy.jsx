import { useEffect, useRef } from 'react';
import './CaseStudy.css';

import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

/* ─────────────────────────────────────────
   CASE STUDY
───────────────────────────────────────── */

export default function CaseStudy({
  eyebrow      = 'Case Study',
  titleWord1,
  titleWord2,
  scrollHint   = '(scroll)',
  mediaImage,
  mediaAlt,
  splitLabel,
  description,
  ctaLabel,
  ctaHref      = '#',
  quote,
  profileImage,
  profileName,
  profileRole,
}) {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const word1Ref   = useRef(null);
  const word2Ref   = useRef(null);
  const splitRef   = useRef(null);
  const descRef    = useRef(null);
  const btnRef     = useRef(null);
  const quoteRef   = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    /* ── Scroll-driven expansion ──────────────────────────────
       Maps section entry position to 0→1 progress.
       Entry zone: section top at viewport bottom (0) →
       section top at 50% of viewport (1).
    ─────────────────────────────────────────────────────────── */
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

    /* ── Title reveal (one-shot) ─────────────────────────── */
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        labelRef.current?.classList.add('cs-label--revealed');
        word1Ref.current?.classList.add('cs-word--revealed');
        word2Ref.current?.classList.add('cs-word--revealed', 'cs-word--stagger');
        titleObserver.disconnect();
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) titleObserver.observe(sectionRef.current);

    /* ── Split content reveal (one-shot) ─────────────────── */
    const splitObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        descRef.current?.classList.add('cs-reveal--visible');
        btnRef.current?.classList.add('cs-reveal--visible', 'cs-reveal--delay-1');
        quoteRef.current?.classList.add('cs-reveal--visible', 'cs-reveal--delay-1');
        profileRef.current?.classList.add('cs-reveal--visible', 'cs-reveal--delay-2');
        splitObserver.disconnect();
      },
      { threshold: 0.2 }
    );
    if (splitRef.current) splitObserver.observe(splitRef.current);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      titleObserver.disconnect();
      splitObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="cs-section">

      <div className="cs-container">

        {/* ── Title block ── */}
        <div className="cs-title-block">
          <Eyebrow ref={labelRef} className="cs-label">{eyebrow}</Eyebrow>
          <div className="cs-title-row">
            <h2 className="cs-headline">
              {titleWord1 && (
                <span className="cs-word-clip">
                  <span ref={word1Ref} className="cs-word">{titleWord1}</span>
                </span>
              )}
              {titleWord1 && titleWord2 && (
                <span className="cs-word-gap" aria-hidden="true" />
              )}
              {titleWord2 && (
                <span className="cs-word-clip">
                  <span ref={word2Ref} className="cs-word">{titleWord2}</span>
                </span>
              )}
            </h2>
            {scrollHint && <p className="cs-scroll-hint">{scrollHint}</p>}
          </div>
        </div>

        {/* ── Media ── */}
        {mediaImage && (
          <div className="cs-media">
            <div className="cs-media-inner">
              <img
                src={mediaImage}
                alt={mediaAlt || ''}
                className="cs-media-img"
                draggable="false"
              />
            </div>
          </div>
        )}

      </div>

      {/* ── Split content ── */}
      <div ref={splitRef} className="cs-split">

        {/* Left: client label + description + CTA */}
        <div className="cs-split-left">
          {splitLabel && <Eyebrow className="cs-split-label">{splitLabel}</Eyebrow>}

          {description && (
            <p ref={descRef} className="cs-split-desc cs-reveal">
              {description}
            </p>
          )}

          {ctaLabel && (
            <BtnSecondary
              ref={btnRef}
              as="a"
              href={ctaHref}
              icon={IconCornerDownRight}
              nudge="right"
              className="cs-reveal"
            >
              {ctaLabel}
            </BtnSecondary>
          )}
        </div>

        {/* Right: quote + profile */}
        <div className="cs-split-right">
          {quote && (
            <p ref={quoteRef} className="cs-quote cs-reveal">
              {quote}
            </p>
          )}

          {(profileImage || profileName) && (
            <div ref={profileRef} className="cs-profile cs-reveal">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={profileName || ''}
                  className="cs-profile-photo"
                />
              )}
              <div className="cs-profile-info">
                {profileName && <p className="cs-profile-name">{profileName}</p>}
                {profileRole && <p className="cs-profile-role">{profileRole}</p>}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
