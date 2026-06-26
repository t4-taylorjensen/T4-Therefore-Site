import './AICallout.css';
import Eyebrow from '../../ui/Eyebrow';
import { BtnLink, IconCornerDownRight } from '../../ui/Button/Button';

/* ─────────────────────────────────────────
   AI CALLOUT
   Two-column: media on the left, eyebrow +
   headline + body + link on the right.
───────────────────────────────────────── */
export default function AICallout({
  eyebrow = 'AI & Content',
  headline = "AI doesn't replace your editorial team. It makes everything they build more valuable.",
  body = 'We embed AI at the content model level, meaning your AI strategy is structurally sound before a single prompt is written. Translation at scale, SEO metadata generation, workflow automation, and content performance analytics all become possible when the foundation is right.',
  ctaLabel = 'Our AI Capabilities',
  media = null,
}) {
  return (
    <section className="ai-callout">
      <div className="ai-callout-inner">
        <div className="ai-callout-media">
          <div className="ai-callout-screen">
            {media}
          </div>
        </div>
        <div className="ai-callout-text">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="ai-callout-headline">{headline}</h2>
          <p className="ai-callout-body">{body}</p>
          <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light btn-link--compact">
            {ctaLabel}
          </BtnLink>
        </div>
      </div>
    </section>
  );
}
