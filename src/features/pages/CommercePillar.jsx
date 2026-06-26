import './CommercePillar.css';

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
   02. THE OPPORTUNITY
───────────────────────────────────────── */
const PROBLEMS = [
  {
    title: 'Considered',
    body:  'Selling multi-day tours requires rich, informative content that builds confidence before the booking is made. With decades of CMS experience, we help you tell the story that turns browsers into bookers.',
  },
  {
    title: 'Customised',
    body:  "You've spent years defining your brand through the experiences you deliver. Your digital presence should reflect that same attention to detail. Deep customisation is our default.",
  },
  {
    title: 'Complex',
    body:  "Off-the-shelf ecommerce wasn't built for the realities of a modern tour business. We handle the complexity beneath the surface so guests, agents, and wholesale partners enjoy a smooth ride.",
  },
  {
    title: 'Connected',
    body:  'Considered purchases come with expectations of familiarity and service, which means every system that knows something about your guest needs to work together. We make sure they do.',
  },
];

/* ─────────────────────────────────────────
   03. WHAT WE DO
───────────────────────────────────────── */
const CAPABILITIES = [
  { title: 'Direct-to-Consumer Ecommerce',
    body:  'Travel brands rarely struggle to inspire interest. We turn that interest into bookings by building confidence throughout the journey and abstracting the complexities of multi-day itineraries, accommodations and add-ons into seamless booking experiences.' },
  { title: 'Agents and Wholesale',
    body:  'Treating visitors as guests extends to your trade partners. We build purpose-built B2B booking flows that handle the intricacies of agent and wholesale bookings.' },
  { title: 'Revenue Management',
    body:  'We leverage real-time data like occupancy and load factor to dynamically adjust promotions, ad spend and messaging, driving down acquisition costs.' },
  { title: 'Modern Distribution',
    body:  'We give brands the foundation to maintain control of distribution, including readiness for agentic commerce. Real-time exposure of tour inventory alongside the rich content required to sell it effectively.' },
  { title: 'AI',
    body:  'From conversational commerce to tools that help experienced travel consultants scale their expertise, we implement AI where it delivers measurable value for each client.' },
  { title: 'Conversion Optimisation',
    body:  'Our team is commercially-minded. The KPIs we define at the outset stay front and centre through production and into ongoing optimisation.' },
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
   NOTE: no image asset for Rocky Mountaineer yet —
   reusing the Goway image as a placeholder.
───────────────────────────────────────── */
const CASE_STUDIES = [
  { img: imgCanyonSpirit, client: 'Canyon Spirit',     year: '2024' },
  { img: imgDuvine,       client: 'DuVine',            year: '2023' },
  { img: imgGoway,        client: 'Rocky Mountaineer', year: '2022' },
];
const CASE_STUDY_COUNT = 2;

/* ─────────────────────────────────────────
   07. FAQ DATA
───────────────────────────────────────── */
const COMMERCE_FAQS = [
  {
    question: 'What is headless commerce and why does it matter for premium travel brands?',
    answer:   'Headless commerce separates your storefront from the backend commerce engine, giving your brand full control over the booking experience. For premium travel, this means crafting immersive, content-rich journeys - itinerary pages, destination storytelling, real-time availability - without being constrained by a rigid platform template.',
  },
  {
    question: 'How does headless commerce support complex, multi-day travel itineraries?',
    answer:   'Multi-day travel involves layered booking logic - accommodations, transfers, excursions, and add-ons that must sync across dates and availability. A headless architecture lets you connect best-in-class booking engines, inventory systems, and CMS tools via APIs, so every touchpoint in a multi-day itinerary stays consistent and up to date.',
  },
  {
    question: 'Can headless commerce handle the personalization expectations of luxury travellers?',
    answer:   'Yes - and it excels at it. Headless platforms allow you to integrate customer data, loyalty profiles, and preference engines to deliver tailored recommendations, dynamic pricing, and curated upsells at every stage of the booking funnel, which is the standard luxury travellers expect.',
  },
  {
    question: 'Will a headless approach slow down our time to market for new travel products?',
    answer:   'Not when built well. While the initial architecture requires more planning than an out-of-the-box platform, headless systems allow your marketing and content teams to launch new destinations, packages, and seasonal offers independently - without waiting on development cycles. The long-term velocity gain outweighs the upfront investment.',
  },
  {
    question: 'How does headless commerce improve conversion rates for high-consideration travel purchases?',
    answer:   'Premium travel purchases involve longer decision cycles and higher emotional stakes. Headless commerce lets you design conversion flows that match that journey - rich visual storytelling, social proof, flexible payment options, and seamless mobile experiences - all optimized independently from your backend without platform constraints holding you back.',
  },
];

/* ─────────────────────────────────────────
   08. RELATED CONTENT
───────────────────────────────────────── */
const RELATED_CONTENT = [
  { title: 'CMS',       desc: 'Make your content competitive advantage', image: imgGoway },
  { title: 'Platforms', desc: 'Bespoke digital platforms',              image: bgInt07 },
  { title: 'AI',        desc: 'Agentic content operations',             image: aiBgBase },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function CommercePillar() {
  return (
    <>
    <PageTransition enterOnMount />
    <PageLayout activePage="Commerce">
      <PillarHero
        eyebrow="Commerce"
        headline="We build experiences that sell experiences."
        bodyCopy="We help tour and experience operators generate new and repeat bookings."
        ctaLabel="Speak to an expert"
        mediaSlot={<CMSScreenReveal animated />}
      />
      <PillarIntro
        eyebrow="Art of the possible"
        statement="We know what it takes to turn visitors into guests."
        body={'While the web speaks in terms of “visitors”, our clients think in terms of guests. To meet that expectation, we pair sophisticated technical foundations and AI-native systems with human-centred design to deliver experiences that are both high tech and high touch in equal measure.'}
        problems={PROBLEMS}
      />
      <WhatWeDo
        headline="We design, build and optimise highly customised online booking journeys specifically for tour and experience operators."
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
        headline={<>Where are you leaving<br />money on the table?</>}
        contactName="Speak with Luke Bowler, our commerce lead."
      />
      <FAQ
        faqs={COMMERCE_FAQS}
        eyebrow={(active) => <ScrambleText text="(FAQS)" active={active} />}
        headline="Questions we're often asked"
        variant="inline"
        reveal
      />
      <RelatedContent
        headline="See where we take you next."
        items={RELATED_CONTENT}
      />
    </PageLayout>
    </>
  );
}
