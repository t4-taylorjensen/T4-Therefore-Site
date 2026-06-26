import CMSPillarV2 from './CMSPillarV2';

export default {
  title: 'Pages/Pillar Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

export const CMS = {
  name: '01 — CMS',
  render: () => <CMSPillarV2 />,
};
