import CMSPillarV2 from './CMSPillarV2';

export default {
  title: 'Pages/Pillar Pages V2',
  parameters: {
    layout: 'fullscreen',
  },
};

export const CMS = {
  name: '01 — CMS (V2)',
  render: () => <CMSPillarV2 />,
};
