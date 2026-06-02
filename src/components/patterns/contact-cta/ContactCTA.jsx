import { useState } from 'react';
import './ContactCTA.css';

import profileImg from '../../ui/brand assets/therefore-int-luke-bowler.jpg';
import shaderImg  from '../../ui/brand assets/contact-cta-shader.svg';
import { BtnSecondary, BtnOutline } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

/* ─────────────────────────────────────────
   CONTACT CTA
───────────────────────────────────────── */
export default function ContactCTA() {
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

        {/* Shader image */}
        <img src={shaderImg} className="cta-shader" alt="" draggable="false" />

        <div className="cta-inner">

          {/* ── Left: content ── */}
          <div className="cta-left">
            <div className="cta-title-group">
              <Eyebrow tone="on-dark">We're ready when you are</Eyebrow>
              <div className="cta-title-content">
                <h2 className="cta-headline">
                  Ready to meet and see what's possible?
                </h2>
                <div className="cta-btn-list">
                  <BtnSecondary type="button">Schedule a Call</BtnSecondary>
                  <BtnOutline type="button" className="btn-outline--ghost">Watch Video</BtnOutline>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="cta-profile">
              <img
                src={profileImg}
                alt="Luke Bowler"
                className="cta-profile-photo"
                draggable="false"
              />
              <div className="cta-profile-info">
                <p className="cta-profile-name">Luke Bowler</p>
                <p className="cta-profile-role">Head of Client Services &amp; Growth</p>
              </div>
            </div>
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
                  <span className="cta-submit-label cta-submit-label--default">
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                  </span>
                  <span className="cta-submit-label cta-submit-label--sent">
                    Your Request is Sent!
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
