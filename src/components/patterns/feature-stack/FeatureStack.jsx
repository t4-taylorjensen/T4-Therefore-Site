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

/* ─────────────────────────────────────────
   STACK 2
───────────────────────────────────────── */

export default function FeatureStack() {
  const [iconNudge, setIconNudge] = useState(false);

  return (
    <section className="s2-section">

        {/* ── Large Title ── */}
        <div className="s2-large-title">
          <Eyebrow className="anim-fade-up anim-delay-1">Our Capabilities</Eyebrow>
          <ScrollRevealHeadline
            as="h2"
            className="s2-headline"
            text={HEADLINE_DARK}
            mutedText={HEADLINE_MUTED}
          />
        </div>

        {/* ── Cards Section ── */}
        <div className="s2-cards-section">

          {/* Header row */}
          <div className="s2-cards-header anim-fade-up anim-delay-2">
            <p className="s2-cards-title">What We Do</p>
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

            {/* Card 1: Discovery */}
            <a href="#" className="s2-card anim-fade-up anim-delay-2">
              <div className="s2-card-media s2-card-media--discovery" />
              <div className="s2-card-text">
                <p className="s2-card-title">Discovery</p>
                <p className="s2-card-desc">We help you make informed decisions about your digital future.</p>
              </div>
            </a>

            {/* Card 2: Digital Products */}
            <div className="s2-card anim-fade-up anim-delay-3">
              <div className="s2-card-media s2-card-media--digital">
                <img
                  className="media-fill"
                  src={coverDigitalProducts}
                  alt="New American Paintings — digital product preview"
                />
              </div>
              <div className="s2-card-text">
                <p className="s2-card-title">Digital Products</p>
                <p className="s2-card-desc">We build custom web-based applications bespoke to your needs.</p>
              </div>
            </div>

            {/* Card 3: Agentic Capabilities */}
            <div className="s2-card anim-fade-up anim-delay-4">
              <div className="s2-card-media s2-card-media--agentic">
                <img
                  className="s2-agentic-default"
                  src={coverAiCapabilities}
                  alt="Agentic system architecture"
                />
                <img
                  className="s2-agentic-hover"
                  src={coverAiCapabilitiesHover}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className="s2-card-text">
                <p className="s2-card-title">Agentic Capabilities</p>
                <p className="s2-card-desc">We design the system before choosing tools so your solution is cohesive built.</p>
              </div>
            </div>

          </div>
        </div>

    </section>
  );
}
