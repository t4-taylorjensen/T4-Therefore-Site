import PageLayout from '../../components/layout/PageLayout';
import Hero from '../../components/patterns/hero/Hero';
import Stats from '../../components/patterns/stats/Stats';
import HeroStack from '../../components/patterns/hero-stack/HeroStack';
import CaseStudy from '../../components/patterns/case-study/CaseStudy';
import LogoCarousel from '../../components/patterns/logo-carousel/LogoCarousel';
import WhyTherefore from '../../components/patterns/why-therefore/WhyTherefore';
import TestimonialsCarousel from '../../components/patterns/testimonials-carousel/TestimonialsCarousel';
import FeatureStack from '../../components/patterns/feature-stack/FeatureStack';
import FAQ from '../../components/patterns/faq/FAQ';
import ContactCTA from '../../components/patterns/contact-cta/ContactCTA';

import CMSPlatforms from '../../components/patterns/cms-platforms/CMSPlatforms';
import CMSAlternating      from '../../components/features/pages/hero-media/cms/CMSAlternating';
import CMSScreenReveal    from '../../components/features/pages/hero-media/cms/CMSScreenReveal';
import DigitalProductCards  from '../../components/features/pages/hero-media/digital/DigitalProductCards';
import DigitalConciergeApp from '../../components/features/pages/hero-media/digital/DigitalConciergeApp';
import AITranslation          from '../../components/features/pages/hero-media/ai/AITranslation';
import AIEditorialAssistant   from '../../components/features/pages/hero-media/ai/AIEditorialAssistant';
import AISearchCard           from '../../components/features/pages/hero-media/ai/AISearchCard';
import AIAgenticCommerce      from '../../components/features/pages/hero-media/ai/AIAgenticCommerce';
import aiToolsImg             from '../../../Case Studies/DuVine/therefore-suite-ai-tools.jpg';
import wavesImg               from '../../../Case Studies/therefore-suite-5-waves 1.jpg';
import duvine09 from '../../../Case Studies/DuVine/therefore-custom-cms-commerce-website-duvine-09.jpg';

export default {
  title: 'Pages/Pillar Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

function PillarPage({ heroProps, caseStudySlot, platformsSlot, showStats = true, showLogos = true, showWhyTherefore = true, showTestimonials = true, bottomFeatureStack = true, postContactSlot }) {
  return (
    <PageLayout>
      <Hero {...heroProps} />
      {showStats && <Stats />}
      <HeroStack />
      {platformsSlot}
      {caseStudySlot !== undefined ? caseStudySlot : <CaseStudy screenVariant={heroProps.caseStudyVariant ?? 'fade'} />}
      {showLogos && <LogoCarousel />}
      {showWhyTherefore && <WhyTherefore />}
      {showTestimonials && <TestimonialsCarousel />}
      {bottomFeatureStack && <FeatureStack />}
      <FAQ />
      <ContactCTA />
      {postContactSlot}
    </PageLayout>
  );
}

export const CMSCommerce = {
  name: '01 — CMS & Commerce',
  render: () => (
    <PillarPage
      heroProps={{
        headline: <><span>We Build The</span><br /><span>Experiences That</span><br /><span>Sell Experiences</span></>,
        bodyCopy: 'Decades of content and commerce expertise to help you maximize the value of your content and drive new and repeat bookings.',
        bodySubCopy: 'Trusted by enterprise retailers, manufacturers, and B2B organizations.',
        ctaLabel: 'Speak to an Expert',
        mediaSlot: <CMSScreenReveal animated />,
        caseStudyVariant: 'strip',
      }}
      platformsSlot={<CMSPlatforms />}
    />
  ),
};

export const DigitalProducts = {
  name: '02 — Digital Products',
  render: () => (
    <PillarPage heroProps={{
      headline: <><span>Bespoke</span><br /><span>Digital</span><br /><span>Products</span></>,
      bodyCopy: 'We build systems that become your competitive advantage. Mission critical web applications, bespoke to your business.',
      bodySubCopy: 'Purpose-built for travel operators, agencies, and platforms.',
      ctaLabel: 'Speak to an Expert',
      mediaSlot: <DigitalConciergeApp animated />,
    }} />
  ),
};

const AI_CARDS = [
  {
    title: 'AI Search',
    desc: "Visibility in AI search is quickly becoming table stakes. Learn what you need to do to remain visible.",
    media: <AISearchCard animated bgOverride={aiToolsImg} />,
    delay: 'anim-delay-2',
  },
  {
    title: 'Intelligent Operations',
    desc: 'Streamline content workflows, automate repetitive processes, and deliver smarter digital experiences that improve efficiency and scale with your business.',
    media: <AIEditorialAssistant animated bgOverride={duvine09} />,
    delay: 'anim-delay-3',
  },
  {
    title: 'Agentic Commerce',
    desc: 'From intelligent product recommendations to fully autonomous booking workflows, we build the AI infrastructure that lets your commerce engine act on behalf of your customers, faster, smarter, and at scale.',
    media: <AIAgenticCommerce animated bgOverride={wavesImg} />,
    delay: 'anim-delay-4',
  },
];

export const AICapabilities = {
  name: '03 — AI Capabilities',
  render: () => (
    <PillarPage
      heroProps={{
        headline: <><span>AI</span><br /><span>Infrastructure</span></>,
        bodyCopy: 'We build the structured content foundations that make AI reliable — semantic schemas, indexed relationships, and machine-readable architecture that turns your content into an intelligent system.',
        bodySubCopy: "AI-ready content infrastructure for the world's leading travel brands.",
        ctaLabel: 'Speak to an Expert',
        mediaSlot: <AITranslation animated />,
      }}
      showStats={false}
      showLogos={false}
      showWhyTherefore={false}
      showTestimonials={false}
      bottomFeatureStack={false}
      postContactSlot={<FeatureStack showTitle={false} />}
      caseStudySlot={
        <FeatureStack
          showTitle={false}
          headerTitle="Our Capabilities"
          cards={AI_CARDS}
          cardMediaHeight={400}
        />
      }
    />
  ),
};
