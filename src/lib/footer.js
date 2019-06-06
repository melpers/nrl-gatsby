
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import { navigation } from 'uswds_components';
import UswdsComponent from './uswds_component';

import footerStyles from '../styles/footer.module.scss'

const ROOT_CLASS = 'usa-footer';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  big: PropTypes.bool,
  slim: PropTypes.bool,
};

const defaultProps = {
  big: true,
  slim: false,
};

const propsToClasses = props => ({
  [ROOT_CLASS]: true,
  'usa-footer-big': defaultProps.big,
  'usa-footer-slim': defaultProps.slim,
});

const Footer = ({ className, children, ...props }) => {
  const render = ref => (
    <footer
      className={cx(propsToClasses(props), className, footerStyles.nrlFooter)}
      role="contentinfo"
      ref={ref}
    >
      <div className="grid-container usa-footer-return-to-top">
        <Link to="#">Return to top</Link>
      </div>
      {children}
    </footer>
  );

  return <UswdsComponent uswdsComponent={navigation} render={render} />;
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
