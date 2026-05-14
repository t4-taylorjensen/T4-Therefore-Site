import PageLayout from '../../components/layout/PageLayout';
import Hero from '../../components/patterns/hero/Hero';
import HeroStack from '../../components/patterns/hero-stack/HeroStack';
import CaseStudy from '../../components/patterns/case-study/CaseStudy';
import LogoCarousel from '../../components/patterns/logo-carousel/LogoCarousel';
import CardCarousel from '../../components/patterns/card-carousel/CardCarousel';
import TestimonialsCarousel from '../../components/patterns/testimonials-carousel/TestimonialsCarousel';
import FeatureStack from '../../components/patterns/feature-stack/FeatureStack';
import FAQ from '../../components/patterns/faq/FAQ';
import ContactCTA from '../../components/patterns/contact-cta/ContactCTA';

import coverDigitalProducts     from '../../components/ui/brand assets/cover-digital-products.jpg';
import coverAiCapabilities      from '../../components/ui/brand assets/cover-ai-capabilities.svg';
import coverAiCapabilitiesHover from '../../components/ui/brand assets/cover-ai-capabilities-hover.svg';
import rockyMountaineerSrc      from '../../components/ui/brand assets/log-rockymountaineer.svg';
import canyonSpiritSrc          from '../../components/ui/brand assets/logo-canyonspirit.svg';
import duvineSrc                from '../../components/ui/brand assets/logo-duvine.svg';
import jchsSrc                  from '../../components/ui/brand assets/logo-jchs.svg';
import longosSrc                from '../../components/ui/brand assets/logo-longos.svg';

import faqSidebarImg            from '../../components/ui/brand assets/therefore-int-media-placeholder.jpg';
import caseStudyMedia           from '../../components/ui/brand assets/video block.jpg';
import caseStudyProfile         from '../../components/ui/brand assets/therefore-placeholder-woman.jpg';
import testimonialVideo         from '../../components/patterns/testimonials-carousel/placeholder-video-man-talking.mp4';
import testimonialPerson1       from '../../components/patterns/testimonials-carousel/person-1.jpg';
import testimonialPerson2       from '../../components/patterns/testimonials-carousel/person-2.jpg';
import testimonialPerson3       from '../../components/patterns/testimonials-carousel/person-3.jpg';
import ctaProfile               from '../../components/ui/brand assets/therefore-int-luke-bowler.jpg';

const CONTACT_CTA_PROPS = {
  eyebrow:      "We're ready when you are",
  headline:     "Ready to meet and see what's possible?",
  primaryCta:   'Schedule a Call',
  secondaryCta: 'Watch Video',
  profileImage: ctaProfile,
  profileName:  'Luke Bowler',
  profileRole:  'Head of Client Services & Growth',
};

const TESTIMONIALS = [
  {
    name:         'Tristan Armstrong',
    title:        'Chief Executive Officer',
    company:      'Canyon Spirit',
    photo:        testimonialPerson1,
    video:        testimonialVideo,
    videoAsCover: true,
    quote:        '"Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."',
  },
  {
    name:    'Sarah Chen',
    title:   'Head of Product',
    company: 'Meridian Labs',
    photo:   testimonialPerson2,
    video:   testimonialVideo,
    quote:   '"Working with this team transformed how we approach digital infrastructure. Their expertise and dedication to our vision made every milestone feel achievable."',
  },
  {
    name:    'Marcus Webb',
    title:   'Founder & Creative Director',
    company: 'Northlight Studio',
    photo:   testimonialPerson3,
    video:   testimonialVideo,
    quote:   '"From day one, the collaboration felt effortless. They understood our brand deeply and delivered an experience our customers talk about constantly."',
  },
];

const CASE_STUDY_PROPS = {
  eyebrow:      'Case Study',
  titleWord1:   'DuVine',
  titleWord2:   'Cycling',
  mediaImage:   caseStudyMedia,
  mediaAlt:     'DuVine Cycling — checkout experience',
  splitLabel:   'DuVine Cycling',
  description:  'Built to replace a legacy monolith with a composable architecture designed for performance and long-term scalability.',
  ctaLabel:     'Full Case Study',
  quote:        '"Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."',
  profileImage: caseStudyProfile,
  profileName:  'Jane Smith',
  profileRole:  'Chief Executive Officer',
};

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

const LOGOS = [
  { name: 'Rocky Mountaineer', src: rockyMountaineerSrc },
  { name: 'Canyon Spirit',     src: canyonSpiritSrc     },
  { name: 'DuVine',            src: duvineSrc           },
  { name: 'JCHS',              src: jchsSrc             },
  { name: 'Longos',            src: longosSrc           },
];

const FEATURE_STACK_CARDS = [
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

export default {
  title: 'Pages/DigitalProducts',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Digital Products** pillar page — same page composition as HeadlessCMS, scoped to the Digital Products narrative. Content within each pattern should be customized for the Digital Products story; the section order can stay aligned with the canonical pillar layout.
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Digital Products',
  render: () => (
    <PageLayout>
      <Hero
        title="Bespoke Digital Products"
        description="Don’t settle for off-the-shelf tools. Launch custom platforms, products, and interactive tools. From calculators to configurators, everything is built around your business, your workflows, and your customers."
        sub={null}
        ctaLabel="Speak To An Expert"
      />
      <HeroStack
        eyebrow="Our approach"
        headline="Bespoke software leveraging the full potential of the web and AI, built only for you."
        textHeading={null}
        paragraphs={[
          'We’re not against off-the-shelf tools, but we also know no two businesses are the same. What works for most companies might solve 80% of the problem, but the remaining 20% is where the nuance lives — the things that make your business different and give your customers a reason to care.',
          'That’s why we approach digital products from the opposite direction. We focus first on the parts that make a product uniquely valuable to you, then evolve and expand it over time at a pace that makes sense for your business. The roadmap stays yours. No vendor lock-in, no compromising your process to fit someone else’s product, and no building your future on borrowed ground.',
          'At the same time, bespoke doesn’t mean reinventing the wheel. We leverage proven libraries, frameworks, and reusable systems where they make sense, combining efficiency and reliability with the flexibility of a custom-built platform. The result is the best of both worlds: faster development, a blank canvas where it matters, and a product designed entirely around your needs.',
        ]}
        cardTitle="How to launch a digital product"
        cardDesc="Learn what makes a digital product different to a website, including how to discover the right product idea."
        cardCtaLabel="Free Guide"
      />
      <CaseStudy {...CASE_STUDY_PROPS} />
      <LogoCarousel logos={LOGOS} />
      <CardCarousel
        eyebrow="art of the possible"
        headline="We help you ideate, build, and optimise."
        carouselTitle="Typical products"
        cards={[
          {
            title:       'Apps & Portals',
            description: 'Apps that allow your customers, colleagues and partners to securely login and perform business critical actions such as make orders, access reports, and send and receive messages.',
          },
          {
            title:       'Interactive Tools',
            description: 'Configurators and Calculators can be especially effective when a product or service can be personalized. We’ve built everything from custom guitar builders to furniture specifications.',
          },
          {
            title:       'Prototypes',
            description: 'Validate and test ideas quickly with functional interactive prototypes that bring theoretical concepts to life. Gather real world feedback before committing to full-scale development.',
          },
          {
            title:       'Internal Platforms',
            description: 'Streamline your operations with custom internal tools that boost productivity and collaboration. Centralise workflows, reporting, and data management to give your teams everything they need in one intuitive platform.',
          },
        ]}
      />
      <TestimonialsCarousel
        eyebrow="Trusted by industry leaders"
        testimonials={TESTIMONIALS}
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
        cards={FEATURE_STACK_CARDS}
      />
    </PageLayout>
  ),
};
