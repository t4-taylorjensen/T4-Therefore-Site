import PageLayout from '../../components/layout/PageLayout';
import Hero from '../../components/patterns/hero/Hero';
import HeroStack from '../../components/patterns/hero-stack/HeroStack';
import FeatureStack from '../../components/patterns/feature-stack/FeatureStack';
import FAQ from '../../components/patterns/faq/FAQ';
import ContactCTA from '../../components/patterns/contact-cta/ContactCTA';

import coverDigitalProducts     from '../../components/ui/brand assets/cover-digital-products.jpg';
import coverAiCapabilities      from '../../components/ui/brand assets/cover-ai-capabilities.svg';
import coverAiCapabilitiesHover from '../../components/ui/brand assets/cover-ai-capabilities-hover.svg';
import faqSidebarImg            from '../../components/ui/brand assets/therefore-int-media-placeholder.jpg';
import ctaProfile               from '../../components/ui/brand assets/therefore-int-luke-bowler.jpg';

/* ─── New FeatureStack (AI capabilities) ──────────────────────────── */
const AI_CAPABILITIES_CARDS = [
  {
    title:       'AI Search',
    description: 'Visibility in AI search is quickly becoming table stakes. Learn what you need to do to remain visible.',
  },
  {
    title:       'Not Qualas!',
    description: 'AI-powered Content operations and AI-powered tools/experiences…',
  },
  {
    title:       'Agentic Commerce',
    description: 'Prepare for agentic commerce through our expertise and that of industry-leading partners like Commerce Layer.',
  },
];

/* ─── Bottom FeatureStack (placeholder — HeadlessCMS-style cards) ─── */
const BOTTOM_FEATURE_STACK_CARDS = [
  {
    title:       'Discovery',
    description: 'We help you make informed decisions about your digital future.',
    media:       <div className="s2-card-media s2-card-media--discovery" />,
  },
  {
    title:       'Digital Products',
    description: 'We build custom web-based applications bespoke to your needs.',
    media: (
      <div className="s2-card-media s2-card-media--digital">
        <img className="media-fill" src={coverDigitalProducts} alt="" />
      </div>
    ),
  },
  {
    title:       'Agentic Capabilities',
    description: 'We design the system before choosing tools so your solution is cohesive built.',
    media: (
      <div className="s2-card-media s2-card-media--agentic">
        <img className="s2-agentic-default" src={coverAiCapabilities} alt="" />
        <img className="s2-agentic-hover" src={coverAiCapabilitiesHover} alt="" aria-hidden="true" />
      </div>
    ),
  },
];

/* ─── FAQ ─────────────────────────────────────────────────────────── */
const FAQS = [
  { question: 'What is headless commerce?',                       answer: 'Headless commerce separates the frontend experience from backend systems. This allows enterprises to manage content, commerce, and integrations independently, creating greater flexibility, faster performance, and long-term scalability.' },
  { question: 'When does headless make sense?',                   answer: 'Headless is most effective for organizations with complex integrations, multi-channel requirements, or growth plans that exceed the limits of all-in-one platforms. It becomes valuable when flexibility and scalability outweigh simplicity.' },
  { question: 'How long does implementation take?',               answer: 'Enterprise implementations typically range from 12 to 20 weeks, depending on integration complexity, content modeling, and migration scope. A phased approach can accelerate time to value while long-term architecture evolves.' },
  { question: 'How does headless connect to existing systems?',   answer: 'Headless integrates through APIs, allowing CMS, commerce engines, CRM, ERP, PIM, and other platforms to operate as a unified system. The architecture is designed to support existing workflows while improving flexibility and performance.' },
  { question: 'Is headless right for mid-sized enterprises?',     answer: 'Headless can be the right choice for mid-sized enterprises with growing complexity, multiple digital channels, or long-term scalability goals. For smaller organizations with simple requirements, a monolithic platform may remain sufficient.' },
];

const FAQ_SIDEBAR = {
  image:    faqSidebarImg,
  imageAlt: 'Agentic Commerce article',
  category: 'Insight',
  title:    'Agentic Commerce: Preparing for AI-Driven Transactions',
};

/* ─── Contact CTA ─────────────────────────────────────────────────── */
const CONTACT_CTA_PROPS = {
  eyebrow:      "We're ready when you are",
  headline:     "Ready to meet and see what's possible?",
  primaryCta:   'Schedule a Call',
  secondaryCta: 'Watch Video',
  profileImage: ctaProfile,
  profileName:  'Luke Bowler',
  profileRole:  'Head of Client Services & Growth',
};

export default {
  title: 'Pages/AI',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**AI** pillar page — Hero → HeroStack → FeatureStack (capabilities) → FAQ → ContactCTA → FeatureStack (closing block).
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'AI',
  render: () => (
    <PageLayout>
      <Hero
        title="AI…"
        description="Strategic use of AI that only experts can deliver"
        sub={null}
        ctaLabel="Speak to an Expert"
      />
      <HeroStack
        eyebrow="Strategy and Execution"
        headline="No-nonsense advice and hands-on implementation across AI search, workflow automation, and agentic commerce."
        textHeading={null}
        paragraphs={[
          'In 2025 we launched a skunkworks project to reimagine how work gets done at Therefore. A small team of four ventured out into the unknown in pursuit of a better way of working, freeing our team from the mundane and freeing them up for more meaningful work. Now we’re ready to do the same for you.',
          'We bring together advisory, implementation, and experimentation under one roof. Whether it’s improving visibility in AI-driven search experiences, streamlining workflows through agents and automation, or preparing for the next evolution of commerce. Practical applications of AI that create value now while positioning you for what comes next.',
          'We’ve also struck partnerships with industry leaders like Sanity, Netlify and Commerce Layer. The result is a partner that can help you think strategically, build practically, and move at a pace that makes sense for your business.',
        ]}
        cardTitle="How we rebuilt our operations"
        cardDesc="Learn how a small but empowered team reimagined our operations, and how to apply this to your business today."
        cardCtaLabel="Free Guide"
      />
      <FeatureStack
        eyebrow="our capabilities"
        title="See what we can do"
        titleSize="large"
        cards={AI_CAPABILITIES_CARDS}
      />
      <FAQ
        eyebrow="Headless Commerce FAQs"
        headline="Frequently Asked Questions"
        faqs={FAQS}
        sidebar={FAQ_SIDEBAR}
      />
      <ContactCTA {...CONTACT_CTA_PROPS} />
      <FeatureStack
        eyebrow="Our Capabilities"
        title="What We Do"
        titleSize="default"
        ctaLabel="All Capabilities"
        cards={BOTTOM_FEATURE_STACK_CARDS}
      />
    </PageLayout>
  ),
};
