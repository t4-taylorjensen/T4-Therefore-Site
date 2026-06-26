import { useEffect, useRef } from 'react';
import './PixelShader.css';

/**
 * PixelShader
 *
 * Renders an image as an animated halftone/pixel mosaic on a <canvas>
 * — a techy, modern visual element rather than a photograph. The image
 * is sampled down to a luminance grid; each cell is drawn as a dot (or
 * square) sized by darkness, with a slow diagonal shimmer and a soft
 * cursor ripple. Pure Canvas2D + requestAnimationFrame, no deps.
 *
 * Props:
 *   src         — image url to sample
 *   cell        — logical px per mosaic cell (default 11)
 *   tint        — 'r,g,b' of the dots (default near-black ink)
 *   shape       — 'dot' | 'square' (default 'dot')
 *   gap         — 0..1 spacing between cells (default 0.18)
 *   interactive — cursor ripple on/off (default true)
 *   className   — extra class on the wrapper
 */
export default function PixelShader({
  src,
  cell = 11,
  tint = '17,17,17',
  shape = 'dot',
  gap = 0.18,
  interactive = true,
  className = '',
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const gridRef = useRef(null); // { cols, rows, lum: Float32Array }
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointer = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const reduced = useRef(false);

  /* Sample the loaded image into a cols×rows luminance grid that
     cover-fits the current container size. */
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

    // cover-fit the source image into the cols×rows box
    const ir = img.width / img.height;
    const br = cols / rows;
    let sw, sh, sx, sy;
    if (ir > br) { sh = img.height; sw = sh * br; sx = (img.width - sw) / 2; sy = 0; }
    else { sw = img.width; sh = sw / br; sx = 0; sy = (img.height - sh) / 2; }
    octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

    const { data } = octx.getImageData(0, 0, cols, rows);
    const lum = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i += 1) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    gridRef.current = { cols, rows, lum };
  }

  /* Match the canvas backing store to the container × dpr. */
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

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imgRef.current = img; resize(); };
    img.src = src;

    const ro = new ResizeObserver(() => resize());
    if (wrapRef.current) ro.observe(wrapRef.current);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const start = performance.now();
    const render = (now) => {
      const grid = gridRef.current;
      const { w, h, dpr } = sizeRef.current;
      if (grid && w && h) {
        const { cols, rows, lum } = grid;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        const cw = w / cols;
        const ch = h / rows;
        const t = reduced.current ? 0 : (now - start) * 0.001;
        const px = pointer.current.x;
        const py = pointer.current.y;
        const influence = cell * 9;

        for (let y = 0; y < rows; y += 1) {
          for (let x = 0; x < cols; x += 1) {
            const L = lum[y * cols + x];
            let d = 1 - L; // darkness drives dot size
            if (d < 0.06) continue; // skip near-white cells → clean negative space

            // slow diagonal shimmer
            const wave = 0.5 + 0.5 * Math.sin((x + y) * 0.45 - t * 1.1);
            let scale = 0.78 + wave * 0.22;

            const cx = x * cw + cw / 2;
            const cy = y * ch + ch / 2;

            // soft cursor ripple
            if (interactive) {
              const dx = cx - px;
              const dy = cy - py;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < influence) scale += (1 - dist / influence) * 0.6;
            }

            const base = Math.min(cw, ch) * (1 - gap);
            const s = base * d * scale;
            if (s <= 0.4) continue;

            ctx.fillStyle = `rgba(${tint},${Math.min(1, 0.35 + d * 0.65)})`;
            if (shape === 'square') {
              ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
            } else {
              ctx.beginPath();
              ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
              ctx.fill();
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
  }, [src, cell, tint, shape, gap, interactive]);

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
      className={`pixel-shader${className ? ` ${className}` : ''}`}
      onMouseMove={interactive ? onMove : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
    >
      <canvas ref={canvasRef} className="pixel-shader-canvas" aria-hidden="true" />
    </div>
  );
}
