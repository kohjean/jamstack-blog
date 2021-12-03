import React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../components/layout"

import Imgix from "react-imgix"

import { Seo } from "../components/seo"

export default function Blog({ data, location }) {
  return (
    <Layout>
      <Seo
        pagetitle="ブログ"
        pagedesc="ESSENTIALSのブログです"
        pagepath={location.pathname}
      />
      <section className="content bloglist">
        <div className="container">
          <h1 className="bar">RECENT POSTS</h1>
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
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMicrocmsBlog(sort: { order: DESC, fields: publishDate }) {
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
