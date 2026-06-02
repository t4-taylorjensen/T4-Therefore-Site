import { useState, useRef, useCallback } from 'react';
import './CrosshairHover.css';

/**
 * CrosshairHover
 *
 * Wraps any content and overlays a cursor-tracking crosshair on hover.
 * Hairlines lerp toward the cursor for a smooth follow effect.
 *
 * Props:
 *   children     — content to render inside
 *   lineOpacity  — white line opacity at full hover (default 0.28)
 *   label        — optional label shown offset from dot
 *   className    — extra class on the wrapper
 *   style        — extra styles on the wrapper
 */
export default function CrosshairHover({
  children,
  lineOpacity = 0.28,
  label,
  className = '',
  style,
  ...rest
}) {
  const rafRef  = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const rendRef = useRef({ x: 0, y: 0 });
  const [pos, setPos]       = useState({ x: 0, y: 0, visible: false });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!rafRef.current) {
      const tick = () => {
        rendRef.current.x += (posRef.current.x - rendRef.current.x) * 0.12;
        rendRef.current.y += (posRef.current.y - rendRef.current.y) * 0.12;
        setPos({ x: rendRef.current.x, y: rendRef.current.y, visible: true });
        const dx = Math.abs(posRef.current.x - rendRef.current.x);
        const dy = Math.abs(posRef.current.y - rendRef.current.y);
        rafRef.current = (dx > 0.3 || dy > 0.3) ? requestAnimationFrame(tick) : null;
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const onMouseEnter = useCallback((e) => {
    setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    posRef.current = { x, y }; rendRef.current = { x, y };
    setPos({ x, y, visible: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setPos(p => ({ ...p, visible: false }));
  }, []);

  const lineColor = `rgba(255,255,255,${hovered ? lineOpacity : 0})`;
  const transition = hovered ? 'none' : 'background 0.4s ease';

  return (
    <div
      className={`crosshair-hover${className ? ` ${className}` : ''}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      {...rest}
    >
      {children}

      {/* Horizontal hairline */}
      <div className="crosshair-line crosshair-line--h" style={{ top: pos.y, background: lineColor, transition }} />
      {/* Vertical hairline */}
      <div className="crosshair-line crosshair-line--v" style={{ left: pos.x, background: lineColor, transition }} />
      {/* Intersection dot */}
      <div className="crosshair-dot" style={{ left: pos.x, top: pos.y, opacity: hovered ? 1 : 0 }} />

      {/* Optional label */}
      {label && (
        <div className="crosshair-label" style={{ left: pos.x + 12, top: pos.y - 28, opacity: hovered && pos.visible ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(4px)' }}>
          {label}
        </div>
      )}
    </div>
  );
}
