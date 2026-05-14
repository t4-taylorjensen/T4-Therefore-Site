import FeatureStack from './FeatureStack';

import coverDigitalProducts     from '../../ui/brand assets/cover-digital-products.jpg';
import coverAiCapabilities      from '../../ui/brand assets/cover-ai-capabilities.svg';
import coverAiCapabilitiesHover from '../../ui/brand assets/cover-ai-capabilities-hover.svg';

const DEFAULT_CARDS = [
  {
    title:       'Discovery',
    description: 'We help you make informed decisions about your digital future.',
    media:       <div className="s2-card-media s2-card-media--discovery" />,
  },
  {
    title:       'Digital Products',
    description: 'We build custom web-based applications bespoke to your needs.',
    media: (
      <div className="s2-card-media s2-card-media--digital">
        <img className="media-fill" src={coverDigitalProducts} alt="" />
      </div>
    ),
  },
  {
    title:       'Agentic Capabilities',
    description: 'We design the system before choosing tools so your solution is cohesive built.',
    media: (
      <div className="s2-card-media s2-card-media--agentic">
        <img className="s2-agentic-default" src={coverAiCapabilities} alt="" />
        <img className="s2-agentic-hover" src={coverAiCapabilitiesHover} alt="" aria-hidden="true" />
      </div>
    ),
  },
];

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

export const Default = {
  render: () => (
    <FeatureStack
      eyebrow="Our Capabilities"
      title="What We Do"
      titleSize="default"
      ctaLabel="All Capabilities"
      cards={DEFAULT_CARDS}
    />
  ),
};

export const LargeTitle = {
  render: () => (
    <FeatureStack
      eyebrow="art of the possible"
      title="We help you ideate, build, and optimise."
      titleSize="large"
      cards={DEFAULT_CARDS}
    />
  ),
};
