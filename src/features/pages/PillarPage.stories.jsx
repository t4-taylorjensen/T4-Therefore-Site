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

export default {
  title: 'Pages/PillarPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Pillar Page** is the primary page composition showing all major patterns assembled in sequence.

This page is for **preview and documentation purposes only** — it demonstrates how patterns stack together and how visual rhythm is maintained between sections.

### Pattern Order
1. **Nav** — sticky top navigation with logo, links, CTA
2. **Hero** — above the fold, sets narrative
2. **Stats** — credibility anchor
3. **HeroStack** — capabilities showcase
4. **CaseStudy** — concrete client engagement
5. **LogoCarousel** — social proof divider
6. **WhyTherefore** — differentiator carousel
7. **TestimonialsCarousel** — trust anchor
8. **FeatureStack** — feature/product detail
9. **FAQ** — objection handling, editorial touchpoint
10. **ContactCTA** — primary conversion point, inline enquiry form

### What to Look For
- Alternating light / dark sections create visual rhythm
- LogoCarousel provides a full-width breathing moment with no padding
- TestimonialsCarousel (#121212) anchors the bottom with contrast
- Each section is fully self-contained — no shared wrapper needed
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Pillar Page',
  render: () => (
    <PageLayout>
      <Hero />
      <Stats />
      <HeroStack />
      <CaseStudy />
      <LogoCarousel />
      <WhyTherefore />
      <TestimonialsCarousel />
      <FeatureStack />
      <FAQ />
      <ContactCTA />
    </PageLayout>
  ),
};
