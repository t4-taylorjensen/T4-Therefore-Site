import { useState, useEffect, useRef } from 'react';
import './TestimonialsCarousel.css';
import placeholderVideo from './placeholder-video-man-talking.mp4';
import person1 from './person-1.jpg';
import person2 from './person-2.jpg';
import person3 from './person-3.jpg';
import playHover  from '../../ui/brand assets/Play Hover.svg';
import pauseHover from '../../ui/brand assets/Pause Hover.svg';
import { BtnArrow, IconCornerDownRight } from '../../ui/Button/Button';
import Eyebrow from '../../ui/Eyebrow';

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

/* Stack offsets — first card front and center, others recede left+down */
const STACK_CFG = [
  { transform: (dy) => `translateX(0px)   translateY(${dy}px)      scale(1.0)`,  z: 30 },
  { transform: (dy) => `translateX(-40px) translateY(${6  + dy}px) scale(0.94)`, z: 20 },
  { transform: (dy) => `translateX(-80px) translateY(${12 + dy}px) scale(0.88)`, z: 10 },
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
      className={`tc-card${isActive ? ' tc-card--active' : ''}`}
      style={{
        transform: cfg.transform(hoverDy),
        zIndex:    cfg.z,
        boxShadow: stackPos === 0 ? 'var(--shadow-card)' : 'none',
      }}
      onClick={onCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
function TestimonialsCarousel() {
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

      <Eyebrow className="tc-eyebrow">Trusted by industry leaders</Eyebrow>

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
            <BtnArrow icon={IconCornerDownRight}  label="Previous testimonial" nudge="left"  onClick={() => navigate(-1)} />
            <BtnArrow icon={IconCornerDownRight} label="Next testimonial"     nudge="right" onClick={() => navigate(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
