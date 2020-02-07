import React from 'react';

import Img from "gatsby-image/withIEPolyfill";
import ExpandedText from 'components/expandedText';

function formatPhone(phoneNumber){
    let newNumber = phoneNumber.replace(/\s|\(|\)/g, "");
    if (!newNumber.startsWith("+")){
        newNumber = "+1" + newNumber;
    }
    return newNumber;
}

const Leadership = (props) => {
  const leaderData = props.data.node.frontmatter;

  return (
        <div class="leadership-block-wrapper">
            <ExpandedText>
                <div className="leadership-bio-block">
                    <Img fluid={leaderData.picture.childImageSharp.fluid} />
                    <div className="leadership-bio-content">
                    <h3>{leaderData.name}</h3>
                    <p className="bio-title">{leaderData.title}</p>

                    <div className="bio-contact">
                        <span className="bio-contact-label" aria-label="email address">E</span> <a href={"mailto:" + leaderData.email} aria-label="email address">{leaderData.email}</a>
                    </div>
                    <div className="bio-contact">
                        <span className="bio-contact-label" aria-label="phone number">P</span> <a href={"tel:" + formatPhone(leaderData.phone)} aria-label="phone number">{leaderData.phone}</a>
                    </div>
                    <div className="bio-contact">
                        <span className="bio-contact-label" aria-label="fax number">F</span> {leaderData.fax}
                    </div>

                    </div>
                    <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.node.html }} />
                </div>
            </ExpandedText>
        </div>
    )
}

export default Leadership