import CardCarousel from './CardCarousel';

export default {
  title: 'Patterns/CardCarousel',
  component: CardCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**CardCarousel** is a horizontally-scrolling card grid with an eyebrow + scroll-reveal headline above. Each card hover triggers a section-wide accent-color wash (CSS \`:has()\`) and lazy-loads a background video. Fully prop-driven — pass an array of \`{ title, description }\` for the cards.

(Previously named **WhyTherefore**; renamed to a generic name now that it's reused across pillar pages with different content.)
        `.trim(),
      },
    },
  },
};

export const Default = {
  render: () => (
    <CardCarousel
      eyebrow="Why Therefore?"
      headline="Headless is not a technology decision. It is a systems decision. We design content models that reflect real workflows"
      headlineMuted=", integrate with your ecosystem, and scale as your business evolves."
      carouselTitle="Headless is a systems decision."
      cards={[
        { title: 'Architecture', description: 'We design the system before choosing tools so your solution is cohesive, intentional, and built to last.' },
        { title: 'Composable',   description: 'Mix best-of-breed services without lock-in. Each layer of the stack stays independently replaceable.' },
        { title: 'Integration',  description: 'We connect your CMS, commerce platform, and data sources into a unified content pipeline.' },
        { title: 'Performance',  description: 'Decoupled frontends deliver sub-second experiences regardless of backend complexity.' },
        { title: 'Scalability',  description: 'Infrastructure that grows from startup to enterprise — no rearchitecting at every inflection point.' },
      ]}
    />
  ),
};
