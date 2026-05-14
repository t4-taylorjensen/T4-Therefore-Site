import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

import Eyebrow from '../../ui/Eyebrow';

function PlusIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="5" fill="white"/>
      <path d="M19.9998 14.1665V25.8332M14.1665 19.9998H25.8332" stroke="#121212" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="5" fill="#F2F2F2"/>
      <path d="M14.1665 20H25.8332" stroke="#121212" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────── */

function FAQItem({ faq, index, isOpen, onToggle }) {
  const id        = `faq-answer-${index}`;
  const triggerId = `faq-trigger-${index}`;
  const wrapRef   = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.height = isOpen ? `${el.scrollHeight}px` : '0px';
  }, [isOpen]);

  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        id={triggerId}
        className="faq-trigger"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
      >
        <p className="faq-question-text">{faq.question}</p>
        <div className="faq-icon" aria-hidden="true">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </button>

      <div
        id={id}
        ref={wrapRef}
        role="region"
        aria-labelledby={triggerId}
        className={`faq-answer-wrap${isOpen ? ' open' : ''}`}
      >
        <p className="faq-answer">{faq.answer}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */

function InsightSidebar({ image, imageAlt, category, title, href = '#' }) {
  if (!image && !title) return null;
  return (
    <aside className="faq-sidebar">
      <a href={href} className="faq-sidebar-card">
        {image && (
          <div className="faq-sidebar-image-wrap">
            <img
              className="faq-sidebar-image"
              src={image}
              alt={imageAlt || ''}
            />
          </div>
        )}
        <div className="faq-sidebar-body">
          {category && (
            <div className="faq-sidebar-category">
              <span>{category}</span>
            </div>
          )}
          {title && <p className="faq-sidebar-title">{title}</p>}
        </div>
      </a>
    </aside>
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */

export default function FAQ({
  eyebrow,
  headline,
  faqs = [],
  sidebar,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  function handleToggle(i) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  return (
    <section className="faq-section">
      <div className="faq-left">

        {/* Header */}
        <div className="faq-header">
          {eyebrow && <Eyebrow className="faq-eyebrow">{eyebrow}</Eyebrow>}
          {headline && <p className="faq-headline">{headline}</p>}
        </div>

        {/* Accordion */}
        <div className={`faq-accordion${openIndex !== null ? ' has-open' : ''}`}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

      </div>

      {sidebar && <InsightSidebar {...sidebar} />}
    </section>
  );
}
