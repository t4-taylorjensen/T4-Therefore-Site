import { useState, useEffect, useRef } from 'react';
import './WhyTherefore.css';
import { BtnArrow, IconCornerDownRight } from '../../../ui/Button/Button';
import Eyebrow from '../../../ui/Eyebrow';

const DEFAULT_CARDS = [
  {
    title: 'Architecture',
    desc:  'We design the system before choosing tools so your solution is cohesive, intentional, and built to last.',
  },
  {
    title: 'Composable',
    desc:  'Mix best-of-breed services without lock-in. Each layer of the stack stays independently replaceable.',
  },
  {
    title: 'Integration',
    desc:  'We connect your CMS, commerce platform, and data sources into a unified content pipeline.',
  },
  {
    title: 'Performance',
    desc:  'Decoupled frontends deliver sub-second experiences regardless of backend complexity.',
  },
  {
    title: 'Scalability',
    desc:  'Infrastructure that grows from startup to enterprise. No rearchitecting at every inflection point.',
  },
];

const DEFAULT_DARK_TEXT     = 'Headless is not a technology decision. It is a systems decision. We design content models that reflect real workflows';
const DEFAULT_MUTED_TEXT    = ', integrate with your ecosystem, and scale as your business evolves.';
const DEFAULT_CAROUSEL_TITLE = 'Headless is a systems decision.';

function StarIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path
        d="M17 3C17.7 8.5 20 12.5 23.5 14.5C26.5 16.3 31 17 31 17C31 17 26.5 17.7 23.5 19.5C20 21.5 17.7 25.5 17 31C16.3 25.5 14 21.5 10.5 19.5C7.5 17.7 3 17 3 17C3 17 7.5 16.3 10.5 14.5C14 12.5 16.3 8.5 17 3Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <div className="wt-card" tabIndex={0} role="listitem">
      <div className="wt-card-inner">
        <div className="wt-card-bg" aria-hidden="true" />
        <div className="wt-card-icon">
          <StarIcon />
        </div>
        <div className="wt-card-text">
          <p className="wt-card-title">{title}</p>
          <p className="wt-card-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CARD CAROUSEL — inertial drag / wheel / touch / keyboard / snap
──────────────────────────────────────────────────────────────── */
function CardCarousel({ cards = DEFAULT_CARDS, carouselTitle = DEFAULT_CAROUSEL_TITLE }) {
  const trackRef    = useRef(null);
  const viewportRef = useRef(null);
  const navRef      = useRef({ prev: () => {}, next: () => {} });
  const [arrows, setArrows] = useState({ prev: false, next: true });

  useEffect(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;

    let currentX     = 0;
    let velocity     = 0;
    let isDragging   = false;
    let startX       = 0;
    let startScrollX = 0;
    let lastX        = 0;
    let lastTime     = 0;
    let snapIndex    = 0;
    let rafId        = null;
    let wheelTimer   = null;
    let snapTimer    = null;
    let touchStartY  = 0;
    let lockH        = false;
    let lockV        = false;

    const DAMPING = 0.91;
    const clamp   = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    const lerp    = (a, b, t)   => a + (b - a) * t;

    function step() {
      const gap    = parseFloat(getComputedStyle(tr).columnGap) || 15;
      const cardEl = tr.firstElementChild;
      return cardEl ? cardEl.offsetWidth + gap : 0;
    }

    function maxX()   { return Math.max(0, tr.scrollWidth - vp.offsetWidth); }
    function maxIdx() { const s = step(); return s > 0 ? Math.max(0, Math.floor(maxX() / s)) : 0; }

    function applyTransform(x) { tr.style.transform = `translateX(${-x}px)`; }

    function updateArrows() {
      setArrows({ prev: snapIndex > 0, next: snapIndex < maxIdx() });
    }

    function snapToIndex(idx) {
      const target = clamp(idx * step(), 0, maxX());
      currentX = target;
      tr.classList.add('is-snapping');
      applyTransform(target);
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => tr.classList.remove('is-snapping'), 580);
    }

    function snapToNearest() {
      const s = step();
      if (!s) return;
      snapIndex = clamp(Math.round(currentX / s), 0, maxIdx());
      snapToIndex(snapIndex);
      updateArrows();
    }

    function cancelSnap() {
      tr.classList.remove('is-snapping');
      clearTimeout(snapTimer);
    }

    function stopInertia() {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      clearTimeout(wheelTimer);
    }

    function startInertia() {
      const tick = () => {
        velocity *= DAMPING;
        currentX = clamp(currentX - velocity, 0, maxX());
        applyTransform(currentX);
        if (Math.abs(velocity) > 0.3) { rafId = requestAnimationFrame(tick); }
        else { velocity = 0; snapToNearest(); }
      };
      rafId = requestAnimationFrame(tick);
    }

    function onPointerDown(e) {
      if (e.button !== 0) return;
      stopInertia(); cancelSnap();
      isDragging = true;
      startX = e.clientX; startScrollX = currentX;
      lastX  = e.clientX; lastTime = e.timeStamp;
      velocity = 0;
      vp.setPointerCapture(e.pointerId);
      vp.classList.add('is-dragging');
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dt = e.timeStamp - lastTime;
      if (dt > 0) velocity = lerp(velocity, (dx / dt) * 16.67, 0.35);
      currentX = clamp(startScrollX + (startX - e.clientX), 0, maxX());
      applyTransform(currentX);
      lastX = e.clientX; lastTime = e.timeStamp;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      vp.classList.remove('is-dragging');
      if (Math.abs(velocity) > 1.2) startInertia(); else snapToNearest();
    }

    function onWheel(e) {
      const isH     = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isShift = e.shiftKey && Math.abs(e.deltaY) > 0;
      if (!isH && !isShift) return;
      e.preventDefault();
      stopInertia(); cancelSnap();
      currentX = clamp(currentX + (isShift ? e.deltaY : e.deltaX), 0, maxX());
      applyTransform(currentX);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(snapToNearest, 140);
    }

    function onTouchStart(e) {
      const t = e.touches[0];
      stopInertia(); cancelSnap();
      isDragging = true;
      startX = t.clientX; startScrollX = currentX;
      lastX  = t.clientX; lastTime = e.timeStamp;
      velocity = 0; touchStartY = t.clientY;
      lockH = false; lockV = false;
    }

    function onTouchMove(e) {
      if (!isDragging) return;
      const t  = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - touchStartY;
      if (!lockH && !lockV) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6)      lockH = true;
        else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) lockV = true;
      }
      if (lockV) return;
      if (lockH) e.preventDefault();
      const dt = e.timeStamp - lastTime;
      if (dt > 0) velocity = lerp(velocity, ((t.clientX - lastX) / dt) * 16.67, 0.35);
      currentX = clamp(startScrollX + (startX - t.clientX), 0, maxX());
      applyTransform(currentX);
      lastX = t.clientX; lastTime = e.timeStamp;
    }

    function onTouchEnd() {
      lockH = false; lockV = false;
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(velocity) > 1.2) startInertia(); else snapToNearest();
    }

    function onKeydown(e) {
      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); snapIndex = clamp(snapIndex-1, 0, maxIdx()); snapToIndex(snapIndex); updateArrows(); break;
        case 'ArrowRight': e.preventDefault(); snapIndex = clamp(snapIndex+1, 0, maxIdx()); snapToIndex(snapIndex); updateArrows(); break;
        case 'Home':       e.preventDefault(); snapIndex = 0;        snapToIndex(0);        updateArrows(); break;
        case 'End':        e.preventDefault(); snapIndex = maxIdx(); snapToIndex(maxIdx());  updateArrows(); break;
      }
    }

    function rebindNav() {
      navRef.current = {
        prev: () => { snapIndex = clamp(snapIndex-1, 0, maxIdx()); snapToIndex(snapIndex); updateArrows(); },
        next: () => { snapIndex = clamp(snapIndex+1, 0, maxIdx()); snapToIndex(snapIndex); updateArrows(); },
      };
    }
    rebindNav();

    const ro = new ResizeObserver(() => {
      const mx = maxX();
      if (currentX > mx) { currentX = mx; applyTransform(mx); }
      snapIndex = clamp(snapIndex, 0, maxIdx());
      updateArrows();
      rebindNav();
    });
    ro.observe(vp);

    vp.addEventListener('pointerdown',   onPointerDown);
    vp.addEventListener('pointermove',   onPointerMove,  { passive: true });
    vp.addEventListener('pointerup',     onPointerUp,    { passive: true });
    vp.addEventListener('pointercancel', onPointerUp,    { passive: true });
    vp.addEventListener('wheel',         onWheel,        { passive: false });
    vp.addEventListener('touchstart',    onTouchStart,   { passive: true });
    vp.addEventListener('touchmove',     onTouchMove,    { passive: false });
    vp.addEventListener('touchend',      onTouchEnd,     { passive: true });
    vp.addEventListener('touchcancel',   onTouchEnd,     { passive: true });
    vp.addEventListener('keydown',       onKeydown);

    updateArrows();

    return () => {
      stopInertia();
      clearTimeout(wheelTimer);
      clearTimeout(snapTimer);
      ro.disconnect();
      vp.removeEventListener('pointerdown',   onPointerDown);
      vp.removeEventListener('pointermove',   onPointerMove);
      vp.removeEventListener('pointerup',     onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
      vp.removeEventListener('wheel',         onWheel);
      vp.removeEventListener('touchstart',    onTouchStart);
      vp.removeEventListener('touchmove',     onTouchMove);
      vp.removeEventListener('touchend',      onTouchEnd);
      vp.removeEventListener('touchcancel',   onTouchEnd);
      vp.removeEventListener('keydown',       onKeydown);
    };
  }, []);

  return (
    <div className="wt-carousel-section anim-fade-up anim-delay-2">
      <div className="wt-carousel-header">
        <p className="wt-carousel-title">{carouselTitle}</p>
        <div className="wt-arrows" role="group" aria-label="Carousel navigation">
          <BtnArrow
            icon={IconCornerDownRight}
            label="Previous"
            nudge="left"
            onClick={() => navRef.current.prev()}
            disabled={!arrows.prev}
          />
          <BtnArrow
            icon={IconCornerDownRight}
            label="Next"
            nudge="right"
            onClick={() => navRef.current.next()}
            disabled={!arrows.next}
          />
        </div>
      </div>

      <div
        className="wt-carousel-viewport"
        ref={viewportRef}
        role="region"
        aria-label="Why Therefore cards"
        tabIndex={0}
      >
        <div className="wt-carousel-track" ref={trackRef} role="list">
          {cards.map((card, i) => (
            <ServiceCard key={i} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ROOT COMPONENT
──────────────────────────────────────────────────────────────── */
function WhyTherefore({
  eyebrow      = 'Why Therefore?',
  darkText     = DEFAULT_DARK_TEXT,
  mutedText    = DEFAULT_MUTED_TEXT,
  cards        = DEFAULT_CARDS,
  carouselTitle = DEFAULT_CAROUSEL_TITLE,
}) {
  const sectionRef   = useRef(null);
  const videoRef     = useRef(null);
  const videoStarted = useRef(false);

  /* ── Video: lazy-load + play on first card hover ── */
  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    let count = 0;

    function activate() {
      count++;
      if (count !== 1) return;
      if (!videoStarted.current) {
        videoStarted.current = true;
        video.querySelectorAll('source[data-src]').forEach(s => { s.src = s.dataset.src; });
        video.load();
      }
      video.play().catch(() => {});
    }
    function deactivate() {
      count = Math.max(0, count - 1);
      if (count === 0) video.pause();
    }

    const cards = section.querySelectorAll('.wt-card-inner');
    cards.forEach(c => {
      c.addEventListener('mouseenter', activate);
      c.addEventListener('mouseleave', deactivate);
    });
    return () => {
      cards.forEach(c => {
        c.removeEventListener('mouseenter', activate);
        c.removeEventListener('mouseleave', deactivate);
      });
    };
  }, []);

  return (
    <section className="wt-section" ref={sectionRef} aria-labelledby="wt-heading">

      {/* Background: video + accent-color gradient */}
      <div className="wt-bg" aria-hidden="true">
        <video ref={videoRef} className="wt-bg-video" muted loop playsInline preload="none" />
        <div className="wt-bg-gradient" />
      </div>

      {/* Constrained text column */}
      <div className="wt-large-title">
        <Eyebrow className="wt-eyebrow anim-fade-up anim-delay-1">{eyebrow}</Eyebrow>
        <h2 id="wt-heading" className="wt-headline">{darkText}</h2>
      </div>

      {/* Full-bleed carousel */}
      <CardCarousel cards={cards} carouselTitle={carouselTitle} />

    </section>
  );
}

export default WhyTherefore;
