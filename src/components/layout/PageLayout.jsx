/**
 * PageLayout — top-level <main> wrapper for a full marketing page.
 * Composes Nav at the top and Footer at the bottom around its children.
 *
 * Usage:
 *   <PageLayout>
 *     <Hero />
 *     <Stats />
 *     ...
 *   </PageLayout>
 *
 * Pass `nav` / `footer` props to override the defaults (e.g. for a page
 * that uses an alternative nav or no footer).
 */
import Nav    from '../patterns/nav/Nav';
import Footer from '../patterns/footer/Footer';

export default function PageLayout({ children, nav, footer, activePage }) {
  return (
    <>
      {nav === null ? null : nav ?? <Nav activePage={activePage} />}
      <main>{children}</main>
      {footer === null ? null : footer ?? <Footer />}
    </>
  );
}
