import PageLayout from '../../components/layout/PageLayout';
import Hero from '../../components/patterns/hero/Hero';
import Stats from '../../components/patterns/stats/Stats';
import HeroStack from '../../components/patterns/hero-stack/HeroStack';
import TechStack from '../../components/patterns/tech-stack/TechStack';
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
import videoBlockSrc            from '../../components/ui/brand assets/video block.jpg';
import logoSanity               from '../../components/ui/brand assets/sanity-logo.svg';
import logoDrupal               from '../../components/ui/brand assets/drupal-logo.svg';
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

const TECH_STACK_CARDS = [
  {
    image:       coverDigitalProducts,
    imageAlt:    'Sanity — cloud-based headless CMS',
    logo:        logoSanity,
    logoAlt:     'Sanity',
    description: 'Sanity is a cloud-based, natively headless CMS that is at the cutting edge of AI-powered content operations.',
    ctaLabel:    'Learn more about Sanity',
  },
  {
    image:       videoBlockSrc,
    imageAlt:    'Drupal — open source enterprise CMS',
    logo:        logoDrupal,
    logoAlt:     'Drupal',
    description: 'Drupal is an open source CMS known for its flexibility and enterprise-grade security.',
    ctaLabel:    'Learn more about Drupal',
  },
];

const LOGOS = [
  { name: 'Rocky Mountaineer', src: rockyMountaineerSrc },
  { name: 'Canyon Spirit',     src: canyonSpiritSrc     },
  { name: 'DuVine',            src: duvineSrc           },
  { name: 'JCHS',              src: jchsSrc             },
  { name: 'Longos',            src: longosSrc           },
];

const STATS = [
  { number: '42+',  title: 'Implementations',   subtitle: 'Enterprise headless builds delivered' },
  { number: '38%',  title: 'Performance Lift',  subtitle: 'Average post-launch improvement' },
  { number: '14wk', title: 'Time to Launch',    subtitle: 'Typical composable deployment' },
  { number: '$2B+', title: 'Commerce Revenue',  subtitle: 'Enabled across client portfolios' },
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
        <img
          className="media-fill"
          src={coverDigitalProducts}
          alt="New American Paintings — digital product preview"
        />
      </div>
    ),
  },
  {
    title:       'Agentic Capabilities',
    description: 'We design the system before choosing tools so your solution is cohesive built.',
    media: (
      <div className="s2-card-media s2-card-media--agentic">
        <img
          className="s2-agentic-default"
          src={coverAiCapabilities}
          alt="Agentic system architecture"
        />
        <img
          className="s2-agentic-hover"
          src={coverAiCapabilitiesHover}
          alt=""
          aria-hidden="true"
        />
      </div>
    ),
  },
];

export default {
  title: 'Pages/HeadlessCMS',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Headless CMS** pillar page — the canonical composition demonstrating how all major patterns stack together for the Headless CMS narrative.

### Pattern Order
1. **Nav** — sticky top navigation
2. **Hero** — above-the-fold headline + media
3. **Stats** — credibility anchor
4. **HeroStack** — capabilities showcase
5. **TechStack** — Sanity / Drupal partner cards
6. **CaseStudy** — client engagement deep-dive
7. **LogoCarousel** — social proof divider
8. **WhyTherefore** — differentiator carousel
9. **TestimonialsCarousel** — trust anchor
10. **FeatureStack** — feature detail grid
11. **FAQ** — objection handling
12. **ContactCTA** — conversion point
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Headless CMS',
  render: () => (
    <PageLayout>
      <Hero
        title={<>Headless CMS<br />&amp; Ecommerce</>}
        description="We design and implement AI-first composable content and commerce architectures that unify content, commerce, and experience. Built for enterprises ready to move beyond monolithic platforms."
        sub="Trusted by enterprise retailers, manufacturers, and B2B organizations."
        ctaLabel="Start a Project"
      />
      <Stats stats={STATS} />
      <HeroStack
        eyebrow="What is Headless?"
        headline="One platform powering your entire digital ecosystem, content, commerce, and experience unified without compromise."
        textHeading="A new way to think about content"
        paragraphs={[
          "Traditional CMSs lock your content into rigid templates and single-channel publishing. In a multi-platform world, that's a competitive disadvantage. Headless CMS liberates your content, allowing you to adapt faster and reach audiences wherever they are.",
          "We don't just implement Contentful or Sanity—we design content models that reflect your editorial workflow, integrate with your ecosystem, and scale as your needs evolve. Our approach blends content strategy with technical architecture.",
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque rutrum urna, vitae aliquet nunc vehicula sed.',
        ]}
        cardTitle="AI Content Operations Guide"
        cardDesc="Learn how to architect a modern content supply chain that leverages AI for creation, translation, and personalization."
        cardCtaLabel="Free download"
      />
      <TechStack
        eyebrow="Our go-to technology Stack"
        headline="Systems help you scale. Systems are designed to evolve, not be replaced…"
        cards={TECH_STACK_CARDS}
      />
      <CaseStudy {...CASE_STUDY_PROPS} />
      <LogoCarousel logos={LOGOS} />
      <CardCarousel
        eyebrow="Why Therefore?"
        headline="Headless is not a technology decision. It is a systems decision. We design content models that reflect real workflows"
        headlineMuted=", integrate with your ecosystem, and scale as your business evolves."
        carouselTitle="Headless is a systems decision."
        cards={[
          { title: 'Architecture', description: 'We design the system before choosing tools so your solution is cohesive, intentional, and built to last.' },
          { title: 'Composable',   description: 'Mix best-of-breed services without lock-in. Each layer of the stack stays independently replaceable.' },
          { title: 'Integration',  description: 'We connect your CMS, commerce platform, and data sources into a unified content pipeline.' },
          { title: 'Performance',  description: 'Decoupled frontends deliver sub-second experiences regardless of backend complexity.' },
          { title: 'Scalability',  description: 'Infrastructure that grows from startup to enterprise — no rearchitecting at every inflection point.' },
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
