import React from "react"
import { graphql } from "gatsby";
import { Search } from 'uswds-react';

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';

export const query = graphql`
    query ($id: String!) {
        markdownRemark (id: {eq: $id}) {
            frontmatter {
                title
                hero_image {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
                hero_color
                hero_size
            }
            html
        }
    }
`

const Error404 = (props) => {
    return (
        <div className="page-404">
            <Layout
            pageMeta={{
                title: props.data.markdownRemark.frontmatter.title,
            }}
            >
                <HeroImage frontmatter={props.data.markdownRemark.frontmatter}/>
                <div className="title-block">
                    <div className="content-wrapper">
                        <div className="title-content">
                            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="main-column">
                        <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
                        <Search small />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Error404