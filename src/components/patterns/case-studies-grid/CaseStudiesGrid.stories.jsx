import CaseStudiesGrid from './CaseStudiesGrid';
import imgGoway from '../../../features/pages/assets/goway-post-2.jpg';
import imgDuvine from '../../../features/pages/assets/proj-duvine-1.jpg';
import imgCanyonSpirit from '../../../features/pages/assets/proj-canyon-spirit-1.jpg';

const STUDIES = [
  { img: imgGoway,        client: 'Goway Travel',   year: '2022' },
  { img: imgDuvine,       client: 'DuVine Cycling', year: '2023' },
  { img: imgCanyonSpirit, client: 'Canyon Spirit',  year: '2024' },
];

export default {
  title: 'Patterns/CaseStudiesGrid',
  component: CaseStudiesGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2 — flush N-up tile grid with cursor-tracking hover info. Distinct from Patterns/CaseStudy (a carousel pattern with a different visual design and other live consumers).',
      },
    },
  },
};

export const Default = {
  args: {
    studies: STUDIES,
    count: 2,
  },
};
