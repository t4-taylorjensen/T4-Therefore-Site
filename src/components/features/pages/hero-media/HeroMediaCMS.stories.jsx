import Hero from '../../../patterns/hero/Hero';
import CMSAlternating from './cms/CMSAlternating';
import CMSScreenReveal from './cms/CMSScreenReveal';

import bgCanyon   from './assets/cms-bg-canyon.mp4';
import heroCanyon from './assets/cms-hero-canyon.png';

export default {
  title: 'Archived/Patterns/Hero/CMS & Commerce',
  parameters: { layout: 'fullscreen' },
};

const pillarProps = {
  headline: (
    <>
      We Build The<br />
      Experiences That<br />
      Sell Experiences
    </>
  ),
  bodyCopy:
    'Decades of content and commerce expertise to help you maximize the value of your content and drive new and repeat bookings.',
  bodySubCopy: 'Trusted by enterprise retailers, manufacturers, and B2B organizations.',
  ctaLabel: 'Speak to an Expert',
};

const SLIDES = [
  { bgType: 'video', bg: bgCanyon, hero: heroCanyon },
  // add further slides here as assets arrive
];

export const Alternating = {
  name: '01 — Alternating Rail',
  render: () => <Hero {...pillarProps} mediaSlot={<CMSAlternating animated />} />,
};

export const ScreenReveal = {
  name: '02 — Screen Reveal',
  render: () => <Hero {...pillarProps} mediaSlot={<CMSScreenReveal slides={SLIDES} animated />} />,
};
