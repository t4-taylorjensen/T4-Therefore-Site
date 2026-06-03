import HomePage from './HomePage';

export default {
  title: 'Pages',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**T4 Home** is the Therefore.ca studio homepage, assembled from design tokens and shared patterns.

### Section order
| # | Section | Notes |
|---|---------|-------|
| 1 | Nav | Sticky — reused from Pillar Page |
| 2 | Hero | "BUILDING WHAT'S / NEXT" display type · portfolio image · body copy |
| 3 | Logo Carousel | Client logo strip — reused from Pillar Page |
| 4 | Intro | "Our Studio" eyebrow · large editorial statement |
| 5 | Work Grid | Six portfolio panels, hover to expand |
| 6 | Numbered Cards | Three stat/statement cards on dark bg |
| 7 | Case Study | Featured project showcase |
| 8 | Footer | Reused from Pillar Page |
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Homepage',
  render: () => <HomePage />,
};
