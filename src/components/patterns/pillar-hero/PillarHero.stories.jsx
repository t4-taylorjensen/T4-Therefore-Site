import PillarHero from './PillarHero';
import CMSScreenReveal from '../../features/pages/hero-media/cms/CMSScreenReveal';

export default {
  title: 'Patterns/PillarHero',
  component: PillarHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2 — two-column hero (eyebrow + display headline + body copy + CTA, hairline-separated media column). Distinct from the generic Patterns/Hero used by PillarPage v1, which has a different visual design.',
      },
    },
  },
};

export const Default = {
  args: {
    mediaSlot: <CMSScreenReveal animated />,
  },
};
