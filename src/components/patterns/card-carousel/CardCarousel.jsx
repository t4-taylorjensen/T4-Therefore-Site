import { useState, useEffect, useRef } from 'react';
import './CardCarousel.css';
import { BtnArrow, IconArrowRight, IconArrowLeft } from '../../ui/Button/Button';
import ScrollRevealHeadline from '../../ui/ScrollRevealHeadline';
import Eyebrow from '../../ui/Eyebrow';

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

function CarouselCard({ title, description }) {
  return (
    <div className="wt-card" tabIndex={0} role="listitem">
      <div className="wt-card-inner">
        <div className="wt-card-bg" aria-hidden="true" />
        <div className="wt-card-icon">
          <StarIcon />
        </div>
        <div className="wt-card-text">
          <p className="wt-card-title">{title}</p>
          <p className="wt-card-desc">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CAROUSEL TRACK — inertial drag / wheel / touch / keyboard / snap
──────────────────────────────────────────────────────────────── */
function CarouselTrack({ title, cards, ariaLabel }) {
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
    // Ceil so the user can reach maxX (last card fully visible) even when
    // maxX isn't a multiple of step. Floor leaves a partial card cut off.
    function maxIdx() { const s = step(); return s > 0 ? Math.max(0, Math.ceil(maxX() / s)) : 0; }

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
      const m = maxIdx();
      let idx = clamp(Math.round(currentX / s), 0, m);
      // The final index snaps to maxX (which may sit less than a full step
      // past idx m-1). Math.round would never reach it on its own — if we're
      // actually closer to maxX, prefer that snap point.
      if (idx === m - 1 && Math.abs(currentX - maxX()) < Math.abs(currentX - idx * s)) {
        idx = m;
      }
      snapIndex = idx;
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
        {title && <p className="wt-carousel-title">{title}</p>}
        <div className="wt-arrows" role="group" aria-label="Carousel navigation">
          <BtnArrow
            icon={IconArrowLeft}
            label="Previous"
            nudge="left"
            onClick={() => navRef.current.prev()}
            disabled={!arrows.prev}
          />
          <BtnArrow
            icon={IconArrowRight}
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
        aria-label={ariaLabel || 'Carousel cards'}
        tabIndex={0}
      >
        <div className="wt-carousel-track" ref={trackRef} role="list">
          {cards.map((card, i) => (
            <CarouselCard key={i} title={card.title} description={card.description} />
          ))}
          {/* Trailing breathing room so last card isn't flush against the right
              edge when fully scrolled. As an explicit flex child, this reliably
              extends scrollWidth (and thus maxX / the snap range). */}
          <div className="wt-carousel-end-pad" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CARD CAROUSEL — eyebrow + scroll-reveal headline + carousel
──────────────────────────────────────────────────────────────── */
function CardCarousel({
  eyebrow,
  headline,
  headlineMuted,
  carouselTitle,
  cards = [],
  ariaLabel,
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

    const cardEls = section.querySelectorAll('.wt-card-inner');
    cardEls.forEach(c => {
      c.addEventListener('mouseenter', activate);
      c.addEventListener('mouseleave', deactivate);
    });
    return () => {
      cardEls.forEach(c => {
        c.removeEventListener('mouseenter', activate);
        c.removeEventListener('mouseleave', deactivate);
      });
    };
  }, [cards]);

  return (
    <section className="wt-section" ref={sectionRef} aria-labelledby="card-carousel-heading">

      {/* Background: video + accent-color gradient */}
      <div className="wt-bg" aria-hidden="true">
        <video ref={videoRef} className="wt-bg-video" muted loop playsInline preload="none" />
        <div className="wt-bg-gradient" />
      </div>

      {/* Constrained text column */}
      <div className="wt-large-title">
        {eyebrow && (
          <Eyebrow className="wt-eyebrow anim-fade-up anim-delay-1">{eyebrow}</Eyebrow>
        )}
        {headline && (
          <ScrollRevealHeadline
            as="h2"
            id="card-carousel-heading"
            className="wt-headline"
            text={headline}
            mutedText={headlineMuted}
          />
        )}
      </div>

      {/* Full-bleed carousel */}
      <CarouselTrack
        title={carouselTitle}
        cards={cards}
        ariaLabel={ariaLabel}
      />

    </section>
  );
}

export default CardCarousel;
