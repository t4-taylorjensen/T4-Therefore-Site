import '../hero-media.css';

/* Overlapping editorial fragments — layered typographic
   composition without motion. Depth via opacity + z-index. */

const fragments = [
  {
    id: 1,
    type: 'image',
    left: '8%', top: '6%',
    width: 240, height: 160,
    bg: 'linear-gradient(145deg, #1a1612 0%, #0e0c0a 100%)',
    border: true,
    z: 2,
    label: 'COVER',
    angle: 0,
  },
  {
    id: 2,
    type: 'text-block',
    left: '38%', top: '4%',
    width: 200, height: 'auto',
    z: 4,
    angle: 0,
  },
  {
    id: 3,
    type: 'image',
    left: '28%', top: '32%',
    width: 180, height: 220,
    bg: 'linear-gradient(160deg, #141a16 0%, #0d1210 100%)',
    border: true,
    z: 5,
    label: 'FEATURE',
    angle: 1.4,
  },
  {
    id: 4,
    type: 'pull-quote',
    left: '6%', top: '44%',
    width: 220, height: 'auto',
    z: 3,
    angle: 0,
  },
  {
    id: 5,
    type: 'image',
    left: '52%', top: '48%',
    width: 200, height: 170,
    bg: 'linear-gradient(135deg, #181510 0%, #100d0b 100%)',
    border: true,
    z: 6,
    label: 'TRAVEL',
    angle: -1.8,
  },
  {
    id: 6,
    type: 'meta',
    left: '10%', top: '74%',
    width: 260,
    z: 4,
    angle: 0,
  },
];

export default function CMSFragmentedEditorial() {
  return (
    <div
      className="hm-root"
      style={{ background: 'var(--hm-bg-warm)' }}
    >
      {/* Warm atmospheric wash */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 70% 40% at 80% 10%, rgba(200,169,110,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 10% 90%, rgba(127,169,142,0.04) 0%, transparent 60%)
        `,
      }} />

      {/* Fragment: cover image */}
      <div style={{
        position: 'absolute',
        left: '8%', top: '6%',
        width: 240, height: 160,
        background: 'linear-gradient(145deg, #1a1612 0%, #0e0c0a 100%)',
        border: '1px solid var(--hm-border)',
        borderRadius: 6,
        zIndex: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: 14,
        }}>
          <div className="hm-label">Cover Story</div>
        </div>
      </div>

      {/* Fragment: feature text block */}
      <div style={{
        position: 'absolute',
        left: '42%', top: '5%',
        width: 210,
        zIndex: 4,
        padding: '16px',
        background: 'var(--hm-surface-1)',
        border: '1px solid var(--hm-border)',
        borderRadius: 6,
      }}>
        <div className="hm-label" style={{ marginBottom: 10 }}>Issue 24 — Winter</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--hm-text)',
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
          marginBottom: 12,
        }}>
          The Far<br />Horizon
        </div>
        <div style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 11,
          color: 'var(--hm-text-muted)',
          lineHeight: 1.6,
        }}>
          Seven destinations redefining
          what it means to travel with
          intention and depth.
        </div>
      </div>

      {/* Fragment: portrait image, rotated */}
      <div style={{
        position: 'absolute',
        left: '28%', top: '30%',
        width: 180, height: 230,
        background: 'linear-gradient(160deg, #141a16 0%, #0d1210 100%)',
        border: '1px solid var(--hm-border)',
        borderRadius: 6,
        zIndex: 5,
        transform: 'rotate(1.4deg)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
        }}>
          <div className="hm-label">Feature</div>
          <div style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 11,
            color: 'var(--hm-text-muted)',
            marginTop: 4,
          }}>
            Maasai Mara
          </div>
        </div>
      </div>

      {/* Fragment: pull quote */}
      <div style={{
        position: 'absolute',
        left: '5%', top: '44%',
        width: 230,
        zIndex: 3,
        borderLeft: '2px solid rgba(200,169,110,0.35)',
        paddingLeft: 14,
      }}>
        <div style={{
          fontFamily: 'var(--font-display-normal)',
          fontSize: 14,
          color: 'var(--hm-text-muted)',
          lineHeight: 1.5,
          fontStyle: 'italic',
          marginBottom: 8,
        }}>
          "The content infrastructure that powers modern travel storytelling."
        </div>
        <div className="hm-label">— Content Strategy</div>
      </div>

      {/* Fragment: landscape image, rotated opposite */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '46%',
        width: 205, height: 175,
        background: 'linear-gradient(135deg, #181510 0%, #100d0b 100%)',
        border: '1px solid var(--hm-border)',
        borderRadius: 6,
        zIndex: 6,
        transform: 'rotate(-1.8deg)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 10,
          right: 12,
        }}>
          <div className="hm-label" style={{ textAlign: 'right' }}>Travel Editorial</div>
        </div>
      </div>

      {/* Fragment: metadata strip */}
      <div style={{
        position: 'absolute',
        left: '8%', top: '76%',
        width: 280,
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        {[
          { field: 'Content Type', value: 'Travel Editorial' },
          { field: 'Published', value: '14 Channels' },
          { field: 'Status', value: 'Distributed' },
        ].map((item) => (
          <div key={item.field} style={{ display: 'flex', gap: 12 }}>
            <div className="hm-label" style={{ minWidth: 80 }}>{item.field}</div>
            <div className="hm-label hm-label--bright">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="hm-vignette" />
      <div className="hm-fade-bottom" />
      <div className="hm-grain" />
    </div>
  );
}
