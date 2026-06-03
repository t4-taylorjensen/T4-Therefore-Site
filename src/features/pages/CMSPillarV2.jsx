import { useState, useEffect, useRef, useCallback } from 'react';
import './CMSPillarV2.css';

import PageLayout from '../../components/layout/PageLayout';
import FAQ from '../../components/patterns/faq/FAQ';
import FeatureStack from '../../components/patterns/feature-stack/FeatureStack';
import CMSScreenReveal from '../../components/features/pages/hero-media/cms/CMSScreenReveal';
import AIEditorialAssistant from '../../components/features/pages/hero-media/ai/AIEditorialAssistant';
import Eyebrow from '../../components/ui/Eyebrow';
import CrosshairHover from '../../components/ui/CrosshairHover/CrosshairHover';
import { BtnSecondary, BtnArrow, BtnLink, IconCornerDownRight } from '../../components/ui/Button/Button';
import { IconArrowRight } from '../../components/ui/icons';

import imgGoway        from './assets/proj-goway-1.jpg';
import imgDuvine       from './assets/proj-duvine-1.jpg';
import imgCanyonSpirit from './assets/proj-canyon-spirit-1.jpg';

import aiBackground    from '../../components/features/pages/hero-media/assets/therefore-int-bg-08.jpg';
import bgInt01         from '../../components/features/pages/hero-media/assets/therefore-int-bg-01.jpg';
import bgInt02         from '../../components/features/pages/hero-media/assets/therefore-int-bg-02.jpg';
import bgInt03         from '../../components/features/pages/hero-media/assets/therefore-int-bg-03.jpg';
import bgInt04         from '../../components/features/pages/hero-media/assets/therefore-int-bg-04.jpg';
import bgInt07         from '../../components/features/pages/hero-media/assets/therefore-int-bg-07.jpg';
import screenDuvine    from '../../components/features/pages/hero-media/assets/therefore-cms-solutions-duvine-screen-01.jpg';
import screenNap       from '../../components/features/pages/hero-media/assets/therefore-cms-solutions-new-american-paintings-screen-01.jpg';

import logoSanity      from '../../components/patterns/cms-platforms/logo-sanity.svg';
import logoDrupal      from '../../components/patterns/cms-platforms/logo-drupal.svg';

import lukePhoto       from '../../components/ui/brand assets/therefore-int-luke-bowler.jpg';
import person1         from '../../components/patterns/testimonials-carousel/person-1.jpg';
import person2         from '../../components/patterns/testimonials-carousel/person-2.jpg';
import person3         from '../../components/patterns/testimonials-carousel/person-3.jpg';

/* ─────────────────────────────────────────
   01. HERO
───────────────────────────────────────── */
function Hero() {
  return (
    <section className="v2-hero">
      <div className="v2-hero-left">
        <p className="v2-hero-eyebrow anim-fade-up anim-delay-1">
          Content Management Systems
        </p>
        <div className="v2-hero-main anim-fade-up anim-delay-2">
          <h1 className="v2-hero-headline">
            Content should move your business forward.
          </h1>
          <p className="v2-hero-copy">
            We design content operations that give teams control, speed, and consistency
            across every channel, every market, every moment.
          </p>
          <BtnSecondary icon={IconCornerDownRight} nudge="right">
            Speak to an Expert
          </BtnSecondary>
        </div>
      </div>
      <div className="v2-hero-media anim-fade-in anim-delay-3">
        <CMSScreenReveal animated />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   02. OPPORTUNITY
───────────────────────────────────────── */
const PROBLEMS = [
  {
    title: 'Content Velocity',
    body:  "Your teams can't publish fast enough. Approvals stall. Launches slip. Competitors move.",
  },
  {
    title: 'Governance at Scale',
    body:  'Brands fracture across markets, regions, and channels. Consistency becomes a full-time job nobody owns.',
  },
  {
    title: 'Channel Proliferation',
    body:  'Web, app, email, digital signage, partner APIs. Content gets rebuilt from scratch for every surface.',
  },
  {
    title: 'Institutional Knowledge',
    body:  'When key people leave, the process leaves with them. Undocumented workflows become silent liabilities.',
  },
];

function Opportunity() {
  return (
    <section className="v2-opp">
      <div className="v2-opp-inner">
        <div className="v2-opp-left">
          <Eyebrow>The Opportunity</Eyebrow>
          <p className="v2-opp-statement">
            There's vast untapped potential in the content you already have.
          </p>
          <p className="v2-opp-body">
            Most organizations focus on producing more content. The real opportunity
            is making that content work harder across more channels, more markets,
            and more moments without rebuilding every time something changes.
          </p>
        </div>
        <div className="v2-opp-right">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className="v2-opp-row">
              <span className="v2-opp-row-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="v2-opp-row-text">
                <p className="v2-opp-row-title">{p.title}</p>
                <p className="v2-opp-row-body">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   03. WHAT WE DO
   Dark. 3×2 image overlay card grid.
   Image fills card. Title pinned bottom.
   Description reveals on hover.
───────────────────────────────────────── */
const CAPABILITIES = [
  { title: 'Content Operations Design',
    body:  'Clear ownership, structured workflows, and repeatable processes that reduce bottlenecks and remove reliance on IT.',
    img:   bgInt01 },
  { title: 'Governance Frameworks',
    body:  'Brand and compliance rules built into the system, not enforced after the fact.',
    img:   bgInt07 },
  { title: 'Omnichannel Publishing',
    body:  "One content model that serves every channel. Build once, distribute everywhere, including channels you haven't launched yet.",
    img:   screenDuvine },
  { title: 'Accessibility by Design',
    body:  'WCAG compliance embedded in components and editorial process, not retrofitted before launch.',
    img:   screenNap },
  { title: 'Analytics & Optimisation',
    body:  'Content performance measured against business goals, not just traffic.',
    img:   bgInt04 },
  { title: 'Workflow & Approvals',
    body:  'Structured editorial workflows that match how your organization actually works.',
    img:   aiBackground },
];

function WhatWeDo() {
  return (
    <section className="v2-wwd">
      <div className="v2-wwd-inner">
        <div className="v2-wwd-head">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="v2-wwd-headline">
            From content model to editorial workflow, we build systems that get out of your team's way.
          </h2>
        </div>
        <div className="v2-wwd-grid">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className="v2-wwd-card">
              <div className="v2-wwd-card-fpo" />
              <div className="v2-wwd-card-overlay" />
              <div className="v2-wwd-card-content">
                <span className="v2-wwd-card-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="v2-wwd-card-foot">
                  <h3 className="v2-wwd-card-title">{c.title}</h3>
                  <p className="v2-wwd-card-body">{c.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   04. AI CALLOUT
───────────────────────────────────────── */
function AICallout() {
  return (
    <section className="v2-ai">
      <div className="v2-ai-inner">
        <div className="v2-ai-media">
          <div className="v2-ai-screen">
            <AIEditorialAssistant animated bgOverride={aiBackground} />
          </div>
        </div>
        <div className="v2-ai-text">
          <Eyebrow>AI & Content</Eyebrow>
          <h2 className="v2-ai-headline">
            AI doesn't replace your editorial team. It makes everything they build more valuable.
          </h2>
          <p className="v2-ai-body">
            We embed AI at the content model level, meaning your AI strategy is
            structurally sound before a single prompt is written. Translation at scale,
            SEO metadata generation, workflow automation, and content performance
            analytics all become possible when the foundation is right.
          </p>
          <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">
            Our AI Capabilities
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   05. CASE STUDIES
   White. Horizontal editorial row list.
   Each project: num | image | client | outcome | arrow.
───────────────────────────────────────── */
const CASE_STUDIES = [
  {
    img:    imgGoway,
    client: 'Goway Travel',
    tag:    'CMS & Content Operations',
    value:  'Structured content serving 8 destination markets from a single model.',
  },
  {
    img:    imgDuvine,
    client: 'DuVine Cycling',
    tag:    'CMS & Commerce',
    value:  'Headless architecture that turned a boutique operator into a digital-first business.',
  },
  {
    img:    imgCanyonSpirit,
    client: 'Canyon Spirit',
    tag:    'CMS & Commerce',
    value:  'A partially decoupled CMS delivering measurable uplift in booking conversion.',
  },
];

function CaseStudies() {
  return (
    <section className="v2-cs">
      <div className="v2-cs-inner">
        <div className="v2-cs-head">
          <h2 className="v2-cs-headline">Case Studies</h2>
          <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">
            All Work
          </BtnLink>
        </div>
        <div className="v2-cs-grid">
          {CASE_STUDIES.map((c, i) => (
            <CrosshairHover key={c.client} className="v2-cs-card-xhair">
              <a href="#" className="v2-cs-card-link">
                <div className="v2-cs-card-img-wrap">
                  <img src={c.img} alt={c.client} className="v2-cs-card-img" />
                </div>
                <div className="v2-cs-card-body">
                  <div className="v2-cs-card-meta">
                    <span className="v2-cs-card-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="v2-cs-card-tag">{c.tag}</span>
                  </div>
                  <div className="v2-cs-card-foot">
                    <p className="v2-cs-card-client">{c.client}</p>
                    <p className="v2-cs-card-value">{c.value}</p>
                    <IconArrowRight className="v2-cs-card-arrow" />
                  </div>
                </div>
              </a>
            </CrosshairHover>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   06. PLATFORMS
   Dark. Two large image showcase cards.
   Logo + headline + body + points + link.
───────────────────────────────────────── */
const PLATFORMS = [
  {
    logo:     logoSanity,
    logoAlt:  'Sanity',
    tag:      'Headless CMS',
    headline: 'Built for speed, structured for scale.',
    body:     'A cloud-native headless CMS with a schema-first architecture. Real-time collaboration, a powerful query language, and composable content models make it our default for high-velocity teams.',
    bg:       bgInt03,
    points:   ['Real-time collaborative editing', 'API-first, any front-end', 'Custom content schemas at any scale'],
  },
  {
    logo:     logoDrupal,
    logoAlt:  'Drupal',
    tag:      'Enterprise CMS',
    headline: 'Enterprise-grade. Open architecture. Proven at complexity.',
    body:     'For organizations with deep integration requirements, compliance obligations, or legacy infrastructure, Drupal provides the governance and flexibility to build on what you already have.',
    bg:       bgInt02,
    points:   ['Mature access control and governance', 'Extensive integration ecosystem', 'Open-source, no vendor lock-in'],
  },
];

function Platforms() {
  return (
    <section className="v2-plat">
      <div className="v2-plat-inner">
        <div className="v2-plat-head">
          <Eyebrow tone="on-dark">Our Go-To Stack</Eyebrow>
          <h2 className="v2-plat-headline">
            We partner with two platforms because two platforms are enough to do it right.
          </h2>
        </div>
        <div className="v2-plat-grid">
          {PLATFORMS.map((p, i) => (
            <div key={p.logoAlt} className="v2-plat-card">
              <div className="v2-plat-card-top">
                <img src={p.logo} alt={p.logoAlt} className="v2-plat-logo" />
                <span className="v2-plat-tag">{p.tag}</span>
              </div>
              <div className="v2-plat-card-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="v2-plat-card-bottom">
                <h3 className="v2-plat-card-headline">{p.headline}</h3>
                <p className="v2-plat-card-copy">{p.body}</p>
                <ul className="v2-plat-points">
                  {p.points.map((pt) => (
                    <li key={pt} className="v2-plat-point">{pt}</li>
                  ))}
                </ul>
                <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">
                  Learn More
                </BtnLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   07. TESTIMONIALS
   Surface-2. Company tabs at top.
   Quote animates in on change (key trick).
   Attribution + arrows in foot.
───────────────────────────────────────── */
const QUOTES = [
  {
    photo:   person1,
    name:    'Tristan Armstrong',
    role:    'Chief Executive Officer',
    company: 'Canyon Spirit',
    quote:   'Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape.',
  },
  {
    photo:   person2,
    name:    'Sarah Chen',
    role:    'Head of Product',
    company: 'Meridian Labs',
    quote:   'Working with this team transformed how we approach digital infrastructure. Their expertise and dedication to our vision made every milestone feel achievable.',
  },
  {
    photo:   person3,
    name:    'Marcus Webb',
    role:    'Founder & Creative Director',
    company: 'Northlight Studio',
    quote:   'From day one, the collaboration felt effortless. They understood our brand deeply and delivered an experience our customers talk about constantly.',
  },
];

const CAROUSEL_INTERVAL = 5000;

function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef    = useRef(null);
  const startRef    = useRef(null);
  const rafRef      = useRef(null);
  const total       = QUOTES.length;
  const q           = QUOTES[active];

  const startCycle = useCallback((fromIndex) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct     = Math.min(elapsed / CAROUSEL_INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      const next = (fromIndex + 1) % total;
      setActive(next);
      startCycle(next);
    }, CAROUSEL_INTERVAL);
  }, [total]);

  useEffect(() => {
    startCycle(active);
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback((i) => {
    setActive(i);
    startCycle(i);
  }, [startCycle]);

  const prev = () => goTo((active - 1 + total) % total);
  const next = () => goTo((active + 1) % total);

  return (
    <section className="v2-quotes">
      <div className="v2-quotes-inner">

        <div className="v2-quotes-header">
          <Eyebrow>Client Perspectives</Eyebrow>
          <div className="v2-quotes-tabs">
            {QUOTES.map((item, i) => (
              <button
                key={i}
                className={`v2-quotes-tab${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
              >
                {item.company}
                {i === active && (
                  <span className="v2-quotes-tab-bar" style={{ transform: `scaleX(${progress})` }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="v2-quotes-body">
          <p key={active} className="v2-quote-text">
            &ldquo;{QUOTES[active].quote}&rdquo;
          </p>
        </div>

        <div className="v2-quotes-foot">
          <div className="v2-quotes-author">
            <img key={`photo-${active}`} src={q.photo} alt={q.name} className="v2-quotes-photo" />
            <div>
              <p className="v2-quotes-name">{q.name}</p>
              <p className="v2-quotes-role">{q.role}, {q.company}</p>
            </div>
          </div>
          <div className="v2-quotes-nav">
            <BtnArrow
              icon={IconArrowRight}
              label="Previous"
              nudge="left"
              onClick={prev}
              style={{ transform: 'scaleX(-1)' }}
            />
            <span className="v2-quotes-count">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <BtnArrow
              icon={IconArrowRight}
              label="Next"
              nudge="right"
              onClick={next}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   08. LET'S TALK
───────────────────────────────────────── */
function CTA() {
  return (
    <section className="v2-cta">
      <div className="v2-cta-inner">

        <div className="v2-cta-left">
          <div className="v2-cta-top">
            <Eyebrow tone="on-dark">Let's Talk</Eyebrow>
            <h2 className="v2-cta-headline">
              Most great projects start with a single conversation.
            </h2>
            <p className="v2-cta-body">
              Tell us what you're working on. We'll come back within one business day.
            </p>
          </div>
          <div className="v2-cta-person">
            <img src={lukePhoto} alt="Luke Bowler" className="v2-cta-photo" />
            <div className="v2-cta-person-text">
              <p className="v2-cta-person-name">Luke Bowler</p>
              <p className="v2-cta-person-role">Head of Client Services & Growth</p>
            </div>
          </div>
        </div>

        <div className="v2-cta-right">
          <div className="v2-form-panel">
            <form className="v2-form" onSubmit={(e) => e.preventDefault()}>
              <div className="v2-form-row-2">
                <div className="v2-form-field">
                  <input type="text" className="v2-form-input" placeholder=" " id="f-name" />
                  <label className="v2-form-label" htmlFor="f-name">Your name</label>
                </div>
                <div className="v2-form-field">
                  <input type="email" className="v2-form-input" placeholder=" " id="f-email" />
                  <label className="v2-form-label" htmlFor="f-email">Email address</label>
                </div>
              </div>
              <div className="v2-form-field">
                <input type="text" className="v2-form-input" placeholder=" " id="f-company" />
                <label className="v2-form-label" htmlFor="f-company">Company</label>
              </div>
              <div className="v2-form-field v2-form-field--textarea">
                <textarea className="v2-form-input v2-form-textarea" placeholder=" " id="f-message" rows={4} />
                <label className="v2-form-label" htmlFor="f-message">Tell us about your project</label>
              </div>
              <button type="submit" className="v2-form-submit">
                <span className="v2-form-submit-label">Send Message</span>
                <IconArrowRight />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────── */
const CMS_FAQS = [
  {
    question: 'What is headless CMS?',
    answer:   'A headless CMS separates content management from content presentation. Your editorial team manages content in one place, and it gets delivered via API to any channel, web, app, email, digital signage, or AI-powered interfaces. This architecture gives organizations lasting flexibility as channels evolve.',
  },
  {
    question: 'When does headless make sense?',
    answer:   'Headless is most effective for organizations with complex integrations, multi-channel requirements, or growth plans that exceed the limits of all-in-one platforms. It becomes valuable when flexibility and scalability outweigh the simplicity of a monolithic setup.',
  },
  {
    question: 'How long does implementation take?',
    answer:   'Enterprise implementations typically range from 6 to 9 months, depending on integration complexity, content modeling, and migration scope. A phased approach can accelerate time to value while long-term architecture evolves.',
  },
  {
    question: 'How does headless connect to existing systems?',
    answer:   'Headless integrates through APIs, allowing your CMS, commerce engine, CRM, ERP, and PIM to operate as a unified system. The architecture supports existing workflows while improving flexibility and performance across every touchpoint.',
  },
  {
    question: 'Is headless right for mid-sized enterprises?',
    answer:   'Headless can be the right choice for mid-sized enterprises with growing complexity, multiple digital channels, or long-term scalability goals. For smaller organizations with simple requirements, a monolithic platform may remain sufficient, and we will tell you honestly which applies.',
  },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function CMSPillarV2() {
  return (
    <PageLayout activePage="CMS & Commerce">
      <Hero />
      <Opportunity />
      <WhatWeDo />
      <AICallout />
      <CaseStudies />
      <Platforms />
      <Testimonials />
      <CTA />
      <FAQ faqs={CMS_FAQS} eyebrow="CMS FAQs" />
      <FeatureStack
        eyebrow="Beyond the Platform"
        headlineDark="The right CMS is just the beginning. Where we take you next."
        headlineMuted=""
        headerTitle="What we build together"
      />
    </PageLayout>
  );
}
