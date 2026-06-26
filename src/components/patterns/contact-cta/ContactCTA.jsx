import { useState } from 'react';
import './ContactCTA.css';
import { BtnPrimary, IconCornerDownRight } from '../../ui/Button/Button';
import ContactModal from '../contact-modal/ContactModal';
import useReveal from '../../ui/hooks/useReveal';

/* ─────────────────────────────────────────
   LET'S TALK CTA
   Brand-ink contact card: eyebrow + headline top,
   a photo + name + "Book a Call" mini contact card
   pinned bottom-right. Card fades / rises into view
   as it scrolls in. Opens the canonical ContactModal.
───────────────────────────────────────── */
export default function ContactCTA({
  label = "Let's Talk",
  headline = <>Our longest standing<br />relationships started with<br />a single conversation.</>,
  contactName = 'Speak with Luke Bowler, our CMS lead.',
  contactPhoto,
  contactPhotoAlt = 'Luke Bowler',
  ctaLabel = 'Book a Call',
  links = [
    { label: 'Start a Project', href: '#' },
    { label: 'Send a Message', modal: true },
  ],
}) {
  const [sectionRef, visible] = useReveal(0.2);
  const [open, setOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      className={`ltc-section${visible ? ' is-visible' : ''}`}
    >
      <div className="ltc-inner">
        <span className="ltc-label">{label}</span>
        <div className="ltc-headline-wrap">
          <h2 className="ltc-headline">{headline}</h2>
        </div>
        <aside className="ltc-aside">
          <div className="ltc-contact">
            <button
              type="button"
              className="ltc-contact-photo-btn"
              onClick={() => setOpen(true)}
              aria-label={`Book a call with ${contactPhotoAlt}`}
            >
              <img src={contactPhoto} alt={contactPhotoAlt} className="ltc-contact-photo" />
            </button>
            <div className="ltc-contact-col">
              <div className="ltc-contact-text">
                <p className="ltc-contact-name">{contactName}</p>
              </div>
              <BtnPrimary onClick={() => setOpen(true)}>
                {ctaLabel}
              </BtnPrimary>
            </div>
          </div>
        </aside>

        {links.length > 0 && (
          <nav className="ltc-links" aria-label="Related links">
            {links.map((l) => {
              const inner = (
                <>
                  <span className="ltc-link-flip">
                    <span className="flip-a">{l.label}</span>
                    <span className="flip-b" aria-hidden="true">{l.label}</span>
                  </span>
                  <IconCornerDownRight />
                </>
              );
              return l.modal ? (
                <button key={l.label} type="button" className="ltc-link" onClick={() => setOpen(true)}>
                  {inner}
                </button>
              ) : (
                <a key={l.label} href={l.href} className="ltc-link">
                  {inner}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        personPhoto={contactPhoto}
        personName={contactPhotoAlt}
      />
    </section>
  );
}
