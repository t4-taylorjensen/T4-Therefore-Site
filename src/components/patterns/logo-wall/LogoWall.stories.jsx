import LogoWall from './LogoWall';
import logoSanity from '../cms-platforms/logo-sanity.svg';
import logoContentful from '../cms-platforms/logo-contentful.svg';
import logoDrupal from '../cms-platforms/logo-drupal.svg';

const LOGOS = [
  { name: 'Sanity', logo: logoSanity },
  { name: 'Contentful', logo: logoContentful },
  { name: 'Drupal', logo: logoDrupal },
  { name: 'Next.js' },
  { name: 'Netlify' },
  { name: 'Vercel' },
  { name: 'Upsun' },
  { name: 'Commerce Layer' },
];

export default {
  title: 'Patterns/LogoWall',
  component: LogoWall,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2 — static 4-up grid of partner/vendor wordmarks. Distinct from Patterns/LogoCarousel, which is an infinite-scroll ticker.',
      },
    },
  },
};

export const Default = {
  args: { logos: LOGOS },
};
