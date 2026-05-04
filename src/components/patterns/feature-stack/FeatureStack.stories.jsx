import FeatureStack from './FeatureStack';

export default {
  title: 'Patterns/FeatureStack',
  component: FeatureStack,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**FeatureStack** is a three-card capabilities grid. It presents discrete service areas or product features in equal-weight columns.

## When to Use
Use FeatureStack to enumerate your core services, capabilities, or product features. Works well after HeroStack as a more concrete breakdown of the value proposition. Each card links to a deeper page.

## Layout Guidelines
- Large title block: \`160px\` top, \`90px\` horizontal, \`120px\` bottom
- Cards section: \`30px\` top, \`90px\` horizontal, \`120px\` bottom
- Cards grid: \`flex\`, \`gap: 30px\`, each card \`flex: 1 0 0\` (equal width)
- Each card wrapper has \`padding: 10px 0\` for vertical breathing room
- Card text block: \`padding: 30px 20px 30px 0\`, \`gap: 15px\` between title and description
- Card media heights differ by card type (Discovery: 406px, Digital Products: 270px, Agentic: 480px)

## Responsive Behavior
- **≤ 768px**: cards switch to \`flex-direction: column\`, full-width stacked layout
- Header row (title + CTA) switches to column with \`align-items: flex-start\`
- Headline font-size drops from \`55px\` to \`36px\`
- Horizontal padding reduces to \`20px\`

## Accessibility
- Card 1 (Discovery) uses \`<a href>\` — is a real navigable link
- Card images use descriptive \`alt\` text
- Agentic card hover images are decorative and marked \`aria-hidden\`
- Scroll-reveal headline words remain readable in the DOM — animation is purely visual
        `.trim(),
      },
    },
  },
};

export const Default = {};
