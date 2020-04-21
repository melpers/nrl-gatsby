import React from 'react';
import { graphql } from "gatsby";
import { Link } from "@reach/router"
// import Img from 'gatsby-image/withIEPolyfill';

import Layout from 'components/layout';
// import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import ImageGallery from 'components/imageGallery';
import VideoDvids from 'components/videoDvids';
import { kebabCase, split, trim, upperFirst } from "lodash";

export const query = graphql`
  query ($id: String!) {
    dvidsPressReleases (id: {eq: $id}) {
      body
      date_published
      description
      keywords
      slug
      title
      formatted_credit
      related_images {
        description
        dvidsImage {
          id
          url
          childImageSharp {
            fluid(maxWidth: 1200) {
              originalImg
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      related_video {
        aspect_ratio
        id
        title
      }
    },
  }
`

const DvidsNewsArticle = (props) => {
  const releaseData = props.data.dvidsPressReleases;
  const catgories = split(releaseData.keywords, ",");
  const formattedBody = releaseData.body.split(`\n\n`).map(paragraph => `<p>${paragraph.replace(/\n/g, `<br>`)}</p>`).join(``);
  return (
  <Layout
    pageMeta={{
    title: releaseData.title,
    // seoImage: releaseData.teaser_image.publicURL,
    // seoImageType: releaseData.teaser_image.internal.mediaType,
    // seoImageAlt: releaseData.teaser_image_alt,
    // seoImageHeight: "800",
    // seoImageWidth: "1200",
    description: releaseData.description,
    ogArticlePublishedTime: releaseData.date_published,
    // ogArticleAuthor: authorString,
    // ogArticleTags: releaseData.keywords,
    }}
  >
    {/* <HeroImage frontmatter={releaseData}/> */}
    <div className="title-block">
    <div className="content-wrapper">
      <div className="title-content">
      <h1>{releaseData.title}</h1>
      <Breadcrumbs uri={props.uri} title={releaseData.title}></Breadcrumbs>
      </div>
    </div>
    </div>
    <div className={"content-wrapper template-dvids-releases"}>
    <Sidebar uri={props.uri}></Sidebar>
    <div className="main-column">
      <div className="news-byline">
        <span>{ releaseData.formatted_credit} | {new Date(releaseData.date_published).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) }</span>
      </div>
      <div className="md-content image-center">
        <div className="article-body" dangerouslySetInnerHTML={{ __html: formattedBody }} />
        { releaseData.related_images ? 
        <div className="article-images">
          <h2>Article Images</h2>
          <ImageGallery
            images={releaseData.related_images.map((node, idx) => ({
              ...node.dvidsImage.childImageSharp.fluid,
              alt: `${node.description}`,
              id: `${node.dvidsImage.id}`,
              caption: `${node.description}`
            }))}
          />
        </div>
        :
        "" }
        { releaseData.related_video.length > 0 ? 
        <div className="article-videos">
          <h2>Article Videos</h2>
          {releaseData.related_video.map((video, idx) => (
          <VideoDvids
            aspect = {video.aspect_ratio}
            id = {video.id}
            title = {video.title}
          />
          ))}
        </div>
        :
        "" }
      </div>
      <div className="article-categories">
        <span className="article-categories-label">Categories: </span>
        {catgories.map((cat, idx) => (
        <Link className="article-category-link" key={idx} to={`/news/categories/${kebabCase(trim(cat))}/`}>{upperFirst(trim(cat))}</Link>
        ))}
      </div>
    </div>
    </div>
  </Layout>
  );
};

export default DvidsNewsArticle;
