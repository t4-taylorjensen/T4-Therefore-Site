import './Footer.css';
import thereforeLogo from '../../ui/brand assets/therefore-logo.svg';
import { BtnPrimary, IconCornerRightArrow } from '../../ui/Button/Button';
import FlipLink from '../../ui/FlipLink';

export default function Footer() {

  return (
    <footer className="footer-section">
      <div className="footer-frame">

        {/* ── Left side ── */}
        <div className="footer-left">

          <div className="footer-about">
            <p className="footer-about-text">
              Therefore is a digital product studio lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Aliquam feugiat tortor pellentesque
              orci condimentum tristique.
            </p>
            <BtnPrimary as="a" href="#" icon={IconCornerRightArrow} nudge="down">
              Start a Project
            </BtnPrimary>
          </div>

          <div className="footer-wordmark">
            <img
              src={thereforeLogo}
              alt="Therefore"
              className="footer-logo-img"
              draggable="false"
            />
          </div>

        </div>

        {/* ── Right side ── */}
        <div className="footer-right">

          <nav className="footer-nav" aria-label="Footer navigation">
            <ul className="footer-nav-col">
              <li><FlipLink href="#">Capabilities</FlipLink></li>
              <li><FlipLink href="#">Insights</FlipLink></li>
              <li><FlipLink href="#">Culture</FlipLink></li>
            </ul>
            <ul className="footer-nav-col">
              <li><FlipLink href="#">Contact</FlipLink></li>
              <li><FlipLink href="#">LinkedIn</FlipLink></li>
              <li><FlipLink href="#">Instagram</FlipLink></li>
            </ul>
          </nav>

          <div className="footer-legal">
            <FlipLink href="#">Privacy Policy</FlipLink>
            <FlipLink href="#">Terms Conditions</FlipLink>
          </div>

        </div>

      </div>
    </footer>
  );
}
