import HeroStack from './HeroStack';

export default {
  title: 'Patterns/HeroStack',
  component: HeroStack,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**HeroStack** is a two-column section that pairs a scroll-reveal headline with a downloadable guide card. It is used for capability overviews and product positioning.

## When to Use
Place HeroStack after the Hero section to expand on the core service or product narrative. It bridges the hero moment with more specific content. Works well before FeatureStack.

## Layout Guidelines
- Section padding: \`160px\` top, \`90px\` horizontal, \`120px\` bottom
- \`150px\` margin between the large title block and the body row
- Left column: scroll-reveal headline (word-by-word opacity via \`requestAnimationFrame\`)
- Right column: guide card with CTA, email capture, and animated beam decoration
- Body row uses \`align-items: flex-start\` — columns are independent height

## Responsive Behavior
- **≤ 768px**: stacks to single column, top padding reduces to 90px
- Guide card takes full width below the headline
- Email field and CTA remain fully functional on mobile

## Accessibility
- Headline uses \`<h2>\` — do not nest another \`<h2>\` at the same level in adjacent sections
- Email field has an associated label and descriptive placeholder
- CTA and submit button are keyboard accessible
- Word-reveal animation is purely visual — the text is still present and readable in the DOM for screen readers
- Spinner and success state are announced via state change (no \`aria-live\` yet — add if needed)
        `.trim(),
      },
    },
  },
};

export const Default = {
  decorators: [
    (Story) => (
      <div style={{ minWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};
