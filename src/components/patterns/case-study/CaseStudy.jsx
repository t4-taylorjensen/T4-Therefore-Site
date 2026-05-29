import { useEffect, useRef, useState } from 'react';
import './CaseStudy.css';

import duvineVid from './assets/duvine-bg.mov';
import screen01 from './assets/therefore-custom-cms-commerce-website-duvine-01.jpg';
import screen02 from './assets/therefore-custom-cms-commerce-website-duvine-02.jpg';
import screen03 from './assets/therefore-custom-cms-commerce-website-duvine-03.jpg';
import screen04 from './assets/therefore-custom-cms-commerce-website-duvine-04.jpg';
import screen05 from './assets/therefore-custom-cms-commerce-website-duvine-05.jpg';
import screen06 from './assets/therefore-custom-cms-commerce-website-duvine-06.jpg';
import screen07 from './assets/therefore-custom-cms-commerce-website-duvine-07.jpg';
import screen08 from './assets/therefore-custom-cms-commerce-website-duvine-08.jpg';
import profileImg from '../../ui/brand assets/therefore-placeholder-woman.jpg';
import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

const MEDIA_PAD = 60;

const SCREENS = [
  { src: screen03, label: 'Tour Detail' },
  { src: screen07, label: 'About' },
  { src: screen01, label: 'Homepage' },
  { src: screen05, label: 'Booking' },
  { src: screen08, label: 'Journal' },
  { src: screen02, label: 'Tour Listing' },
  { src: screen06, label: 'Destinations' },
  { src: screen04, label: 'Itinerary' },
];

/* ── 01: Fade Up ──────────────────────────────────────────────────────────
   Screens cross-fade with a soft upward drift. Slow, cinematic hold.
──────────────────────────────────────────────────────────────────────── */
function ScreenCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % SCREENS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cs-carousel">
      <div className="cs-carousel-stage">
        {SCREENS.map((screen, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              className="cs-carousel-item"
              style={{
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0) scale(1)' : 'translateY(22px) scale(0.96)',
                transition: 'opacity 1.1s cubic-bezier(0.25, 0.1, 0.1, 1), transform 1.1s cubic-bezier(0.25, 0.1, 0.1, 1)',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <div className={`cs-browser${isActive ? ' cs-browser--active' : ''}`}>
                <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 02: Film Strip ───────────────────────────────────────────────────────
   Screens scroll horizontally in a seamless infinite loop. The track is
   tripled so the -33.333% reset is invisible — always flowing.
──────────────────────────────────────────────────────────────────────── */
function ScreenFilmStrip() {
  const TRIPLED = [...SCREENS, ...SCREENS, ...SCREENS];
  return (
    <div className="cs-strip">
      <div className="cs-strip-track">
        {TRIPLED.map((screen, i) => (
          <div key={i} className="cs-strip-item">
            <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 03: Blur Dissolve ────────────────────────────────────────────────────
   Incoming screen blooms slowly into sharp focus while the outgoing
   blurs out faster — asymmetric timing makes each transition feel distinct.
──────────────────────────────────────────────────────────────────────── */
function ScreenBlurDissolve() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % SCREENS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cs-blur">
      <div className="cs-carousel-stage cs-blur-stage">
        {SCREENS.map((screen, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              className="cs-carousel-item"
              style={{
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0,
                filter: isActive ? 'blur(0px) brightness(1)' : 'blur(22px) brightness(0.6)',
                transform: isActive ? 'scale(1)' : 'scale(1.07)',
                transition: isActive
                  ? 'opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1), filter 1.8s cubic-bezier(0.4, 0, 0.2, 1), transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'opacity 0.9s ease, filter 0.9s ease, transform 0.9s ease',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 04: Vertical Tape ───────────────────────────────────────────────────
   Three columns of screens drift slowly upward at offset phases.
   Doubled arrays ensure the 50% reset is seamless on all columns.
──────────────────────────────────────────────────────────────────────── */
function ScreenVerticalTape() {
  const COL_A = [...SCREENS, ...SCREENS];
  const COL_B = [...[...SCREENS].reverse(), ...[...SCREENS].reverse()];
  const COL_C = [...SCREENS, ...SCREENS];
  return (
    <div className="cs-tape">
      <div className="cs-tape-col cs-tape-col--a">
        {COL_A.map((screen, i) => (
          <div key={i} className="cs-tape-item">
            <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
          </div>
        ))}
      </div>
      <div className="cs-tape-col cs-tape-col--b">
        {COL_B.map((screen, i) => (
          <div key={i} className="cs-tape-item">
            <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
          </div>
        ))}
      </div>
      <div className="cs-tape-col cs-tape-col--c">
        {COL_C.map((screen, i) => (
          <div key={i} className="cs-tape-item">
            <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 05: Clip Wipe ────────────────────────────────────────────────────────
   New screen wipes over the previous one — the stage is never blank.
   Previous screen holds fully visible until the wipe completes.
──────────────────────────────────────────────────────────────────────── */
function ScreenClipWipe() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => {
        setPrev(a);
        return (a + 1) % SCREENS.length;
      });
    }, 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cs-wipe">
      <div className="cs-carousel-stage cs-wipe-stage">
        {SCREENS.map((screen, i) => {
          const isActive = i === active;
          const isPrev   = i === prev;

          if (isActive) return (
            <div
              key={`active-${active}`}
              className="cs-carousel-item cs-wipe-in"
              style={{ zIndex: 3 }}
            >
              <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
            </div>
          );

          if (isPrev) return (
            <div
              key={`prev-${active}`}
              className="cs-carousel-item"
              style={{ zIndex: 2, clipPath: 'inset(0 0% 0 0)' }}
            >
              <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
            </div>
          );

          return (
            <div
              key={i}
              className="cs-carousel-item"
              style={{ zIndex: 1, clipPath: 'inset(0 100% 0 0)', visibility: 'hidden' }}
            >
              <img src={screen.src} alt={screen.label} className="cs-browser-img" draggable={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default function CaseStudy({ screenVariant = 'fade' }) {
  const wrapperRef = useRef(null);
  const innerRef   = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner   = innerRef.current;
    if (!wrapper || !inner) return;

    let rafId = null;

    const update = () => {
      rafId = null;
      const rect     = wrapper.getBoundingClientRect();
      const windowH  = window.innerHeight;
      const progress = Math.min(1, Math.max(0,
        (windowH - rect.top) / (windowH * 0.55)
      ));

      const pad = MEDIA_PAD * (1 - progress);
      wrapper.style.paddingLeft  = `${pad}px`;
      wrapper.style.paddingRight = `${pad}px`;
      inner.style.borderRadius   = `${12 * (1 - progress)}px`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="cs-section">

      <div className="cs-container">
        <div className="cs-title-block">
          <Eyebrow className="cs-label">Case Study</Eyebrow>
          <div className="cs-title-row">
            <h2 className="cs-headline">
              <span className="cs-word-clip">
                <span className="cs-word">DuVine</span>
              </span>
              <span className="cs-word-gap" aria-hidden="true" />
              <span className="cs-word-clip">
                <span className="cs-word">Cycling</span>
              </span>
            </h2>
            <p className="cs-scroll-hint">(scroll)</p>
          </div>
        </div>
      </div>

      {/* ── Media — expands from 60px padding to full width on scroll ── */}
      <div ref={wrapperRef} className="cs-media">
        <div ref={innerRef} className="cs-media-inner">
          {/* Background video */}
          <video
            className="cs-media-bg"
            src={duvineVid}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Dark overlay */}
          <div className="cs-media-overlay" />
          {screenVariant === 'fade'  && <ScreenCarousel />}
          {screenVariant === 'strip' && <ScreenFilmStrip />}
          {screenVariant === 'push'  && <ScreenBlurDissolve />}
          {screenVariant === 'tape'  && <ScreenVerticalTape />}
          {screenVariant === 'wipe'  && <ScreenClipWipe />}
        </div>
      </div>

      {/* ── Split content ── */}
      <div className="cs-split">

        <div className="cs-split-left">
          <Eyebrow className="cs-split-label">DuVine Cycling</Eyebrow>

          <p className="cs-split-desc">
            Built to replace a legacy monolith with a composable architecture designed for performance and long-term scalability.
          </p>

          <BtnSecondary
            as="a"
            href="#"
            icon={IconCornerDownRight}
            nudge="right"
          >
            Full Case Study
          </BtnSecondary>
        </div>

        <div className="cs-split-right">
          <p className="cs-quote">
            "Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."
          </p>

          <div className="cs-profile">
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
