import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import { Footer as UswdsFooter } from 'uswds-react';

const Footer = ({ footer }) => (
  <UswdsFooter className="usa-footer-collapsible">
    <div className="usa-footer-primary-section">
      <div className="grid-container">
        <div className="grid-row grid-gap">

          <div className="tablet:grid-col-12">
            <nav className="usa-footer-nav">
              <div className="grid-row grid-gap-2">
                {footer.navigation.map((navGroup, idx) => (
                  <div className="mobile-lg:grid-col-6 desktop:grid-col-2">
                    <section key={idx} className="usa-footer-primary-content usa-footer-primary-content-collapsible">
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

          {/* <div className="tablet:grid-col-4">
            <div className="usa-sign-up">
              <h3 className="usa-sign-up-heading">Sign up</h3>
              <form className="usa-form">
                <label className="usa-label" for="email">Your email address</label>
                <input className="usa-input" id="email" name="email" type="email" />
                <button className="usa-button" type="submit">Sign up</button>
              </form>
            </div>
          </div> */}

        </div>
      </div>
    </div>

    <div className="usa-footer-secondary-section">
      <div className="grid-container">
        <div className="grid-row grid-gap">
          <div className="usa-footer-logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
            <div className="mobile-lg:grid-col-auto">
              <img className="usa-footer-logo-img" src="/assets/img/logo-img.png" alt="" />
            </div>
            <div className="mobile-lg:grid-col-auto">
              <h3 className="usa-footer-logo-heading">Name of Agency</h3>
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
            <h3 className="usa-footer-contact-heading">Agency Contact Center</h3>
            <address className="usa-footer-address">
              <div className="usa-footer-contact-info grid-row grid-gap">
                <div className="grid-col-auto">
                  <a href="tel:1-800-555-5555">(800) CALL-GOVT</a>
                </div>
                <div className="grid-col-auto">
                  <a href="mailto:info@agency.gov">info@agency.gov</a>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
    </div>

  </UswdsFooter>
);

export default Footer;
