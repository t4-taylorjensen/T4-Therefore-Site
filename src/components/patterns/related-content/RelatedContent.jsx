import { useRef, useState } from 'react';
import './RelatedContent.css';
import { BtnSecondary } from '../../ui/Button/Button';
import useReveal from '../../ui/hooks/useReveal';
import useScramble from '../../ui/hooks/useScramble';

const DISCOVER_TEXT = 'DISCOVER';

/* Same scramble "(DISCOVER)" label used by CaseStudiesGrid's tiles,
   but standing in for the cursor itself — it follows the pointer
   around the card instead of sitting in a fixed corner. */
function RelatedCard({ item, className = '', style }) {
  const mediaRef = useRef(null);
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const discover = useScramble(DISCOVER_TEXT, hovering);

  function handleMove(e) {
    if (!mediaRef.current || !cursorRef.current) return;
    const r = mediaRef.current.getBoundingClientRect();
    cursorRef.current.style.left = `${e.clientX - r.left}px`;
    cursorRef.current.style.top = `${e.clientY - r.top}px`;
  }

  return (
    <a
      href="#"
      className={`rc-card ${className}`.trim()}
      style={style}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMove}
    >
      <div className="rc-card-media" ref={mediaRef}>
        <img src={item.image} alt="" />
        <span ref={cursorRef} className="rc-card-cursor">({discover})</span>
      </div>
      <p className="rc-card-title">{item.title}</p>
      <p className="rc-card-desc">{item.desc}</p>
    </a>
  );
}

const DEFAULT_ITEMS = [];

/* ─────────────────────────────────────────
   RELATED CONTENT
   Quiet headline + pill link up top, a flush
   grid of image cards below — title and excerpt
   sit under each image, not inside it. Each card
   tracks the cursor with a scramble "(DISCOVER)"
   label.
───────────────────────────────────────── */
export default function RelatedContent({
  headline = <>The right CMS is just the beginning.<br />See where we take you next.</>,
  ctaLabel = 'Our Capabilities',
  items = DEFAULT_ITEMS,
}) {
  const [ref, visible] = useReveal();
  return (
    <section className="rc-section" ref={ref}>
      <div className="rc-inner">
        <div className={`reveal rc-head${visible ? ' is-visible' : ''}`}>
          <h2 className="rc-headline">{headline}</h2>
          <BtnSecondary as="a" href="#" className="rc-cta">
            {ctaLabel}
          </BtnSecondary>
        </div>

        <div className="rc-grid">
          {items.map((item, i) => (
            <RelatedCard
              key={item.title}
              item={item}
              className={`reveal${visible ? ' is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
