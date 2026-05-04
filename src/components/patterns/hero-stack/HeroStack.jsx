import { useState, useEffect, useRef } from 'react';
import './HeroStack.css';

import spinnerSrc from '../../ui/brand assets/spinner.svg';
import { BtnPrimary, BtnIconAccent, IconCornerRightArrow } from '../../ui/Button/Button';

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
        <AnimatedBeam />
        <div className="hs-card-text">
          <p className="hs-card-title">AI Content Operations Guide</p>
          <p className="hs-card-desc">
            Learn how to architect a modern content supply chain that leverages
            AI for creation, translation, and personalization.
          </p>
        </div>
        {showEmail ? (
          <EmailField />
        ) : (
          <div
            className={`hs-card-btn${ctaPressed ? ' hs-card-btn--pressed' : ''}`}
            onAnimationEnd={() => setCtaPressed(false)}
          >
            <BtnPrimary onClick={reveal}>Free download</BtnPrimary>
            <BtnIconAccent icon={IconCornerRightArrow} label="Download" nudge="down" onClick={reveal} />
          </div>
        )}
      </div>
      <div className="hs-card-footer">
        <p className="hs-card-meta">
          <span className="hs-card-meta-dark">Instant access</span>
          <span className="hs-card-meta-muted"> • PDF • 4.2 MB</span>
        </p>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────
   SCROLL-REVEAL HEADLINE
───────────────────────────────────────── */

const HEADLINE = 'One platform powering your entire digital ecosystem, content, commerce, and experience unified without compromise.';

function tokenize(text) {
  return text.split(' ').filter(Boolean).reduce((acc, w) => {
    if (/^[,\.;:!?]/.test(w) && acc.length > 0) { acc[acc.length - 1] += w; }
    else acc.push(w);
    return acc;
  }, []);
}

function HeadlineWords({ text }) {
  return tokenize(text).map((word, i) => (
    <span key={i} className="hs-word-wrap">
      <span className="hs-word-ghost" aria-hidden="true">{word}</span>
      <span className="hs-word-reveal" data-word={i}>{word}</span>
    </span>
  ));
}

/* ─────────────────────────────────────────
   HERO STACK
───────────────────────────────────────── */

export default function HeroStack() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const reveals = Array.from(el.querySelectorAll('.hs-word-reveal'));
    const n = reveals.length;
    let rafId;

    function update() {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;

      const progress = Math.min(1, Math.max(0,
        (0.9 * vh - rect.top) / (0.65 * vh)
      ));

      reveals.forEach((span, i) => {
        const start   = i / n;
        const end     = start + 1 / n;
        const opacity = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        span.style.opacity = opacity;
      });

      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="hs-section">
      <div className="hs-container">

        <div className="hs-large-title">
          <p className="hs-eyebrow anim-fade-up anim-delay-1">
            What is Headless?
          </p>
          <h2 className="hs-headline" ref={headlineRef}>
            <HeadlineWords text={HEADLINE} />
          </h2>
        </div>

        <div className="hs-split">
          <div className="hs-text">
            <h3 className="hs-text-heading anim-fade-up anim-delay-2">
              A new way to think about content
            </h3>
            <div className="hs-text-body anim-fade-up anim-delay-3">
              <p>Traditional CMSs lock your content into rigid templates and single-channel publishing. In a multi-platform world, that's a competitive disadvantage. Headless CMS liberates your content, allowing you to adapt faster and reach audiences wherever they are.</p>
              <p>We don't just implement Contentful or Sanity—we design content models that reflect your editorial workflow, integrate with your ecosystem, and scale as your needs evolve. Our approach blends content strategy with technical architecture.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque rutrum urna, vitae aliquet nunc vehicula sed.</p>
            </div>
          </div>
          <GuideCard />
        </div>

      </div>
    </section>
  );
}
