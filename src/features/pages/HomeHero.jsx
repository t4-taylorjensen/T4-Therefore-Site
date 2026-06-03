import { useEffect, useRef } from 'react';
import heroImg   from './assets/t4-hero-bg.jpg';
import t4Logo    from './assets/T4.svg';
import arrowDown from './assets/arrow-down.svg';
import './HomeHero.css';

const EXTRUDE_LAYERS = 6;

export default function HomeHero() {
  const imageRef   = useRef(null);
  const badgeRef   = useRef(null);
  const glareRef   = useRef(null);
  const sectionRef = useRef(null);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const lerpRef    = useRef({ x: 0.5, y: 0.5 });
  const hoveredRef = useRef(false);
  const scaleRef   = useRef(1);

  // Badge 3D tilt + glare
  useEffect(() => {
    let rafId;
    const tick = () => {
      const m    = mouseRef.current;
      const c    = lerpRef.current;
      const lerp = hoveredRef.current ? 0.1 : 0.04;
      c.x += (m.x - c.x) * lerp;
      c.y += (m.y - c.y) * lerp;

      // Ease scale toward 1.18 on hover, 1 off
      const scaleTarget = hoveredRef.current ? 1.18 : 1;
      scaleRef.current += (scaleTarget - scaleRef.current) * 0.07;

      if (badgeRef.current) {
        const rx = (c.y - 0.5) * -28;
        const ry = (c.x - 0.5) *  28;
        const tx = (c.x - 0.5) * 10;
        const ty = (c.y - 0.5) * 10;
        badgeRef.current.style.transform =
          `perspective(120px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${tx}px,${ty}px) scale(${scaleRef.current})`;
      }

      // Glare: radial highlight that follows mouse
      if (glareRef.current) {
        const gx = c.x * 100;
        const gy = c.y * 100;
        const opacity = hoveredRef.current ? 0.55 : 0;
        glareRef.current.style.background =
          `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${opacity}) 0%, transparent 65%)`;
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);


  const onMouseMove = (e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top)  / rect.height,
    };
  };

  const onMouseEnter = () => { hoveredRef.current = true; };
  const onMouseLeave = () => {
    hoveredRef.current = false;
    mouseRef.current = { x: 0.5, y: 0.5 };
  };

  const handleArrow = () => {
    const el = document.getElementById('hp-below-hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="hp-hero" ref={sectionRef}>

      <div className="hp-hero-headline">
        <div className="anim-fade-up anim-delay-1">
          <h1 className="hp-hero-line1">
            Building What's
          </h1>
        </div>
        <div className="hp-hero-line2-wrap anim-fade-up anim-delay-2">
          <span className="hp-hero-line2">
            Next
          </span>
        </div>
      </div>

      <div className="hp-hero-sub">
        <div
          className="hp-hero-image anim-fade-in anim-delay-3"
          ref={imageRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <img src={heroImg} alt="Therefore studio" className="hp-hero-img" />
          <div ref={glareRef} className="hp-hero-glare" aria-hidden="true" />
          <div ref={badgeRef} className="hp-hero-badge">
            {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
              <img key={i} src={t4Logo} alt="" aria-hidden="true"
                className="hp-hero-badge-layer"
                style={{ transform: `translateZ(${-(EXTRUDE_LAYERS - i) * 3}px)`, opacity: 0.18 + i * 0.08 }}
              />
            ))}
<img src={t4Logo} alt="T4" className="hp-hero-badge-layer hp-hero-badge-front" />
          </div>
        </div>

        <div className="hp-hero-copy-row">
          <p className="hp-hero-copy anim-fade-up anim-delay-4">
            We create first-class digital experiences for ambitious brands
            that turn visitors into guests.
          </p>
          <button className="hp-hero-arrow anim-fade-up anim-delay-5" onClick={handleArrow} aria-label="Scroll to next section">
            <img src={arrowDown} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

    </section>
  );
}
