import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Hero from '../../components/patterns/hero/Hero';
import Stats from '../../components/patterns/stats/Stats';
import HeroStack from '../../components/patterns/hero-stack/HeroStack';
import CaseStudy from '../../components/patterns/case-study/CaseStudy';
import LogoCarousel from '../../components/patterns/logo-carousel/LogoCarousel';
import WhyTherefore from '../../components/patterns/why-therefore/WhyTherefore';
import TestimonialsCarousel from '../../components/patterns/testimonials-carousel/TestimonialsCarousel';
import FeatureStack, { DEFAULT_CARDS as FEATURE_CARDS } from '../../components/patterns/feature-stack/FeatureStack';
import FAQ from '../../components/patterns/faq/FAQ';
import ContactCTA from '../../components/patterns/contact-cta/ContactCTA';

import CMSPlatforms from '../../components/patterns/cms-platforms/CMSPlatforms';
import MoreWork from '../../components/patterns/more-work/MoreWork';
import img_cs1a from './assets/proj-canyon-spirit-1.jpg';
import img_nap1  from './assets/proj-nap-1.jpg';
import img_trova from './assets/proj-trova-1.jpg';
import img_duvine from './assets/proj-duvine-1.jpg';
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
import coverDigitalProducts from '../../components/ui/brand assets/cover-digital-products.jpg';
import coverDigitalPlatforms from '../../components/ui/brand assets/cover-digital-platforms.jpg';
import cmsBgPhoto  from '../../components/features/pages/hero-media/assets/cms-bg-pexels.jpg';
import cmsHeroImg  from '../../components/features/pages/hero-media/assets/cms-hero-canyon.png';
import CrosshairHover from '../../components/ui/CrosshairHover/CrosshairHover';
import { BtnPrimary, BtnIconAccent, IconCornerRightArrow } from '../../components/ui/Button/Button';

function DigitalProductsCard() {
  const [showEmail, setShowEmail] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  function reveal() { setCtaPressed(true); setTimeout(() => setShowEmail(true), 280); }

  return (
    <aside className={`hs-card${showEmail ? ' hs-card--email' : ''}`}>
      <div className="hs-card-body">
        <img src={coverDigitalPlatforms} alt="" className="hs-card-cover" />
        <div className="hs-card-text">
          <p className="hs-card-title">What should we feature here?</p>
          <p className="hs-card-desc">That's going to make someone stop and engage in the topic of web apps for travel??</p>
        </div>
        <div className={`hs-card-btn${ctaPressed ? ' hs-card-btn--pressed' : ''}`} onAnimationEnd={() => setCtaPressed(false)}>
          <BtnPrimary onClick={reveal}>Get the Guide</BtnPrimary>
          <BtnIconAccent icon={IconCornerRightArrow} label="Download" nudge="down" onClick={reveal} />
        </div>
      </div>
      <div className="hs-card-footer">
        <p className="hs-card-meta"><span className="hs-card-meta-dark">Instant Access</span></p>
      </div>
    </aside>
  );
}

function CMSCardMedia() {
  return (
    <CrosshairHover className="s2-card-media s2-card-media--digital">
      <img src={cmsBgPhoto} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.38)' }} />
      <img src={cmsHeroImg} alt="Canyon Spirit website" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', display: 'block', borderRadius: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
    </CrosshairHover>
  );
}

const MORE_WORK_PROJECTS = [
  { img: img_cs1a, client: 'Canyon Spirit',          tag: 'CMS & Commerce',  stat: '+340%', statLabel: 'booking conversion' },
  { img: img_nap1, client: 'New American Paintings',  tag: 'Digital Product', stat: '12',    statLabel: 'markets localized'  },
  { img: img_duvine, client: 'DuVine Cycling',            tag: 'CMS & Commerce',  stat: '+340%', statLabel: 'booking conversion' },
];

export default {
  title: 'Pages/Pillar Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

function PillarPage({ heroProps, caseStudySlot, moreWorkSlot, platformsSlot, showStats = true, showLogos = true, showWhyTherefore = true, showTestimonials = true, bottomFeatureStack = true, postContactSlot, faqProps, heroStackProps, whyThereforeProps }) {
  return (
    <PageLayout>
      <Hero {...heroProps} />
      {showStats && <Stats />}
      <HeroStack {...(heroStackProps ?? {})} />
      {platformsSlot}
      {caseStudySlot !== undefined ? caseStudySlot : <CaseStudy screenVariant={heroProps.caseStudyVariant ?? 'fade'} />}
      {moreWorkSlot}
      {showLogos && <LogoCarousel />}
      {showWhyTherefore && <WhyTherefore {...(whyThereforeProps ?? {})} />}
      {showTestimonials && <TestimonialsCarousel />}
      <FAQ {...(faqProps ?? {})} />
      {bottomFeatureStack && <FeatureStack />}
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
        headline: <><span>We build the</span><br /><span>experiences that</span><br /><span>sell experiences</span></>,
        bodyCopy: 'Decades of content and commerce expertise to help you maximize the value of your content and drive new and repeat bookings.',
        bodySubCopy: '',
        ctaLabel: 'Speak to an Expert',
        mediaSlot: <CMSScreenReveal animated />,
        caseStudyVariant: 'strip',
      }}
      heroStackProps={{
        eyebrow:  'Turn visitors into guests',
        headline: 'We deliver experiences that are high tech and high touch in equal measure. Because while the web speaks in terms of visitors, our clients think in terms of guests.',
        subhead:  '',
        body: [
          'Headless architecture has opened the door to more flexible, scalable, and future-ready digital experiences. This gives experience operators the freedom to evolve beyond the limitations of traditional platforms, and create digital experiences that are as distinctive as the journeys they sell.',
          'But technology alone doesn\'t create memorable experiences. The real advantage comes from understanding travelers, designing journeys that build confidence and excitement, and connecting digital experiences to business objectives. We help travel brands navigate that intersection of strategy, design, and technology ensuring every investment contributes to stronger guest relationships, increased bookings, and long-term growth.',
        ],
      }}
      platformsSlot={<CMSPlatforms />}
      moreWorkSlot={<MoreWork projects={MORE_WORK_PROJECTS} layout="staggered" />}
    />
  ),
};

export const DigitalProducts = {
  name: '02 — Digital Platforms',
  render: () => (
    <PillarPage
      showTestimonials={false}
      showLogos={false}
      bottomFeatureStack={false}
      postContactSlot={<FeatureStack showTitle={false} cards={[
        FEATURE_CARDS[0],
        { ...FEATURE_CARDS[1], title: 'CMS & Commerce', desc: 'Content and commerce platforms built for performance, editorial control, and scale.', media: <CMSCardMedia /> },
        FEATURE_CARDS[2],
      ]} />}
      faqProps={{
        eyebrow: 'Web Application FAQ',
        faqs: [
          {
            question: 'What is a web application?',
            answer: 'A web application is a browser-based digital product that helps users complete tasks, not just consume information. It can support bookings, portals, dashboards, internal tools, or customer workflows, all built around a specific business need.',
          },
          {
            question: 'When should a business invest in a custom web application?',
            answer: 'You should consider a custom web application when off-the-shelf software is forcing workarounds or limiting how your team operates. If you need more control over workflows, integrations, permissions, or user experience, a custom build is the better fit.',
          },
          {
            question: 'How does Therefore approach web application development?',
            answer: 'We start with Product Discovery, exploring the problem space you\'re seeking to solve for, your users, and the outcomes you need to achieve. Then we design the experience, define the logic, and build a modern application that fits your operations and can scale as your needs evolve.',
          },
          {
            question: 'What kinds of web applications does Therefore build?',
            answer: 'We build customer portals, partner tools, internal systems, booking platforms, and other custom digital products. The focus is always on strong UX, robust engineering, and the integrations your business depends on.',
          },
          {
            question: 'What makes a custom web application different to a website?',
            answer: 'A website is usually about communicating information, while a web application is about getting work done. If users need to log in, manage data, configure services, or complete complex actions, a web application gives you the flexibility and interactivity a standard website can\'t.',
          },
        ],
      }}
      caseStudySlot={<CaseStudy screenVariant="wipe" wipeInterval={3800} wipeDuration={1.1} />}
      heroProps={{
        headline: <><span>What We Build,</span><br /><span>Your Competitors</span><br /><span>Can't Buy.</span></>,
        bodyCopy: 'We build systems that become your competitive advantage. Mission critical web applications, bespoke to your business.',
        bodySubCopy: 'Tailor-made for luxury travel companies',
        ctaLabel: 'Speak to an Expert',
        mediaSlot: <DigitalConciergeApp animated />,
      }}
      heroStackProps={{
        eyebrow:  'Our Expertise',
        headline: 'We create custom web applications, purpose-built for your colleagues, guests and partners.',
        subhead:  'Mission critical web applications, tailored to travel and bespoke to your business.',
        body: [
          'We help you gain a competitive edge by creating purpose-built software that nobody else has.',
          'Take our work for Rocky Mountaineer, for example. A dedicated portal for trusted travel advisors, serving two iconic rail brands from a single source of truth. The result? Valuable cost savings and a 200% increase in bookings year-over-year.',
          'Our team spans the full spectrum of product development. Researchers, product managers, architects, designers and developers, all of whom take the time to learn how you operate, then create systems that are foundational to how you do business.',
          'If you\'re ready to create an unfair advantage, we\'re ready to build it.',
        ],
        cardSlot: <DigitalProductsCard />,
      }}
      whyThereforeProps={{
        eyebrow:       'Art of The Possible',
        darkText:      'Software development has changed forever. Now the only limit is your imagination.',
        mutedText:     '',
        carouselTitle: "Here's some inspiration",
        cards: [
          {
            title: 'Apps & Portals',
            desc:  'Allow guests, colleagues and trade partners to access private features such as itineraries, interactive pre-travel checklists, and loyalty rewards all through a secure, account-based portal.',
          },
          {
            title: 'Control Panels',
            desc:  'Create a connected view of your business, combining multiple system integrations into one, easy-to-access birds-eye view of all mission-critical operations.',
          },
          {
            title: 'Configurators',
            desc:  "Today's traveller is more autonomous than ever. Let guests build personalized trips by interactively piecing together elements like flights, hotels, tours, and transportation.",
          },
          {
            title: 'Rapid Prototyping',
            desc:  'Do you have an idea and need help getting buy-in? Our team can research, prototype and validate those ideas with real users, and create roadmaps for professional implementation.',
          },
        ],
      }}
    />
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
    desc: 'We build the AI infrastructure that lets your commerce engine act on behalf of your customers. Faster, smarter, and at scale.',
    media: <AIAgenticCommerce animated bgOverride={wavesImg} />,
    delay: 'anim-delay-4',
  },
];

export const AICapabilities = {
  name: '03 — AI Capabilities',
  render: () => (
    <PillarPage
      heroProps={{
        headline: <><span>Let Structure</span><br /><span>Set You Free</span></>,
        bodyCopy: 'AI tools are everywhere. An AI strategy built around your content, your commerce, and your operations is not.',
        bodySubCopy: '',
        ctaLabel: 'Speak to an Expert',
        mediaSlot: <AITranslation animated />,
      }}
      heroStackProps={{
        eyebrow:  'What is an AI Strategy?',
        headline: 'Real AI leverage comes from understanding your content, your data, and your operations before choosing any tool.',
        subhead:  'A different kind of AI partner',
        body: [
          'Most organizations are adopting AI tools reactively. A tool for content, a tool for search, a tool for customer service. Without a strategy, these tools create silos instead of eliminating them.',
          'We start by auditing your content model, your commerce data, and your operational workflows. Then we design an AI strategy that connects these layers so the outputs are accurate, on-brand, and built to scale.',
        ],
      }}
      whyThereforeProps={{
        eyebrow:       'Why Therefore?',
        darkText:      'AI works when the structure underneath it does.',
        mutedText:     ' We design the foundations that make your AI strategy reliable, scalable, and specific to your business.',
        carouselTitle: 'AI is a systems decision.',
        cards: [
          {
            title: 'Structure First',
            desc:  'We model your content and data before introducing AI so the system has something reliable to work with.',
          },
          {
            title: 'Integration',
            desc:  'We connect your CMS, commerce platform, and operational tools into a unified, AI-ready pipeline.',
          },
          {
            title: 'Specificity',
            desc:  'Generic AI tools produce generic outputs. We tune strategy and implementation to your content and workflows.',
          },
          {
            title: 'Visibility',
            desc:  'We ensure your content is structured to remain discoverable in AI-powered search and answer engines.',
          },
          {
            title: 'Scalability',
            desc:  'AI implementations that grow with your business without requiring a full rearchitect when tools or models change.',
          },
        ],
      }}
      showStats={false}
      showLogos={false}
      showWhyTherefore={true}
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
      faqProps={{
        eyebrow: 'AI Strategy FAQs',
        faqs: [
          {
            question: 'What is an AI strategy?',
            answer:
              'An AI strategy is more than adding a chatbot or integrating a generalist tool. It means auditing your content, commerce, and operations to identify where AI creates real leverage — then building the data structure, integrations, and workflows to make that leverage reliable and repeatable.',
          },
          {
            question: 'How is this different from off-the-shelf AI tools?',
            answer:
              'Off-the-shelf tools are generic by design. We build AI strategy around your specific content model, your commerce data, and your operational workflows — so the outputs are accurate, on-brand, and connected to systems your team already uses.',
          },
          {
            question: 'Why does structured content matter for AI?',
            answer:
              'AI systems are only as good as the data they can access. Structured content — with clear semantic relationships, consistent taxonomies, and machine-readable metadata — is what allows AI to retrieve, generate, and act on your content reliably. Without it, you get hallucinations and inconsistency.',
          },
          {
            question: 'Can this work with our existing stack?',
            answer:
              'Yes. We design AI integrations that work within your existing stack — whether that\'s a headless CMS, a commerce engine, or a custom platform. The goal is to augment what you have, not replace it, unless replacement is clearly the right call.',
          },
          {
            question: 'How do you approach AI for commerce?',
            answer:
              'We focus on three layers: discovery (making your products findable in AI-powered search), personalization (using your commerce data to drive smarter recommendations), and agentic workflows (automating repetitive transactional tasks so your team can focus on higher-value work).',
          },
        ],
      }}
    />
  ),
};
