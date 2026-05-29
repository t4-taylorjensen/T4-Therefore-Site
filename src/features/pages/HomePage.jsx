import { useRef, useEffect } from 'react';
import projCanyonSpirit1 from './assets/proj-canyon-spirit-1.jpg';
import projCanyonSpirit2 from './assets/proj-canyon-spirit-2.jpg';
import projNap1          from './assets/proj-nap-1.jpg';
import projNap2          from './assets/proj-nap-2.jpg';
import projGoway1        from './assets/proj-goway-1.jpg';
import projDuvine1       from './assets/proj-duvine-1.jpg';
import projTrova1        from './assets/proj-trova-1.jpg';
import './HomePage.css';
import PageLayout  from '../../components/layout/PageLayout';
import LogoCarousel from '../../components/patterns/logo-carousel/LogoCarousel';
import HomeHero from './HomeHero';

// ─────────────────────────────────────────────────────────────
// INTRO
// ─────────────────────────────────────────────────────────────

function HomeIntro() {
  return (
    <section className="hp-intro">
      <span className="hp-intro-eyebrow">Our Studio</span>
      <p className="hp-intro-body">
        One platform powering your entire digital ecosystem, content,
        commerce, and experience unified without compromise.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CAROUSEL
// ─────────────────────────────────────────────────────────────

// Figma order: canyon-spirit-1, canyon-spirit-2, nap-1, nap-2, goway-1, duvine-1, trova-1
// h = height as % of strip; aspect = w/h ratio
const PROJECTS = [
  { key: 'canyon-spirit-1', img: projCanyonSpirit1 },
  { key: 'canyon-spirit-2', img: projCanyonSpirit2, small: true },
  { key: 'nap-1',           img: projNap1           },
  { key: 'nap-2',           img: projNap2,           small: true },
  { key: 'goway-1',         img: projGoway1         },
  { key: 'duvine-1',        img: projDuvine1,        small: true },
  { key: 'trova-1',         img: projTrova1         },
];

function ProjectCarousel() {
  const trackRef   = useRef(null);
  const timerRef   = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      track.style.animationPlayState = 'paused';
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="hp-carousel" aria-label="Project work">
      <div className="hp-carousel-track" ref={trackRef} aria-hidden="true">
        {[...PROJECTS, ...PROJECTS].map((p, i) => (
          <div key={`${p.key}-${i}`} className={`hp-carousel-card${p.small ? ' hp-carousel-card--small' : ''}`}>
            <img src={p.img} alt="" className="hp-carousel-card-img" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PARALLAX CARDS
// ─────────────────────────────────────────────────────────────

const CARDS = [
  {
    index:   '[01]',
    eyebrow: 'Great work speaks for itself',
    layout:  'stat',
    stat:    '20',
    label:   'years of\nwanderlust',
  },
  {
    index:   '[02]',
    eyebrow: 'Est. 2005–now',
    layout:  'manifesto',
    headline: 'We create\ndigital\nexperiences\nthat build\nconnection',
  },
  {
    index:   '[03]',
    eyebrow: 'Capabilities',
    layout:  'list',
    items:   ['Strategy', 'Design', 'Engineering', 'Content'],
  },
];

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
function clamp(v,lo,hi) { return Math.max(lo,Math.min(hi,v)); }

const CARD_ENTERS = [0.25, 0.5, 0.75];
const ENTRY_SPAN  = 0.1;

function ParallaxCards() {
  const sectionRef = useRef(null);
  const coverRef   = useRef(null);
  const cardRefs   = useRef([]);
  const dotRefs    = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || !coverRef.current) return;

      const rect        = section.getBoundingClientRect();
      const scrolled    = -rect.top;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const t           = clamp(scrolled / totalScroll, 0, 1);

      // White cover dissolves away — opacity fade + subtle upward drift
      const coverE = easeInOutCubic(clamp(t / 0.25, 0, 1));
      coverRef.current.style.opacity   = `${1 - coverE}`;
      coverRef.current.style.transform = `translateY(-${coverE * 6}%)`;

      // Cards enter from below, one by one
      CARD_ENTERS.forEach((start, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const cardE = easeOutQuart(clamp((t - start) / ENTRY_SPAN, 0, 1));
        el.style.transform = `translateY(${(1 - cardE) * 100}%)`;
      });

      // Progress dots — fade in once cover is gone, highlight active card
      const dotsVisible = t > 0.22;
      const active      = t < 0.5 ? 0 : t < 0.75 ? 1 : 2;
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.opacity   = dotsVisible ? (i === active ? '1' : '0.22') : '0';
        dot.style.transform = i === active ? 'scale(1.6)' : 'scale(1)';
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="pc-section" ref={sectionRef}>
      <div className="pc-sticky">

        {/* White cover that slides upward on scroll entry */}
        <div className="pc-cover" ref={coverRef} />

        {/* Cards: absolutely stacked, each full-bleed */}
        {CARDS.map((card, i) => (
          <div
            key={card.index}
            className={`pc-card pc-card--${card.layout}`}
            ref={el => { cardRefs.current[i] = el; }}
            style={{ transform: 'translateY(100%)', zIndex: i + 1 }}
          >
            <div className="pc-card-meta">
              <span className="pc-mono">{card.index}</span>
              <span className="pc-mono pc-mono--muted">{card.eyebrow}</span>
            </div>

            {card.layout === 'stat' && (
              <div className="pc-card-body">
                <p className="pc-stat-number">{card.stat}</p>
                <div className="pc-stat-rule" />
                <p className="pc-stat-label">{card.label}</p>
              </div>
            )}

            {card.layout === 'manifesto' && (
              <div className="pc-card-body">
                <p className="pc-headline">{card.headline}</p>
              </div>
            )}

            {card.layout === 'list' && (
              <div className="pc-card-body">
                {card.items.map((item, j) => (
                  <div className="pc-list-item" key={item}>
                    <span className="pc-list-num">0{j + 1}</span>
                    <span className="pc-list-name">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Scroll progress indicator */}
        <div className="pc-progress" aria-hidden="true">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className="pc-progress-dot"
              ref={el => { dotRefs.current[i] = el; }}
              style={{ opacity: 0 }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY FEATURE
// ─────────────────────────────────────────────────────────────

function HomeCaseStudy() {
  return (
    <section className="hp-case">
      <div className="hp-case-frame">
        <div className="hp-case-chrome">
          <div className="hp-case-dots">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hp-case-dot" />
            ))}
          </div>
          <div className="hp-case-screen-main" />
          <div className="hp-case-screen-bar" />
        </div>
        <span className="hp-case-label">NAP Magazine</span>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE COMPOSITION
// ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageLayout>
      <HomeHero />
      <div id="hp-below-hero">
        <LogoCarousel />
        <HomeIntro />
        <ProjectCarousel />
        <ParallaxCards />
        <HomeCaseStudy />
      </div>
    </PageLayout>
  );
}
