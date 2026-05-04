import WhyTherefore from './WhyTherefore';

export default {
  title: 'Patterns/WhyTherefore',
  component: WhyTherefore,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**WhyTherefore** is a horizontally-scrolling card carousel that presents differentiators or "why us" reasons. On card hover, the entire section transitions to a vivid blue state.

## When to Use
Use WhyTherefore to answer "why should I choose you?" after the reader understands the offer. Works well after Stats or FeatureStack. The blue hover state creates a memorable, brand-expressive moment. Use once per page.

## Layout Guidelines
- Section padding: \`160px\` top, \`120px\` bottom, \`90px\` left (carousel extends to viewport edge on right)
- Scroll-reveal headline: word-by-word opacity via \`requestAnimationFrame\`, \`700ms\` ease-out-expo
- Cards: \`width: 380px\`, \`flex-shrink: 0\`, draggable via pointer events
- Card gap: \`15px\` in the track
- On any card hover: section background fades to \`#4297FF\`, video plays, headline text becomes dark
- CSS \`:has()\` drives the section-level color change — no JavaScript required for the hover state

## Responsive Behavior
- **≤ 768px**: horizontal padding reduces to \`20px\`, carousel remains scrollable
- **≤ 480px**: cards shrink to \`85vw\`, card hover lift disabled
- Navigation arrows visible and functional at all breakpoints

## Accessibility
- Carousel viewport is keyboard-focusable (\`tabindex="0"\`)
- Individual cards are keyboard-focusable (\`tabindex="0"\`)
- Arrow buttons carry \`aria-label\` attributes
- Background video is decorative and marked \`aria-hidden\`
- All transitions and animations respect \`prefers-reduced-motion\` via a dedicated \`@media\` block in \`WhyTherefore.css\`
        `.trim(),
      },
    },
  },
};

export const Default = {
  render: () => <WhyTherefore />,
};
