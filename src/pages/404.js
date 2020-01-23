import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Breadcrumbs from "components/breadcrumbs";

const NotFound = (props) => {
    const data = useStaticQuery(graphql`
    query {
      markdownRemark(
          fileAbsolutePath: {regex: "/pages/"},
          frontmatter: {title: {eq: "Page Not Found"}}
        ) {
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
      },
    }
  `)

    return (
        <div className="page-404">
            <Layout
            pageMeta={{
                title: data.markdownRemark.frontmatter.title,
            }}
            >
                <HeroImage frontmatter={props.data.markdownRemark.frontmatter}/>
                <div className="title-block">
                    <div className="content-wrapper">
                        <div className="title-content">
                            <h1>{data.markdownRemark.frontmatter.title}</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="main-column" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
                </div>
            </Layout>
        </div>
    )
}

export default NotFound