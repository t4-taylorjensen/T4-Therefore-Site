import { useState, useEffect, useRef } from 'react';
import './Nav.css';
import thereforeLogo from '../../ui/brand assets/therefore-logo.svg';
import FlipLink      from '../../ui/FlipLink';
import { BtnSecondary, IconCornerDownRight } from '../../ui/Button/Button';

const NAV_LINKS = ['CMS & Commerce', 'Digital Platforms', 'AI'];

const MENU = {
  main: ['CMS & Commerce', 'Digital Platforms', 'AI Solutions'],
  discover: [
    ['Work', 'Insights', 'About'],
    ['Culture', 'Insights', 'Contact'],
  ],
  contact: ['Send a message', 'hello@therefore.ca'],
};

// ─── Icons ───────────────────────────────────────────────────

function IconChevron() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true">
      <path d="M1 2L3 4L5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg className="close-svg" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path className="close-line close-line--a" d="M0.541016 16.5184L15.8457 0.518434" stroke="currentColor" strokeWidth="1.5"/>
      <path className="close-line close-line--b" d="M1.23633 0.518433L16.541 16.5184" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function IconBurger({ open }) {
  return (
    <span className={`burger-icon${open ? ' is-open' : ''}`} aria-hidden="true">
      <span className="burger-line burger-line--top" />
      <span className="burger-line burger-line--bottom" />
    </span>
  );
}


function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <g clipPath="url(#ig-clip)">
        <path d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z" fill="currentColor"/>
        <path d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z" fill="currentColor"/>
        <path d="M16.5391 4.6601C16.5391 5.32416 16 5.85932 15.3398 5.85932C14.6758 5.85932 14.1406 5.32025 14.1406 4.6601C14.1406 3.99603 14.6797 3.46088 15.3398 3.46088C16 3.46088 16.5391 3.99994 16.5391 4.6601Z" fill="currentColor"/>
      </g>
      <defs><clipPath id="ig-clip"><rect width="20" height="20" fill="white"/></clipPath></defs>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z" fill="currentColor"/>
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" aria-hidden="true">
      <path d="M17.3263 0H20.6998L13.3297 8.47179L22 20H15.2112L9.89404 13.0082L3.80995 20H0.434432L8.31743 10.9385L0 0H6.96111L11.7674 6.39077L17.3263 0ZM16.1423 17.9692H18.0116L5.94539 1.9241H3.93946L16.1423 17.9692Z" fill="currentColor"/>
    </svg>
  );
}

function IconClutch() {
  return (
    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" aria-hidden="true">
      <path d="M10.5271 6.24629e-06C11.0274 -0.000437743 11.4936 0.0227905 11.99 0.0687489C14.312 0.283705 16.5679 1.23261 18.3251 2.76294C18.445 2.86729 18.889 3.21276 18.9515 3.31584C18.9289 3.37596 18.6149 3.64547 18.5418 3.71493L16.7399 5.39659L16.0474 6.0444C15.9875 6.10035 15.6381 6.45048 15.5905 6.41595C15.3014 6.20638 15.0214 5.96443 14.7371 5.74841C13.7146 4.97134 12.4289 4.50717 11.1425 4.46344C8.30269 4.31492 5.61989 5.68112 4.90577 8.5999C4.54747 10.0603 4.78073 11.6025 5.5552 12.8931C6.37827 14.2368 7.68618 15.0564 9.20446 15.4159C10.991 15.8382 12.8735 15.5022 14.4013 14.4883C14.7645 14.2443 15.096 13.9374 15.4347 13.6603C15.4928 13.6128 15.534 13.5719 15.6004 13.5339C15.7056 13.6612 16.0287 13.9431 16.1679 14.0685C16.3351 14.2191 16.5427 14.4251 16.7096 14.5654C16.7445 14.6044 16.8227 14.6676 16.8667 14.7083C17.008 14.8404 17.1502 14.9715 17.2934 15.1014L18.4618 16.1727C18.6067 16.3053 18.8842 16.5455 19 16.6841C18.9013 16.7448 18.511 17.0958 18.407 17.1872C18.1376 17.426 17.8575 17.6524 17.5673 17.8655C15.8482 19.1067 13.8102 19.8364 11.6908 19.9696C8.60407 20.1731 5.63337 19.3625 3.28235 17.308C1.58446 15.8071 0.46751 13.7623 0.124999 11.5277C0.0781006 11.2363 0.041689 10.8086 0.0224008 10.5125C-0.153119 7.93484 0.708205 5.39351 2.41656 3.44852C4.17111 1.46035 6.82184 0.30258 9.44063 0.0739035C9.80551 0.0420446 10.1622 0.0239059 10.5271 6.24629e-06Z" fill="currentColor"/>
      <path d="M10.5982 6.66009C11.6045 6.67198 12.509 7.01453 13.2271 7.72964C13.849 8.34451 14.1953 9.18298 14.1882 10.0554C14.1852 11.8805 12.5564 13.318 10.7685 13.3683C10.6999 13.3703 10.6306 13.3696 10.5619 13.3694C8.6997 13.377 7.02417 11.9896 6.97602 10.0775C6.93343 8.3854 8.261 7.01193 9.8822 6.71477C10.1086 6.67328 10.3681 6.66633 10.5982 6.66009Z" fill="currentColor"/>
    </svg>
  );
}

// ─── Large display link with clean clip-path flip hover ───────
// Avoids FlipLink's overflow:hidden which causes subpixel bleed
// at large font sizes. Uses clip-path (GPU-composited) instead.
function DisplayLink({ children, active, dimmed, delay, onClick }) {
  return (
    <a
      href="#"
      className={[
        'nav-display-link',
        active  ? 'is-active' : '',
        dimmed  ? 'is-dimmed' : '',
      ].filter(Boolean).join(' ')}
      style={{ animationDelay: delay }}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      <span className="nav-display-link-a" aria-hidden="true">{children}</span>
      <span className="nav-display-link-b" aria-hidden="true">{children}</span>
      <span className="nav-display-link-sr">{children}</span>
    </a>
  );
}

function NavCta() {
  return (
    <BtnSecondary as="a" href="#" className="nav-cta-btn" aria-label="Start a Project">
      <span className="nav-cta-text">
        <span className="nav-cta-default nav-cta-desktop">Start a Project</span>
        <span className="nav-cta-default nav-cta-mobile">Start Project</span>
        <span className="nav-cta-hover">Let's Chat</span>
      </span>
    </BtnSecondary>
  );
}

// ─── Nav ─────────────────────────────────────────────────────

export default function Nav({ activePage = 'CMS & Commerce' }) {
  const [phase, setPhase]   = useState('closed');
  const closeTimerRef       = useRef(null);

  const isOpen    = phase === 'open';
  const isClosing = phase === 'closing';

  function handleOpen() {
    clearTimeout(closeTimerRef.current);
    setPhase('open');
  }

  function handleClose() {
    setPhase('closing');
    closeTimerRef.current = setTimeout(() => setPhase('closed'), 750);
  }

  useEffect(() => {
    document.body.style.overflow = phase !== 'closed' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && phase !== 'closed') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const overlayClass = [
    'nav-overlay',
    isOpen    ? 'is-open'    : '',
    isClosing ? 'is-closing' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className="nav">
        <div className="nav-col nav-col--left">
          <button
            className="nav-burger"
            type="button"
            aria-expanded={phase !== 'closed'}
            aria-controls="nav-overlay"
            aria-label="Open menu"
            onClick={handleOpen}
          >
            <IconBurger open={phase !== 'closed'} />
          </button>
          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_LINKS.map((label) => (
              <a key={label} href="#" className="nav-link">{label}</a>
            ))}
            <button
              className="nav-link nav-more"
              type="button"
              aria-expanded={phase !== 'closed'}
              aria-controls="nav-overlay"
              onClick={handleOpen}
            >
              More <IconChevron />
            </button>
          </nav>
        </div>

        <div className="nav-col nav-col--center">
          <img src={thereforeLogo} alt="Therefore" className="nav-logo" draggable="false" />
        </div>

        <div className="nav-col nav-col--right">
          <NavCta />
        </div>
      </header>

      {/* ── Full-height overlay menu ── */}
      <div id="nav-overlay" className={overlayClass} aria-hidden={phase === 'closed'}>

        {/* Blue curtain that sweeps through on open and close */}
        <div className="nav-overlay-curtain" aria-hidden="true" />

        {/* Mirror nav bar */}
        <div className="nav-overlay-bar">
          <button className="nav-overlay-close" type="button" aria-label="Close menu" onClick={handleClose}>
            <IconClose />
          </button>
          <img src={thereforeLogo} alt="Therefore" className="nav-logo" draggable="false" />
          <NavCta />
        </div>

        {/* Body */}
        <div className="nav-overlay-body">
          <div className="nav-overlay-top">

            {/* Left — huge display links */}
            <div className="nav-overlay-main-links">
              {MENU.main.map((label, i) => (
                <div key={label} className="nav-overlay-main-link-row">
                  <div className="nav-overlay-main-link-reveal">
                    <div
                      className="nav-overlay-main-link-rise"
                      style={{ animationDelay: `${370 + i * 65}ms` }}
                    >
                      <DisplayLink
                        active={label === activePage}
                        dimmed={activePage && label !== activePage}
                        delay={`${370 + i * 65}ms`}
                        onClick={handleClose}
                      >
                        {label}
                      </DisplayLink>
                    </div>
                  </div>
                  {label === activePage && (
                    <span className="nav-overlay-main-arrow">
                      <span className="icon-nudge icon-nudge--right">
                        <IconCornerDownRight />
                      </span>
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Right — Discover section */}
            <div className="nav-overlay-discover">
              <span className="nav-overlay-label">Discover</span>
              <div className="nav-overlay-discover-cols">
                {MENU.discover.map((col, ci) => (
                  <ul key={ci} className="nav-overlay-discover-col">
                    {col.map((item) => (
                      <li key={item}>
                        <FlipLink href="#" className="nav-overlay-discover-item" onClick={handleClose}>
                          {item}
                        </FlipLink>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom — contact + social */}
          <div className="nav-overlay-bottom">
            <div className="nav-overlay-group">
              <span className="nav-overlay-label">Contact</span>
              <ul className="nav-overlay-contact">
                {MENU.contact.map((item) => (
                  <li key={item}>
                    <FlipLink href="#" className="nav-overlay-contact-link">{item}</FlipLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-overlay-group">
              <span className="nav-overlay-label nav-overlay-label--social-desktop">Social</span>
              <div className="nav-overlay-social">
                <a href="#" className="nav-overlay-social-btn" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="nav-overlay-social-btn" aria-label="LinkedIn"><IconLinkedIn /></a>
                <a href="#" className="nav-overlay-social-btn" aria-label="X / Twitter"><IconTwitterX /></a>
                <a href="#" className="nav-overlay-social-btn" aria-label="Clutch"><IconClutch /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
