import './LogoWall.css';
import useReveal from '../../ui/hooks/useReveal';

const DEFAULT_LOGOS = [];

/* ─────────────────────────────────────────
   LOGO WALL
   Static 4-up grid of partner/vendor wordmarks —
   real logo image where available, styled text
   wordmark otherwise. Distinct from Patterns/LogoCarousel
   (an infinite-scroll ticker, a different pattern entirely).
───────────────────────────────────────── */
export default function LogoWall({ logos = DEFAULT_LOGOS }) {
  const [ref, visible] = useReveal();
  return (
    <section className="logo-wall" ref={ref}>
      <div className="logo-wall-grid">
        {logos.map((item, i) => (
          <div
            key={item.name}
            className={`reveal logo-wall-cell${visible ? ' is-visible' : ''}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {item.logo
              ? <img
                  src={item.logo}
                  alt={item.name}
                  className={`logo-wall-img logo-wall-img--${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                />
              : <span className="logo-wall-text">{item.name}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
