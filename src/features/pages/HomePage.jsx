import './HomePage.css';
import PageLayout from '../../components/layout/PageLayout';
import HomeHero from './HomeHero';

// ─────────────────────────────────────────────────────────────
// PAGE COMPOSITION
// ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageLayout>
      <HomeHero />
    </PageLayout>
  );
}
