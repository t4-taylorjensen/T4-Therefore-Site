import PlatformTabs from './PlatformTabs';
import logoSanity from '../cms-platforms/logo-sanity.svg';
import logoContentful from '../cms-platforms/logo-contentful.svg';
import logoDrupal from '../cms-platforms/logo-drupal.svg';
import aiBackground from '../../features/pages/hero-media/assets/therefore-int-bg-08.jpg';
import bgInt07 from '../../features/pages/hero-media/assets/therefore-int-bg-07.jpg';
import aiBgBase from '../../features/pages/hero-media/assets/therefore-int-bg-base.jpg';

const PLATFORMS = [
  {
    logo: logoSanity, logoAlt: 'Sanity', tag: 'Hybrid Source',
    headline: 'Built for speed, structured for scale.',
    body: 'Sanity is a cloud-based, natively headless and AI-driven content system built for managing structured content at scale. Sanity hosts your content but you decide how to structure and manage it.',
    bg: aiBackground, cta: 'Why we like Sanity and you should too',
    points: ['Real-time collaborative editing', 'API-first, any front-end', 'Custom content schemas at any scale'],
  },
  {
    logo: logoContentful, logoAlt: 'Contentful', tag: 'Closed Source',
    headline: 'Built for marketing and business teams to move with confidence.',
    body: 'Contentful is a fully cloud-based content system with a strong emphasis on ease of use for marketing and business teams.',
    bg: bgInt07, cta: 'The advantages of using Contentful',
    points: ['Intuitive editing experience', 'Fast time-to-value for marketing teams', 'Reliable, managed cloud infrastructure'],
  },
  {
    logo: logoDrupal, logoAlt: 'Drupal', tag: 'Open Source',
    headline: 'Enterprise-grade. Open architecture. Proven at complexity.',
    body: "Drupal is an open source, enterprise-grade CMS built for complexity. We reach for Drupal where deep integration requirements demand a battle-tested foundation and when the business wants to own the solution not rent it.",
    bg: aiBgBase, cta: 'Why Drupal has stood the test of time',
    points: ['Mature access control and governance', 'Extensive integration ecosystem', 'Open-source, no vendor lock-in'],
  },
];

export default {
  title: 'Patterns/PlatformTabs',
  component: PlatformTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Two presentations: Default (sticky scroll-driven media panel) and PlatformTabs (tabbed split — a full-bleed halftone image of the active platform on the left, balanced write-up on the right). PlatformTabs is the version used on CMS Page V2.',
      },
    },
  },
};

export const ScrollingTabs = {
  args: {
    platforms: PLATFORMS,
  },
};

export const CardTabs = {
  name: 'CardTabs',
  args: {
    variant: 'split',
    graphic: 'halftone',
    platforms: PLATFORMS,
    eyebrow: 'Our Go-To Technology Stack',
    headline: 'The right platform changes what your team can do, and how fast they can do it.',
  },
  parameters: {
    docs: { description: { story: 'Tabbed split layout. A full-bleed dot-halftone of the active platform image on the left (cursor sharpens it locally); switcher tabs and a balanced brand / body / CTA column on the right. This is the live CMS Page V2 treatment.' } },
  },
};
