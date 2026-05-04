import './Footer.css';
import thereforeLogo from '../../ui/brand assets/therefore-logo.svg';
import { BtnPrimary, IconCornerRightArrow } from '../../ui/Button/Button';

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
              <li><a href="#">Capabilities</a></li>
              <li><a href="#">Insights</a></li>
              <li><a href="#">Culture</a></li>
            </ul>
            <ul className="footer-nav-col">
              <li><a href="#">Contact</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </nav>

          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms Conditions</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
