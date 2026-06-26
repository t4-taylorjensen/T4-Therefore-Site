import { useState, useEffect, useRef } from 'react';
import '../styles/global.css';
import ScrambleText from '../components/ui/ScrambleText';
import FlipLink from '../components/ui/FlipLink';
import LoadLine from '../components/ui/LoadLine/LoadLine';

export default {
  title: 'Foundations/Motion',
  parameters: { layout: 'padded' },
};

/* ── stage chrome shared by the effect demos ── */
const stage = {
  background: '#f2f2f2',
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
};
const caption = { fontFamily: 'Roobert, sans-serif', fontSize: 13, color: 'rgba(18,18,18,0.55)', margin: '14px 0 0', maxWidth: 620, lineHeight: 1.6 };
const mono = { fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 4px' };

const sectionLabel = {
  fontFamily: 'Roobert Mono, monospace',
  fontSize: 10,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'rgba(18,18,18,0.4)',
  marginBottom: 16,
  display: 'block',
};

const divider = {
  borderTop: '1px solid rgba(0,0,0,0.08)',
  margin: '8px 0 28px',
};

/* ── Live animation demo ── */
function AnimDemo({ label, animClass, description, token }) {
  const [key, setKey] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          background: '#f2f2f2',
          borderRadius: 8,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
        title="Click to replay"
        onClick={() => setKey(k => k + 1)}
      >
        <div key={key} className={animClass} style={{
          background: '#121212',
          color: '#fff',
          borderRadius: 5,
          padding: '8px 16px',
          fontFamily: 'Roobert Mono, monospace',
          fontSize: 11,
          letterSpacing: '0.5px',
        }}>
          {label}
        </div>
        <span style={{
          position: 'absolute',
          bottom: 8,
          right: 10,
          fontFamily: 'Roobert Mono, monospace',
          fontSize: 9,
          color: 'rgba(18,18,18,0.25)',
          letterSpacing: '0.5px',
        }}>
          CLICK TO REPLAY
        </span>
      </div>
      <div>
        <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>.{animClass}</p>
        <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)', margin: '0 0 4px', letterSpacing: '0.3px' }}>{token}</p>
        <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

/* ── Nudge demo ── */
function NudgeDemo({ label, keyframeName, direction, description }) {
  const [anim, setAnim] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          background: '#f2f2f2',
          borderRadius: 8,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        title="Hover to animate"
        onMouseEnter={() => setAnim(true)}
      >
        <div
          style={{
            background: '#4297FF',
            color: '#121212',
            borderRadius: 5,
            padding: '8px 16px',
            fontFamily: 'Roobert Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.5px',
            animation: anim ? `${keyframeName} 0.55s ease-in-out 1` : 'none',
          }}
          onAnimationEnd={() => setAnim(false)}
        >
          {label}
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212', margin: '0 0 2px' }}>{keyframeName}</p>
        <p style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Scramble — useScramble / <ScrambleText>
───────────────────────────────────────── */
function ScrambleDemo() {
  const [k, setK] = useState(0);
  return (
    <div>
      <div style={{ ...stage, cursor: 'pointer' }} title="Click to replay" onClick={() => setK(k + 1)}>
        <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 22, letterSpacing: '0.06em', color: '#121212' }}>
          <ScrambleText key={k} text="(DISCOVER)" active />
        </span>
      </div>
      <p style={mono}>useScramble(text, active) · &lt;ScrambleText&gt;</p>
      <p style={caption}>Character-scramble reveal — resolves text out of random noise over 14 frames once active. Drives the FAQ "(FAQS)" eyebrow and the "(DISCOVER)" cursor labels on the case-study / related / carousel cards. Click to replay.</p>
    </div>
  );
}
export const Scramble = { name: 'Scramble Text', render: () => <div style={{ maxWidth: 620 }}><ScrambleDemo /></div> };

/* ─────────────────────────────────────────
   Text flip — vertical roll (.flip-a / .flip-b, <FlipLink>)
───────────────────────────────────────── */
export const TextFlip = {
  name: 'Text Flip',
  render: () => (
    <div style={{ maxWidth: 620 }}>
      <div style={{ ...stage, gap: 40 }}>
        <FlipLink href="#" style={{ fontFamily: 'Roobert, sans-serif', fontSize: 18, color: '#121212' }}>Capabilities</FlipLink>
        <FlipLink href="#" style={{ fontFamily: 'Roobert, sans-serif', fontSize: 18, color: '#121212' }}>Contact</FlipLink>
      </div>
      <p style={mono}>.flip-a / .flip-b · &lt;FlipLink&gt;</p>
      <p style={caption}>Vertical-roll label: the resting text rolls up and out as a duplicate rolls in from below. Shared motion behind FlipLink, the footer nav/legal links, and the Let's Talk links. Hover to trigger.</p>
    </div>
  ),
};

/* ─────────────────────────────────────────
   Load line — scroll / auto-advance progress (<LoadLine>)
───────────────────────────────────────── */
function LoadLineDemo() {
  const [p, setP] = useState(0);
  const raf = useRef(null);
  const run = () => {
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 2200, 1);
      setP(t);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => { run(); return () => cancelAnimationFrame(raf.current); }, []);
  return (
    <div>
      <div style={{ ...stage, flexDirection: 'column', gap: 28, cursor: 'pointer' }} title="Click to replay" onClick={run}>
        <div style={{ width: '80%' }}><LoadLine progress={p} /></div>
        <div style={{ width: '80%', background: '#121212', padding: '20px 16px' }}><LoadLine progress={p} tone="dark" /></div>
      </div>
      <p style={mono}>&lt;LoadLine progress tone /&gt;</p>
      <p style={caption}>1px progress hairline — fills left-to-right with scroll position (ContentCarousel) or an auto-advance timer (testimonials). Light + dark tones. Click to replay.</p>
    </div>
  );
}
export const LoadLineMotion = { name: 'Load Line', render: () => <div style={{ maxWidth: 620 }}><LoadLineDemo /></div> };

export const Default = {
  name: 'Motion Tokens',
  render: () => (
    <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 820 }}>

      {/* Overview */}
      <span style={sectionLabel}>Overview</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
        Motion is used purposefully — to guide attention, confirm interactions, and add life without distraction.
        All animations respect <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>prefers-reduced-motion</code> and
        are disabled for users who opt out.
      </p>

      {/* Entry animations */}
      <span style={sectionLabel}>Entry Animations — Click to Replay</span>
      <hr style={divider} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
        <AnimDemo
          label="fadeUp"
          animClass="anim-fade-up"
          token="fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards"
          description="Primary entry — used in Hero, Stats, Stack, FeatureStack section labels and cards"
        />
        <AnimDemo
          label="fadeIn"
          animClass="anim-fade-in"
          token="fadeIn 0.7s ease forwards"
          description="Opacity-only entry — used for Hero media panel background"
        />
        <AnimDemo
          label="quoteIn"
          animClass="anim-quote-in"
          token="quoteIn 0.4s cubic-bezier(0.4,0,0.2,1) both"
          description="TestimonialsCarousel — quote text transition between slides"
        />
      </div>

      {/* Stagger delays */}
      <span style={sectionLabel}>Stagger Delays</span>
      <hr style={divider} />
      <p style={{ fontSize: 13, color: 'rgba(18,18,18,0.5)', marginBottom: 20 }}>
        Add to <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, background: '#f2f2f2', padding: '1px 4px', borderRadius: 3 }}>.anim-fade-up</code> elements to stagger their entrance in sequence.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
        {[
          { cls: 'anim-delay-1', delay: '0.05s', use: 'First element — eyebrow label' },
          { cls: 'anim-delay-2', delay: '0.15s', use: 'Second element — heading or cards row' },
          { cls: 'anim-delay-3', delay: '0.25s', use: 'Third element — second card' },
          { cls: 'anim-delay-4', delay: '0.38s', use: 'Fourth element — third card' },
          { cls: 'anim-delay-5', delay: '0.52s', use: 'Fifth element — trailing content' },
        ].map(({ cls, delay, use }) => (
          <div key={cls} style={{ display: 'grid', gridTemplateColumns: '140px 80px 1fr', gap: 16, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>.{cls}</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF' }}>{delay}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{use}</span>
          </div>
        ))}
      </div>

      {/* Nudge animations */}
      <span style={sectionLabel}>Nudge Animations — Hover to Trigger</span>
      <hr style={divider} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
        <NudgeDemo
          label="→ nudge-right"
          keyframeName="nudge-right"
          direction="right"
          description="Next arrow, CTA icon buttons, FeatureStack 'All Capabilities'"
        />
        <NudgeDemo
          label="← nudge-left"
          keyframeName="nudge-left"
          direction="left"
          description="Previous/back arrow buttons in WhyTherefore and TestimonialsCarousel"
        />
        <NudgeDemo
          label="↓ nudge-down"
          keyframeName="nudge-down"
          direction="down"
          description="Download icon button in HeroStack guide card"
        />
      </div>

      {/* Duration tokens */}
      <span style={sectionLabel}>Duration Tokens</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48, maxWidth: 560 }}>
        {[
          { token: '--duration-fast',   value: '200ms', use: 'Button bg/color transitions' },
          { token: '--duration-base',   value: '280ms', use: 'Card hover transforms, icon color' },
          { token: '--duration-slow',   value: '350ms', use: 'Reserved for complex UI transitions' },
          { token: '--duration-slower', value: '700ms', use: 'Scroll-reveal word opacity fade, bg transitions' },
        ].map(({ token, value, use }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 80px 1fr', gap: 16, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({token})</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#4297FF' }}>{value}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{use}</span>
          </div>
        ))}
      </div>

      {/* Easing tokens */}
      <span style={sectionLabel}>Easing Tokens</span>
      <hr style={divider} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48, maxWidth: 700 }}>
        {[
          { token: '--ease-out-expo',  value: 'cubic-bezier(0.22, 1, 0.36, 1)',  use: 'Primary ease — entry animations, snapping, carousels' },
          { token: '--ease-out-soft',  value: 'cubic-bezier(0.2, 0.8, 0.2, 1)',  use: 'Card hover transforms — gentle deceleration' },
          { token: '--ease-standard',  value: 'cubic-bezier(0.4, 0, 0.2, 1)',    use: 'Agentic card crossfade, Material-style standard curve' },
        ].map(({ token, value, use }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 280px 1fr', gap: 16, padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 11, color: '#121212' }}>var({token})</span>
            <span style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)' }}>{value}</span>
            <span style={{ fontFamily: 'Roobert, sans-serif', fontSize: 12, color: 'rgba(18,18,18,0.5)' }}>{use}</span>
          </div>
        ))}
      </div>

      {/* Reduced motion */}
      <span style={sectionLabel}>Reduced Motion</span>
      <hr style={divider} />
      <p style={{ fontSize: 14, color: 'rgba(18,18,18,0.6)', lineHeight: 1.7, maxWidth: 600 }}>
        All <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>.anim-fade-up</code>,{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>.anim-fade-in</code>, and{' '}
        <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>.anim-quote-in</code> utility classes
        are disabled via <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>@media (prefers-reduced-motion: reduce)</code>{' '}
        in <code style={{ fontFamily: 'Roobert Mono, monospace', fontSize: 12, background: '#f2f2f2', padding: '1px 5px', borderRadius: 3 }}>animations.css</code>.
        Component-level transitions (card hover, carousel snap, word reveal) should also be nullified in this context.
      </p>

    </div>
  ),
};
