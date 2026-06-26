import { useEffect, useRef, useState } from 'react';
import './ContentCarousel.css';
import Eyebrow from '../../ui/Eyebrow';
import { BtnArrow } from '../../ui/Button/Button';
import { IconArrowLeft, IconArrowRight } from '../../ui/icons';
import useReveal from '../../ui/hooks/useReveal';
import useScramble from '../../ui/hooks/useScramble';
import LoadLine from '../../ui/LoadLine/LoadLine';

const DEFAULT_ITEMS = [];

const DISCOVER_TEXT = 'DISCOVER';

/* ─────────────────────────────────────────
   CAROUSEL CARD
   Image left / text right (the split layout): sharp
   corners, image that darkens + scales on hover, and
   a "(DISCOVER)" scramble label tracking the pointer
   inside the media.
───────────────────────────────────────── */
function CarouselCard({ item, className = '', style, onClick }) {
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

  const text = (
    <>
      <h3 className="lc-title">{item.title}</h3>
      <p className="lc-excerpt">{item.excerpt}</p>
      {/* Read More — vertical roll on card hover (same effect as FlipLink) */}
      <span className="lc-readmore">
        <span className="lc-readmore-a">Read More</span>
        <span className="lc-readmore-b" aria-hidden="true">Read More</span>
      </span>
    </>
  );

  return (
    <a
      href={item.href || '#'}
      className={`lc-card ${className}`.trim()}
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMove}
    >
      <div className="lc-media" ref={mediaRef}>
        <img src={item.image} alt="" draggable="false" />
        <span ref={cursorRef} className="lc-cursor">({discover})</span>
      </div>
      <div className="lc-body">{text}</div>
    </a>
  );
}

/* ─────────────────────────────────────────
   CONTENT CAROUSEL
   Horizontally-scrolling carousel of linkable content
   cards (image left / text right). Scroll-snap rail +
   prev/next arrows + drag-to-scroll + a bottom load line.
───────────────────────────────────────── */
export default function ContentCarousel({
  eyebrow = 'Keep Reading',
  headline = 'Go deeper on the ideas behind the work.',
  tone = 'light',
  items = DEFAULT_ITEMS,
}) {
  const dark = tone === 'dark';
  const arrowClass = `lc-arrow btn-arrow--outline${dark ? ' btn-arrow--on-dark' : ''}`;
  const [revealRef, visible] = useReveal();
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  /* loader line + arrow states track manual scroll position (no auto-advance) */
  function updateEdges() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
  }

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [items]);

  function step() {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector('.lc-card');
    if (!card) return el.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByCards(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: 'smooth' });
  }

  /* drag-to-scroll */
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  function onPointerDown(e) {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  }
  function onPointerMove(e) {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  }
  function endDrag() {
    drag.current.active = false;
  }
  function onCardClick(e) {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
    }
  }

  return (
    <section className={`lc-section lc--split${dark ? ' lc-section--dark' : ''}`} ref={revealRef}>
      <div className="lc-inner">
        <div className={`reveal lc-head${visible ? ' is-visible' : ''}`}>
          <div className="lc-head-text">
            {eyebrow && <Eyebrow className="lc-eyebrow">{eyebrow}</Eyebrow>}
            <h2 className="lc-headline">{headline}</h2>
          </div>
          <div className="lc-nav">
            <BtnArrow
              icon={IconArrowLeft}
              label="Previous"
              nudge="left"
              disabled={atStart}
              onClick={() => scrollByCards(-1)}
              className={arrowClass}
            />
            <BtnArrow
              icon={IconArrowRight}
              label="Next"
              nudge="right"
              disabled={atEnd}
              onClick={() => scrollByCards(1)}
              className={arrowClass}
            />
          </div>
        </div>

        <div
          className="lc-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {items.map((item, i) => (
            <CarouselCard
              key={item.title}
              item={item}
              className={`reveal${visible ? ' is-visible' : ''}`}
              style={{ transitionDelay: `${Math.min(i, 5) * 80}ms` }}
              onClick={onCardClick}
            />
          ))}
        </div>

        {/* Bottom loader line — tracks manual scroll position. */}
        <LoadLine progress={progress} tone={dark ? 'dark' : 'light'} className="lc-loadline" />
      </div>
    </section>
  );
}
