import { useState, useEffect } from 'react';
import '../hero-media.css';
import bgImage from '../assets/therefore-int-bg-base.jpg';
import square1  from '../assets/therefore-square-1.svg';
import square2  from '../assets/therefore-square-2.svg';

const ink = (a) => `rgba(18,18,18,${a})`;

const QUERIES = [
  'Best cycling tours in Bordeaux wine country',
  'Luxury guided bike tours France',
  'Guided wine country cycling experiences',
];

const ANSWERS = [
  { text: 'DuVine\'s Bordeaux cycling tours combine private cellar access with guided riding through the Médoc and Saint-Émilion appellations.', cite: 'private cellar access' },
  { text: 'For luxury guided cycling in France, DuVine ranks among the top operators — small groups, expert guides, properties selected for character.', cite: 'expert guides' },
  { text: 'Routes are paced for enjoyment, not endurance. Each day ends with a multi-course dinner paired by a resident sommelier.', cite: 'paced for enjoyment, not endurance' },
];

export default function AISearchCard({ animated = true, bgOverride = null }) {
  const [step,  setStep]  = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState('typing');

  const query  = QUERIES[step % QUERIES.length];
  const answer = ANSWERS[step % ANSWERS.length];

  useEffect(() => {
    if (!animated) return;
    if (phase === 'typing') {
      if (chars < query.length) {
        const t = setTimeout(() => setChars(n => n + 1), 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('answer'), 400);
      return () => clearTimeout(t);
    }
    if (phase === 'answer') {
      const t = setTimeout(() => { setPhase('typing'); setChars(0); setStep(s => s + 1); }, 3600);
      return () => clearTimeout(t);
    }
  }, [animated, phase, chars, query]);

  const [before, after] = phase === 'answer'
    ? answer.text.split(answer.cite)
    : [null, null];

  return (
    <div className="hm-root">
      <img src={bgOverride ?? bgImage} alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

      <img src={square1} aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, width: '55%', height: 'auto', display: 'block', mixBlendMode: 'hard-light', pointerEvents: 'none' }} />
      <img src={square2} aria-hidden="true" style={{ position: 'absolute', bottom: '55%', left: '55%', width: `${0.55*(227/485)*100}%`, height: 'auto', display: 'block', mixBlendMode: 'hard-light', pointerEvents: 'none' }} />

      {/* Single card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '72%',
        background: '#ffffff',
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.16)',
      }}>

        {/* Search row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 20px' }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.30 }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="#121212" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'var(--font-primary)', fontSize: 12.5, color: ink(0.82), letterSpacing: '-0.015em', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {query.slice(0, chars)}
            {phase === 'typing' && animated && (
              <span style={{ display: 'inline-block', width: 1.5, height: '0.85em', background: ink(0.55), marginLeft: 1, verticalAlign: 'text-bottom', animation: 'hm-cursor 0.9s step-end infinite' }} />
            )}
          </span>
        </div>

        {/* Answer row */}
        <div style={{
          borderTop: `1px solid ${ink(0.07)}`,
          padding: '14px 20px 16px',
          minHeight: 72,
          opacity: phase === 'answer' ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}>
          {phase === 'answer' && (
            <p style={{ fontFamily: 'var(--font-primary)', fontSize: 11.5, color: ink(0.72), lineHeight: 1.75, letterSpacing: '-0.01em', margin: 0 }}>
              {before}
              <mark style={{ background: 'rgba(18,18,18,0.08)', borderRadius: 2, padding: '0 1px', color: ink(0.88) }}>{answer.cite}</mark>
              {after}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
