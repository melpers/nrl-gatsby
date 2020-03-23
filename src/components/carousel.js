import React from "react";
import { Link } from "gatsby";
import ExternalLink from 'components/externalLink';

import BackgroundImage from 'gatsby-background-image';
import Slider from 'infinite-react-carousel';

const Carousel = ({slides}) => {
    return (
        <div className="carousel-wrapper">
            <Slider 
                arrows={false}
                autoplay={true}
                autoplaySpeed={5000}
                dots
            >
                {slides.map((slide, idx) => (
                    <BackgroundImage
                        key={idx}
                        fluid={slide.image.childImageSharp.fluid}
                    >
                        <div className="carousel-content">
                            <p>
                                {slide.copy}
                                {slide.link ? 
                                <span className="more-link">
                                    {slide.link_type === 'internal' && <Link to={slide.link}> Learn&nbsp;More&nbsp;»</Link>}
                                    {slide.link_type === 'external' && <ExternalLink to={slide.link}> Learn&nbsp;More&nbsp;»</ExternalLink>}
                                </span>
                                :
                                ""
                                }
                            </p>
                        </div>
                    </BackgroundImage>
                ))}
            </Slider>
        </div>
    )
}

export default Carousel
