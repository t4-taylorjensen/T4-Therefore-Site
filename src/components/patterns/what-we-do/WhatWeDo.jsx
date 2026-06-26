import './WhatWeDo.css';
import Eyebrow from '../../ui/Eyebrow';
import useReveal from '../../ui/hooks/useReveal';

const DEFAULT_CAPABILITIES = [
  { title: 'Audience Research',
    body:  'We bring audience insight to the table to ensure each layer of your digital experience, from the interfaces guests interact with to the systems that power them, keeps the guest at the centre.' },
  { title: 'AI-Powered Content Operations',
    body:  'We design repeatable workflows for creating and managing content across channels, combining audience understanding with business goals and engineering processes that fit the way your team already works.' },
  { title: 'Technology Consultancy',
    body:  'We partner with marketing and technology teams to align all the moving parts, ensuring your systems serve both the business and the guest.' },
  { title: 'Bespoke User Experiences',
    body:  'We craft digital experiences that highlight what makes your brand unique, delivering fast, accessible, and personalized interactions at every touchpoint.' },
  { title: 'Accessibility and Security (by design)',
    body:  'Everything we build meets the highest standards of accessibility and security, with rigorous testing applied continuously throughout the project.' },
  { title: 'Analytics & Optimisation',
    body:  "Long after launch, we remain committed to helping you maximize the foundation you've invested in and focused on achieving the commercial goals it was built to meet." },
];

/* ─────────────────────────────────────────
   WHAT WE DO
   Light. Quiet 2×3 grid — no icons, no boxes.
   Hairline rules, restrained type. Scroll-reveal
   stagger via the shared useReveal hook.
───────────────────────────────────────── */
export default function WhatWeDo({
  eyebrow = 'What We Do',
  headline = 'We design and build content-managed digital experiences that are loved by editors, agents and guests.',
  capabilities = DEFAULT_CAPABILITIES,
}) {
  const [ref, visible] = useReveal();
  return (
    <section className="wwd-section" ref={ref}>
      <div className="wwd-inner">
        <div className={`reveal wwd-head${visible ? ' is-visible' : ''}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="wwd-headline">{headline}</h2>
        </div>
        <div className="wwd-grid">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className={`reveal wwd-card${visible ? ' is-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="wwd-card-title">{c.title}</h3>
              <p className="wwd-card-body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
