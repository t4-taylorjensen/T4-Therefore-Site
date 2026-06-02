import './FeatureStack.css';

import coverDigitalProducts    from '../../ui/brand assets/cover-digital-products.jpg';
import coverAiCapabilities     from '../../ui/brand assets/cover-ai-capabilities.svg';
import coverAiCapabilitiesHover from '../../ui/brand assets/cover-ai-capabilities-hover.svg';
import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

import screen1  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-01.jpg';
import screen2  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-02.jpg';
import screen3  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-03.jpg';
import screen4  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-04.jpg';
import screen5  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-05.jpg';
import screen6  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-06.jpg';
import screen7  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-07.jpg';
import screen8  from '../../patterns/case-study/assets/therefore-custom-cms-commerce-website-duvine-08.jpg';
import screen9  from '../../features/pages/hero-media/assets/therefore-cms-solutions-duvine-screen-01.jpg';
import screen10 from '../../features/pages/hero-media/assets/therefore-cms-solutions-new-american-paintings-screen-01.jpg';
import screen11 from '../../../features/pages/assets/proj-duvine-1.jpg';
import screen12 from '../../../features/pages/assets/proj-nap-1.jpg';
import screen13 from '../../../features/pages/assets/proj-nap-2.jpg';
import screen14 from '../../../features/pages/assets/proj-canyon-spirit-1.jpg';
import screen15 from '../../../features/pages/assets/proj-trova-1.jpg';
import screen16 from '../../../features/pages/assets/proj-goway-1.jpg';

const ORBIT_SCREENS = [screen1,screen2,screen3,screen4,screen5,screen6,screen7,screen8,screen9,screen10,screen11,screen12,screen13,screen14,screen15,screen16];
const ORBIT_N     = ORBIT_SCREENS.length;
const ORBIT_R     = 120;
const ORBIT_SPD   = 20;

function DiscoveryOrbit() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0e0e0e' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 45% at 50% 50%, rgba(255,255,255,0.035) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* spinning ring */}
      <div className="discovery-ring" style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 0, height: 0,
        animation: `discovery-spin ${ORBIT_SPD}s linear infinite`,
      }}>
        {ORBIT_SCREENS.map((src, i) => {
          const angle = (i / ORBIT_N) * 360;
          const delay = `${-((angle / 360) * ORBIT_SPD).toFixed(3)}s`;
          return (
            <div key={i} style={{
              position: 'absolute', width: 0, height: 0,
              transform: `rotate(${angle}deg)`,
            }}>
              {/* move out to radius, then counter-rotate to stay upright */}
              <div className="discovery-ccw" style={{
                position: 'absolute',
                transform: `translateY(-${ORBIT_R}px)`,
                animation: `discovery-ccw ${ORBIT_SPD}s linear infinite`,
                animationDelay: delay,
              }}>
                <div style={{
                  position: 'absolute',
                  width: 80, height: 52,
                  transform: 'translate(-50%, -50%)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
    </div>
  );
}

const HEADLINE_DARK  = 'We design content models that reflect real workflows';
const HEADLINE_MUTED = '';

export const DEFAULT_CARDS = [
  {
    title: 'Discovery',
    desc: 'We help you make informed decisions about your digital future.',
    media: <div className="s2-card-media s2-card-media--discovery"><DiscoveryOrbit /></div>,
    link: true,
    delay: 'anim-delay-2',
  },
  {
    title: 'Digital Products',
    desc: 'We build custom web-based applications bespoke to your needs.',
    media: (
      <div className="s2-card-media s2-card-media--digital">
        <img className="media-fill media-fill--kenburns" src={coverDigitalProducts} alt="New American Paintings — digital product preview" />
      </div>
    ),
    delay: 'anim-delay-3',
  },
  {
    title: 'Agentic Capabilities',
    desc: 'We design the system before choosing tools so your solution is cohesive built.',
    media: (
      <div className="s2-card-media s2-card-media--agentic">
        <img className="s2-agentic-default" src={coverAiCapabilities} alt="Agentic system architecture" />
        <img className="s2-agentic-hover" src={coverAiCapabilitiesHover} alt="" aria-hidden="true" />
      </div>
    ),
    delay: 'anim-delay-4',
  },
];

/* ─────────────────────────────────────────
   STACK 2
───────────────────────────────────────── */

export default function FeatureStack({
  eyebrow = 'Our Capabilities',
  headlineDark = HEADLINE_DARK,
  headlineMuted = HEADLINE_MUTED,
  headerTitle = 'What We Do',
  cards = DEFAULT_CARDS,
  showTitle = true,
  cardMediaHeight = null,
}) {
  return (
    <section className={`s2-section${showTitle ? '' : ' s2-section--no-title'}`}>

        {/* ── Large Title ── */}
        {showTitle && (
          <div className="s2-large-title">
            <Eyebrow className="anim-fade-up anim-delay-1">{eyebrow}</Eyebrow>
            <h2 className="s2-headline">{headlineDark}</h2>
          </div>
        )}

        {/* ── Cards Section ── */}
        <div className="s2-cards-section">

          {/* Header row */}
          <div className="s2-cards-header anim-fade-up anim-delay-2">
            <p className="s2-cards-title">{headerTitle}</p>
            <BtnSecondary as="a" href="#" icon={IconCornerDownRight} nudge="right">All Capabilities</BtnSecondary>
          </div>

          {/* Cards grid */}
          <div className="s2-cards-grid">
            {cards.map((card, i) => {
              const Wrapper = card.link ? 'a' : 'div';
              return (
                <Wrapper key={i} href={card.link ? '#' : undefined} className={`s2-card anim-fade-up ${card.delay ?? 'anim-delay-2'}`}>
                  {cardMediaHeight
                ? <div style={{ height: cardMediaHeight, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>{card.media}</div>
                : card.media}
                  <div className="s2-card-text">
                    <p className="s2-card-title">{card.title}</p>
                    <p className="s2-card-desc">{card.desc}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>

    </section>
  );
}
