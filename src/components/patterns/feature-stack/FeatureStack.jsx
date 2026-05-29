import { useState } from 'react';
import './FeatureStack.css';

import coverDigitalProducts    from '../../ui/brand assets/cover-digital-products.jpg';
import coverAiCapabilities     from '../../ui/brand assets/cover-ai-capabilities.svg';
import coverAiCapabilitiesHover from '../../ui/brand assets/cover-ai-capabilities-hover.svg';
import { IconCornerDownRight } from '../../ui/Button/Button';
import ScrollRevealHeadline from '../../ui/ScrollRevealHeadline';
import Eyebrow from '../../ui/Eyebrow';

const HEADLINE_DARK  = 'We design content models that reflect real workflows';
const HEADLINE_MUTED = ', integrate with your ecosystem, and scale as your business evolves.';

const DEFAULT_CARDS = [
  {
    title: 'Discovery',
    desc: 'We help you make informed decisions about your digital future.',
    media: <div className="s2-card-media s2-card-media--discovery" />,
    link: true,
    delay: 'anim-delay-2',
  },
  {
    title: 'Digital Products',
    desc: 'We build custom web-based applications bespoke to your needs.',
    media: (
      <div className="s2-card-media s2-card-media--digital">
        <img className="media-fill" src={coverDigitalProducts} alt="New American Paintings — digital product preview" />
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
  const [iconNudge, setIconNudge] = useState(false);

  return (
    <section className={`s2-section${showTitle ? '' : ' s2-section--no-title'}`}>

        {/* ── Large Title ── */}
        {showTitle && (
          <div className="s2-large-title">
            <Eyebrow className="anim-fade-up anim-delay-1">{eyebrow}</Eyebrow>
            <ScrollRevealHeadline
              as="h2"
              className="s2-headline"
              text={headlineDark}
              mutedText={headlineMuted}
            />
          </div>
        )}

        {/* ── Cards Section ── */}
        <div className="s2-cards-section">

          {/* Header row */}
          <div className="s2-cards-header anim-fade-up anim-delay-2">
            <p className="s2-cards-title">{headerTitle}</p>
            <a
              href="#"
              className="s2-btn-sm"
              onMouseEnter={() => setIconNudge(true)}
            >
              <span className="s2-btn-sm-label">All Capabilities</span>
              <span
                className="s2-btn-sm-icon"
                style={{ animation: iconNudge ? 'nudge-right 0.55s ease-in-out 1' : 'none' }}
                onAnimationEnd={() => setIconNudge(false)}
              >
                <IconCornerDownRight />
              </span>
            </a>
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
