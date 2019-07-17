import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import { Footer as UswdsFooter } from 'uswds-react';

import footerStyles from '../styles/footer.module.scss'

const Footer = ({ footer }) => (
  <div className="footer-wrapper">
    <div className="footer-inner-wrapper grid-container">
      <UswdsFooter className="usa-footer-collapsible">
        <div className={cx("usa-footer-primary-section", footerStyles.nrlFooterSection)}>
            <div className="grid-row grid-gap">
              <div className="grid-col-auto grid-col-bottom">
                <div className="usa-footer-logo">
                  <div>
                    <Link className={footerStyles.nrlFooterLogo} to="/" aria-label="NRL home"></Link>
                  </div>
                </div>
              </div>
              <div className="grid-col-fill">
                <nav className="usa-footer-nav">
                  <p>This Is An Official Navy Website.</p>
                  <p>U.S. Naval Research Lab 4555 Overlook Ave., SW Washington, DC 20375</p>
                    {footer.navigation.map((navGroup, idx) => (
                        <section key={idx} className={cx("usa-footer-primary-content", "usa-footer-primary-content-collapsible")}>
                          <ul className={ cx("usa-list", "usa-unstyled-list") }>
                          {navGroup.items.map((navItem, idx) => (
                            <li key={idx} className="usa-nav-submenu-item">
                              <Link to={navItem.link}>{navItem.text}</Link>
                            </li>
                          ))}
                          </ul>
                        </section>
                    ))}
                </nav>
              </div>
            </div>
        </div>
      </UswdsFooter>
    </div>
  </div>
);

export default Footer;
