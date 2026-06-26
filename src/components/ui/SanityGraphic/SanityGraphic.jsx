import { useEffect, useRef } from 'react';
import './SanityGraphic.css';

/**
 * SanityGraphic
 *
 * Full-bleed, image-based treatments of a source photo — clean, graphic,
 * edge to edge. The cursor reveals/sharpens the treatment locally.
 *
 *   mode = 'halftone'   dot halftone of the image (dark dots on white)
 *        = 'mosaic'      chunky grayscale pixelation
 *        = 'duotone'     fine high-contrast grayscale photo
 *        = 'threshold'   1-bit black/white cutout
 *
 * Props: mode, src (image url), tint ('r,g,b'), interactive, className.
 * Pure Canvas2D + rAF, no deps.
 */
const CELL = { halftone: 7, mosaic: 15, duotone: 4, threshold: 6 };

export default function SanityGraphic({
  mode = 'halftone',
  src,
  tint = '18,18,18',
  interactive = true,
  className = '',
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const gridRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointer = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cell = CELL[mode] || 8;

    function resize() {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sample();
    }

    function sample() {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (!wrap || !img) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const cols = Math.max(1, Math.ceil(w / cell));
      const rows = Math.max(1, Math.ceil(h / cell));
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true });
      const ir = img.width / img.height;
      const br = cols / rows;
      let sw, sh, sx, sy;
      if (ir > br) { sh = img.height; sw = sh * br; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / br; sx = 0; sy = (img.height - sh) / 2; }
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const { data } = octx.getImageData(0, 0, cols, rows);
      const lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i += 1) {
        lum[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
      }
      gridRef.current = { cols, rows, lum };
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imgRef.current = img; resize(); };
    img.src = src;

    resize();
    const ro = new ResizeObserver(() => resize());
    if (wrapRef.current) ro.observe(wrapRef.current);

    const ctx = canvasRef.current.getContext('2d');
    const start = performance.now();

    const render = (now) => {
      const { w, h, dpr } = sizeRef.current;
      const grid = gridRef.current;
      if (w && h && grid) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const { cols, rows, lum } = grid;
        const cw = w / cols;
        const ch = h / rows;
        const t = reduced.current ? 0 : (now - start) * 0.001;
        const px = pointer.current.x;
        const py = pointer.current.y;
        const infl = Math.min(w, h) * 0.24;

        if (mode === 'halftone') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
        } else {
          ctx.fillStyle = '#111111';
          ctx.fillRect(0, 0, w, h);
        }

        for (let y = 0; y < rows; y += 1) {
          for (let x = 0; x < cols; x += 1) {
            const L = lum[y * cols + x];
            const cx = x * cw;
            const cy = y * ch;
            let boost = 0;
            if (interactive && px > -9000) {
              const d = Math.hypot(cx + cw / 2 - px, cy + ch / 2 - py);
              if (d < infl) boost = 1 - d / infl;
            }

            if (mode === 'halftone') {
              const dk = 1 - L;
              if (dk < 0.04) continue;
              const wave = 0.86 + 0.14 * Math.sin((x + y) * 0.4 - t * 1.2);
              const s = Math.min(cw, ch) * 0.92 * dk * Math.min(1.5, wave + boost * 0.9);
              if (s <= 0.4) continue;
              ctx.fillStyle = `rgba(${tint},${Math.min(1, 0.4 + dk * 0.6)})`;
              ctx.beginPath();
              ctx.arc(cx + cw / 2, cy + ch / 2, s / 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (mode === 'mosaic') {
              let g = (L - 0.5) * 1.25 + 0.5 + boost * 0.3;
              g = Math.max(0, Math.min(1, g));
              const v = Math.round(g * 255);
              ctx.fillStyle = `rgb(${v},${v},${v})`;
              ctx.fillRect(cx, cy, cw + 1, ch + 1);
            } else if (mode === 'duotone') {
              let g = (L - 0.5) * 1.55 + 0.5 + boost * 0.32;
              g = Math.max(0, Math.min(1, g));
              const v = Math.round(g * 255);
              ctx.fillStyle = `rgb(${v},${v},${v})`;
              ctx.fillRect(cx, cy, cw + 1, ch + 1);
            } else if (mode === 'threshold') {
              const thr = 0.5 - boost * 0.4 + 0.04 * Math.sin(t * 0.6 + (x + y) * 0.2);
              ctx.fillStyle = L < thr ? 'rgb(17,17,17)' : '#ffffff';
              ctx.fillRect(cx, cy, cw + 1, ch + 1);
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      imgRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, mode, tint, interactive]);

  function onMove(e) {
    const r = wrapRef.current.getBoundingClientRect();
    pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function onLeave() {
    pointer.current = { x: -9999, y: -9999 };
  }

  return (
    <div
      ref={wrapRef}
      className={`sanity-graphic${className ? ` ${className}` : ''}`}
      onMouseMove={interactive ? onMove : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
    >
      <canvas ref={canvasRef} className="sanity-graphic-canvas" aria-hidden="true" />
    </div>
  );
}
