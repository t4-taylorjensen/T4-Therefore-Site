import { useState, useEffect, useRef } from 'react';
import './Nav.css';
import thereforeLogo from '../../ui/brand assets/therefore-logo.svg';
import { BtnSecondary, BtnDark, IconCornerDownRight } from '../../ui/Button/Button';

const NAV_LINKS = ['CMS', 'Commerce', 'Platforms', 'AI'];

const LINKS = [
  'Capabilities',
  'Insights',
  'Culture',
  'Work',
  'Contact',
];

// ─── Icons ───────────────────────────────────────────────────

function IconPlus() {
  return (
    <svg className="plus-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  );
}

// Solid blue square, no icon, no radius
function Sq({ size = 8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <rect width="8" height="8" fill="#4297FF"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <g clipPath="url(#ig-nav)">
        <path d="M10 1.8C12.67 1.8 12.99 1.81 14.04 1.86C15.02 1.9 15.54 2.07 15.89 2.2C16.36 2.38 16.7 2.6 17.04 2.95C17.39 3.3 17.61 3.63 17.79 4.1C17.93 4.45 18.09 4.98 18.13 5.95C18.18 7.01 18.19 7.32 18.19 10C18.19 12.66 18.18 12.98 18.13 14.03C18.09 15.01 17.93 15.54 17.79 15.89C17.61 16.35 17.39 16.69 17.04 17.04C16.69 17.39 16.36 17.6 15.89 17.78C15.54 17.92 15.01 18.08 14.04 18.13C12.98 18.17 12.67 18.18 10 18.18C7.33 18.18 7.01 18.17 5.96 18.13C4.98 18.08 4.46 17.92 4.11 17.78C3.64 17.6 3.3 17.38 2.96 17.04C2.61 16.68 2.39 16.35 2.21 15.89C2.07 15.54 1.91 15 1.87 14.03C1.82 12.98 1.81 12.66 1.81 10C1.81 7.32 1.82 7.01 1.87 5.95C1.91 4.98 2.07 4.45 2.21 4.1C2.39 3.63 2.61 3.3 2.96 2.95C3.31 2.6 3.64 2.38 4.11 2.2C4.46 2.07 4.99 1.9 5.96 1.86C7.01 1.81 7.33 1.8 10 1.8ZM10 0C7.29 0 6.94.01 5.88.06C4.82.1 4.09.28 3.45.52C2.79.78 2.23 1.12 1.68 1.68C1.12 2.23.78 2.79.52 3.45C.28 4.09.1 4.81.06 5.88C.01 6.95 0 7.29 0 10C0 12.71.01 13.05.06 14.12C.1 15.18.28 15.91.52 16.55C.78 17.21 1.12 17.77 1.68 18.32C2.23 18.88 2.79 19.22 3.45 19.47C4.09 19.72 4.81 19.89 5.88 19.94C6.94 19.98 7.28 20 10 20C12.71 20 13.05 19.98 14.12 19.94C15.18 19.89 15.91 19.72 16.54 19.47C17.2 19.22 17.76 18.88 18.31 18.32C18.87 17.77 19.21 17.21 19.46 16.55C19.71 15.91 19.88 15.19 19.93 14.12C19.98 13.06 19.99 12.71 19.99 10C19.99 7.29 19.98 6.95 19.93 5.88C19.88 4.82 19.71 4.09 19.46 3.46C19.22 2.79 18.88 2.23 18.32 1.68C17.77 1.12 17.21.78 16.55.52C15.91.28 15.19.11 14.13.06C13.05.01 12.71 0 10 0Z" fill="currentColor"/>
        <path d="M10 4.86C7.16 4.86 4.86 7.16 4.86 10C4.86 12.84 7.16 15.14 10 15.14C12.84 15.14 15.14 12.84 15.14 10C15.14 7.16 12.84 4.86 10 4.86ZM10 13.33C8.16 13.33 6.67 11.84 6.67 10C6.67 8.16 8.16 6.67 10 6.67C11.84 6.67 13.33 8.16 13.33 10C13.33 11.84 11.84 13.33 10 13.33Z" fill="currentColor"/>
        <path d="M16.54 4.66C16.54 5.32 16 5.86 15.34 5.86C14.68 5.86 14.14 5.32 14.14 4.66C14.14 4 14.68 3.46 15.34 3.46C16 3.46 16.54 4 16.54 4.66Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="ig-nav"><rect width="20" height="20" fill="white"/></clipPath></defs>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M18.52 0H1.48C.66 0 0 .64 0 1.44V18.55C0 19.35.66 20 1.48 20H18.52C19.34 20 20 19.35 20 18.56V1.44C20 .64 19.34 0 18.52 0ZM5.93 17.04H2.96V7.5H5.93V17.04ZM4.45 6.2C3.5 6.2 2.73 5.43 2.73 4.48C2.73 3.53 3.5 2.76 4.45 2.76C5.4 2.76 6.17 3.53 6.17 4.48C6.17 5.42 5.4 6.2 4.45 6.2ZM17.04 17.04H14.08V12.4C14.08 11.3 14.06 9.87 12.54 9.87C10.99 9.87 10.76 11.08 10.76 12.32V17.04H7.8V7.5H10.64V8.8H10.68C11.07 8.05 12.04 7.26 13.48 7.26C16.49 7.26 17.04 9.23 17.04 11.8V17.04Z" fill="currentColor"/>
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg width="14" height="14" viewBox="0 0 22 20" fill="none" aria-hidden="true">
      <path d="M17.33 0H20.7L13.33 8.47L22 20H15.21L9.89 13.01L3.81 20H.43L8.32 10.94L0 0H6.96L11.77 6.39L17.33 0ZM16.14 17.97H18.01L5.95 1.92H3.94L16.14 17.97Z" fill="currentColor"/>
    </svg>
  );
}

function IconClutch() {
  return (
    <svg width="14" height="14" viewBox="0 0 19 20" fill="none" aria-hidden="true">
      <path d="M10.527 0c.5 0 .967.023 1.463.069C14.312.284 16.568 1.233 18.325 2.763c.12.104.564.45.627.553-.023.06-.337.33-.41.399l-1.802 1.681-.692.648c-.06.056-.41.4-.457.366-.289-.21-.569-.45-.853-.666C13.715 4.971 12.429 4.507 11.143 4.464 8.303 4.315 5.62 5.681 4.906 8.6c-.358 1.46-.125 3.002.649 4.293.823 1.343 2.131 2.163 3.649 2.522 1.787.422 3.669.087 5.197-.927.363-.244.695-.55 1.033-.827.058-.048.1-.088.166-.126.105.127.428.41.567.533.168.151.375.357.542.497.035.04.113.103.157.143.141.132.283.263.426.393l1.168 1.072c.145.132.422.372.538.511-.099.06-.489.411-.593.503-.27.238-.55.465-.84.678-1.719 1.241-3.757 1.971-5.876 2.104-3.087.204-6.058-.607-8.409-2.661-1.698-1.501-2.815-3.546-3.157-5.78a13.7 13.7 0 0 1-.103-1.005C-.153 7.935.708 5.394 2.417 3.449 4.171 1.46 6.822.303 9.441.074 9.806.042 10.162.024 10.527 0Z" fill="currentColor"/>
      <path d="M10.598 6.66c1.006.012 1.911.355 2.629 1.07.622.615.968 1.453.961 2.326-.003 1.825-1.632 3.262-3.42 3.312-.069.002-.138.001-.207.001-1.862.008-3.537-1.38-3.585-3.292-.043-1.692 1.285-3.066 2.906-3.363.226-.041.486-.048.716-.054Z" fill="currentColor"/>
    </svg>
  );
}

function NavCta() {
  return (
    <BtnSecondary as="a" href="#" className="nav-cta-btn" aria-label="Start a Project">
      <span className="nav-cta-text">
        <span className="nav-cta-default nav-cta-desktop">Start a Project</span>
        <span className="nav-cta-default nav-cta-mobile">Start Project</span>
        <span className="nav-cta-hover">Let's Chat<IconCornerDownRight className="nav-cta-arrow" /></span>
      </span>
    </BtnSecondary>
  );
}

// ─── Shared link row ─────────────────────────────────────────
// Square is width:0 by default; expands on hover/active to push text right.
function PanelLink({ label, active, onClose, className = '' }) {
  return (
    <a
      href="#"
      className={['dp-link', active ? 'is-active' : '', className].filter(Boolean).join(' ')}
      onClick={onClose}
      aria-current={active ? 'page' : undefined}
    >
      <span className="dp-sq"><Sq /></span>
      <span className="dp-label-flip">
        <span className="dp-label" aria-hidden="true">{label}</span>
        <span className="dp-label dp-label-b" aria-hidden="true">{label}</span>
      </span>
      <span className="dp-link-sr">{label}</span>
    </a>
  );
}

// ─── Social row ───────────────────────────────────────────────
function Social({ className = '' }) {
  return (
    <div className={`dp-social ${className}`}>
      <a href="#" className="dp-social-link" aria-label="Instagram"><IconInstagram /></a>
      <a href="#" className="dp-social-link" aria-label="LinkedIn"><IconLinkedIn /></a>
      <a href="#" className="dp-social-link" aria-label="X / Twitter"><IconTwitterX /></a>
      <a href="#" className="dp-social-link" aria-label="Clutch"><IconClutch /></a>
    </div>
  );
}

// ─── Panel CTA — BtnDark scaled to fit the side column ───────
function ContactCta({ onClose }) {
  return (
    <BtnDark as="a" href="#" icon={IconCornerDownRight} nudge="right" className="dp-side-cta" onClick={onClose}>
      Contact Us
    </BtnDark>
  );
}


/* Shared right side — used by all panels */
function PanelSide({ onClose }) {
  return (
    <div className="dp-side">
      <div className="dp-side-body">
        <span className="dp-eyebrow">Start a Project</span>
        <ContactCta onClose={onClose} />
      </div>
      <Social />
    </div>
  );
}

function DropdownPanel({ activePage, onClose }) {
  return (
    <div className="dp dp-2">
      <div className="dp-links">
        {LINKS.map(l => (
          <PanelLink key={l} label={l} active={l === activePage} onClose={onClose} />
        ))}
      </div>
      <PanelSide onClose={onClose} />
    </div>
  );
}

// ─── Mobile menu — full-width panel, shown <=1100px ───────────
function MobileMenu({ activePage, onClose, isOpen, isClosing, isCompact }) {
  const panelClass = [
    'mobile-menu',
    isCompact ? 'is-enabled' : '',  // display:flex only in compact mode (see CSS note)
    isOpen    ? 'is-open'    : '',
    isClosing ? 'is-closing' : '',
  ].filter(Boolean).join(' ');

  return (
    <div id="mobile-menu" className={panelClass} aria-hidden={!isOpen}>
      <div className="mm-inner">
        <div className="mm-section mm-section--primary">
          {NAV_LINKS.map(l => (
            <PanelLink key={l} label={l} active={l === activePage} onClose={onClose} className="mm-link-primary" />
          ))}
        </div>

        <div className="mm-divider" />

        <div className="mm-section mm-section--secondary">
          {LINKS.map(l => (
            <PanelLink key={l} label={l} active={l === activePage} onClose={onClose} className="mm-link-secondary" />
          ))}
        </div>

        <div className="mm-foot">
          <span className="mm-foot-eyebrow">Start a Project</span>
          <div className="mm-foot-actions">
            <ContactCta onClose={onClose} />
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Nav ─────────────────────────────────────────────────────

export default function Nav({ activePage = null, forceOpen = false }) {
  const [phase, setPhase]       = useState(forceOpen ? 'open' : 'closed');
  const [isCompact, setIsCompact] = useState(false);
  const closeTimerRef        = useRef(null);
  const hoverDelayRef        = useRef(null);
  const headerRef            = useRef(null);
  const linksMeasureRef      = useRef(null);
  const logoRef               = useRef(null);
  const ctaColRef             = useRef(null);
  const [navTheme, setNavTheme] = useState('light');

  const isOpen    = phase === 'open';
  const isClosing = phase === 'closing';

  // Frosted nav glass adapts to whatever's scrolled underneath it —
  // sections can opt in via data-nav-theme="dark" on themselves.
  useEffect(() => {
    function evaluateTheme() {
      const headerEl = headerRef.current;
      if (!headerEl) return;
      const rect = headerEl.getBoundingClientRect();
      const probeX = window.innerWidth / 2;
      const probeY = rect.bottom + 4;
      const prevPE = headerEl.style.pointerEvents;
      headerEl.style.pointerEvents = 'none';
      const el = document.elementFromPoint(probeX, probeY);
      headerEl.style.pointerEvents = prevPE;
      const themed = el ? el.closest('[data-nav-theme]') : null;
      setNavTheme(themed ? themed.dataset.navTheme : 'light');
    }
    evaluateTheme();
    window.addEventListener('scroll', evaluateTheme, { passive: true });
    window.addEventListener('resize', evaluateTheme);
    return () => {
      window.removeEventListener('scroll', evaluateTheme);
      window.removeEventListener('resize', evaluateTheme);
    };
  }, []);

  // Collapse to "Menu +" only once the primary links would actually
  // overlap the centered logo — measured live, not a fixed breakpoint.
  useEffect(() => {
    const SAFETY      = 28;   // breathing room either side of the logo
    const MIN_FULL_NAV = 1200; // keep the full menu visible down to this width

    function recompute() {
      const measureEl = linksMeasureRef.current;
      const logoEl    = logoRef.current;
      const ctaEl     = ctaColRef.current;
      const headerEl  = headerRef.current;
      if (!measureEl || !logoEl || !ctaEl || !headerEl) return;

      const headerWidth = headerEl.getBoundingClientRect().width;
      const logoRect    = logoEl.getBoundingClientRect();

      // Bail on degenerate (pre-layout / pre-font) reads. On first paint
      // and during HMR re-runs the rects can all be 0, and `0 + SAFETY > 0`
      // evaluates as "overlap" — which silently flipped the bar to compact
      // "Menu +" off garbage measurements and could stick there. Wait for
      // a real layout before deciding anything.
      if (!headerWidth || !logoRect.width || !measureEl.scrollWidth) return;

      if (headerWidth >= MIN_FULL_NAV) {
        setIsCompact(false);
        return;
      }

      // Measure the links' intrinsic right edge as (start + scrollWidth)
      // rather than reading the last child's rendered rect. In compact
      // mode the measure box is clipped to width:0/visibility:hidden, so
      // the child's rect collapses toward the start — making the reading
      // depend on the very state it's deciding, which left the bar stuck
      // in compact "Menu +" even at full width. scrollWidth reports the
      // true content width regardless of the clip, so the decision is now
      // stable and the full nav reliably returns when there's room.
      const measureRect = measureEl.getBoundingClientRect();
      // Include the "More" trigger that sits right after the measured
      // links — it's the actual right-most item on the left side, so
      // leaving it out let it slide over the centered logo before the
      // bar ever collapsed. nextElementSibling is .nav-more-wrapper;
      // its panel is position:absolute so offsetWidth is just the button.
      const moreEl = measureEl.nextElementSibling;
      const GAP = 24; // approx expanded gap between links and the trigger
      const linksRight = measureRect.left + measureEl.scrollWidth
        + (moreEl ? GAP + moreEl.offsetWidth : 0);

      // Measure the CTA *button's* left edge, not the column's. The right
      // column is flex:1 with the center logo taken out of flow, so the
      // column box spans from the horizontal center to the right edge —
      // its left edge sits right on top of the logo, making the old
      // `ctaLeft < logoRect.right` test true at every width and forcing
      // the bar permanently compact below the 1200px early-return. The
      // button itself is justified hard right, so its left edge is the
      // real thing that could collide with the logo.
      const ctaContent = ctaEl.firstElementChild || ctaEl;
      const ctaLeft    = ctaContent.getBoundingClientRect().left;

      const overlapsLeft  = linksRight + SAFETY > logoRect.left;
      const overlapsRight = ctaLeft - SAFETY < logoRect.right;
      setIsCompact(overlapsLeft || overlapsRight);
    }

    recompute();
    // Re-check once fonts swap in (custom font metrics differ from the
    // fallback used on first paint, which can briefly misreport widths)
    document.fonts?.ready?.then(recompute);
    requestAnimationFrame(() => requestAnimationFrame(recompute));

    const ro = new ResizeObserver(recompute);
    [headerRef, linksMeasureRef, logoRef, ctaColRef].forEach((ref) => {
      if (ref.current) ro.observe(ref.current);
    });
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, []);

  function handleOpen() {
    clearTimeout(closeTimerRef.current);
    clearTimeout(hoverDelayRef.current);
    setPhase('open');
  }

  function handleClose() {
    if (forceOpen) return; // keep open in story mode
    setPhase('closing');
    closeTimerRef.current = setTimeout(() => setPhase('closed'), 380);
  }

  // Hover-to-open is a mouse affordance only. On touch/pen, a tap
  // synthesizes pointerenter → click → pointerleave; if hover drove
  // open/close, that sequence opened then immediately closed the panel
  // (so it read as "the dropdown won't open" on tablet/mobile). Gating
  // hover to fine pointers leaves the click handler as the single,
  // reliable toggle on touch — the dropdown now opens at every viewport.
  function handleHoverEnter(e) {
    if (e && e.pointerType && e.pointerType !== 'mouse') return;
    clearTimeout(hoverDelayRef.current);
    if (phase !== 'open') handleOpen();
  }

  function handleHoverLeave(e) {
    if (e && e.pointerType && e.pointerType !== 'mouse') return;
    hoverDelayRef.current = setTimeout(handleClose, 120);
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && phase !== 'closed') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  useEffect(() => () => {
    clearTimeout(closeTimerRef.current);
    clearTimeout(hoverDelayRef.current);
  }, []);

  const panelClass = [
    'nav-panel',
    isOpen    ? 'is-open'    : '',
    isClosing ? 'is-closing' : '',
  ].filter(Boolean).join(' ');

  const panelProps = { activePage, onClose: handleClose };

  const moreLabel = isCompact ? 'Menu' : 'More';

  return (
    <div className="nav-root">
      <header ref={headerRef} className={['nav', !activePage ? 'nav--no-active' : '', isCompact ? 'nav--compact' : '', navTheme === 'dark' ? 'nav--theme-dark' : ''].filter(Boolean).join(' ')}>
        <div className="nav-col nav-col--left">
          <nav className={['nav-links', isCompact ? 'is-collapsed' : ''].filter(Boolean).join(' ')} aria-label="Primary navigation">
            <div className="nav-links-measure" ref={linksMeasureRef} aria-hidden={isCompact || undefined}>
              {NAV_LINKS.map((label) => (
                <a
                  key={label}
                  href="#"
                  tabIndex={isCompact ? -1 : undefined}
                  className={['nav-link', label === activePage ? 'is-active' : ''].filter(Boolean).join(' ')}
                  aria-current={label === activePage ? 'page' : undefined}
                >
                  <span className="nav-link-flip">
                    <span className="nav-link-a" aria-hidden="true">{label}</span>
                    <span className="nav-link-b" aria-hidden="true">{label}</span>
                  </span>
                  <span className="nav-link-sr">{label}</span>
                </a>
              ))}
            </div>
            <div
              className="nav-more-wrapper"
              onPointerEnter={handleHoverEnter}
              onPointerLeave={handleHoverLeave}
            >
              <button
                className="nav-link nav-more"
                type="button"
                aria-expanded={phase !== 'closed'}
                aria-controls="nav-panel"
                onClick={phase !== 'closed' ? handleClose : handleOpen}
              >
                <span className="nav-link-flip">
                  <span className="nav-link-a" aria-hidden="true">{moreLabel}</span>
                  <span className="nav-link-b" aria-hidden="true">{moreLabel}</span>
                </span>
                <span className="nav-link-sr">{moreLabel}</span>
                <IconPlus />
              </button>

              {/* Panel — absolutely positioned below the More button */}
              <div
                id="nav-panel"
                className={panelClass}
                aria-hidden={phase === 'closed'}
              >
                <DropdownPanel {...panelProps} />
              </div>
            </div>
          </nav>
        </div>

        <div className="nav-col nav-col--center">
          <img ref={logoRef} src={thereforeLogo} alt="Therefore" className="nav-logo" draggable="false" />
        </div>

        <div className="nav-col nav-col--right" ref={ctaColRef}>
          <NavCta />
        </div>
      </header>

      <MobileMenu activePage={activePage} onClose={handleClose} isOpen={isOpen} isClosing={isClosing} isCompact={isCompact} />

      <div
        className={['nav-backdrop', phase !== 'closed' ? 'is-visible' : ''].filter(Boolean).join(' ')}
        onClick={handleClose}
        aria-hidden="true"
      />
    </div>
  );
}
