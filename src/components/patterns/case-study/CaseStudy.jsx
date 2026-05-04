import { useEffect, useRef } from 'react';
import './CaseStudy.css';

import mediaImg from '../../ui/brand assets/video block.jpg';
import profileImg from '../../ui/brand assets/therefore-placeholder-woman.jpg';
import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';

/* ─────────────────────────────────────────
   CASE STUDY
───────────────────────────────────────── */

export default function CaseStudy() {
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
          <p ref={labelRef} className="cs-label">Case Study</p>
          <div className="cs-title-row">
            <h2 className="cs-headline">
              <span className="cs-word-clip">
                <span ref={word1Ref} className="cs-word">DuVine</span>
              </span>
              <span className="cs-word-gap" aria-hidden="true" />
              <span className="cs-word-clip">
                <span ref={word2Ref} className="cs-word">Cycling</span>
              </span>
            </h2>
            <p className="cs-scroll-hint">(scroll)</p>
          </div>
        </div>

        {/* ── Media ── */}
        <div className="cs-media">
          <div className="cs-media-inner">
            <img
              src={mediaImg}
              alt="DuVine Cycling — checkout experience"
              className="cs-media-img"
              draggable="false"
            />
          </div>
        </div>

      </div>

      {/* ── Split content ── */}
      <div ref={splitRef} className="cs-split">

        {/* Left: client label + description + CTA */}
        <div className="cs-split-left">
          <p className="cs-split-label">DuVine Cycling</p>

          <p ref={descRef} className="cs-split-desc cs-reveal">
            Built to replace a legacy monolith with a composable architecture designed for performance and long-term scalability.
          </p>

          <BtnSecondary
            ref={btnRef}
            as="a"
            href="#"
            icon={IconCornerDownRight}
            nudge="right"
            className="cs-reveal"
          >
            Full Case Study
          </BtnSecondary>
        </div>

        {/* Right: quote + profile */}
        <div className="cs-split-right">
          <p ref={quoteRef} className="cs-quote cs-reveal">
            "Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."
          </p>

          <div ref={profileRef} className="cs-profile cs-reveal">
            <img
              src={profileImg}
              alt="Jane Smith"
              className="cs-profile-photo"
            />
            <div className="cs-profile-info">
              <p className="cs-profile-name">Jane Smith</p>
              <p className="cs-profile-role">Chief Executive Officer</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
