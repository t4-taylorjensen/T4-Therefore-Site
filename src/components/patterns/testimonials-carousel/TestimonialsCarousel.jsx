import { useState, useEffect, useRef } from 'react';
import './TestimonialsCarousel.css';
import playHover  from '../../ui/brand assets/Play Hover.svg';
import pauseHover from '../../ui/brand assets/Pause Hover.svg';
import { BtnArrow, IconArrowRight, IconArrowLeft } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

/* Stack offsets — first card front and center, others recede left+down */
/* Static staircase transforms applied to the WRAPPER (no hover dy here).
   Hover lift lives on the inner .tc-card so the wrapper's hit area never
   moves — prevents mouseenter/mouseleave stutter near the bottom edge. */
const STACK_CFG = [
  { transform: 'translateX(0px)   scale(1.0)',  z: 30 },
  { transform: 'translateX(-30px) scale(0.94)', z: 20 },
  { transform: 'translateX(-60px) scale(0.88)', z: 10 },
];

function CursorIcons({ isPlaying }) {
  return (
    <>
      <img
        className="tc-cursor-play"
        src={playHover}
        width="165" height="245"
        draggable="false" alt=""
        style={{ opacity: isPlaying ? 0 : 1 }}
      />
      <img
        className="tc-cursor-pause"
        src={pauseHover}
        width="82" height="90"
        draggable="false" alt=""
        style={{ opacity: isPlaying ? 1 : 0 }}
      />
    </>
  );
}

/* ─── Card ───────────────────────────────────────────────────────── */
function Card({ item, stackPos, isActive, isPlaying, onCardClick, onMouseEnter, onMouseLeave, hovered, videoRef }) {
  const videoAsCover = !!item.videoAsCover;
  const cfg          = STACK_CFG[stackPos];
  const playBtnRef   = useRef(null);
  const hoverDy      = hovered ? -10 : 0;
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleMouseMove = (e) => {
    if (!isActive || !playBtnRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    playBtnRef.current.style.transform = `translate(${x - 82.5}px, ${y - 39.5}px)`;
    if (!cursorVisible) setCursorVisible(true);
  };

  const handleMouseLeave = (e) => {
    setCursorVisible(false);
    onMouseLeave(e);
  };

  return (
    <div
      className={`tc-card-wrapper${isActive ? ' tc-card-wrapper--active' : ''}`}
      style={{
        transform: cfg.transform,
        zIndex:    cfg.z,
      }}
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`tc-card${isActive ? ' tc-card--active' : ''}`}
        style={{
          transform: hoverDy ? `translateY(${hoverDy}px)` : 'none',
          boxShadow: stackPos === 0 ? 'var(--shadow-card)' : 'none',
        }}
        onMouseMove={handleMouseMove}
      >
        <img
          className="tc-card-photo"
          src={item.photo}
          alt={item.name}
          draggable="false"
          style={{ opacity: videoAsCover ? 0 : (isPlaying ? 0 : 1) }}
        />

        <video
          ref={videoRef}
          className="tc-card-video"
          src={item.video}
          loop playsInline
          preload="metadata"
          style={{ opacity: videoAsCover ? (isActive ? 1 : 0) : (isPlaying ? 1 : 0) }}
        />

        <div className="tc-card-gradient" />

        <div className="tc-card-overlay">
          <p
            className="tc-card-name"
            style={{ opacity: isActive && !cursorVisible ? 1 : 0 }}
          >
            {item.name}
          </p>

          <div
            className="tc-card-tag"
            style={{ opacity: isActive && !cursorVisible ? 1 : 0 }}
          >
            <span className="tc-card-tag-label">{item.company}</span>
          </div>
        </div>

        {isActive && (
          <div
            ref={playBtnRef}
            className="tc-card-cursor"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          >
            <CursorIcons isPlaying={isPlaying} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
function TestimonialsCarousel({ eyebrow, testimonials = [] }) {
  const [current,    setCurrent]   = useState(0);
  const [isPlaying,  setIsPlaying] = useState(false);
  const [hoveredIdx, setHovered]   = useState(null);
  const [quoteKey,   setQuoteKey]  = useState(0);
  const videoRefs                  = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach(vid => {
      if (!vid) return;
      vid.pause();
      vid.currentTime = 0;
    });
  }, [current]);

  if (!testimonials.length) return null;

  const handleCardClick = (i) => {
    if (i === current) {
      const vid = videoRefs.current[i];
      if (!vid) return;
      if (isPlaying) {
        vid.pause();
        setIsPlaying(false);
      } else {
        vid.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setCurrent(i);
      setIsPlaying(false);
      setQuoteKey(k => k + 1);
    }
  };

  const navigate = (dir) => {
    setCurrent(c => (c + dir + testimonials.length) % testimonials.length);
    setIsPlaying(false);
    setQuoteKey(k => k + 1);
  };

  const t = testimonials[current];

  return (
    <section className="tc-section">

      {eyebrow && <Eyebrow className="tc-eyebrow">{eyebrow}</Eyebrow>}

      <div className="tc-columns">

        <div className="tc-left">
          <div className="tc-stack-container">
            <div className="tc-stack-inner">
              {testimonials.map((item, i) => {
                const stackPos = (i - current + testimonials.length) % testimonials.length;
                return (
                  <Card
                    key={i}
                    item={item}
                    stackPos={stackPos}
                    isActive={i === current}
                    isPlaying={i === current && isPlaying}
                    hovered={hoveredIdx === i}
                    videoRef={el => (videoRefs.current[i] = el)}
                    onCardClick={() => handleCardClick(i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="tc-right">
          <div key={quoteKey} className="anim-quote-in tc-quote-block">
            <blockquote className="tc-quote">{t.quote}</blockquote>
            <div className="tc-attribution">
              <p className="tc-attr-name">{t.name}</p>
              <p className="tc-attr-role">{t.title} · {t.company}</p>
            </div>
          </div>

          <div className="tc-arrows">
            <BtnArrow icon={IconArrowLeft}  label="Previous testimonial" nudge="left"  onClick={() => navigate(-1)} />
            <BtnArrow icon={IconArrowRight} label="Next testimonial"     nudge="right" onClick={() => navigate(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
