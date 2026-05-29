import Hero from '../../../patterns/hero/Hero';
import AITravelProfiles    from './ai/AITravelProfiles';
import AITranslation       from './ai/AITranslation';
import AIEditorialAssistant from './ai/AIEditorialAssistant';
import AIAssetGeneration   from './ai/AIAssetGeneration';
import AITravelIntelligence from './ai/AITravelIntelligence';
import AICommandCenter      from './ai/AICommandCenter';

export default {
  title: 'Patterns/Hero/AI',
  parameters: { layout: 'fullscreen' },
};

const baseProps = {
  headline: <><span>AI</span><br /><span>Infrastructure</span></>,
  bodyCopy:
    'We build the structured content foundations that make AI reliable — semantic schemas, indexed relationships, and machine-readable architecture that turns your content into an intelligent system.',
  bodySubCopy: "AI-ready content infrastructure for the world's leading travel brands.",
};

export const Hero01 = {
  name: '01 — NOT IN USE',
  render: () => <Hero {...baseProps} mediaSlot={<AITravelProfiles animated />} />,
};

export const Hero02 = {
  name: '02 — AI Translation',
  render: () => <Hero {...baseProps} mediaSlot={<AITranslation animated />} />,
};

export const Hero03 = {
  name: '03 — Editorial Assistant',
  render: () => <Hero {...baseProps} mediaSlot={<AIEditorialAssistant animated />} />,
};


export const Hero06 = {
  name: '06 — AI Command Center',
  render: () => <Hero {...baseProps} mediaSlot={<AICommandCenter animated />} />,
};
