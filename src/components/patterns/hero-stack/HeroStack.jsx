import { useState, useRef } from 'react';
import './HeroStack.css';

import spinnerSrc from '../../ui/brand assets/spinner.svg';
import coverDigitalPlatforms from '../../ui/brand assets/cover-digital-platforms.jpg';
import { BtnPrimary, BtnIconAccent, IconCornerRightArrow } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10L8.5 14.5L16 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   ANIMATED BEAM
───────────────────────────────────────── */

function AnimatedBeam() {
  const beamPaths = [
    'M20,22  C80,22  120,65 154,65',
    'M20,65  C80,65  120,65 154,65',
    'M20,108 C80,108 120,65 154,65',
    'M154,65 C188,65 228,35 288,35',
    'M154,65 C188,65 228,95 288,95',
  ];

  return (
    <svg
      className="hs-beam-svg"
      viewBox="0 0 308 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {beamPaths.map((d, i) => (
        <path key={`t${i}`} className="hs-beam-track" d={d} />
      ))}
      {beamPaths.map((d, i) => (
        <path
          key={`b${i}`}
          className={`hs-beam-anim hs-beam-anim-${i + 1}`}
          pathLength="1"
          d={d}
        />
      ))}
      <circle cx="20"  cy="22"  r="10" className="hs-beam-node" />
      <circle cx="20"  cy="65"  r="10" className="hs-beam-node" />
      <circle cx="20"  cy="108" r="10" className="hs-beam-node" />
      <circle cx="154" cy="65"  r="16" className="hs-beam-node hs-beam-node--hub" />
      <circle cx="288" cy="35"  r="10" className="hs-beam-node" />
      <circle cx="288" cy="95"  r="10" className="hs-beam-node" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   EMAIL FIELD
───────────────────────────────────────── */

function EmailField() {
  const [email,      setEmail]      = useState('');
  const [status,     setStatus]     = useState('idle');
  const [arrowNudge, setArrowNudge] = useState(false);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || status !== 'idle') return;
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1400);
  }

  const isFilled = email.length > 0;

  if (status === 'success') {
    return (
      <div className="hs-email-form hs-email-form--success">
        <p className="hs-email-success-text">Your guide is on its way!</p>
        <div className="hs-email-submit hs-email-submit--black">
          <IconCheck />
        </div>
      </div>
    );
  }

  return (
    <form
      className={`hs-email-form${isFilled ? ' hs-email-form--active' : ''}`}
      onSubmit={handleSubmit}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <input
        ref={inputRef}
        type="email"
        className="hs-email-input"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className={`hs-email-submit${isFilled ? ' hs-email-submit--filled' : ''}`}
        onMouseEnter={() => setArrowNudge(true)}
      >
        {status === 'submitting' ? (
          <img src={spinnerSrc} alt="" className="hs-spinning" width="20" height="20" />
        ) : (
          <span
            style={{ animation: arrowNudge ? 'nudge-down 0.55s ease-in-out 1' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onAnimationEnd={() => setArrowNudge(false)}
          >
            <IconCornerRightArrow />
          </span>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────
   GUIDE CARD
───────────────────────────────────────── */

function GuideCard() {
  const [showEmail,  setShowEmail]  = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);

  function reveal() {
    setCtaPressed(true);
    setTimeout(() => setShowEmail(true), 280);
  }

  return (
    <aside className={`hs-card anim-fade-up anim-delay-4${showEmail ? ' hs-card--email' : ''}`}>
      <div className="hs-card-body">
        <img src={coverDigitalPlatforms} alt="" className="hs-card-cover" />
        <div className="hs-card-text">
          <p className="hs-card-title">What should we feature here?</p>
          <p className="hs-card-desc">
            That's going to make someone stop and engage in the topic of web apps for travel??
          </p>
        </div>
        {showEmail ? (
          <EmailField />
        ) : (
          <div
            className={`hs-card-btn${ctaPressed ? ' hs-card-btn--pressed' : ''}`}
            onAnimationEnd={() => setCtaPressed(false)}
          >
            <BtnPrimary onClick={reveal}>Get the Guide</BtnPrimary>
            <BtnIconAccent icon={IconCornerRightArrow} label="Download" nudge="down" onClick={reveal} />
          </div>
        )}
      </div>
      <div className="hs-card-footer">
        <p className="hs-card-meta">
          <span className="hs-card-meta-dark">Instant Access</span>
        </p>
      </div>
    </aside>
  );
}

const DEFAULT_EYEBROW  = 'What is Headless?';
const DEFAULT_HEADLINE = 'One platform powering your entire digital ecosystem, content, commerce, and experience unified without compromise.';
const DEFAULT_SUBHEAD  = 'A new way to think about content';
const DEFAULT_BODY     = [
  'Traditional CMSs lock your content into rigid templates and single-channel publishing. In a multi-platform world, that\'s a competitive disadvantage. Headless CMS liberates your content, allowing you to adapt faster and reach audiences wherever they are.',
  'We don\'t just implement Contentful or Sanity—we design content models that reflect your editorial workflow, integrate with your ecosystem, and scale as your needs evolve. Our approach blends content strategy with technical architecture.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque rutrum urna, vitae aliquet nunc vehicula sed.',
];

/* ─────────────────────────────────────────
   HERO STACK
───────────────────────────────────────── */

export default function HeroStack({
  eyebrow  = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
  subhead  = DEFAULT_SUBHEAD,
  body     = DEFAULT_BODY,
}) {
  return (
    <section className="hs-section">
      <div className="hs-container">

        <div className="hs-large-title">
          <Eyebrow className="hs-eyebrow anim-fade-up anim-delay-1">
            {eyebrow}
          </Eyebrow>
          <h2 className="hs-headline">{headline}</h2>
        </div>

        <div className="hs-split">
          <div className="hs-text">
            <h3 className="hs-text-heading anim-fade-up anim-delay-2">
              {subhead}
            </h3>
            <div className="hs-text-body anim-fade-up anim-delay-3">
              {body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <GuideCard />
        </div>

      </div>
    </section>
  );
}
