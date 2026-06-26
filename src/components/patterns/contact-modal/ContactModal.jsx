import { useState, useEffect } from 'react';
import './ContactModal.css';

import FormField from '../../ui/Form/FormField';
import Eyebrow from '../../ui/Eyebrow';
import { BtnDark, IconCornerDownRight } from '../../ui/Button/Button';
import { IconPlus } from '../../ui/icons';

/* ─────────────────────────────────────────
   CONTACT MODAL
   Promoted from an earlier "D — Airy Floating"
   exploration — the variant that was actually
   wired into CMS Page V2. The other 3 layout
   explorations (centered / split / drawer) have
   since been deleted.
───────────────────────────────────────── */

function useLockBody(open, onClose) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

function ContactFields() {
  const [status, setStatus] = useState('idle');

  function handleSubmit(e) {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('submitting');
    setTimeout(() => setStatus('sent'), 1200);
  }

  return (
    <form className="cm-form" onSubmit={handleSubmit}>
      <div className="cm-row">
        <FormField id="cm-name" label="Your name" autoFocus />
        <FormField id="cm-email" type="email" label="Email address" />
      </div>
      <FormField id="cm-company" label="Company" />
      <FormField id="cm-message" as="textarea" rows={2} label="Tell us about your project" />
      <BtnDark type="submit" className="cm-submit" icon={IconCornerDownRight} nudge="right" disabled={status !== 'idle'}>
        {status === 'submitting' ? 'Sending…' : status === 'sent' ? 'Message Sent' : 'Send Message'}
      </BtnDark>
    </form>
  );
}

export default function ContactModal({
  open,
  onClose,
  personPhoto,
  personName,
  personTitle = 'Head of Client Services & Growth',
}) {
  useLockBody(open, onClose);
  if (!open) return null;
  return (
    <div className="cm-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cm-panel" role="dialog" aria-modal="true" aria-label="Contact us">
        <div className="cm-head">
          <Eyebrow as="span">Let’s talk</Eyebrow>
          <button type="button" className="cm-close" onClick={onClose} aria-label="Close">
            <IconPlus className="cm-close-icon" />
          </button>
        </div>

        <div className="cm-grid">
          <div className="cm-intro">
            <h3 className="cm-headline">Tell us about your project.</h3>
            <p className="cm-body">
              We always respond within 24 hours. Talk to experts on our team
              who can help you work through your ideas.
            </p>
            {personName && (
              <div className="cm-byline">
                {personPhoto && <img src={personPhoto} alt="" className="cm-byline-photo" />}
                <span className="cm-byline-id">
                  <span className="cm-byline-name">{personName}</span>
                  {personTitle && <span className="cm-byline-title">{personTitle}</span>}
                </span>
              </div>
            )}
          </div>

          <div className="cm-form-col">
            <ContactFields />
          </div>
        </div>
      </div>
    </div>
  );
}
