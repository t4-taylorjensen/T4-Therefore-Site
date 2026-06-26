import { useState, useEffect, useRef, useCallback } from 'react';
import './TrustedByStickyImage.css';

import person1 from './person-1.jpg';
import person2 from './person-2.jpg';
import person3 from './person-3.jpg';
import square1 from '../../features/pages/hero-media/assets/therefore-square-1.svg';
import testimonialBg from './testimonial-bg.jpg';
import { IconArrowLeft, IconArrowRight } from '../../ui/icons';
import { BtnArrow } from '../../ui/Button/Button';

/* ─────────────────────────────────────────
   Full-bleed CSS gradient background (no photo),
   quote on top. Normal page flow. A grain layer
   sits over the gradient for texture.
───────────────────────────────────────── */
const QUOTES = [
  {
    photo:   person1,
    name:    'Scott Duncan',
    role:    'CEO',
    company: 'Goway Travel',
    quote:   'Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape.',
  },
  {
    photo:   person2,
    name:    'Deena Giancotti',
    role:    'Head of Product',
    company: 'DuVine',
    quote:   'Working with this team transformed how we approach digital infrastructure. Their expertise and dedication to our vision made every milestone feel achievable.',
  },
  {
    photo:   person3,
    name:    'Tristan Armstrong',
    role:    'Founder',
    company: 'Canyon Spirit',
    quote:   'From day one, the collaboration felt effortless. They understood our brand deeply and delivered an experience our customers talk about constantly.',
  },
];

const CAROUSEL_INTERVAL = 5500;

/* Drives both the auto-advance and a 0→1 progress value (for the
   segment indicator), same rAF-timer pattern as the original
   Testimonials component on this page. */
function useCarousel(total) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const startCycle = useCallback((fromIndex) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(elapsed / CAROUSEL_INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      const next = (fromIndex + 1) % total;
      setActive(next);
      startCycle(next);
    }, CAROUSEL_INTERVAL);
  }, [total]);

  useEffect(() => {
    startCycle(0);
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback((i) => { setActive(i); startCycle(i); }, [startCycle]);

  return { active, progress, goTo };
}

/* Tracks the outgoing quote so it can render briefly alongside
   the incoming one — a true overlapping crossfade rather than a
   hard cut. */
function useCrossfade(active, duration = 700) {
  const prevRef = useRef(active);
  const [outgoing, setOutgoing] = useState(null);

  useEffect(() => {
    if (prevRef.current !== active) {
      const leaving = prevRef.current;
      prevRef.current = active;
      setOutgoing(leaving);
      const t = setTimeout(() => setOutgoing(null), duration);
      return () => clearTimeout(t);
    }
  }, [active, duration]);

  return outgoing;
}

export function TrustedByStickyImage({ variant = 'default', quotes = QUOTES, title = 'Kind words' }) {
  const { active, progress, goTo } = useCarousel(quotes.length);
  const q = quotes[active];
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const outgoing = useCrossfade(active, 1100);
  const prevQ = outgoing !== null ? quotes[outgoing] : null;
  const isCentered = variant === 'centered';

  /* Parallax: drift the photo bg against scroll as the section
     passes through the viewport (centered variant only). */
  useEffect(() => {
    if (!isCentered) return;
    const onScroll = () => {
      const section = sectionRef.current;
      const photo = photoRef.current;
      if (!section || !photo) return;
      const rect = section.getBoundingClientRect();
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      photo.style.transform = `translate3d(0, ${(-fromCenter * 0.12).toFixed(2)}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isCentered]);

  const prev = () => goTo((active - 1 + quotes.length) % quotes.length);
  const next = () => goTo((active + 1) % quotes.length);

  if (variant === 'cards') {
    return (
      <section className="tbsi-cards">
        <div className="tbsi-cards-inner">
          <header className="tbsi-cards-head">
            <h2 className="tbsi-cards-title">{title}</h2>
            <div className="tbsi-cards-nav">
              <BtnArrow icon={IconArrowLeft} label="Previous testimonial" nudge="left" onClick={prev} className="btn-arrow--outline" />
              <BtnArrow icon={IconArrowRight} label="Next testimonial" nudge="right" onClick={next} className="btn-arrow--outline" />
            </div>
          </header>

          <div className="tbsi-cards-track">
            {quotes.map((item, i) => {
              const isActive = i === active;
              return (
                <article key={i} className={`tbsi-card${isActive ? ' is-active' : ''}`}>
                  <button className="tbsi-card-byline" onClick={() => goTo(i)} aria-label={`Show ${item.name}'s testimonial`}>
                    <img src={item.photo} className="tbsi-card-avatar" alt={item.name} />
                    <span className="tbsi-card-id">
                      <span className="tbsi-card-name">{item.name}</span>
                      <span className="tbsi-card-role">{item.role} · {item.company}</span>
                    </span>
                  </button>

                  <div className="tbsi-card-quote-wrap">
                    {isActive && (
                      <p key={`cq-${active}`} className="tbsi-card-quote is-entering">{item.quote}</p>
                    )}
                  </div>

                  <div className="tbsi-card-progress" aria-hidden="true">
                    <span
                      className="tbsi-card-progress-fill"
                      style={{ transform: `scaleX(${isActive ? progress : 0})` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (isCentered) {
    return (
      <section ref={sectionRef} className="tbsi-section tbsi-section--centered">
        <div className="tbsi-media">
          <div
            className="tbsi-photo"
            ref={photoRef}
            aria-hidden="true"
            style={{ backgroundImage: `url(${testimonialBg})` }}
          />
          <div className="tbsi-overlay" />
          <div className="tbsi-noise" aria-hidden="true" />
        </div>

        <div className="tbsi-content">
          <div className="tbsi-stack">
            {prevQ && <p key={`q-out-${outgoing}`} className="tbsi-quote is-leaving">&ldquo;{prevQ.quote}&rdquo;</p>}
            <p key={`q-${active}`} className="tbsi-quote is-entering">&ldquo;{q.quote}&rdquo;</p>
          </div>

          <div className="tbsi-bottom-row">
            <div className="tbsi-byline-row">
              <div className="tbsi-mini-photo-wrap">
                {prevQ && (
                  <img key={`m-out-${outgoing}`} src={prevQ.photo} alt="" aria-hidden="true" className="tbsi-mini-photo is-leaving" />
                )}
                <img key={`m-${active}`} src={q.photo} alt={q.name} className="tbsi-mini-photo is-entering" />
              </div>

              <div className="tbsi-stack tbsi-stack--byline">
                {prevQ && (
                  <div key={`a-out-${outgoing}`} className="tbsi-byline is-leaving">
                    <span className="tbsi-byline-name">{prevQ.name}</span>
                    <span className="tbsi-byline-meta">{prevQ.role} · {prevQ.company}</span>
                  </div>
                )}
                <div key={`a-${active}`} className="tbsi-byline is-entering">
                  <span className="tbsi-byline-name">{q.name}</span>
                  <span className="tbsi-byline-meta">{q.role} · {q.company}</span>
                </div>
              </div>
            </div>

            <div className="tbsi-segments">
              {quotes.map((item, i) => (
                <button
                  key={i}
                  className={`tbsi-segment${i === active ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={item.company}
                >
                  <span
                    className="tbsi-segment-fill"
                    style={{ transform: `scaleX(${i === active ? progress : i < active ? 1 : 0})` }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="tbsi-topline" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="tbsi-section">
      <div className="tbsi-media">
        <div className="tbsi-bg" aria-hidden="true" />
        <div className="tbsi-overlay" />

        <img src={square1} className="tbsi-square" alt="" aria-hidden="true" />
        <div className="tbsi-noise" aria-hidden="true" />
      </div>

      <div className="tbsi-content">
        <div className="tbsi-stack">
          {prevQ && <p key={`q-out-${outgoing}`} className="tbsi-quote is-leaving">&ldquo;{prevQ.quote}&rdquo;</p>}
          <p key={`q-${active}`} className="tbsi-quote is-entering">&ldquo;{q.quote}&rdquo;</p>
        </div>

        <div className="tbsi-bottom-row">
          <div className="tbsi-stack tbsi-stack--byline">
            {prevQ && (
              <div key={`a-out-${outgoing}`} className="tbsi-byline is-leaving">
                <span className="tbsi-byline-name">{prevQ.name}</span>
                <span className="tbsi-byline-meta">{prevQ.role} · {prevQ.company}</span>
              </div>
            )}
            <div key={`a-${active}`} className="tbsi-byline is-entering">
              <span className="tbsi-byline-name">{q.name}</span>
              <span className="tbsi-byline-meta">{q.role} · {q.company}</span>
            </div>
          </div>

          <div className="tbsi-segments">
            {quotes.map((item, i) => (
              <button
                key={i}
                className={`tbsi-segment${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={item.company}
              >
                <span
                  className="tbsi-segment-fill"
                  style={{ transform: `scaleX(${i === active ? progress : i < active ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="tbsi-topline" aria-hidden="true" />

      <div className="tbsi-profile-wrap">
        {prevQ && (
          <img
            key={`p-out-${outgoing}`}
            src={prevQ.photo}
            alt=""
            aria-hidden="true"
            className="tbsi-profile is-leaving"
          />
        )}
        <img key={`p-${active}`} src={q.photo} alt={q.name} className="tbsi-profile is-entering" />
      </div>
    </section>
  );
}
