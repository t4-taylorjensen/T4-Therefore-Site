import { useState, useEffect, useRef } from 'react';
import './TestimonialsCarousel.css';
import placeholderVideo from './placeholder-video-man-talking.mp4';
import person1 from './person-1.jpg';
import person2 from './person-2.jpg';
import person3 from './person-3.jpg';
import playHover from '../../ui/brand assets/Play Hover.svg';
import pauseHover from '../../ui/brand assets/Pause Hover.svg';
import { BtnArrow, IconArrowRight, IconArrowLeft } from '../../ui/Button/Button';

/* ─── Data ──────────────────────────────────────────────────────── */
const testimonials = [
  {
    name:         'Tristan Armstrong',
    title:        'Chief Executive Officer',
    company:      'Canyon Spirit',
    photo:        person1,
    video:        placeholderVideo,
    videoAsCover: true,
    quote:        '"Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."',
  },
  {
    name:    'Sarah Chen',
    title:   'Head of Product',
    company: 'Meridian Labs',
    photo:   person2,
    video:   placeholderVideo,
    quote:   '"Working with this team transformed how we approach digital infrastructure. Their expertise and dedication to our vision made every milestone feel achievable."',
  },
  {
    name:    'Marcus Webb',
    title:   'Founder & Creative Director',
    company: 'Northlight Studio',
    photo:   person3,
    video:   placeholderVideo,
    quote:   '"From day one, the collaboration felt effortless. They understood our brand deeply and delivered an experience our customers talk about constantly."',
  },
];

/* ─── Shared card shadow ─────────────────────────────────────────── */
const CARD_SHADOW = [
  '0px 8px 18px rgba(0,0,0,0.10)',
  '0px 33px 33px rgba(0,0,0,0.09)',
  '0px 74px 45px rgba(0,0,0,0.05)',
  '0px 132px 53px rgba(0,0,0,0.01)',
].join(', ');

const STACK_CFG = [
  {
    transform: (dy) => `translateX(0px)   translateY(${dy}px)      scale(1.0)`,
    z: 30, opacity: 1.0,
  },
  {
    transform: (dy) => `translateX(-40px) translateY(${6  + dy}px) scale(0.94)`,
    z: 20, opacity: 1,
  },
  {
    transform: (dy) => `translateX(-80px) translateY(${12 + dy}px) scale(0.88)`,
    z: 10, opacity: 1,
  },
];

function CursorIcons({ isPlaying }) {
  return (
    <>
      <img
        src={playHover}
        width="165" height="245"
        draggable="false" alt=""
        style={{
          position: 'absolute', top: 0, left: 0,
          display: 'block', pointerEvents: 'none', userSelect: 'none',
          opacity: isPlaying ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      />
      <img
        src={pauseHover}
        width="82" height="90"
        draggable="false" alt=""
        style={{
          position: 'absolute', top: 7.5, left: 42.5,
          display: 'block', pointerEvents: 'none', userSelect: 'none',
          opacity: isPlaying ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      />
    </>
  );
}

/* ─── Card ───────────────────────────────────────────────────────── */
function Card({ item, stackPos, isActive, isPlaying, onCardClick, onMouseEnter, onMouseLeave, hovered, videoRef }) {
  const videoAsCover   = !!item.videoAsCover;
  const cfg            = STACK_CFG[stackPos];
  const playBtnRef     = useRef(null);
  const hoverDy        = hovered ? -10 : 0;
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
      className={`stack-card${isActive ? ' stack-card--active' : ''}`}
      style={{
        transform:    cfg.transform(hoverDy),
        zIndex:       cfg.z,
        opacity:      cfg.opacity,
        boxShadow:    stackPos === 0 ? CARD_SHADOW : 'none',
        border:       'none',
        borderRadius: 0,
        outline:      'none',
      }}
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Photo */}
      <img
        src={item.photo}
        alt={item.name}
        draggable="false"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: videoAsCover ? 0 : (isPlaying ? 0 : 1),
          transition: 'opacity 0.55s ease',
          userSelect: 'none',
        }}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={item.video}
        loop playsInline
        preload="metadata"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          borderRadius: 0,
          opacity: videoAsCover ? (isActive ? 1 : 0) : (isPlaying ? 1 : 0),
          transition: 'opacity 0.55s ease',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, transparent 45%, rgba(0,0,0,0.30) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Overlay text */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: 20,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <p style={{
          color: '#fff', fontSize: '1.05rem', lineHeight: 1.5, fontWeight: 400, margin: 0,
          opacity: isActive && !cursorVisible ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}>
          {item.name}
        </p>

        {/* Company tag */}
        <div style={{
          position: 'absolute',
          bottom: 20, left: 20,
          height: 28,
          padding: '0 12px',
          display: 'flex', alignItems: 'center',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 5,
          opacity: isActive && !cursorVisible ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}>
          <span style={{
            fontFamily: 'Roobert Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'white',
            lineHeight: 1,
          }}>
            {item.company}
          </span>
        </div>
      </div>

      {/* Cursor-following play/pause */}
      {isActive && (
        <div
          ref={playBtnRef}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: 165, height: 245,
            pointerEvents: 'none',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <CursorIcons isPlaying={isPlaying} />
        </div>
      )}
    </div>
  );
}


/* ─── Main component ─────────────────────────────────────────────── */
function TestimonialsCarousel() {
  const [current, setCurrent]    = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredIdx, setHovered] = useState(null);
  const [quoteKey, setQuoteKey]  = useState(0);
  const videoRefs                = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach(vid => {
      if (!vid) return;
      vid.pause();
      vid.currentTime = 0;
    });
  }, [current]);

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
    <section
      className="carousel-section"
      style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex', flexDirection: 'column',
        background: '#f0f0ef',
        borderRadius: 0,
        margin: 30,
        padding: 30,
      }}
    >

      {/* Label */}
      <p style={{
        fontFamily: 'Roobert Mono, monospace', fontSize: 11,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'rgba(18,18,18,0.5)', margin: '0 0 60px', flexShrink: 0,
      }}>
        Trusted by industry leaders
      </p>

      {/* Two-column body */}
      <div
        className="carousel-columns"
        style={{ display: 'flex', gap: 'clamp(32px, 5.5vw, 80px)', flex: 1, alignItems: 'center', flexWrap: 'wrap' }}
      >

        {/* Left: card stack */}
        <div
          className="carousel-left"
          style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div className="stack-container">
            <div className="stack-inner">
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

        {/* Right: quote + attribution + nav */}
        <div
          className="carousel-right"
          style={{
            flex: 1, minWidth: 280,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 'var(--card-h)',
            padding: 'clamp(16px, 4vw, 50px) clamp(24px, 6vw, 90px) clamp(16px, 4vw, 50px) clamp(16px, 4vw, 60px)',
          }}
        >

          <div key={quoteKey} className="quote-in" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 3vw, 52px)' }}>
            <blockquote style={{
              fontSize: 'clamp(1.4rem, 2vw, 2rem)', lineHeight: 1.4,
              color: '#121212', fontStyle: 'normal', margin: 0, fontWeight: 400,
            }}>
              {t.quote}
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#121212', lineHeight: 1.6, margin: 0 }}>
                {t.name}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(18,18,18,0.55)', letterSpacing: '0.3px', lineHeight: 1.7, margin: 0 }}>
                {t.title} · {t.company}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="arrows" style={{ display: 'flex', gap: 8, marginTop: 30 }}>
            <BtnArrow icon={IconArrowLeft}  label="Previous testimonial" nudge="left"  onClick={() => navigate(-1)} />
            <BtnArrow icon={IconArrowRight} label="Next testimonial"     nudge="right" onClick={() => navigate(1)} />
          </div>

        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
