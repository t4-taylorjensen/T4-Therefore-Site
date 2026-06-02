import { useEffect, useRef, useState } from 'react';
import './CMSPlatforms.css';
import sanityPhoto from '../../../../Case Studies/therefore-post-feature-05.jpg';
import drupalPhoto from '../../../../Case Studies/therefore-suite-5-waves 2.jpg';
import logoSanity  from './logo-sanity.svg';
import logoDrupal  from './logo-drupal.svg';
import Eyebrow from '../../ui/Eyebrow';
import { BtnLink, IconCornerDownRight } from '../../ui/Button/Button';

const PLATFORMS = [
  {
    logo: logoSanity,
    logoAlt: 'Sanity',
    logoClass: 'cmsplat-logo',
    headline: 'Built for speed and structure.',
    photo: sanityPhoto,
    photoAlt: 'Client interface built on Sanity CMS',
    desc: "A cloud-based, natively headless CMS built for structured content at scale. Real-time collaboration, flexible schemas, and a powerful query language make it our platform of choice for high-velocity content operations.",
    cta: 'More about Sanity',
  },
  {
    logo: logoDrupal,
    logoAlt: 'Drupal',
    logoClass: 'cmsplat-logo cmsplat-logo--drupal',
    headline: 'Enterprise-grade, open by design.',
    photo: drupalPhoto,
    photoAlt: 'Editorial platform built on Drupal',
    desc: 'An open source CMS built for complexity. We reach for Drupal where editorial governance, multilingual content, and deep integration requirements demand a battle-tested foundation.',
    cta: 'More about Drupal',
  },
];

function PlatformRow({ logo, logoAlt, logoClass, headline, photo, photoAlt, desc, cta, delay }) {
  const rowRef    = useRef(null);
  const imgRef    = useRef(null);
  const [visible, setVisible] = useState(false);

  /* scroll-in reveal */
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* parallax */
  useEffect(() => {
    const row = rowRef.current;
    const img = imgRef.current;
    if (!row || !img) return;

    const STRENGTH = 0.18;

    function onScroll() {
      const rect = row.getBoundingClientRect();
      const vh   = window.innerHeight;
      /* progress: -1 (below viewport) → 0 (centred) → 1 (above viewport) */
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      const offset   = progress * rect.height * STRENGTH;
      img.style.transform = `translateY(${offset}px) scale(1.18)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={rowRef}
      className={`cmsplat-row${visible ? ' anim-fade-up' : ' cmsplat-row--hidden'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="cmsplat-row-photo">
        <img ref={imgRef} src={photo} alt={photoAlt} />
      </div>
      <div className="cmsplat-row-body">
        <div className="cmsplat-row-top">
          <img src={logo} alt={logoAlt} className={logoClass} />
        </div>
        <div className="cmsplat-row-mid">
          <h3 className="cmsplat-row-headline">{headline}</h3>
          <p className="cmsplat-desc">{desc}</p>
        </div>
        <BtnLink href="#" icon={IconCornerDownRight} nudge="right" className="btn-link--light">{cta}</BtnLink>
      </div>
    </div>
  );
}

export default function CMSPlatforms() {
  return (
    <section className="cmsplat-section">
      <div className="cmsplat-title-block">
        <Eyebrow className="anim-fade-up anim-delay-1">Our go-to technology stack</Eyebrow>
        <h2 className="cmsplat-headline">The right platform changes what your team can build, and how fast they can build it.</h2>
      </div>

      <div className="cmsplat-rows">
        {PLATFORMS.map((p, i) => (
          <PlatformRow key={p.logoAlt} {...p} delay={i * 0.14} />
        ))}
      </div>
    </section>
  );
}
