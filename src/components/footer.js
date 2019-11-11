import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';
import ExternalLink from '../components/externalLink';
import SocialIcon from '../components/socialIcon';

const Footer = ({ footer }) => {
  const data = useStaticQuery(graphql`
    query {
      socialIcons: allFile(
        filter: {relativeDirectory: {eq: "social"}},
        sort: {fields: name, order: ASC}
      ) {
        edges {
          node {
            name
            publicURL
            childImageSharp {
              fluid(maxWidth: 32) {
                  aspectRatio
                  ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      },
      helpIconSafe: file(
        relativePath: {eq: "footer/safe-helpline.jpg"}
      ) {
        publicURL
      },
      helpIconCrisis: file(
        relativePath: {eq: "footer/veteranscrisisline.jpg"}
      ) {
        publicURL
      },
    }
  `)

  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-inner-wrapper">
          <nav className="nrl-footer">
            <div className="social-block">
              {data.socialIcons.edges.map((socialIcon, idx) => (
                <SocialIcon key={socialIcon.node.name} data={socialIcon}></SocialIcon>
              ))}
            </div>
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
        <div className="help-block">
          <a href="https://safehelpline.org/" target="_blank" rel="noopener noreferrer"><img src={data.helpIconSafe.publicURL} alt="D0D Safe Helpline 1-877-995-5247" /></a>
          <a href="https://www.veteranscrisisline.net/" target="_blank" rel="noopener noreferrer"><img src={data.helpIconCrisis.publicURL} alt="Veterans Crisis Line 1-800-273-8255 Press 1" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
