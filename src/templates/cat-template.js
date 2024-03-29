import React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../components/layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import Imgix from "react-imgix"

import { Seo } from "../components/seo"

export default function Category({ data, location, pageContext }) {
  return (
    <Layout>
      <Seo
        pagetitle={`CATEGORY: ${pageContext.catname}`}
        pagedesc={`[${pageContext.catname}]カテゴリーの記事です`}
        pagepath={location.pathname}
      />
      <section className="content bloglist">
        <div className="container">
          <h1 className="bar">CATEGORY: {pageContext.catname}</h1>
          <div className="posts">
            {data.allMicrocmsBlog.edges.map(({ node }) => (
              <article className="post" key={node.id}>
                <Link to={`/blog/post/${node.slug}`}>
                  <figure>
                    <Imgix
                      src={node.eyecatch.url}
                      sizes="(max-width: 573px) 100vw 573px"
                      htmlAttributes={{
                        alt: "",
                      }}
                    />
                  </figure>
                  <h3>{node.title}</h3>
                </Link>
              </article>
            ))}
          </div>
          <ul className="pagenation">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/cat/${pageContext.catslug}/`
                      : `/cat/${pageContext.catslug}/${
                          pageContext.currentPage - 1
                        }/`
                  }
                  rel="prev"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>前のページ</span>
                </Link>
              </li>
            )}
            {!pageContext.isLast && (
              <li className="next">
                <Link
                  to={`/cat/${pageContext.catslug}/${
                    pageContext.currentPage + 1
                  }/`}
                  rel="next"
                >
                  <span>次のページ</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ($catid: String!, $skip: Int!, $limit: Int!) {
    allMicrocmsBlog(
      sort: { order: DESC, fields: publishDate }
      filter: { category: { elemMatch: { id: { eq: $catid } } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            url
          }
        }
      }
    }
  }
`
