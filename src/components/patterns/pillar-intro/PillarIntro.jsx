import { useEffect, useRef, useState } from 'react';
import './PillarIntro.css';
import Eyebrow from '../../ui/Eyebrow';

const DEFAULT_PROBLEMS = [
  {
    title: 'Move faster',
    body:  'The shorter the gap between product launch, guest interest and proposal, the higher your conversion rate. Editorial efficiency might not be glamorous, but it drives bookings.',
  },
  {
    title: 'Maintain control and consistency',
    body:  'As brands scale, guest experiences often become fragmented. Centralized content keeps you in control, no matter how far your efforts extend across markets, regions, and channels.',
  },
  {
    title: 'Reach guests where they are',
    body:  "New channels emerge every year. Without a structured approach to content, each one demands a major effort and often gets deprioritized. It doesn't have to be that way.",
  },
  {
    title: '(Really) benefit from AI',
    body:  "The same foundation that powers faster, higher-converting experiences also gives AI the institutional knowledge it needs to produce outputs you'll actually want to publish.",
  },
];

/* ─────────────────────────────────────────
   OPPORTUNITY
   Sticky statement on the left; a list of problem
   rows on the right where the active row (tracked by
   scroll position via IntersectionObserver) gets an
   accent dash.
───────────────────────────────────────── */
export default function PillarIntro({
  eyebrow = 'The Art of the Possible',
  statement = 'We build foundations that make your content go further, faster.',
  body = 'When your content is centralized and structured as data, it becomes infinitely more reusable and adaptable. This foundation allows you to deliver deeply personalized guest experiences at scale, ensuring your marketing team extracts maximum value from every piece of existing and future content without increasing headcount.',
  problems = DEFAULT_PROBLEMS,
}) {
  const rowRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="opp-section">
      <div className="opp-inner">
        <div className="opp-left">
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="opp-statement">{statement}</p>
          <p className="opp-body">{body}</p>
        </div>
        <div className="opp-right">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="opp-row"
              ref={(el) => { rowRefs.current[i] = el; }}
              data-index={i}
            >
              <span className={`opp-row-dash${activeIndex === i ? ' is-active' : ''}`} />
              <p className="opp-row-title">{p.title}</p>
              <p className="opp-row-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
