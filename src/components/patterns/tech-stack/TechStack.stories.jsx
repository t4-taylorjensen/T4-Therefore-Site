import TechStack from './TechStack';

import imgPrimary   from '../../ui/brand assets/cover-digital-products.jpg';
import imgSecondary from '../../ui/brand assets/video block.jpg';
import logoSanity   from '../../ui/brand assets/sanity-logo.svg';
import logoDrupal   from '../../ui/brand assets/drupal-logo.svg';

const DEFAULT_CARDS = [
  {
    image:       imgPrimary,
    imageAlt:    'Sanity — cloud-based headless CMS',
    logo:        logoSanity,
    logoAlt:     'Sanity',
    description: 'Sanity is a cloud-based, natively headless CMS that is at the cutting edge of AI-powered content operations.',
    ctaLabel:    'Learn more about Sanity',
  },
  {
    image:       imgSecondary,
    imageAlt:    'Drupal — open source enterprise CMS',
    logo:        logoDrupal,
    logoAlt:     'Drupal',
    description: 'Drupal is an open source CMS known for its flexibility and enterprise-grade security.',
    ctaLabel:    'Learn more about Drupal',
  },
];

export default {
  title: 'Patterns/TechStack',
  component: TechStack,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**TechStack** is a two-column card grid on a grey bleed background. It introduces the platforms/partners behind the work — each card shows a hero image, a logo, a short description, and a CTA label.

## Layout (at 1400px)
- Grey bleed section background \`#f2f2f2\`, \`90px\` padding all sides
- Eyebrow → \`60px\` gap → \`40px\` headline → \`120px\` gap → two-card grid (\`30px\` gap)
- Each card: white background, \`30px\` padding; image (5:4 aspect) → \`45px\` gap → logo → \`30px\` gap → \`20px\` description → \`30px\` gap → CTA pill

## Scaling
All measurements above are 1400px design baselines. Every gap, padding, and font-size scales linearly with the viewport — floored at the value the formula produces at 1024 and capped at the 2560 equivalent.

## Responsive
- **≤ 768px**: section padding reduces to \`60px 20px\` and the card grid collapses to a single column.
        `.trim(),
      },
    },
  },
};

export const Default = {
  render: () => (
    <TechStack
      eyebrow="Our go-to technology Stack"
      headline="Systems help you scale. Systems are designed to evolve, not be replaced…"
      cards={DEFAULT_CARDS}
    />
  ),
};
