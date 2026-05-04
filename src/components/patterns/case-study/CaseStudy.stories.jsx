import CaseStudy from './CaseStudy';

export default {
  title: 'Patterns/CaseStudy',
  component: CaseStudy,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**CaseStudy** is a dark inset section that showcases a single client engagement. It uses a scroll-driven expansion animation to emerge from a bordered, scaled-down state into a full-width block as it enters the viewport.

## When to Use
Place CaseStudy after a capabilities or differentiator section (e.g. FeatureStack or WhyTherefore) to ground the pitch in a concrete example. It works best as a standalone feature — one case study per page. The dark background creates a strong contrast break between surrounding light sections.

## Layout Guidelines
- **Section**: dark background (\`#121212\`), starts inset at \`margin: 30px\`, \`border-radius: 16px\`, \`scale(0.98)\`
- **Scroll expansion**: as section enters the viewport, margin, border-radius, and scale animate to 0/0/1.0 via \`requestAnimationFrame\`
- **Container**: \`padding: 0 90px\` — reduced to 30px at ≤1024px, 20px at ≤768px
- **Title block**: "Case Study" eyebrow label + large display headline (ABC Gravity X Compressed, \`clamp(72px, 15.3vw, 220px)\`) + pulsing "(scroll)" hint
- **Media**: 700px fixed height, \`overflow: hidden\` — clips the product mockup composition; reduces to 300px on mobile
- **Split content**: two-column flex at \`gap: 144px\`
  - Left: client label + \`clamp(24px–40px)\` description + white CTA button
  - Right: \`width: 481px\` with pull quote + profile card aligned at \`padding-top: 71px\`

## Animations
- **Scroll-driven expansion**: scroll listener + \`rAF\` — progress from 0→1 as section top travels from viewport bottom to viewport 50%
- **Title reveal** (one-shot \`IntersectionObserver\` at 0.15 threshold): eyebrow fadeUp, words slide up from \`translateY(105%)\` with stagger delay
- **Split reveal** (one-shot \`IntersectionObserver\` at 0.2 threshold): description, CTA, quote, and profile fade in with staggered delays
- **CTA icon nudge**: \`nudge-right\` keyframe fires on mouse enter, resets via \`onAnimationEnd\`
- **Scroll hint**: continuous \`cs-pulse\` keyframe at 2.2s — hidden on mobile

## Responsive Behavior
- **≤ 1024px**: horizontal padding reduces to 30px, split gap reduces to 60px, right column becomes fluid
- **≤ 768px**: stacks to single column, scroll hint hidden, media reduces to 300px, description locks to 30px, right column gets 80px top padding

## Accessibility
- Section uses \`<section>\` landmark; headline is \`<h2>\`
- CTA is an \`<a href>\` — fully keyboard accessible
- Icon SVG is \`aria-hidden\` — button text alone describes the action
- Title reveal and split reveal animations respect \`prefers-reduced-motion\` — all elements snap to visible immediately when reduced motion is preferred
- Scroll hint is hidden on mobile via CSS — not a primary navigation element
        `.trim(),
      },
    },
  },
};

export const Default = {};
