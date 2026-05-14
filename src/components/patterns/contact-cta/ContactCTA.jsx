import { useState } from 'react';
import './ContactCTA.css';

import { BtnSecondary, BtnGhost } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

/* ─────────────────────────────────────────
   CONTACT CTA
───────────────────────────────────────── */
export default function ContactCTA({
  eyebrow,
  headline,
  primaryCta,
  secondaryCta,
  profileImage,
  profileName,
  profileRole,
  videoSrc      = '/cta-video.mp4',
  submitLabels  = { idle: 'Send Message', submitting: 'Sending…', success: 'Request is Sent' },
}) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', company: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1400);
  }

  return (
    <section className="cta-section">
      <div className="cta-card">

        {/* Shader video — autoplay/muted/looping, no controls */}
        {videoSrc && (
          <video
            src={videoSrc}
            className="cta-shader"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}

        <div className="cta-inner">

          {/* ── Left: content ── */}
          <div className="cta-left">
            <div className="cta-title-group">
              {eyebrow && <Eyebrow tone="on-dark">{eyebrow}</Eyebrow>}
              <div className="cta-title-content">
                {headline && (
                  <h2 className="cta-headline">{headline}</h2>
                )}
                {(primaryCta || secondaryCta) && (
                  <div className="cta-btn-list">
                    {primaryCta && (
                      <BtnSecondary type="button">{primaryCta}</BtnSecondary>
                    )}
                    {secondaryCta && (
                      <BtnGhost type="button">{secondaryCta}</BtnGhost>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile */}
            {(profileImage || profileName) && (
              <div className="cta-profile">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt={profileName || ''}
                    className="cta-profile-photo"
                    draggable="false"
                  />
                )}
                <div className="cta-profile-info">
                  {profileName && <p className="cta-profile-name">{profileName}</p>}
                  {profileRole && <p className="cta-profile-role">{profileRole}</p>}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: form ── */}
          <div className="cta-form-panel">
            {(
              <form className="cta-form" onSubmit={handleSubmit} noValidate>
                <div className="cta-fields">

                  <div className="cta-field-row">
                    <div className="cta-field">
                      <label className="cta-field-label" htmlFor="cta-firstName">
                        First Name
                      </label>
                      <input
                        id="cta-firstName"
                        name="firstName"
                        type="text"
                        className="cta-input"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="cta-field">
                      <label className="cta-field-label" htmlFor="cta-lastName">
                        Last Name
                      </label>
                      <input
                        id="cta-lastName"
                        name="lastName"
                        type="text"
                        className="cta-input"
                        placeholder="Enter your last name"
                        value={form.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="cta-field-row">
                    <div className="cta-field">
                      <label className="cta-field-label" htmlFor="cta-email">
                        Email
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        className="cta-input"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                    <div className="cta-field">
                      <label className="cta-field-label" htmlFor="cta-company">
                        Company
                      </label>
                      <input
                        id="cta-company"
                        name="company"
                        type="text"
                        className="cta-input"
                        placeholder="Your company name"
                        value={form.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                </div>

                <div className="cta-field">
                  <label className="cta-field-label" htmlFor="cta-message">
                    Tell us about your project or vision
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    className="cta-textarea"
                    placeholder="E.g. website redesign, app launch, branding support…"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className={`cta-submit${status === 'success' ? ' cta-submit--sent' : ''}`}
                  disabled={status !== 'idle'}
                >
                  <span className="cta-submit-label">
                    {status === 'success'
                      ? submitLabels.success
                      : status === 'submitting'
                        ? submitLabels.submitting
                        : submitLabels.idle}
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
