import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import { Footer as UswdsFooter } from 'uswds-react';

import footerStyles from '../styles/footer.module.scss'

const Footer = ({ footer }) => (
  <UswdsFooter className="usa-footer-collapsible">
    <div className={cx("usa-footer-primary-section", footerStyles.nrlFooterSection)}>
      <div className="grid-container">
        <div className="grid-row grid-gap">

          <div className="tablet:grid-col-12">
            <nav className="usa-footer-nav">
              <div className="grid-row grid-gap-2">
                {footer.navigation.map((navGroup, idx) => (
                  <div className="mobile-lg:grid-col-6 desktop:grid-col-2">
                    <section key={idx} className={cx("usa-footer-primary-content", "usa-footer-primary-content-collapsible")}>
                      <h4 className="usa-footer-primary-link">{navGroup.title}</h4>
                      <ul className={ cx("usa-list", "usa-unstyled-list") }>
                      {navGroup.items.map((navItem, idx) => (
                        <li key={idx} className="usa-nav-submenu-item">
                          <Link to={navItem.link}>{navItem.text}</Link>
                        </li>
                      ))}
                      </ul>
                    </section>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div className={cx("usa-footer-secondary-section", footerStyles.nrlFooterSection)}>
      <div className="grid-container">
        <div className="grid-row grid-gap">
          <div className="usa-footer-logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
            <div className="mobile-lg:grid-col-auto">
              <Link className={footerStyles.nrlFooterLogo} to="/" aria-label="home"></Link>
            </div>
          </div>
          <div className="usa-footer-contact-links mobile-lg:grid-col-6">
            <div className="usa-footer-social-links grid-row grid-gap-1">
              <div className="grid-col-auto">
                <a className="usa-social-link usa-social-link-facebook" href="/">
                  <span>Facebook</span>
                </a>
              </div>
              <div className="grid-col-auto">
                <a className="usa-social-link usa-social-link-twitter" href="/">
                  <span>Twitter</span>
                </a>
              </div>
              <div className="grid-col-auto">
                <a className="usa-social-link usa-social-link-youtube" href="/">
                  <span>YouTube</span>
                </a>
              </div>
              <div className="grid-col-auto">
                <a className="usa-social-link usa-social-link-rss" href="/">
                  <span>RSS</span>
                </a>
              </div>
            </div>

            <div className={cx(footerStyles.nrlRequiredLinks, "grid-row", "grid-gap-1")}>
              <div className="grid-col-auto">
                <a className={footerStyles.nrlRequiredLink} href="/">
                  <span>Link Disclaimer</span>
                </a>
              </div>
              <div className="grid-col-auto">
                <a className={footerStyles.nrlRequiredLink} href="/">
                  <span>Privacy Policy</span>
                </a>
              </div>
              <div className="grid-col-auto">
                <a className={footerStyles.nrlRequiredLink} href="/">
                  <span>FOIA</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </UswdsFooter>
);

export default Footer;
