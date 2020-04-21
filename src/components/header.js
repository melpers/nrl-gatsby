import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from "@reach/router"
import ExternalLink from 'components/externalLink';
import EmergencyStyles from "../styles/emergency.module.scss";
import close from 'uswds_images/close.svg';
import {
  Accordion,
  AccordionButton,
  AccordionContent,
  Navigation,
  Search,
  Header as UswdsHeader,
} from 'uswds-react';

const propTypes = {
  title: PropTypes.string.isRequired,
};

const Header = ({ title, header }) => {

  const data = useStaticQuery(graphql`
  query {
    markdownRemark(fileAbsolutePath: {
    regex: "/src/emergency/message.md/"}
    ) {
    frontmatter {
      active
    }
    html
    }
  }
  `)

  return (
  <React.Fragment>
    { data.markdownRemark.frontmatter.active ? 
    <div className={EmergencyStyles.emergencyBlock}>
      <div className={EmergencyStyles.emergencyWrapper}>
        <div className={EmergencyStyles.emergencyMessage} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
      </div>
    </div>
    :
    null
    }
    <div className="header-wrapper">
    <UswdsHeader title={title} extended>
      <Navigation>
      <div className="usa-nav__inner">
        <button className="usa-nav__close">
        <img src={close} alt="close" />
        </button>
        <Search small />
        <Accordion className="usa-nav__primary" tag="ul">
        {header.navigation.map((navGroup, idx) => (
          <li key={idx} className="usa-nav__primary-item">
          {navGroup.items.length > 1 ? (
            <React.Fragment>
            <AccordionButton
              // className={`usa-nav__link ${idx === 0 ? 'usa-current' : ''}`}
              className={`usa-nav__link`}
              controls={`extended-nav-section-${idx}`}
            >
              <span>{navGroup.title}</span>
            </AccordionButton>
              <AccordionContent
              id={`extended-nav-section-${idx}`}
              tag="ul"
              className="usa-nav__submenu"
              >
              <React.Fragment>
              <div className="usa-nav-submenu-wrapper">
                {navGroup.items.map((navItem, idx) => (
                <React.Fragment key={idx}>
                  {/* We only want depth 0 items in the main menu */}
                  {navItem.depth === '0' ? 
                  <li className={"usa-nav__submenu-item depth-" + navItem.depth}>
                    { navItem.type === 'internal' 
                      ? 
                    <Link className="usa-nav__link" to={navItem.link}>{navItem.text}</Link> 
                      :
                    <ExternalLink to={navItem.link}>{navItem.text}</ExternalLink>
                    }
                  </li>
                  :
                  <React.Fragment></React.Fragment>
                  }
                </React.Fragment>
                ))}
              </div>
              </React.Fragment>
            </AccordionContent>
            </React.Fragment>
          ) : (
            <Link className="usa-nav__link" to={navGroup.items[0].link}>
            <span>{navGroup.items[0].text}</span>
            </Link>
          )}
          </li>
        ))}
        </Accordion>
      </div>
      </Navigation>
    </UswdsHeader>
    </div>
  </React.Fragment>
  )
}

Header.propTypes = propTypes;

export default Header;
