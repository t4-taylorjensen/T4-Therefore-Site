import './PlatformsPillar.css';

import PageLayout from '../../components/layout/PageLayout';
import CMSScreenReveal from '../../components/features/pages/hero-media/cms/CMSScreenReveal';
import { TrustedByStickyImage } from '../../components/patterns/trusted-by-sticky-image/TrustedByStickyImage';
import FAQ from '../../components/patterns/faq/FAQ';
import PillarHero from '../../components/patterns/pillar-hero/PillarHero';
import PillarIntro from '../../components/patterns/pillar-intro/PillarIntro';
import WhatWeDo from '../../components/patterns/what-we-do/WhatWeDo';
import ContentCarousel from '../../components/patterns/content-carousel/ContentCarousel';
import CaseStudiesGrid from '../../components/patterns/case-studies-grid/CaseStudiesGrid';
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

import lukePhoto       from '../../components/ui/brand assets/therefore-int-luke-bowler.jpg';

/* ─────────────────────────────────────────
   02. WHAT WE BUILD
───────────────────────────────────────── */
const PROBLEMS = [
  {
    title: 'Guest Portals',
    body:  'Account-based, self-service experiences that span the entire journey from initial research and booking through to post-trip engagement. Guests access advanced multi-day trip planning tools, real-time itinerary updates, direct messaging with guest services, and loyalty rewards that recognise repeat travellers.',
  },
  {
    title: 'Agent & Partner Portals',
    body:  'Operational tools that empower your distribution network to sell complex, multi-day itineraries with confidence. Partners access privileged rates, commission structures, and white-labelled booking experiences tailored to their clientele.',
  },
  {
    title: 'Configurators',
    body:  'Leverage agentic capabilities to build modular, multi-day itineraries that guests can customise themselves or your sales team can use to dramatically reduce time from enquiry to quote, even for the most intricate travel packages.',
  },
  {
    title: 'Business Applications',
    body:  'Internal platforms that replace manual processes with intelligent workflows, helping your team manage the complexity of multi-day travel operations while freeing up time for the human judgement that transforms good trips into unforgettable ones.',
  },
];

/* ─────────────────────────────────────────
   03. HOW WE BUILD
───────────────────────────────────────── */
const CAPABILITIES = [
  { title: 'Rapid Prototyping',
    body:  "We move from concept to prototype in days, not months. Whether it's a new booking flow or a guest portal feature, you'll see your ideas take shape quickly so we can test assumptions before committing to code." },
  { title: 'Architecture Planning & Integrations',
    body:  'We work with your technology teams to make sure every tool works for your guests and your business. Every integration is planned with scalability in mind, so your infrastructure grows with your business.' },
  { title: 'Product Discovery & Roadmapping',
    body:  "We begin with deep discovery to understand your business, your guests, and your operational challenges. This shapes a roadmap that prioritises what matters most whether that's reducing time-to-quote, improving yield management, or unlocking new revenue streams." },
  { title: 'Product Design and Development',
    body:  'We design interfaces that feel intuitive for travellers and powerful for your operations team. Every screen is crafted with real user journeys in mind from first enquiry to post-trip engagement.' },
  { title: 'Product Improvement',
    body:  'We continuously refine your platform based on real usage data, guest feedback, and evolving market demands ensuring your competitive advantage compounds over time. Our homegrown, always-on agentic performance monitoring tools give you complete visibility and control.' },
  { title: 'Agentic QA',
    body:  'Our purpose-built QA agent works like a dedicated testing team, rigorously reviewing every code commit long before it reaches you. The result is confidence that your time is reserved for the decisions only humans can make.' },
];

/* ─────────────────────────────────────────
   03b. GO DEEPER — content carousel (copied from the CMS page)
───────────────────────────────────────── */
const LINKED_CONTENT = [
  { category: 'AI & Content',  title: 'How structured content makes AI actually useful', excerpt: 'Why we embed AI at the content-model level, and what becomes possible once the foundation is right.', image: imgAiSquares, href: '#' },
  { category: 'CMS Strategy',  title: 'Choosing a headless CMS for a travel brand', excerpt: 'A practical framework for weighing Sanity, Contentful and Drupal against your content model.', image: aiBackground },
  { category: 'Case Study',    title: 'Goway: a content platform built to scale', excerpt: 'How we centralized editorial operations across markets without growing the team.', image: imgGoway },
  { category: 'Commerce',      title: 'Connecting editorial content to live availability', excerpt: 'Bridging the experience layer and the booking engine for a seamless funnel.', image: imgCanyonSpirit },
  { category: 'Perspective',   title: 'Personalisation that respects the guest', excerpt: 'Structured content unlocks tailored experiences without the creepiness.', image: bgInt07 },
  { category: 'Field Notes',   title: 'What we learned replatforming a tour operator', excerpt: 'The migration decisions that mattered, and the ones that quietly did not.', image: aiBgBase },
];

/* ─────────────────────────────────────────
   04. CASE STUDIES
   NOTE: no image assets for Rocky Mountaineer / NAP / WGC yet —
   reusing existing project images as placeholders.
───────────────────────────────────────── */
const CASE_STUDIES = [
  { img: imgCanyonSpirit, client: 'Rocky Mountaineer', year: '2024' },
  { img: imgDuvine,       client: 'NAP',               year: '2023' },
  { img: imgGoway,        client: 'WGC',               year: '2022' },
];
const CASE_STUDY_COUNT = 2;

/* ─────────────────────────────────────────
   07. FAQ DATA
───────────────────────────────────────── */
const PLATFORMS_FAQS = [
  {
    question: 'How do you handle integrations with third-party travel systems like booking engines, GDS platforms, or payment processors?',
    answer:   "API integration is core to how we build. Whether it's connecting to a global distribution system, a property management system, or a multi-currency payment layer, we architect platforms to communicate cleanly with your existing tech stack. We've built integration-heavy applications across industries - from financial disbursement systems for major Canadian institutions to interactive brand portals for national banks - so travel's complexity is well within scope.",
  },
  {
    question: 'Our travel platform needs to handle high seasonal traffic spikes. How do you build for that?',
    answer:   "We design for peak load from day one - not as an afterthought. That means cloud-native infrastructure, decoupled front and back ends, and caching strategies that keep performance stable whether you have 200 users or 20,000. For travel, where a single campaign or press mention can spike traffic overnight, resilience isn't optional.",
  },
  {
    question: 'Can you build configurator-style tools for travel - like custom trip builders or package selectors?',
    answer:   "Absolutely. Configurator logic is something we've applied across industries - including furniture configuration tools with complex variant and pricing rules. For travel, that same approach translates naturally to trip builders, package customisers, and add-on selectors where guests are assembling a multi-component experience. The UX challenge is making something intricate feel effortless.",
  },
  {
    question: 'How long does it take to build a custom travel platform, and what does the process look like?',
    answer:   'Timelines vary based on scope, but a well-defined platform typically runs 4 to 9 months from discovery to launch. We start with a discovery and strategy phase to map your business rules, user journeys, and integration requirements - then move through UX design, development, and a structured QA process.',
  },
];

/* ─────────────────────────────────────────
   08. RELATED CONTENT
───────────────────────────────────────── */
const RELATED_CONTENT = [
  { title: 'CMS',      desc: 'Make your content competitive advantage', image: imgGoway },
  { title: 'Commerce', desc: 'Headless and agentic commerce',          image: imgCanyonSpirit },
  { title: 'AI',       desc: 'Agentic content operations',             image: aiBgBase },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function PlatformsPillar() {
  return (
    <>
    <PageTransition enterOnMount />
    <PageLayout activePage="Platforms">
      <PillarHero
        eyebrow="Digital Platforms"
        headline="We build what your competitors can't buy."
        bodyCopy="We build systems that become competitive advantage."
        ctaLabel="Speak to an expert"
        mediaSlot={<CMSScreenReveal animated />}
      />
      <PillarIntro
        eyebrow="Art of the possible"
        statement="There's no such thing as a tailor-made template."
        body="We harness the full power of the web to build applications tailored to your exact way of working, designed for your use case alone. Your roadmap moves at your pace, and what you have, no one else can buy."
        problems={PROBLEMS}
      />
      <WhatWeDo
        headline="We build the infrastructure behind lasting guest engagement. Custom platforms shaped around how your business works, built to compound in value over time."
        capabilities={CAPABILITIES}
      />
      <ContentCarousel
        eyebrow={null}
        headline="Go deeper on the ideas behind the work."
        tone="dark"
        items={LINKED_CONTENT}
      />
      <CaseStudiesGrid studies={CASE_STUDIES} count={CASE_STUDY_COUNT} />
      <TrustedByStickyImage variant="cards" />
      <ContactCTA
        contactPhoto={lukePhoto}
        contactPhotoAlt="Luke Bowler"
        headline="What should your platform make possible?"
        contactName="Speak with Luke Bowler, our platforms lead."
      />
      <FAQ
        faqs={PLATFORMS_FAQS}
        eyebrow={(active) => <ScrambleText text="(FAQS)" active={active} />}
        headline="Questions we're often asked"
        variant="inline"
        reveal
      />
      <RelatedContent
        headline={<>The right platform is a springboard.<br />See where we take you next.</>}
        items={RELATED_CONTENT}
      />
    </PageLayout>
    </>
  );
}
