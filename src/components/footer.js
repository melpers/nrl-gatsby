import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
// import { Footer as UswdsFooter } from 'uswds-react';
import ExternalLink from '../components/externalLink';

const Footer = ({ footer }) => (
  <footer>
    <div className="footer-wrapper">
      <div className="footer-inner-wrapper">
        <nav className="nrl-footer">
          <div className="required-help-demo-block"></div>
          <div className="social-demo-block"></div>
          <div className="footer-primary-content-wrapper">
            <p>This Is An Official U.S. Navy Website. U.S. Naval Research Lab 4555 Overlook Ave., SW Washington, DC 20375</p>
            {footer.navigation.map((navGroup, idx) => (
              <section key={idx} className="usa-footer-primary-content">
                <ul className={ cx("usa-list", "usa-unstyled-list") }>
                {navGroup.items.map((navItem, idx) => (
                  <li key={idx} className="usa-nav-submenu-item">
                    { navItem.type === 'internal' 
                        ? 
                      <Link to={navItem.link}>{navItem.text}</Link> 
                        :
                      ExternalLink(navItem)
                    }
                  </li>
                ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
