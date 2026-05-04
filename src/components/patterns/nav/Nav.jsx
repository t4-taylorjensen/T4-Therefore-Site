import { useState, useEffect } from 'react';
import './Nav.css';
import thereforeLogo from '../../ui/brand assets/therefore-logo.svg';

const NAV_LINKS = ['Headless CMS', 'Digital Products', 'AI'];

const MENU = {
  main: [
    { col: ['Headless CMS', 'Digital Products', 'AI'] },
    { col: ['Work', 'Insights', 'About'] },
  ],
  discover: ['Work', 'Culture', 'Contact'],
  contact: ['Send a message', 'hello@therefore.ca'],
};

function IconChevron() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true">
      <path d="M1 2L3 4L5 2" stroke="rgba(18,18,18,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2L14 14M14 2L2 14" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="5" stroke="#121212" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3.5" stroke="#121212" strokeWidth="1.5" />
      <circle cx="14.5" cy="5.5" r="1" fill="#121212" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="3" stroke="#121212" strokeWidth="1.5" />
      <path d="M6 8.5V14" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="6.5" r="0.75" fill="#121212" />
      <path d="M9.5 14V11c0-1.38 1-2.5 2.5-2.5S14 9.62 14 11v3" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="nav">
        <img src={thereforeLogo} alt="Therefore" className="nav-logo" draggable="false" />

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_LINKS.map((label) => (
            <a key={label} href="#" className="nav-link">{label}</a>
          ))}
          <button
            className="nav-link nav-more"
            type="button"
            aria-expanded={open}
            aria-controls="nav-overlay"
            onClick={() => setOpen(true)}
          >
            More
            <IconChevron />
          </button>
        </nav>

        <a href="#" className="nav-cta">Start a Project</a>
      </header>

      {/* ── Full-height overlay menu ── */}
      <div
        id="nav-overlay"
        className={`nav-overlay${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        {/* Mirror of the nav bar */}
        <div className="nav-overlay-bar">
          <img src={thereforeLogo} alt="Therefore" className="nav-logo" draggable="false" />

          <button
            className="nav-overlay-close"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <IconClose />
          </button>

          <a href="#" className="nav-cta">Start a Project</a>
        </div>

        {/* Main content */}
        <div className="nav-overlay-body">

          <div className="nav-overlay-top">

            {/* MAIN section */}
            <div className="nav-overlay-group">
              <span className="nav-overlay-label">Main</span>
              <div className="nav-overlay-cols">
                {MENU.main.map((group, i) => (
                  <ul key={i} className="nav-overlay-col">
                    {group.col.map((item) => (
                      <li key={item}>
                        <a href="#" className="nav-overlay-item" onClick={() => setOpen(false)}>{item}</a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* DISCOVER section */}
            <div className="nav-overlay-group">
              <span className="nav-overlay-label">Discover</span>
              <ul className="nav-overlay-col">
                {MENU.discover.map((item) => (
                  <li key={item}>
                    <a href="#" className="nav-overlay-item" onClick={() => setOpen(false)}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom row */}
          <div className="nav-overlay-bottom">

            {/* CONTACT */}
            <div className="nav-overlay-group">
              <span className="nav-overlay-label">Contact</span>
              <ul className="nav-overlay-contact">
                {MENU.contact.map((item) => (
                  <li key={item}>
                    <a href="#" className="nav-overlay-contact-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIAL */}
            <div className="nav-overlay-group">
              <span className="nav-overlay-label">Social</span>
              <div className="nav-overlay-social">
                <a href="#" className="nav-overlay-social-btn" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="nav-overlay-social-btn" aria-label="LinkedIn"><IconLinkedIn /></a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
