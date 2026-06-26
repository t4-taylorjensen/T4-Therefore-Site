import { useEffect, useRef, useState } from 'react';
import './PlatformTabs.css';
import Eyebrow from '../../ui/Eyebrow';
import { BtnLink, IconCornerDownRight } from '../../ui/Button/Button';
import ScrambleText from '../../ui/ScrambleText';
import useReveal from '../../ui/hooks/useReveal';
import SanityGraphic from '../../ui/SanityGraphic/SanityGraphic';

const DEFAULT_PLATFORMS = [];


/* Shared section header — eyebrow + headline, scroll-revealed.
   Sits above a full-width hairline so every variant opens with the
   same clean, reference-style frame. */
function PlatHead({ eyebrow, headline }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal plat-head plat-head--clean${visible ? ' is-visible' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="plat-headline">{headline}</h2>
    </div>
  );
}


/* ─────────────────────────────────────────
   6) SPLIT — generative Sanity-style graphic on the
   left, balanced Market-Snapshot-style write-up on
   the right. `graphic` picks the visual treatment:
   drift · grid · constellation · sparkle.
───────────────────────────────────────── */
function PlatformsSplit({ eyebrow, headline, platforms, graphic = 'halftone' }) {
  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal();
  const items = platforms.slice(0, 3);
  const p = items[active] || {};
  return (
    <section className="plat-section plat-split">
      <div className="plat-inner">
        <PlatHead eyebrow={eyebrow} headline={headline} />
        <div className="plat-rule" />

        <div ref={ref} className={`reveal psplit${visible ? ' is-visible' : ''}`}>
          {/* LEFT — full-bleed image treatment. */}
          <div className="psplit-media-col">
            <div className="psplit-media">
              <SanityGraphic mode={graphic} src={p.bg} key={`${graphic}-${active}`} />
            </div>
          </div>

          {/* RIGHT — switcher on top, then balanced brand / body / meta. */}
          <div className="psplit-content">
            <div className="psplit-tabs" role="tablist">
              {items.map((it, i) => (
                <button
                  key={it.logoAlt}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`psplit-tab${active === i ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="psplit-tab-name">{it.logoAlt}</span>
                </button>
              ))}
            </div>

            <div className="psplit-panels">
              {items.map((it, i) => (
                <div
                  key={it.logoAlt}
                  className={`psplit-panel${active === i ? ' is-active' : ''}`}
                  aria-hidden={active !== i}
                >
                  <div className="psplit-top">
                    <img src={it.logo} alt={it.logoAlt} className="psplit-logo" />
                    <span className="p-tag">{it.tag}</span>
                  </div>

                  <p className="psplit-body">{it.body}</p>

                  <div className="psplit-foot">
                    <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light btn-link--text">
                      {it.cta}
                    </BtnLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PLATFORMS SCROLLER
   Default: white, AI-card proportions. Sticky
   media panel on the left; whichever text block
   is centered in the viewport (tracked via
   IntersectionObserver) drives the sticky
   media's photo + logo chip + scramble tag.

   Clean no-image alternates:
   tabs · ledger · grid · expand · snapshot · split
───────────────────────────────────────── */
export default function PlatformTabs({
  eyebrow = 'Our Go-To Technology Stack',
  headline = 'The right platform changes what your team can do, and how fast they can do it.',
  platforms = DEFAULT_PLATFORMS,
  variant = 'default',
  graphic = 'halftone',
}) {
  if (variant === 'split')     return <PlatformsSplit     eyebrow={eyebrow} headline={headline} platforms={platforms} graphic={graphic} />;

  return <PlatformsDefault eyebrow={eyebrow} headline={headline} platforms={platforms} />;
}

/* Default sticky-media scroll-driven layout (unchanged). */
function PlatformsDefault({ eyebrow, headline, platforms }) {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);
  const [headRef, headVisible] = useReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.55 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="plat-section">
      <div className="plat-inner">
        <div ref={headRef} className={`reveal plat-head${headVisible ? ' is-visible' : ''}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="plat-headline">{headline}</h2>
        </div>

        <div className="plat-grid">
          <div className="plat-media-sticky">
            {platforms.map((p, i) => (
              <div key={p.logoAlt} className={`plat-media-photo${active === i ? ' is-active' : ''}`}>
                <img src={p.bg} alt="" />
              </div>
            ))}
            <div className="plat-media-logo-wrap">
              {platforms.map((p, i) => (
                <span key={p.logoAlt} className={`plat-media-logo-box${active === i ? ' is-active' : ''}`}>
                  <img src={p.logo} alt={p.logoAlt} className="plat-media-logo" />
                </span>
              ))}
            </div>
            <div className="plat-media-tag">
              <span className="plat-media-tag-text">
                {platforms[active] && (
                  <ScrambleText text={platforms[active].tag} active delay={150} key={active} />
                )}
              </span>
            </div>
          </div>

          <div className="plat-text-col">
            {platforms.map((p, i) => (
              <div
                key={p.logoAlt}
                className="plat-text-block"
                data-index={i}
                ref={(el) => { sectionRefs.current[i] = el; }}
              >
                <div className="plat-eyebrow-row">
                  <span className={`plat-eyebrow-square${active === i ? ' is-active' : ''}`} />
                  <Eyebrow className="plat-eyebrow">{p.logoAlt}</Eyebrow>
                </div>
                <h3 className="plat-text-headline">{p.headline}</h3>
                <p className="plat-text-copy">{p.body}</p>
                <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="plat-cta btn-link--light">
                  {p.cta}
                </BtnLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
