import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

import sidebarImg from '../../ui/brand assets/therefore-int-media-placeholder.jpg';
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
   FAQ DATA
───────────────────────────────────────── */

const DEFAULT_EYEBROW = 'Headless Commerce FAQs';

const DEFAULT_FAQS = [
  {
    question: 'What is headless commerce?',
    answer:
      'Headless commerce separates the frontend experience from backend systems. This allows enterprises to manage content, commerce, and integrations independently, creating greater flexibility, faster performance, and long-term scalability.',
  },
  {
    question: 'When does headless make sense?',
    answer:
      'Headless is most effective for organizations with complex integrations, multi-channel requirements, or growth plans that exceed the limits of all-in-one platforms. It becomes valuable when flexibility and scalability outweigh simplicity.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Enterprise implementations typically range from 12 to 20 weeks, depending on integration complexity, content modeling, and migration scope. A phased approach can accelerate time to value while long-term architecture evolves.',
  },
  {
    question: 'How does headless connect to existing systems?',
    answer:
      'Headless integrates through APIs, allowing CMS, commerce engines, CRM, ERP, PIM, and other platforms to operate as a unified system. The architecture is designed to support existing workflows while improving flexibility and performance.',
  },
  {
    question: 'Is headless right for mid-sized enterprises?',
    answer:
      'Headless can be the right choice for mid-sized enterprises with growing complexity, multiple digital channels, or long-term scalability goals. For smaller organizations with simple requirements, a monolithic platform may remain sufficient.',
  },
];

/* ─────────────────────────────────────────
   ACCORDION ITEM
   variant="sidebar" — boxed plus/minus icon, height via scrollHeight
   variant="inline"  — thin plus/minus lines, maxHeight, optional
                       scroll-reveal stagger (reveal prop)
───────────────────────────────────────── */

function FAQItem({ faq, index, isOpen, onToggle, variant, reveal }) {
  const id        = `faq-answer-${index}`;
  const triggerId = `faq-trigger-${index}`;
  const wrapRef   = useRef(null);
  const rowRef    = useRef(null);
  const [visible, setVisible] = useState(!reveal);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (variant === 'inline') {
      el.style.maxHeight = isOpen ? `${el.scrollHeight}px` : '0px';
    } else {
      el.style.height = isOpen ? `${el.scrollHeight}px` : '0px';
    }
  }, [isOpen, variant]);

  useEffect(() => {
    if (!reveal) return;
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal]);

  if (variant === 'inline') {
    return (
      <div
        ref={rowRef}
        className={`faq-inline-row${isOpen ? ' is-open' : ''}${visible ? ' is-visible' : ''}`}
        style={reveal ? { transitionDelay: `${index * 110}ms` } : undefined}
      >
        <button className="faq-inline-trigger" onClick={onToggle} aria-expanded={isOpen}>
          <p className="faq-inline-question">{faq.question}</p>
          <span className="faq-inline-plus" />
        </button>
        <div className="faq-inline-panel" ref={wrapRef}>
          <p className="faq-inline-answer">{faq.answer}</p>
        </div>
      </div>
    );
  }

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

function InsightSidebar() {
  return (
    <aside className="faq-sidebar">
      <a href="#" className="faq-sidebar-card">
        <div className="faq-sidebar-image-wrap">
          <img
            className="faq-sidebar-image"
            src={sidebarImg}
            alt="Agentic Commerce article"
          />
        </div>
        <div className="faq-sidebar-body">
          <div className="faq-sidebar-category">
            <span>Insight</span>
          </div>
          <p className="faq-sidebar-title">
            Agentic Commerce: Preparing for AI-Driven Transactions
          </p>
        </div>
      </a>
    </aside>
  );
}

/* ─────────────────────────────────────────
   FAQ

   variant="sidebar" (default) — left accordion + right insight
   card, boxed plus/minus icons. Used as the general-purpose pattern.

   variant="inline" — no sidebar, eyebrow in its own column, hairline
   rows, thin plus/minus lines. Matches CMS Page V2. Pass `reveal` to
   enable the scroll-into-view stagger CMS V2 uses. `eyebrow` may be a
   plain node or a function `(active) => node` if the caller wants to
   drive its own scroll-triggered effect (e.g. a scramble-text label)
   off this component's own visibility state.
───────────────────────────────────────── */

export default function FAQ({
  faqs = DEFAULT_FAQS,
  eyebrow = DEFAULT_EYEBROW,
  headline = 'Frequently Asked Questions',
  variant = 'sidebar',
  reveal = false,
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const [active, setActive] = useState(!reveal);

  useEffect(() => {
    if (!reveal) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal]);

  function handleToggle(i) {
    setOpenIndex(prev => (prev === i ? null : i));
  }

  if (variant === 'inline') {
    return (
      <section className="faq-section--inline" ref={sectionRef}>
        <div className="faq-inline-inner">
          <div className="faq-inline-eyebrow-col">
            <Eyebrow>{typeof eyebrow === 'function' ? eyebrow(active) : eyebrow}</Eyebrow>
          </div>
          <div className="faq-inline-content-col">
            <div className="faq-inline-head">
              <h2 className="faq-inline-headline">{headline}</h2>
            </div>
            <div className="faq-inline-list">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  index={i}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                  variant="inline"
                  reveal={reveal}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="faq-section">
      <div className="faq-left">

        {/* Header */}
        <div className="faq-header">
          <Eyebrow className="faq-eyebrow">{eyebrow}</Eyebrow>
          <p className="faq-headline">{headline}</p>
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
              variant="sidebar"
            />
          ))}
        </div>

      </div>

      <InsightSidebar />
    </section>
  );
}
