import Hero from '../../../patterns/hero/Hero';
import DigitalProductCards from './digital/DigitalProductCards';
import DigitalAgentPortal from './digital/DigitalAgentPortal';
import DigitalConciergeApp from './digital/DigitalConciergeApp';

export default {
  title: 'Patterns/Hero/Digital Products',
  parameters: {
    layout: 'fullscreen',
  },
};

const pillarProps = {
  headline: (
    <>
      Bespoke<br />
      Digital<br />
      Products
    </>
  ),
  bodyCopy:
    'We build systems that become your competitive advantage. Mission critical web applications, bespoke to your business.',
  bodySubCopy: 'Purpose-built for travel operators, agencies, and platforms.',
  ctaLabel: 'Speak to an Expert',
};

export const Default = {
  name: '01 — Product Cards',
  render: () => (
    <Hero {...pillarProps} mediaSlot={<DigitalProductCards animated />} />
  ),
};

export const AgentPortal = {
  name: '02 — Agent Portal',
  render: () => (
    <Hero {...pillarProps} mediaSlot={<DigitalAgentPortal animated />} />
  ),
};

export const ConciergeApp = {
  name: '03 — Concierge App',
  render: () => (
    <Hero {...pillarProps} mediaSlot={<DigitalConciergeApp animated />} />
  ),
};
