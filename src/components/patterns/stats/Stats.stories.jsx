import Stats from './Stats';

export default {
  title: 'Patterns/Stats',
  component: Stats,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Stats** is a horizontal row of large numerical statistics used to establish credibility and scale.

## When to Use
Place Stats after the Hero or LogoCarousel to anchor the brand with impact metrics. Numbers should be real, verifiable, and meaningful to the target audience. Aim for 3–5 stats — the visual rhythm depends on even distribution.

## Layout Guidelines
- Section padding: \`160px\` top, \`90px\` horizontal, \`120px\` bottom
- Stats row: \`display: flex\`, \`gap: 30px\`, each item \`flex: 1 0 0\`
- Each stat: large numeral at heading-lg scale, label below in body-sm
- Staggered \`anim-fade-up\` with \`anim-delay-1\` through \`anim-delay-4\` for sequential entrance

## Responsive Behavior
- **≤ 768px**: switches to a horizontal-scroll carousel with \`scroll-snap-type: x mandatory\`
- Each stat card becomes \`min-width: 200px\` for comfortable scrolling
- \`scrollbar-width: none\` hides the native scrollbar
- A right-edge fade gradient (\`::after\` pseudo-element) signals overflow content

## Accessibility
- Ensure numerical values are readable without visual context ("42+ Implementations" reads correctly to screen readers)
- Fade-up animations respect \`prefers-reduced-motion\` via global \`animations.css\`
        `.trim(),
      },
    },
  },
};

export const Default = {};
