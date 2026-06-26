import './CMSPillarV2.css';

import PageLayout from '../../components/layout/PageLayout';
import CMSScreenReveal from '../../components/features/pages/hero-media/cms/CMSScreenReveal';
import { TrustedByStickyImage } from '../../components/patterns/trusted-by-sticky-image/TrustedByStickyImage';
import FAQ from '../../components/patterns/faq/FAQ';
import PillarHero from '../../components/patterns/pillar-hero/PillarHero';
import PillarIntro from '../../components/patterns/pillar-intro/PillarIntro';
import WhatWeDo from '../../components/patterns/what-we-do/WhatWeDo';
import CaseStudiesGrid from '../../components/patterns/case-studies-grid/CaseStudiesGrid';
import ContentCarousel from '../../components/patterns/content-carousel/ContentCarousel';
import PlatformTabs from '../../components/patterns/platform-tabs/PlatformTabs';
import LogoWall from '../../components/patterns/logo-wall/LogoWall';
import ContactCTA from '../../components/patterns/contact-cta/ContactCTA';
import RelatedContent from '../../components/patterns/related-content/RelatedContent';
import ScrambleText from '../../components/ui/ScrambleText';
import PageTransition from '../../components/ui/PageTransition/PageTransition';

import imgGoway        from './assets/goway-post-2.jpg';
import imgDuvine       from './assets/proj-duvine-1.jpg';
import imgCanyonSpirit from './assets/proj-canyon-spirit-1.jpg';

import aiBackground    from '../../components/features/pages/hero-media/assets/therefore-int-bg-08.jpg';
import imgAiSquares    from '../../components/features/pages/hero-media/assets/therefore-int-bg-03.jpg';
import bgInt07         from '../../components/features/pages/hero-media/assets/therefore-int-bg-07.jpg';
import aiBgBase        from '../../components/features/pages/hero-media/assets/therefore-int-bg-base.jpg';

import logoSanity      from '../../components/patterns/cms-platforms/logo-sanity.svg';
import logoContentful  from '../../components/patterns/cms-platforms/logo-contentful.svg';
import logoDrupal      from '../../components/patterns/cms-platforms/logo-drupal.svg';

import logoNetlify        from '../../components/patterns/logo-wall/logo-netlify.svg';
import logoVercel         from '../../components/patterns/logo-wall/logo-vercel.svg';
import logoUpsun          from '../../components/patterns/logo-wall/logo-upsun.svg';
import logoCommerceLayer  from '../../components/patterns/logo-wall/logo-commerce-layer.svg';

import lukePhoto       from '../../components/ui/brand assets/therefore-int-luke-bowler.jpg';

/* ─────────────────────────────────────────
   02. OPPORTUNITY
───────────────────────────────────────── */
const PROBLEMS = [
  {
    title: 'Move faster',
    body:  'The shorter the gap between product launch, guest interest and proposal, the higher your conversion rate. Editorial efficiency might not be glamorous, but it drives bookings.',
  },
  {
    title: 'Maintain control and consistency',
    body:  'As brands scale, guest experiences often become fragmented. Centralized content keeps you in control, no matter how far your efforts extend across markets, regions, and channels.',
  },
  {
    title: 'Reach guests where they are',
    body:  "New channels emerge every year. Without a structured approach to content, each one demands a major effort and often gets deprioritized. It doesn't have to be that way.",
  },
  {
    title: '(Really) benefit from AI',
    body:  "The same foundation that powers faster, higher-converting experiences also gives AI the institutional knowledge it needs to produce outputs you'll actually want to publish.",
  },
];

/* ─────────────────────────────────────────
   03. WHAT WE DO
   Light. Quiet 2×3 grid — no icons, no boxes.
   Hairline rules, restrained type, a single
   accent-coloured rule on hover.
───────────────────────────────────────── */
const CAPABILITIES = [
  { title: 'Audience Research',
    body:  'We bring audience insight to the table to ensure each layer of your digital experience, from the interfaces guests interact with to the systems that power them, keeps the guest at the centre.' },
  { title: 'AI-Powered Content Operations',
    body:  'We design repeatable workflows for creating and managing content across channels, combining audience understanding with business goals and engineering processes that fit the way your team already works.' },
  { title: 'Technology Consultancy',
    body:  'We partner with marketing and technology teams to align all the moving parts, ensuring your systems serve both the business and the guest.' },
  { title: 'Bespoke User Experiences',
    body:  'We craft digital experiences that highlight what makes your brand unique, delivering fast, accessible, and personalized interactions at every touchpoint.' },
  { title: 'Accessibility and Security (by design)',
    body:  'Everything we build meets the highest standards of accessibility and security, with rigorous testing applied continuously throughout the project.' },
  { title: 'Analytics & Optimisation',
    body:  "Long after launch, we remain committed to helping you maximize the foundation you've invested in and focused on achieving the commercial goals it was built to meet." },
];

/* ─────────────────────────────────────────
   04b. LINKED CONTENT
   Carousel of linkable articles / posts. First
   card points back to the AI Capabilities callout.
───────────────────────────────────────── */
const LINKED_CONTENT = [
  {
    category: 'AI & Content',
    title: 'How structured content makes AI actually useful',
    excerpt: 'Why we embed AI at the content-model level, and what becomes possible once the foundation is right.',
    image: imgAiSquares,
    href: '#ai-capabilities',
  },
  {
    category: 'CMS Strategy',
    title: 'Choosing a headless CMS for a travel brand',
    excerpt: 'A practical framework for weighing Sanity, Contentful and Drupal against your content model.',
    image: aiBackground,
  },
  {
    category: 'Case Study',
    title: 'Goway: a content platform built to scale',
    excerpt: 'How we centralized editorial operations across markets without growing the team.',
    image: imgGoway,
  },
  {
    category: 'Commerce',
    title: 'Connecting editorial content to live availability',
    excerpt: 'Bridging the experience layer and the booking engine for a seamless funnel.',
    image: imgCanyonSpirit,
  },
  {
    category: 'Perspective',
    title: 'Personalisation that respects the guest',
    excerpt: 'Structured content unlocks tailored experiences without the creepiness.',
    image: bgInt07,
  },
  {
    category: 'Field Notes',
    title: 'What we learned replatforming a tour operator',
    excerpt: 'The migration decisions that mattered, and the ones that quietly did not.',
    image: aiBgBase,
  },
];

/* ─────────────────────────────────────────
   05. CASE STUDIES
   White. Horizontal editorial row list.
   Each project: num | image | client | outcome | arrow.
───────────────────────────────────────── */
const CASE_STUDIES = [
  { img: imgGoway,        client: 'Goway Travel',   year: '2022' },
  { img: imgDuvine,       client: 'DuVine Cycling', year: '2023' },
  { img: imgCanyonSpirit, client: 'Canyon Spirit',  year: '2024' },
];

// How many of the case studies above to display — set to 3 to show all.
const CASE_STUDY_COUNT = 2;

/* ─────────────────────────────────────────
   06. PLATFORMS
   White, AI-card proportions. Sticky media + scroll-driven text.
───────────────────────────────────────── */

const PLATFORMS = [
  {
    logo:     logoSanity,
    logoAlt:  'Sanity',
    tag:      'Hybrid Source',
    headline: 'Built for speed, structured for scale.',
    body:     'Sanity is a cloud-based, natively headless and AI-driven content system built for managing structured content at scale. Sanity hosts your content but you decide how to structure and manage it.',
    bg:       aiBackground,
    points:   ['Real-time collaborative editing', 'API-first, any front-end', 'Custom content schemas at any scale'],
    cta:      'Why we like Sanity and you should too',
  },
  {
    logo:     logoContentful,
    logoAlt:  'Contentful',
    tag:      'Closed Source',
    headline: 'Built for marketing and business teams to move with confidence.',
    body:     'Contentful is a fully cloud-based content system with a strong emphasis on ease of use for marketing and business teams.',
    bg:       bgInt07,
    points:   ['Intuitive editing experience', 'Fast time-to-value for marketing teams', 'Reliable, managed cloud infrastructure'],
    cta:      'The advantages of using Contentful',
  },
  {
    logo:     logoDrupal,
    logoAlt:  'Drupal',
    tag:      'Open Source',
    headline: 'Enterprise-grade. Open architecture. Proven at complexity.',
    body:     "Drupal is an open source, enterprise-grade CMS built for complexity. We reach for Drupal where deep integration requirements demand a battle-tested foundation and when the business wants to own the solution not rent it.",
    bg:       aiBgBase,
    points:   ['Mature access control and governance', 'Extensive integration ecosystem', 'Open-source, no vendor lock-in'],
    cta:      'Why Drupal has stood the test of time',
  },
];

/* ─────────────────────────────────────────
   06b. LOGO WALL
   Light grid of partner / vendor wordmarks, 4-up. Real logos where
   we have them (Sanity, Contentful, Drupal); styled text wordmarks
   for the rest, matching weight and scale.
───────────────────────────────────────── */
const LOGO_WALL = [
  { name: 'Sanity',         logo: logoSanity },
  { name: 'Contentful',     logo: logoContentful },
  { name: 'Drupal',         logo: logoDrupal },
  { name: '▲ Next.js' },
  { name: 'Netlify',        logo: logoNetlify },
  { name: 'Vercel',         logo: logoVercel },
  { name: 'Upsun',          logo: logoUpsun },
  { name: 'Commerce Layer', logo: logoCommerceLayer },
];

/* ─────────────────────────────────────────
   08. LET'S TALK
   Brand-blue contact card: eyebrow + headline
   top, short copy bottom-left, a compound
   pill + circle CTA bottom-right. Card fades
   / rises into view as it scrolls in.
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────── */
const CMS_FAQS = [
  {
    question: 'What is a headless CMS and why is it relevant for travel brands?',
    answer:   'A headless CMS separates content management from content presentation, storing content via an API that any front-end can consume. For travel brands, this means the same content - destinations, itineraries, pricing - can be delivered to a website, mobile app, kiosk, or voice assistant without duplication or manual re-entry.',
  },
  {
    question: 'How does a headless CMS handle the complexity of travel content?',
    answer:   'Travel content is inherently structured and relational - a destination links to tours, which link to availability, pricing tiers, and media. A headless CMS lets you model these relationships explicitly, so content teams manage each element once and the front-end assembles the right combination dynamically for each user context.',
  },
  {
    question: 'Can a headless CMS support real-time pricing and availability from booking engines?',
    answer:   'Yes. A headless CMS handles editorial content (descriptions, imagery, reviews), while live data like pricing and availability is pulled from booking APIs at render time. The two layers work together - the CMS provides the experience layer, the booking engine provides the transactional layer.',
  },
  {
    question: 'How does going headless improve the booking funnel for travel websites?',
    answer:   'Headless architectures allow travel sites to deliver faster page loads, personalised content by traveller type or geography, and seamless cross-device experiences - all of which reduce drop-off in the booking funnel. Performance improvements alone can meaningfully increase conversion rates on high-intent pages like destination and package detail pages.',
  },
  {
    question: "Is a headless CMS suitable for multi-brand or multi-region travel operators?",
    answer:   "It's one of the strongest use cases. A headless CMS lets you maintain a single content repository while delivering localised, branded experiences across regions, languages, and sub-brands. Content governance stays centralised while regional teams control their own editorial workflows.",
  },
  {
    question: 'What are the trade-offs of headless CMS versus a traditional CMS for a travel company?',
    answer:   'Traditional CMS platforms offer faster initial setup and built-in page editing, but limit flexibility as your channel mix grows. Headless requires more upfront architecture work and typically a stronger development team, but pays off at scale - especially for travel brands managing high content volumes, multiple markets, or ambitious personalisation goals.',
  },
  {
    question: 'Which headless CMS platforms are most commonly used for travel websites?',
    answer:   'Contentful and Sanity are among the most widely adopted for travel and hospitality. The right choice depends on your content model complexity, editorial team size, and integration requirements with booking, loyalty, and CRM systems. An experienced digital partner can help evaluate fit against your specific platform ecosystem.',
  },
];

/* FAQ now uses the canonical Patterns/FAQ component (variant="inline"),
   see render call below — was a page-local FaqItem/CMSFaq reimplementation. */

/* ─────────────────────────────────────────
   09. RELATED CONTENT
   Quiet headline + pill link up top, a flush
   3-up grid of rounded image cards below —
   title and one-line excerpt sit under each
   image, not inside it.
───────────────────────────────────────── */
const RELATED_CONTENT = [
  {
    title: 'Commerce',
    desc: 'Headless and agentic commerce',
    image: imgDuvine,
  },
  {
    title: 'Platforms',
    desc: 'Bespoke digital platforms',
    image: bgInt07,
  },
  {
    title: 'AI',
    desc: 'Agentic content operations',
    image: aiBgBase,
  },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function CMSPillarV2() {
  return (
    <>
    <PageTransition enterOnMount />
    <PageLayout activePage="CMS">
      <PillarHero
        eyebrow="Content Management Systems"
        headline="We work with content that's going places."
        bodyCopy="Your content can do more. Our CMS experts help you unlock its full potential to engage travellers across channels and continents."
        ctaLabel="Speak to a CMS expert"
        mediaSlot={<CMSScreenReveal animated />}
      />
      <PillarIntro
        eyebrow="The Art of the Possible"
        statement="We build foundations that make your content go further, faster."
        body="When your content is centralized and structured as data, it becomes infinitely more reusable and adaptable. This foundation allows you to deliver deeply personalized guest experiences at scale, ensuring your marketing team extracts maximum value from every piece of existing and future content without increasing headcount."
        problems={PROBLEMS}
      />
      <WhatWeDo
        headline="We design and build content-managed digital experiences that are loved by editors, agents and guests."
        capabilities={CAPABILITIES}
      />
      <ContentCarousel
        eyebrow={null}
        headline="Go deeper on the ideas behind the work."
        layout="split"
        tone="dark"
        items={LINKED_CONTENT}
      />
      <CaseStudiesGrid studies={CASE_STUDIES} count={CASE_STUDY_COUNT} />
      <PlatformTabs
        variant="split"
        graphic="halftone"
        eyebrow="Our Go-To Technology Stack"
        headline="The right platform changes what your team can do, and how fast they can do it."
        platforms={PLATFORMS}
      />
      <LogoWall logos={LOGO_WALL} />
      <TrustedByStickyImage variant="cards" />
      <ContactCTA contactPhoto={lukePhoto} />
      <FAQ
        faqs={CMS_FAQS}
        eyebrow={(active) => <ScrambleText text="(FAQS)" active={active} />}
        headline="Questions we're often asked"
        variant="inline"
        reveal
      />
      <RelatedContent items={RELATED_CONTENT} />
    </PageLayout>
    </>
  );
}
