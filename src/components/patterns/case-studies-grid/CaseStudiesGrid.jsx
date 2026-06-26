import { useEffect, useRef, useState } from 'react';
import './CaseStudiesGrid.css';
import { BtnLink, IconCornerDownRight } from '../../ui/Button/Button';
import useReveal from '../../ui/hooks/useReveal';
import useScramble from '../../ui/hooks/useScramble';

const DISCOVER_TEXT = 'DISCOVER';

function CaseStudyTile({ c }) {
  const tileRef = useRef(null);
  const infoRef = useRef(null);
  const hoveringRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const discover = useScramble(DISCOVER_TEXT, hovering);

  function place(clientY) {
    if (!tileRef.current || !infoRef.current) return;
    const r = tileRef.current.getBoundingClientRect();
    infoRef.current.style.top = `${clientY - r.top}px`;
  }

  // Cursor position is checked against the tile's live bounding rect on
  // both real mouse movement and page scroll — so the hover state turns
  // on/off as a tile scrolls underneath a stationary cursor, not just
  // when the cursor itself moves.
  useEffect(() => {
    const lastPos = { x: -1, y: -1 };

    function evaluate(clientX, clientY) {
      if (!tileRef.current) return;
      const r = tileRef.current.getBoundingClientRect();
      const inside = clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
      if (inside) {
        if (!hoveringRef.current) {
          hoveringRef.current = true;
          setHovering(true);
        }
        place(clientY);
      } else if (hoveringRef.current) {
        hoveringRef.current = false;
        setHovering(false);
      }
    }

    function onMove(e) {
      lastPos.x = e.clientX;
      lastPos.y = e.clientY;
      evaluate(e.clientX, e.clientY);
    }

    function onScroll() {
      if (lastPos.x === -1) return;
      evaluate(lastPos.x, lastPos.y);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="csg-tile" ref={tileRef}>
      <div className="csg-media">
        <img src={c.img} alt={c.client} />
      </div>

      <div ref={infoRef} className={`csg-info${hovering ? ' is-active' : ''}`}>
        <p className="csg-info-title">{c.client}</p>
        <span className="csg-info-discover">({discover})</span>
      </div>
    </div>
  );
}

const DEFAULT_STUDIES = [];

/* ─────────────────────────────────────────
   CASE STUDIES GRID
   Flush N-up triptych. Each tile tracks the
   cursor's vertical position (including while
   scrolling) and scrambles a "(DISCOVER)" label
   in on hover. Distinct from Patterns/CaseStudy
   (a carousel-style pattern with a different
   visual design and other live consumers).
───────────────────────────────────────── */
export default function CaseStudiesGrid({
  headline = 'Case Studies',
  ctaLabel = 'All Work',
  studies = DEFAULT_STUDIES,
  count = studies.length,
}) {
  const tiles = studies.slice(0, count);
  const [ref, visible] = useReveal();
  return (
    <section className="csg-section" ref={ref}>
      <div className="csg-inner">
        <div className={`reveal csg-head${visible ? ' is-visible' : ''}`}>
          <h2 className="csg-headline">{headline}</h2>
          <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light btn-link--compact">
            {ctaLabel}
          </BtnLink>
        </div>
      </div>
      <div className="csg-grid" style={{ gridTemplateColumns: `repeat(${tiles.length}, 1fr)` }}>
        {tiles.map((c) => <CaseStudyTile key={c.client} c={c} />)}
      </div>
    </section>
  );
}
